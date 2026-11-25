---
title: 'VH Translator — Tool Dịch Màn Hình Game Thời Gian Thực'
date: 2026-11-25
version: 'v1.0.0'
os: ['Windows 10 (2004+)', 'Windows 11 (64-bit)']
cover: '/images/posts/tools-vh-translator.webp'
badge: 'Mới'
drive_url: 'https://github.com/Hugz211104/VH-trans-screen/releases/download/v1.0.0/VHGameTranslator.exe'
sha256: '729fab3e6f33ae1a7d324bbc95079ea8f01ebbbbc79785a0acb733212c5593fa'
filename: 'VHGameTranslator.exe'
github_release_url: 'https://github.com/Hugz211104/VH-trans-screen/releases/tag/v1.0.0'
tags: ['Tool', 'Dịch màn hình', 'OCR', 'AI', 'Windows']
summary: 'Ứng dụng dịch màn hình game thời gian thực theo phong cách WindowTranslator cho Windows 10/11: tích hợp sẵn PP-OCRv5 đa font offline + Windows OCR, lớp phủ click xuyên không lặp hình, Google Translate HTTP/2 (~45 ms) kết hợp AI Hybrid (Gemini, Groq, Cerebras, DeepSeek, Ollama) và cache LRU 15.000 mục.'
---

