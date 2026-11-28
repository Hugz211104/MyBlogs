---
title: 'VH Translator — Tool Dịch Màn Hình Game Thời Gian Thực'
date: 2026-11-26
version: 'v1.1.0'
os: ['Windows 10 (2004+)', 'Windows 11 (64-bit)']
cover: '/images/posts/tools-vh-translator.webp'
badge: 'Mới'
drive_url: 'https://github.com/Hugz211104/VH-trans-screen/releases/download/v1.1.0/VHGameTranslator.exe'
sha256: 'a275aacad898d785de550fea9472b67fc62c8192af701ce633111b0ade55c3b1'
filename: 'VHGameTranslator.exe'
github_release_url: 'https://github.com/Hugz211104/VH-trans-screen/releases/tag/v1.1.0'
tags: ['Tool', 'Dịch màn hình', 'OCR', 'AI', 'Windows']
summary: 'Ứng dụng dịch màn hình game thời gian thực theo phong cách WindowTranslator cho Windows 10/11: chia 2 luồng dịch (Tiered Routing), SSE Streaming với prompt cố định (< 75 token), cache 2 tầng rapidfuzz (≥ 93%), mặt nạ chữ chống nền 3D động (< 0.4 ms) và pipeline Drop-Oldest.'
---

> Kho mã nguồn mở: [GitHub — Hugz211104/VH-trans-screen](https://github.com/Hugz211104/VH-trans-screen)
>
> Tác giả: **Hưng** · Ngôn ngữ & nền tảng: **Python 3.11+ / PyQt6** · Dung lượng bản đóng gói độc lập (`VHGameTranslator.exe`): **`~91.55 MiB` (`95,996,413` bytes)**

**VH Translator** là công cụ dịch màn hình game thời gian thực (*real-time screen translator*) được xây dựng theo phong cách **WindowTranslator** dành riêng cho **Windows 10 (2004+) / Windows 11 64-bit**. Thay vì đẩy text sang một cửa sổ phụ rời rạc, ứng dụng chụp trực tiếp vùng phụ đề game bằng bộ đệm BGRA độ trễ cực thấp, nhận diện chữ ngay trên máy bằng **OCR cục bộ**, chia luồng dịch qua **HTTP/2 hoặc AI SSE Streaming** rồi vẽ hộp chữ tiếng Việt đè gọn gàng đúng lên vị trí câu gốc — **click chuột xuyên qua hoàn toàn**, tự ẩn khỏi ảnh chụp màn hình để không tự đọc lại chữ vừa dịch.

---

## 1. Kiến Trúc Xử Lý Độ Trễ Thấp (Real-Time Pipeline)

Từ bản **v1.1.0**, `TranslationWorker` (`PyQt6 QThread` + `asyncio`) được tách thành kiến trúc **Producer – Consumer bất đồng bộ** với hàng đợi 1 phần tử nhằm triệt tiêu độ trễ tích tụ và đo hiệu năng trực tiếp theo từng khâu:

1. **Chụp vùng cắt ROI & Hàng đợi Drop-Oldest (`ScreenCapturer` + `_LatestFrameSlot`):** dùng `mss` chụp trực tiếp vùng chữ nhật vật lý đã khoanh (không bao giờ chụp thừa toàn màn hình), đẩy vào slot 1 phần tử luôn ghi đè khung cũ (`Drop-Oldest`) để bộ máy dịch luôn xử lý khung hình mới nhất mà không bao giờ dồn lag.
2. **Mặt nạ chữ chống nền 3D động (`Text-Mask Diff`, `< 0.4 ms`):** thay vì so điểm ảnh thô, bộ tạo mặt nạ 1/4-scale (`< 0.2 ms`) trích xuất biên nét chữ trên kênh xanh lục (bắt cả chữ sáng `>= 178` trên nền tối `<= 142` lẫn mực tối `<= 82` trên giấy da sáng `>= 148`), rồi giãn đối xứng `3×3` để khử rung viền *anti-aliasing* — bỏ qua hầu hết sóng biển, mây, ánh sáng 3D chuyển động phía sau phụ đề.
3. **Trigger chữ chạy thông minh & Hủy ngang (`TranslationWorker`):** lọc rung OCR bằng C++ **`rapidfuzz`** (`_is_same_scene`, ngưỡng `91%`). Khi hội thoại đang gõ từng chữ (*typewriter*), câu kết thúc bằng `. ? ! … 。 ？ ！` được bắn dịch ngay (`0 ms`), câu đang gõ dở chỉ đợi ổn định `130 ms` (trần tối đa `420 ms`), và mọi request AI cũ bị **hủy ngang ngay lập tức** (*Preemptive Cancel*) ngay khi bạn chuyển thoại.
4. **Chia 2 luồng dịch (`Tiered Routing`), SSE Streaming & Giám sát 4 khâu:** làm nóng sẵn kết nối TLS/HTTP2 ngay lúc bật app, tự tách nút bấm/menu ngắn chạy luồng nhanh `~45 ms` song song với AI SSE Streaming, đồng thời hiển thị trực tiếp thời gian **Chụp / So**, **OCR**, **Dịch (`TTFT / tổng`)** và **Bộ nhớ đệm** trên thanh bên.
5. **Vẽ lớp phủ chống đè 2 chiều (`TranslationOverlay`):** định vị theo tọa độ chuẩn hóa độc lập DPI (tự xử lý đa màn hình Scaling), tìm giới hạn mở rộng an toàn với các hộp lân cận và tự co cỡ chữ mượt mà.

---

## 2. Ba Chế Độ OCR Cục Bộ & Tối Ưu Vùng Quét

Tùy theo phong cách font chữ của từng tựa game, tab **Điều khiển và tốc độ** cho phép chuyển đổi linh hoạt giữa 3 bộ nhận diện chạy **100% offline trên máy**:

| Chế độ OCR | Công nghệ lõi | Độ trễ / Đặc điểm | Khi nào nên chọn? |
| :--- | :--- | :--- | :--- |
| **PP-OCRv5 Đa font** *(Mặc định)* | `RapidOCR` + `ONNX Runtime` (`ch_PP-OCRv5_det_mobile.onnx`, `latin_PP-OCRv5_rec_mobile.onnx`) | Tích hợp sẵn trong `.exe`, giới hạn cạnh dài `640 / 960 / 1280 px` (`use_cls=False`) | Game dùng **font nghệ thuật, font hải tặc, chữ viết tay, chữ trên nền giấy da hoặc có viền bóng** |
| **Windows + Tăng nét** | `WinRT Windows.Media.Ocr` + `PIL` (`Resize 1.25x`, `Contrast 1.18`, `UnsharpMask`) | `~39–50 ms`, tiền xử lý phóng nét với vùng có chiều cao `<= 480 px` | Game font serif mảnh, hơi mờ hoặc nền tương phản trung bình |
| **Windows Nhanh** | `WinRT Windows.Media.Ocr` nguyên bản trên BGRA | `~7–20 ms`, nhẹ CPU tối đa | Game có font sans-serif / UI hiện đại rõ ràng |

### Khoanh vùng thông minh & Preset tốc độ

- **Hai chế độ lấy khung hình:**
  - **Theo cửa sổ game:** tự bám theo `HWND` cửa sổ game kể cả khi bạn kéo di chuyển cửa sổ; có tùy chọn **Chỉ hiện lớp phủ khi cửa sổ game đang được chọn** (`only_when_focused`) để khi `Alt+Tab` ra ngoài không bị chữ dịch che trình duyệt. Kèm 3 vùng cắt dựng sẵn ngay trong cửa sổ: **`Toàn cửa sổ`**, **`Phụ đề dưới (38%)`** và **`Hội thoại giữa-dưới (44% chiều cao × 76% rộng)`**.
  - **Vùng cố định:** dùng công cụ kéo chọn trực tiếp bất kỳ khu vực nào trên màn hình (`RegionSelector`) — rất tiện khi chỉ cần dịch khung chat, thẻ vật phẩm hoặc video/visual novel.
- **Ba mức thiết lập nhanh (chu kỳ quét `50–1200 ms`, mặc định `80 ms / 960 px`):**
  - `Siêu tốc — 60 ms / 640 px` *(tối ưu cho vùng phụ đề cắt gọn)*
  - `Cân bằng — 80 ms / 960 px` *(mặc định cân bằng tốc độ và độ nét)*
  - `Chữ nhỏ — 120 ms / 1280 px` *(nét hơn cho toàn cửa sổ 1080p–2K hoặc chữ bé)*
- **Lọc nhiễu cảnh 3D & chống nháy hội thoại:** bật mặc định cả **Lọc mặt nạ chữ khi so khung hình (`text_mask_diff`)** lẫn bộ lọc **chỉ số FPS, ping, la bàn (`N/NW/°`), đơn vị đo khoảng cách (`m/km/ft/yd`), HP/MP/Lv** (`filter_hud_noise`); kiểm tra trùng cảnh bằng C++ `rapidfuzz` (ngưỡng `91%`) và yêu cầu **2 lần quét rỗng liên tiếp** mới xóa phụ đề đang hiển thị.

---

## 3. Bộ Máy Dịch Đa Kênh, Tiered Routing & SSE Streaming

Ở tab **API và mô hình**, **VH Translator** kết hợp đồng thời tốc độ của HTTP/2, khả năng hiểu cốt truyện của AI và streaming từng phần để giảm mạnh thời gian chờ ký tự đầu tiên (**TTFT**):

1. **Google Translate miễn phí (HTTP/2 Keep-Alive):** không cần API key, phản hồi trung bình **`~45 ms`**, gom tự động tối đa `18` cụm mỗi request (`dict-chrome-ex`) kèm cơ chế tự lùi về endpoint dự phòng nếu gặp giới hạn.
2. **Google Gemini API (AI Studio & Vertex AI Express):**
   - Hỗ trợ trực tiếp cả khóa AI Studio (`AIza...`) lẫn khóa Vertex AI Express (`AQ....`), tích hợp **SSE Streaming** (`streamGenerateContent?alt=sse`) đổ chữ trực tiếp lên lớp phủ (~`45 ms` mỗi nhịp cập nhật).
   - Dùng `systemInstruction` cố định với **prompt gọn (`< 75` token)** tối ưu *prefix/KV-cache*, đồng thời tính động giới hạn `maxOutputTokens` (`384–2048`) giúp **sửa triệt để lỗi cắt cụt câu** trên các dòng `flash-lite`.
   - Mặc định dùng `gemini-3.5-flash-lite` (tối ưu `thinkingLevel: minimal`), tự động thử danh sách dự phòng (`gemini-flash-lite-latest`, `gemini-3.1-flash-lite`, `gemini-3.8-flash`) khi gặp lỗi `429`/`503`/`404`, và có nút **Tải danh sách** truy vấn các model khả dụng ngay từ API.
3. **Groq / Cerebras / DeepSeek / OpenAI / OpenRouter / Ollama & llama.cpp nội bộ:** hỗ trợ `stream: true` qua SSE, tự động ẩn/loại bỏ thẻ `<think>...</think>` (kèm `/no_think` cho Qwen3), giữ `keep_alive: 15m` cho máy chủ cục bộ (`localhost`), tích hợp **6 cấu hình mẫu** (`Cerebras qwen-3-32b`, `Groq llama-3.3-70b-versatile`, `DeepSeek deepseek-chat`, `OpenAI gpt-4o-mini`, `OpenRouter google/gemini-2.5-flash-lite`, `Ollama nội bộ http://localhost:11434/v1` với `qwen2.5:7b`) và tự định tuyến Base URL khi nhập khóa `gsk_` (Groq) hoặc `csk-` (Cerebras).
4. **Chia 2 luồng dịch (`tiered_routing`) & Chế độ Hybrid (`hybrid_fast_preview`):**
   - **Tiered Routing:** tự phát hiện nhãn UI/nút bấm ngắn `1–4` từ (`<= 7` ký tự CJK/Hàn không dấu ngắt câu) để đẩy qua Google HTTP/2 (~`45 ms`) chạy song song (`asyncio.gather`), chỉ đưa hội thoại dài lên LLM — vừa nhanh vừa tiết kiệm quota AI.
   - **Hybrid Fast Preview + Hủy ngang:** tùy chọn hiện trước bản Google Translate trong lúc AI streaming cập nhật bản dịch chuẩn ngữ cảnh; khi chuyển qua cảnh thoại mới (`scene_seq` tăng), request AI cũ bị hủy ngay để không nghẽn luồng mới.
5. **Bộ nhớ đệm 2 tầng LRU `15.000` mục (`translation_cache.json`):** lưu bền vững bằng ghi nguyên tử (*atomic write*) theo khóa `provider|target_language|text` gồm **Tầng 1** tra hash `O(1)` (`~0.01 ms`) và **Tầng 2** so mờ lõi C++ **`rapidfuzz`** (`>= 93%`, `~0.3–0.5 ms` cho câu dài `>= 8` ký tự trong biên độ dài `±15%`) để tái sử dụng tức thì ngay cả khi OCR đọc lệch 1–2 ký tự.

---

## 4. Lớp Phủ Click-Through Thông Minh & Mini HUD

Tab **Giao diện lớp phủ** được chăm chút để hộp dịch hòa vào giao diện game tự nhiên nhất:

- **Click xuyên & không cướp tiêu điểm:** cửa sổ overlay dùng tập cờ Win32 `WS_EX_LAYERED | WS_EX_TRANSPARENT | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE` — mọi thao tác chuột, ngắm bắn, bấm kỹ năng đều đi thẳng vào game và không hiện rác trên `Alt + Tab`.
- **Chống lặp chữ nhờ `WDA_EXCLUDEFROMCAPTURE`:** tự động loại bỏ lớp phủ và thanh Mini HUD khỏi dữ liệu chụp màn hình (trên Windows 10 2004 trở lên), đảm bảo OCR luôn chỉ nhìn thấy chữ gốc của game.
- **Tự lấy màu nền thích ứng (`adaptive_bg`):** tính trung vị màu viền quanh hộp chữ gốc bằng NumPy rồi chọn màu nền/chữ tối ưu độ tương phản (hoặc cho phép người dùng tự cố định màu nền, màu chữ, độ đậm `bg_opacity`, đệm lề, bo góc, đổ bóng và phông chữ).
- **Chống đè hộp 2 chiều & Xem thử trực tiếp:** thuật toán `_compute_neighbor_limits` + `_resolve_remaining_overlaps` tự tính khoảng an toàn và thu nhỏ font tự động (`min_font_size` đến `max_font_size`, có thể co xuống `6–7pt` ở ô hẹp) để các nút menu sát nhau không bao giờ chồng đè; hỗ trợ khung **Xem thử ngay trong tab** và nút **Xem thử toàn màn hình (4 giây)**.
- **Thanh Mini HUD & Single-Instance Mutex:** thanh nổi nhỏ gọn ở góc màn hình giúp theo dõi độ trễ (`OCR / Dịch / Bộ nhớ đệm`) và bật/tắt nhanh mà không chiếm màn hình; ứng dụng cũng khóa đơn tiến trình (`acquire_single_instance`) để bấm mở lại sẽ gọi đúng cửa sổ đang chạy thay vì nhân bản nhiều instance.

---

## 5. Phím Tắt Toàn Cục & Hướng Dẫn Sử Dụng

Toàn bộ phím tắt được đăng ký qua Windows API **`RegisterHotKey`** thay vì dùng hook bàn phím toàn cục, nhờ vậy **không gây độ trễ hay khựng phím** khi đang combat trong game.

| Phím tắt | Chức năng |
| :--- | :--- |
| **`Alt + T`** | Bắt đầu hoặc Dừng dịch tự động |
| **`Alt + S`** | Quét và dịch nhanh một lần (hoặc ép quét lại khung hiện tại ngay) |
| **`Alt + H`** | Ẩn hoặc Hiện nhanh lớp phủ tiếng Việt |

### Cách 1: Dùng bản `.exe` đóng gói sẵn (Khuyên dùng)

1. Tải trực tiếp file **`VHGameTranslator.exe`** từ nút tải phía trên (hoặc qua trang [GitHub Releases](https://github.com/Hugz211104/VH-trans-screen/releases/tag/v1.1.0)) và kiểm tra khớp mã **SHA-256**.
2. Đặt **`VHGameTranslator.exe`** vào một thư mục riêng gọn gàng và mở chạy trực tiếp — **không cần cài Python hay tải thêm model** (đã đóng gói sẵn Python, Visual C++ runtime, `rapidfuzz` và 2 model đa font `PP-OCRv5`). File `settings.json` và `translation_cache.json` sẽ tự lưu ngay cạnh file `.exe`.
3. Chuyển game sang chế độ **`Borderless Windowed`** (Không viền) hoặc **`Windowed`** (với *Exclusive Fullscreen*, Windows không cho phép vẽ lớp phủ đè lên trên).
4. Trong tab **Điều khiển và tốc độ**, chọn đúng cửa sổ game, khoanh vùng cắt phụ đề *(nên chọn `Phụ đề dưới (38%)` hoặc `Hội thoại giữa-dưới (44%)` để tăng tốc OCR lên nhiều lần)* rồi nhấn **`Bắt đầu dịch`** hoặc bấm **`Alt + T`**.

### Cách 2: Chạy hoặc tự đóng gói từ mã nguồn

Yêu cầu: **Windows 10 (2004+) / Windows 11 (64-bit)** và **Python 3.11+**.

```powershell
git clone https://github.com/Hugz211104/VH-trans-screen.git
cd VH-trans-screen
```

- **Chạy nhanh:** nháy đúp vào `run.bat` để tự tạo `.venv`, cài gói từ `requirements.txt` và mở ứng dụng.
- **Hoặc tự chạy & đóng gói `.exe` bằng PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe main.py

# Nếu muốn tự build lại file dist\VHGameTranslator.exe
.\.venv\Scripts\python.exe -m pip install pyinstaller
.\.venv\Scripts\python.exe build_exe.py
```

> **Mẹo & Lưu ý bảo mật:**
> - Với game tiếng Nhật, Trung hoặc Hàn khi dùng chế độ **Windows OCR**, nhớ cài gói ngôn ngữ tương ứng trong **Windows Settings -> Time & Language -> Language & Region** (hoặc chuyển sang **PP-OCRv5 Đa font** và chọn đúng ngôn ngữ nguồn trong app).
> - Nếu bạn nhập API Key cá nhân (Gemini, Groq, OpenAI, DeepSeek...), **tuyệt đối không chia sẻ hoặc commit file `settings.json`** đang lưu khóa của bạn lên kho lưu trữ công khai.

---

## 6. Changelog

### `v1.1.0` (26/11/2026)
- Phát hành bản cập nhật **`VHGameTranslator.exe`** (64-bit, `95,996,413` bytes, `~91.55 MiB`) kèm `rapidfuzz` C++ được đóng gói sẵn trong file `.exe`.
- **Chia 2 luồng dịch (Tiered Routing):** nút bấm và nhãn UI ngắn `1–4` từ đi thẳng luồng HTTP/2 nhanh (`~45 ms`) song song với hội thoại dài đẩy lên AI.
- **SSE Streaming & Prompt gọn (`< 75` token):** đổ chữ trực tiếp lên lớp phủ cho cả **Gemini** (`streamGenerateContent?alt=sse` + `systemInstruction`) và **OpenAI / Groq / Cerebras / DeepSeek / OpenRouter / Ollama / llama.cpp** (`stream: true`, tự lọc `<think>`), đồng thời sửa lỗi cắt cụt câu trên Gemini (`maxOutputTokens` linh hoạt `384–2048`).
- **Cache 2 tầng với `rapidfuzz`:** Tầng 1 hash chính xác `O(1)` (`~0.01 ms`) + Tầng 2 so mờ C++ (`≥ 93%`, `~0.3 ms`) bắt gọn lỗi OCR lệch 1–2 ký tự.
- **Mặt nạ chữ chống nền 3D động (`< 0.4 ms`):** lọc nét chữ 1/4-scale (`< 0.2 ms`) + giãn `3×3` để loại bỏ lượt OCR thừa khi sóng, mây, ánh sáng chuyển động phía sau phụ đề.
- **Pipeline Drop-Oldest + Trigger chữ chạy + Hủy ngang (Preemptive Cancel):** dùng slot 1 phần tử chống dồn lag, bắn dịch ngay ở dấu kết câu (`0 ms`) hoặc đợi `130 ms` khi đang gõ dở, cập nhật preset mặc định **`80 ms / 960 px`** và hiển thị đo độ trễ **4 khâu trực tiếp** (`Chụp / So`, `OCR`, `Dịch TTFT / tổng`, `Bộ nhớ đệm`).

### `v1.0.0` (25/11/2026)
- Phát hành bản chính thức đầu tiên **`VHGameTranslator.exe`** (64-bit, `94,426,832` bytes) qua GitHub Actions Windows runner.
- Đóng gói sẵn mô hình **PP-OCRv5 Đa font (`rapidocr` + `onnxruntime`)** chạy offline bên cạnh **Windows OCR + Tăng nét** và **Windows Nhanh**.
- Hỗ trợ dịch **Google Translate HTTP/2 Keep-Alive**, **Google Gemini (AI Studio / Vertex Express)**, **Groq / Cerebras / DeepSeek / OpenAI / OpenRouter / Ollama** cùng chế độ **Hybrid**, cache LRU `15.000` mục và lớp phủ **`WDA_EXCLUDEFROMCAPTURE`** chống lặp hình.
