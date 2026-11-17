---
title: 'Tối ưu độ trễ FastAPI + PhoBERT cho LawBot NTTU'
date: 2026-11-16
project: 'LawBot NTTU'
tags: ['FastAPI', 'PhoBERT', 'Python', 'NLP']
summary: 'Một số mẹo thực chiến giảm độ trễ intent routing: tách load model ra lifespan, giới hạn số luồng PyTorch/OpenMP và lọc câu hỏi ngoài phạm vi sớm.'
---

Khi triển khai **LawBot NTTU** trên server CPU cấu hình vừa phải, pipeline intent routing dùng `PhoBERT` kết hợp `FastAPI` rất dễ bị chậm đột biến (spike lên vài giây) nếu nhiều request tới cùng lúc. Dưới đây là 3 chỉnh sửa đơn giản giúp p95 latency giảm rõ rệt mà không phải đổi kiến trúc.

## 1. Tách load model & tokenizer vào FastAPI `lifespan`

Tuyệt đối không load `AutoTokenizer` / `AutoModelForSequenceClassification` ở mức module import lung tung hoặc trong request handler. Hãy dùng `lifespan` để nạp model một lần duy nhất khi worker khởi động và chạy 1 lượt warm-up giả lập:

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

MODEL_ID = "vinai/phobert-base-v2"

@asynccontextmanager
async def lifespan(app: FastAPI):
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForSequenceClassification.from_pretrained("./checkpoints/intent")
    model.eval()

    # Warm-up 1 lượt để PyTorch cấp phát sẵn buffer
    dummy = tokenizer("học phí học kỳ 1", return_tensors="pt", truncation=True, max_length=128)
    with torch.inference_mode():
        _ = model(**dummy)

    app.state.tokenizer = tokenizer
    app.state.model = model
    yield
    del app.state.model
```

> Dùng `torch.inference_mode()` thay vì `torch.no_grad()` giúp giảm thêm overhead theo dõi autograd trên CPU.

## 2. Giới hạn số luồng PyTorch & OpenMP

Mặc định PyTorch trên Linux thường bung số luồng ngang với toàn bộ số core vật lý/ảo. Khi chạy `uvicorn` với nhiều worker hoặc có tác vụ nền khác, các luồng tranh chấp CPU (*thread contention*) khiến thời gian suy luận chậm hơn cả chạy ít luồng.

Hãy đặt biến môi trường trước khi import `torch` (hoặc truyền trong systemd / Docker):

```bash
export OMP_NUM_THREADS=2
export MKL_NUM_THREADS=2
export OPENBLAS_NUM_THREADS=2
export TOKENIZERS_PARALLELISM=false
```

Và ép trực tiếp trong code khởi tạo:

```python
import torch

torch.set_num_threads(2)
torch.set_num_interop_threads(1)
```

Thực tế trên máy 4 vCPU, đặt `num_threads=2` cho mỗi worker ổn định hơn hẳn so với để mặc định 4–8 luồng.

## 3. Lọc câu hỏi ngoài phạm vi (Out-of-Scope) trước khi chạy PhoBERT

Không phải tin nhắn nào cũng cần đi qua Transformer. Những câu chào hỏi ngắn (`"hi"`, `"alo"`, `"cảm ơn"`), ký tự rác hoặc câu hỏi quá dài không hợp lệ có thể chặn ngay ở tầng pre-filter trong `< 1 ms`:

```python
GREETINGS = {"hi", "hello", "alo", "chào", "chào bot", "cảm ơn", "thanks"}

def fast_route_or_reject(text: str) -> str | None:
    cleaned = " ".join(text.lower().strip().split())
    if len(cleaned) < 3:
        return "invalid_short"
    if cleaned in GREETINGS:
        return "greeting"
    if len(cleaned) > 600:
        return "too_long"
    return None
```

Nếu `fast_route_or_reject` trả về nhãn, API phản hồi ngay bằng template nhẹ nhàng mà không tốn chu kỳ CPU cho PhoBERT tokenizer và encoder.