> Kho mã nguồn mở: [GitHub — Hugz211104/VH-trans-screen](https://github.com/Hugz211104/VH-trans-screen)
>
> Tác giả: **Hưng** · Ngôn ngữ & nền tảng: **Python 3.11+ / PyQt6** · Dung lượng bản đóng gói độc lập (`VHGameTranslator.exe`): **`~90.05 MiB` (`94,426,832` bytes)**

**VH Translator** là công cụ dịch màn hình game thời gian thực (*real-time screen translator*) được xây dựng theo phong cách **WindowTranslator** dành riêng cho **Windows 10 (2004+) / Windows 11 64-bit**. Thay vì đẩy text sang một cửa sổ phụ rời rạc, ứng dụng chụp trực tiếp khung hình game bằng bộ đệm BGRA độ trễ cực thấp, nhận diện chữ ngay trên máy bằng **OCR cục bộ**, dịch qua **HTTP/2 hoặc AI ngữ cảnh** rồi vẽ hộp chữ tiếng Việt đè gọn gàng đúng lên vị trí câu gốc — **click chuột xuyên qua hoàn toàn**, tự ẩn khỏi ảnh chụp màn hình để không tự đọc lại chữ vừa dịch.

---

## 1. Kiến Trúc Xử Lý Độ Trễ Thấp (Real-Time Pipeline)

Mọi khâu trong **VH Translator** được thiết kế xoay quanh luồng xử lý bất đồng bộ `TranslationWorker` (`PyQt6 QThread` + `asyncio`) nhằm giữ độ trễ từ lúc chữ xuất hiện tới lúc hiện bản dịch ở mức thấp nhất có thể:

1. **Chụp khung hình BGRA không sao chép thừa (`ScreenCapturer`):** dùng `mss` đọc trực tiếp từng vùng hình chữ nhật vật lý trên màn hình; hỗ trợ tự phục hồi GDI handle nếu game chuyển độ phân giải hay bật UAC.
2. **So sánh đổi khung hình siêu nhẹ (`~0.05 ms`):** lấy mẫu thưa kênh xanh lục (`arr[::sy, ::sx, 1]`) đại diện ~59% độ sáng cảm nhận trực tiếp trên bộ đệm BGRA; khung hình tĩnh giữ nguyên hoàn toàn không kích hoạt lại OCR, vừa tiết kiệm CPU vừa triệt tiêu nhấp nháy.
3. **Nhận diện & gộp khối thoại thông minh (`UnifiedOcrEngine`):** loại bỏ hộp trùng lặp theo IoU, nối mảnh chữ trên cùng dòng cơ bản rồi gom các dòng gần nhau theo trục dọc/ngang thành đoạn thoại hoàn chỉnh trước khi gửi dịch.
4. **Dịch chống trùng & Bộ đệm LRU (`MultiApiTranslator`):** làm nóng kết nối TLS/HTTP2 ngay khi khởi động, gộp các cụm chữ trùng nhau trong cùng khung hình và tra cứu cache cục bộ trong **`0 ms`** trước khi gọi mạng.
5. **Vẽ lớp phủ chống đè 2 chiều (`TranslationOverlay`):** định vị theo tọa độ chuẩn hóa độc lập DPI (tự xử lý đa màn hình Scaling), tìm giới hạn mở rộng an toàn với các hộp lân cận và tự co cỡ chữ mượt mà.

---

## 2. Ba Chế Độ OCR Cục Bộ & Tối Ưu Vùng Quét

Tùy theo phong cách font chữ của từng tựa game, tab **Điều khiển và tốc độ** cho phép chuyển đổi linh hoạt giữa 3 bộ nhận diện chạy **100% offline trên máy**:

| Chế độ OCR | Công nghệ lõi | Độ trễ / Đặc điểm | Khi nào nên chọn? |
| :--- | :--- | :--- | :--- |
| **PP-OCRv5 Đa font** *(Mặc định)* | `RapidOCR` + `ONNX Runtime` (`ch_PP-OCRv5_det_mobile.onnx`, `latin_PP-OCRv5_rec_mobile.onnx`) | Tích hợp sẵn trong `.exe`, giữ session dùng chung để tắt/bật gần như `0 ms` | Game dùng **font nghệ thuật, font hải tặc, chữ viết tay, chữ trên nền giấy da hoặc có viền bóng** |
| **Windows + Tăng nét** | `WinRT Windows.Media.Ocr` + `PIL` (`Resize 1.25x`, `Contrast 1.18`, `UnsharpMask`) | `~50 ms`, tiền xử lý phóng nét với vùng có chiều cao `<= 480 px` | Game font serif mảnh, hơi mờ hoặc nền tương phản trung bình |
| **Windows Nhanh** | `WinRT Windows.Media.Ocr` nguyên bản trên BGRA | `~20 ms`, nhẹ CPU tối đa | Game có font sans-serif / UI hiện đại rõ ràng |

### Khoanh vùng thông minh & Preset tốc độ

- **Hai chế độ lấy khung hình:**
  - **Theo cửa sổ game:** tự bám theo `HWND` cửa sổ game kể cả khi bạn kéo di chuyển cửa sổ; có tùy chọn **Chỉ hiện lớp phủ khi cửa sổ game đang được chọn** (`only_when_focused`) để khi `Alt+Tab` ra ngoài không bị chữ dịch che trình duyệt. Kèm 3 vùng cắt dựng sẵn ngay trong cửa sổ: **`Toàn cửa sổ`**, **`Phụ đề dưới (38%)`** và **`Hội thoại giữa-dưới (44% chiều cao × 76% rộng)`**.
  - **Vùng cố định:** dùng công cụ kéo chọn trực tiếp bất kỳ khu vực nào trên màn hình (`RegionSelector`) — rất tiện khi chỉ cần dịch khung chat, thẻ vật phẩm hoặc video/visual novel.
- **Ba nút thiết lập nhanh:**
  - `Nhanh — 120 ms / 1280 px`
  - `Cân bằng — 200 ms / 1280 px`
  - `Chữ nhỏ — 250 ms / Gốc` *(giữ nguyên độ phân giải gốc để bắt ký tự bé li ti)*
- **Lọc nhiễu cảnh 3D & chống nháy hội thoại:** bật mặc định bộ lọc bỏ qua **chỉ số FPS, ping, la bàn (`N/NW/°`), đơn vị đo khoảng cách (`m/km/ft/yd`), HP/MP/Lv**; dùng so sánh chuỗi mờ (`_is_same_scene`, ngưỡng `90%`) để bỏ qua rung ký tự OCR và yêu cầu **2 lần quét rỗng liên tiếp** mới xóa phụ đề đang hiển thị.

---

## 3. Bộ Máy Dịch Đa Kênh & Chế Độ AI Hybrid

Ở tab **API và mô hình**, **VH Translator** hỗ trợ đồng thời dịch truyền thống siêu tốc lẫn dịch AI hiểu mạch cốt truyện:

1. **Google Translate miễn phí (HTTP/2 Keep-Alive):** không cần API key, phản hồi trung bình **`~45 ms`**, gom tự động tối đa `18` cụm mỗi request (`dict-chrome-ex`) kèm cơ chế tự lùi về endpoint dự phòng nếu gặp giới hạn.
2. **Google Gemini API (AI Studio & Vertex AI Express):**
   - Hỗ trợ trực tiếp cả khóa AI Studio (`AIza...`) lẫn khóa Vertex AI Express (`AQ....`).
   - Mặc định dùng `gemini-3.5-flash-lite` (tối ưu `thinkingLevel: minimal`), tự động thử danh sách dự phòng (`gemini-flash-lite-latest`, `gemini-3.1-flash-lite`, `gemini-3.8-flash`) khi gặp lỗi quá tải `429`/`503` hay `404`, và có nút **Tải danh sách** truy vấn các model khả dụng ngay từ API.
   - Cho phép tùy chỉnh **ngữ cảnh game** (*game context*) và tự nhắc AI sửa các lỗi đọc nhầm phổ biến của OCR (như `l/I/1`, `O/0`, `c/e`).
3. **Groq / Cerebras / DeepSeek / OpenAI / OpenRouter / Ollama nội bộ:** tích hợp sẵn nút chọn nhanh **6 cấu hình mẫu** (`Cerebras qwen-3-32b`, `Groq llama-3.3-70b-versatile`, `DeepSeek deepseek-chat`, `OpenAI gpt-4o-mini`, `OpenRouter google/gemini-2.5-flash-lite`, `Ollama nội bộ http://localhost:11434/v1` với `qwen2.5:7b`) và tự định tuyến Base URL khi nhập khóa `gsk_` (Groq) hoặc `csk-` (Cerebras).
4. **Chế độ Hybrid (`hybrid_fast_preview`):**
   - Ngay khi có chữ mới, app hiện lập tức bản dịch **Google Translate (`~45 ms`)** để bạn đọc ngay lập tức không phải chờ đợi.
   - Song song ở hậu cảnh, tác vụ AI dịch lại theo đúng văn phong game để thay thế mượt mà; nếu bạn vừa bấm qua cảnh thoại tiếp theo (`scene_seq` thay đổi), yêu cầu AI của câu cũ sẽ **tự động bị hủy** để không làm nghẽn câu mới.
5. **Bộ nhớ đệm LRU cục bộ `15.000` mục (`translation_cache.json`):** lưu theo khóa `provider|target_language|text` bằng cơ chế ghi nguyên tử (*atomic write*); mọi câu thoại hoặc menu từng đi qua sẽ hiển thị lại gần như ngay lập tức (`0 ms`) và không tốn lại API quota.

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

1. Tải trực tiếp file **`VHGameTranslator.exe`** từ nút tải phía trên (hoặc qua trang [GitHub Releases](https://github.com/Hugz211104/VH-trans-screen/releases/tag/v1.0.0)) và kiểm tra khớp mã **SHA-256**.
2. Đặt **`VHGameTranslator.exe`** vào một thư mục riêng gọn gàng và mở chạy trực tiếp — **không cần cài Python hay tải thêm model** (đã đóng gói sẵn bộ PP-OCRv5 ONNX và thư viện cần thiết). File `settings.json` và `translation_cache.json` sẽ tự lưu ngay cạnh file `.exe`.
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

### `v1.0.0` (25/11/2026)
- Phát hành bản chính thức đầu tiên **`VHGameTranslator.exe`** (64-bit, `94,426,832` bytes) qua GitHub Actions Windows runner.
- Đóng gói sẵn mô hình **PP-OCRv5 Đa font (`rapidocr` + `onnxruntime`)** chạy offline bên cạnh **Windows OCR + Tăng nét** và **Windows Nhanh**.
- Hỗ trợ dịch **Google Translate HTTP/2 Keep-Alive**, **Google Gemini (AI Studio / Vertex Express)**, **Groq / Cerebras / DeepSeek / OpenAI / OpenRouter / Ollama** cùng chế độ **Hybrid**, cache LRU `15.000` mục và lớp phủ **`WDA_EXCLUDEFROMCAPTURE`** chống lặp hình.
