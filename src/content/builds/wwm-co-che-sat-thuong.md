---
title: 'Cơ Chế Sát Thương, Roll Đòn Đánh & Hệ Thống Chỉ Số WWM'
date: 2026-11-20
game: 'Where Winds Meet'
role: 'Cơ chế & Chỉ số (Lv.100–115)'
cover: '/images/posts/builds-co-che-sat-thuong.jpg'
badge: 'Toàn Tập'
tags: ['Where Winds Meet', 'Chỉ số', 'Cơ chế', 'Hit Roll', 'Tuning']
summary: 'Cẩm nang kỹ thuật toàn diện về cơ chế Roll Đòn Đánh Hai Bể, công thức Kháng Phán Định, Sát Thương Ba Đường Ray, Xuyên Giáp vs Kháng, Nghịch lý Tiểu Ngoại Lưu, 8 Quy tắc Điều luật bậc 100–115 và ví dụ tính tay Lv.100.'
---

> Nguồn: [Google Docs — Cơ Chế Sát Thương WWM](https://docs.google.com/document/d/1LtO7dCkn9-ZNdqp9Sbq0zLVkw7cvGyQidTut4qB9B1w/edit?usp=drivesdk)
>
> Công cụ tương tác đi kèm: [Máy tính Tỷ lệ Đòn Đánh (Hit Roll) WWM](/builds/calculator)

Tài liệu này được biên soạn theo cấu trúc một bản đặc tả kỹ thuật chuẩn Google Docs, hệ thống hóa toàn bộ cơ chế chiến đấu cốt lõi của **Where Winds Meet (Yến Vân Thập Lục Thanh)** — từ cách hệ thống roll từng đòn đánh, cơ chế Kháng Phán Định, công thức tính sát thương đa khu nhân cho đến bảng quy đổi Ngũ Duy, thuộc tính nguyên tố và chiến lược điều luật (Tuning) giai đoạn Endgame. Trọng tâm vận hành của trò chơi xoay quanh ba trụ cột chính được cộng đồng kỹ thuật giải ngược (reverse-engineer) qua thực nghiệm: **Mô hình Bàn Tròn Hai Bể (Two-Pool Round-Table)** phân định bốn loại đầu ra sát thương loại trừ lẫn nhau, **Cấu trúc Sát thương Ba Đường Ray song song** (Ngoại Công, Thuộc Tính Bản Hệ/Vô Tướng và Thuộc Tính Ngoại Hệ), và **Quy tắc Khóa Giá trị Nhỏ nhất (Min > Max Lock)** tạo nên hai nghịch lý build đồ đặc trưng là Ngoại công tối thiểu ngoại hệ vượt Ngoại công tối thiểu bản hệ và meta Ngoại công tối thiểu lưu.

Toàn bộ hằng số, ngưỡng trần và công thức dưới đây được tổng hợp, đối chiếu chéo giữa các ghi chú bản vá chính thức của nhà phát hành tính đến **cuối năm 2026 (phiên bản v2.3 / Bậc trang bị 100–115)** và dữ liệu thực nghiệm từ cộng đồng người chơi (NGA, Bahamut, Reddit, Gamersky, 17173 cùng các bộ máy tính DPS phổ biến). Khi áp dụng tài liệu, bạn cần lưu ý ba giới hạn quan trọng của dữ liệu nguồn: thứ nhất, nhiều mô tả chữ (tooltip) giai đoạn đầu ở cả bản Trung Quốc và bản Quốc tế ghi sai hệ số cơ bản của Chí Mạng/Hội Ý cũng như bội số một số vũ khí (điển hình là Song đao) so với thực chiến; thứ hai, vì nhà phát triển Everstone Studio không công bố công khai mã nguồn công thức, các phương trình trong tài liệu dựa trên mô hình thực nghiệm cộng đồng đã kiểm chứng bằng cọc gỗ; thứ ba, các bảng số liệu công khai hiện chưa ghi nhận đầy đủ hệ số Kháng Phán Định vượt mốc Raid cấp 100 (85%) ở bậc trang bị 105–115 hay cơ chế chụp chỉ số (snapshot) của mọi hiệu ứng sát thương duy trì (DoT) — các khoảng trống này được ghi chú minh bạch ngay tại từng mục liên quan.

| Phần | Nội dung cốt lõi | Câu hỏi kỹ thuật được giải đáp |
| :---- | :---- | :---- |
| **Phần 1** | Cơ chế Roll Đòn Đánh (Two-Pool Engine) | Thứ tự kiểm tra Chính Xác, Hội Ý, Chí Mạng, Sượt; tại sao Hội Ý và Chí Mạng không kích hoạt đồng thời? |
| **Phần 2** | Kháng Phán Định, Số Trắng/Vàng & Trần Cứng | Công thức quy đổi số trắng sang số vàng theo cấp quái (0%–85%), trần 100/80/40% và chỉ số Trực Tiếp. |
| **Phần 3** | Công Thức Sát Thương Tổng & Các Biến Thể | Công thức đầy đủ cho Võ Học, Kỳ Thuật, DoT/Chảy Máu, Xử Quyết và Trị Liệu (Khiên Ty · Lâm). |
| **Phần 4** | Khu Nhân Sát Thương, Xuyên Giáp & Tràn Hội Ý | Cái nào cộng dồn, cái nào nhân độc lập; luật nửa hiệu suất của Xuyên Giáp; khi nào tăng Hội Ý làm **giảm DPS**? |
| **Phần 5** | Hệ Thống Ngũ Duy & Chỉ Số Chiến Đấu | Tỉ lệ quy đổi Kính/Mẫn/Thế/Thể/Ngự (phiên bản hiện hành), hiệu suất theo Kháng Phán Định, Thể Lực & Tinh Nguyên. |
| **Phần 6** | Trọng Số Chỉ Số & Hai Nghịch Lý Endgame | Phân tích toán học Ngoại công tối thiểu ngoại hệ > Ngoại công tối thiểu bản hệ, trọng số từng dòng vàng bậc 100 và meta Ngoại công tối thiểu lưu. |
| **Phần 7** | Quy Tắc Điều Luật, Chuyển Luật, Thừa Âm & Định Âm | 8 quy tắc tối ưu trang bị bậc 100–115, luật cấm 3 dòng thuộc tính và bẫy biểu tượng Đề Cử (👍). |
| **Phần 8** | Bài Toán Thực Chiến Từng Bước (Worked Examples) | Tính tay từ A đến Z sát thương Minh Kim · Ảnh và mô phỏng lượng hồi máu Khiên Ty · Lâm ở cấp Endgame Lv.100. |
| **Phần 9** | Ma Trận Lưu Phái (Lv.100–115) & PvE vs. PvP | Bảng chỉ số tốt nghiệp cho toàn bộ lưu phái (gồm Minh Kim · Đình, Khiên Ty · Dực, Phá Trúc · Tôn) và luật Chỉ Qua. |

## Phần 1: Cơ Chế Roll Đòn Đánh và Cây Quyết Định Hai Bể

![Sơ đồ Cây Quyết Định Roll Đòn Đánh Hai Bể (Two-Pool Engine)](/images/wwm/co-che-sat-thuong/image1.png)

Khác với nhiều game nhập vai hành động truyền thống có trạng thái đánh trượt hoàn toàn (Miss gây 0 sát thương), **Where Winds Meet không có khái niệm đánh trượt 0 sát thương ở khâu roll chỉ số**. Theo mô hình **Bàn Tròn Hai Bể (Two-Pool Round-Table)** được cộng đồng NGA, Gamersky và Reddit kiểm chứng qua các bài thử nghiệm cọc gỗ, mọi đòn đánh chạm trúng mục tiêu đều đi qua chuỗi phán định để kết thúc ở đúng một trong bốn trạng thái tương ứng với bốn màu chữ riêng biệt trên màn hình: **Hội Ý (Cam)**, **Chí Mạng (Vàng)**, **Đánh Thường (Trắng)** hoặc **Sượt (Xám)**.

*Hình 1: Quy trình Roll Đòn Đánh Hai Bể (Two-Pool Engine) phân định bốn loại sát thương loại trừ lẫn nhau. Hội Ý xuất hiện ở cả hai bể nên miễn nhiễm Chính Xác và ưu tiên chèn ép Chí Mạng khi tổng vượt 100%; Chuyển Đổi Sượt chỉ cứu đòn Xám về Đánh Thường màu Trắng.*

### Bốn loại kết quả sát thương và sai lệch hiển thị Tooltip cần lưu ý

Mỗi kết quả roll quy định đồng thời **cách chọn giá trị Công kích cơ bản** trong khoảng Min–Max của nhân vật và **hệ số nhân Chí Mạng/Hội Ý**. Người chơi đọc tài liệu đa ngôn ngữ cần đặc biệt chú ý sự chênh lệch giữa mô tả văn bản (tooltip) cũ và thực chiến: một số wiki tiếng Anh (như Fextralife, blog allthings.how) ghi Chí Mạng +35% và Hội Ý +20%, trong khi wiki bản Trung Quốc thời kỳ đầu (GameKee, Baidu) ghi Chí Mạng +40% và Hội Ý +25%. Tuy nhiên, loạt thử nghiệm thực tế trên cọc gỗ tại cả máy chủ Trung Quốc, Đài Loan và Quốc tế giai đoạn 2025–2026 đều cho thấy **mức nhân cơ bản thực chiến là 1.50x (+50%) cho Chí Mạng và 1.35x (+35%) cho Hội Ý**. Riêng trang tính toán cộng đồng wherewindsmeet.th.gl ghi biên độ mở rộng theo chỉ số tăng sát thương Chí Mạng/Hội Ý là 135%–250% (Chí Mạng) và 120%–230% (Hội Ý), phản ánh mức sàn của phiên bản/tooltip cũ đi kèm mức trần cao nhất khi cộng dồn tối đa.

| Loại đòn & Màu chữ | Điều kiện & Cách lấy Công gốc | Hệ số thực chiến & Biên độ | Đặc điểm & Lưu ý cơ chế |
| :---- | :---- | :---- | :---- |
| **Hội Ý — Cam** (Affinity / 会意) | Độc lập với Chính Xác (kích được ở cả 2 bể). **Cố định Công Tối Đa** (trừ khi Min > Max). | **1.35x (+35%)** *(tooltip/wiki cũ ghi 20–25%)*. Biên độ: 120%–230% *(theo th.gl)*. | Ưu tiên số 1; chèn ép Chí Mạng nếu tổng vượt 100%. |
| **Chí Mạng — Vàng** (Crit / Critical / 会心) | **Bắt buộc** vượt qua Cổng Chính Xác. Ngẫu nhiên đều trong khoảng **[Min, Max]**. | **1.50x (+50%)** *(tooltip/wiki cũ ghi 35–40%)*. Biên độ: 135%–250% *(theo th.gl)*. | Loại chí mạng duy nhất áp dụng cho Trị Liệu (+50%). |
| **Đánh Thường — Trắng** (Normal / 普通) | Đạt Chính Xác nhưng trượt cả Hội Ý lẫn Chí Mạng (hoặc được cứu từ Sượt). Ngẫu nhiên đều trong **[Min, Max]**. | **1.00x (+0%)** *(không đổi)*. | Đóng vai trò "ô lấp đầy" (filler); về 0% nếu Chính Xác 100% và Hội Ý + Chí Mạng ≥ 100%. |
| **Sượt / Xước — Xám** (Abrasion / 擦伤) | Trượt Chính Xác, trượt Hội Ý và trượt Chuyển Đổi Sượt. **Cố định Công Tối Thiểu**. | **1.00x (+0%)** *(không đổi)*. | Không thể Chí Mạng; càng về Endgame khoảng Min–Max càng rộng nên Sượt phạt DPS rất nặng. |

### Hệ phương trình xác suất và giải mã các tranh luận cộng đồng

Gọi P ∈ [0.05, 1.00] là Tỉ lệ Chính Xác thực tế sau Kháng Phán Định (theo công cụ cộng đồng wherewindsmeet.th.gl, sàn Chính Xác không bao giờ rơi xuống dưới 5%), C\_eff là Tỉ lệ Chí Mạng thực tế cuối cùng, A\_eff là Tỉ lệ Hội Ý thực tế cuối cùng, và K ∈ [0, 1] là Tỉ lệ Chuyển Đổi Sượt (Abrasion Conversion Rate). Theo mô hình Bàn Tròn Hai Bể tổng hợp từ các thực nghiệm trên NGA, 233Leyuan, Reddit và wherewindsmeet.th.gl, xác suất thực tế của bốn kết quả đòn đánh tuân theo bốn phương trình sau:

* **P(Hội Ý)** = A\_eff
* **P(Chí Mạng)** = P × min(C\_eff, 1 − A\_eff)
* **P(Sượt)** = (1 − P) × (1 − A\_eff) × (1 − K)
* **P(Đánh Thường)** = P × max(0, 1 − A\_eff − C\_eff) + (1 − P) × (1 − A\_eff) × K

Về mặt toán học, việc hệ thống kiểm tra **Chính Xác trước rồi chia hai bể có cùng tỉ lệ Hội Ý** hay kiểm tra **Hội Ý trước rồi mới kiểm tra Chính Xác và Chí Mạng** (trong khuôn khổ bàn tròn tổng 100%) đều dẫn tới **cùng một bộ xác suất đầu ra** — đó là lý do cộng đồng từng tranh cãi về thứ tự dòng lệnh trong mã nguồn nhưng vẫn thu được con số thực nghiệm khớp nhau. Khi kiểm tra bằng bộ thông số mẫu của wherewindsmeet.th.gl (P = 85%, C\_eff = 20%, A\_eff = 8%, K = 0%), hệ phương trình cho ra chính xác Hội Ý 8.00%, Chí Mạng 17.00%, Sượt 13.80% và Đánh Thường 61.20%. Tương tự, trong thực nghiệm tháo trang bị Chính Xác được người chơi đăng tải trên 233Leyuan, khi Chính Xác giảm từ 100% xuống 95.7%, Chí Mạng thực tế giảm tương ứng từ 84.45% xuống 80.82% (0.957 × 84.45% = 80.82%), trong khi Hội Ý giữ nguyên bất biến ở 9.86%. Đối với các kỹ năng đa đoạn (multi-hit), **từng nhát sát thương trong chuỗi chiêu được roll độc lập** theo cơ chế này.

Hệ thống phương trình và dữ liệu thực nghiệm trên giúp làm rõ bốn tranh luận phổ biến trong cộng đồng. Thứ nhất, dù một số bài viết tiếng Anh (như blog allthings.how) từng cho rằng một đòn đánh có thể đồng thời kích hoạt cả Hội Ý lẫn Chí Mạng, các thử nghiệm đánh thường nhiều lần lên cọc gỗ trên Reddit và NGA cho thấy hai trạng thái này loại trừ nhau: không ghi nhận số sát thương vàng nào vượt quá trần 1.5x Công Tối Đa. Thứ hai, trái ngược với giả thuyết roll hai xúc xắc độc lập từng xuất hiện trên một số diễn đàn (nơi tổng Hội Ý + Chí Mạng ≥ 100% vẫn tạo ra số Trắng theo công thức (1 − A)(1 − C)), thử nghiệm thực tế ghi nhận trên NGA, Gamersky và Bahamut xác nhận rằng khi Chính Xác đạt 100% và A\_eff + C\_eff ≥ 100%, số Trắng giảm về đúng 0%. Thứ ba, **Chuyển Đổi Sượt (100% ở một số thiên phú Đấu Trường) không thể thay thế Chính Xác**: nó chỉ can thiệp sau khi đòn đánh đã rơi vào ô Sượt để nâng cấp đòn Xám thành Đánh Thường màu Trắng, hoàn toàn không đưa đòn đánh quay lại nhánh Chí Mạng. Cuối cùng, **biểu đồ tròn tổng kết cuối phó bản phản ánh tỉ trọng sát thương (Damage Share %), không phải tần suất số lần kích hoạt (Hit Count %)**; chỉ một đòn bùng nổ cực lớn nổ Hội Ý xen giữa hàng chục đòn đánh thường cũng có thể kéo tỉ trọng Hội Ý trên biểu đồ lên khoảng 45% dù tần suất nổ thực tế chỉ quanh 6.7%.

## Phần 2: Kháng Phán Định, Số Trắng vs. Số Vàng và Trần Cứng Tam Suất

Trong bảng Chi tiết nhân vật (Character Details), ba chỉ số **Tam Suất (三率: Chính Xác, Chí Mạng, Hội Ý)** luôn hiển thị hai giá trị song song: một con số **chữ Trắng** (chỉ số thô cộng dồn từ trang bị, Ngũ Duy, tâm pháp, thiên phú) và một con số **chữ Vàng/Cam** (chỉ số hiệu lực thực tế áp lên mục tiêu cùng cấp). Khoảng chênh lệch này xuất phát từ cơ chế **Kháng Phán Định (Judgment Resistance / 判定抗性)** nhằm kiềm chế lạm phát Chí Mạng/Hội Ý khi đối đầu quái vật từ cấp 81 trở lên.

### Công thức chuyển đổi Số Trắng sang Số Vàng và cơ chế Chỉ số Trực Tiếp

Gọi R là hệ số Kháng Phán Định của mục tiêu (0 ở cấp 80 trở xuống và tăng dần theo bậc đột phá). Cộng đồng phân tích trên Reddit, 17173 và các bộ máy tính DPS xác nhận quy tắc chuyển đổi tuân theo **phép chia cho (1 + R)** chứ không phải phép nhân với (1 − R):

* **P\_eff** = min(100%, 65% + (P\_raw − 65%) / (1 + R))
* **C\_eff** = min(80%, C\_raw / (1 + R)) + C\_direct
* **A\_eff** = min(40%, A\_raw / (1 + R)) + A\_direct

Cơ chế này chứa ba quy luật vận hành then chốt ảnh hưởng trực tiếp tới cách build đồ Endgame. Trước hết, **ngưỡng nền 65% của Chính Xác được miễn nhiễm Kháng Phán Định**: hệ thống chỉ lấy phần Chính Xác cộng thêm vượt mốc 65% chia cho (1 + R) rồi cộng lại vào 65%. Chẳng hạn tại mốc kháng 65% (hệ số chia 1.65), 98% Chính Xác trắng sẽ chuyển thành 65% + (98% − 65%) / 1.65 = 85.00% Chính Xác vàng. Kế đến, **trần cứng (Hard Cap) của Tam Suất chữ Vàng bị khóa chặt tại 100% Chính Xác, 80% Chí Mạng và 40% Hội Ý** — mọi điểm số trắng dôi dư sau khi chia (1 + R) vượt qua ba ngưỡng này đều bị cắt bỏ không mang lại lợi ích. Cuối cùng, hai chỉ số đặc biệt là **Chí Mạng Trực Tiếp (Direct Crit)** và **Hội Ý Trực Tiếp (Direct Affinity)** — thường đến từ tâm pháp như Dịch Thủy Ca tầng 5 (+4.6% Chí Mạng Trực Tiếp) hay Ngưng Thần Chương tầng 3 (+1.5%–3.0% Hội Ý Trực Tiếp) — **xuyên qua hoàn toàn Kháng Phán Định lẫn trần vàng 80%/40%**. Theo tổng hợp từ wiki cộng đồng GameKee và wherewindsmeetcalculator.com, giới hạn riêng của Chí Mạng Trực Tiếp là +20% (mức tối đa lý thuyết 100%) và Hội Ý Trực Tiếp là +10% (mức tối đa lý thuyết 50%).

![Biểu đồ tổng chỉ số Chữ Trắng cần tích lũy để chạm trần Chữ Vàng](/images/wwm/co-che-sat-thuong/image2.png)

![Biểu đồ phân bổ xác suất đòn đánh thực tế theo 4 kịch bản chiến đấu](/images/wwm/co-che-sat-thuong/image3.png)
*Hình 2: Tổng chỉ số Chữ Trắng bắt buộc phải tích lũy để chạm trần Chữ Vàng (100% Chính Xác, 80% Chí Mạng, 40% Hội Ý) qua 6 bậc Kháng Phán Định. Tại Raid cấp 100 (kháng 85%), cần tới 148% Chí Mạng trắng và 129.75% Chính Xác trắng.*

### Bảng tra cứu ngưỡng Kháng Phán Định và "Cái Bẫy Trần Ẩn"

Bảng dưới đây tổng hợp các mốc Kháng Phán Định đã được cộng đồng kiểm chứng đến giai đoạn Raid cấp 100 (Đột phá 18–20). Dù máy chủ Trung Quốc đã mở đến bậc trang bị 105–115 vào cuối năm 2026, các tài liệu công khai hiện chưa trích xuất đầy đủ bảng hệ số chia vượt quá mốc 1.85; khi đối đầu phó bản mới hơn, người chơi nên theo dõi trực tiếp dòng chữ Vàng đã quy đổi sẵn trong bảng Chi tiết nhân vật.

| Bậc cấp độ / Phụ bản | Kháng R (Hệ số chia) | Chính Xác Trắng (100% Vàng) | Chí Mạng / Hội Ý Trắng (80% / 40% Vàng) | Ví dụ thực nghiệm đối chiếu |
| :---- | :---- | :---- | :---- | :---- |
| **≤ Lv.80 (BT ≤ 11)** | 0% (÷ 1.00) | 100.00% | 80.00% / 40.00% | Không bị khấu trừ kháng |
| **Lv.81–85 (BT 12)** | 15% (÷ 1.15) | 105.25% | 92.00% / 46.00% | 80.4% Chí Mạng trắng → 69.9% vàng *(Bahamut)* |
| **Lv.86–90 (BT 13–14)** | 30% (÷ 1.30) | 110.50% | 104.00% / 52.00% | Tăng thêm 15% kháng mỗi 5 cấp |
| **Lv.91–95 (BT 15)** | 45% (÷ 1.45) | 115.75% | 116.00% / 58.00% | 43.4% Hội Ý trắng → 29.9% vàng; 100% trắng → 69.0% vàng |
| **Lv.96–100 Chuẩn (BT 16–18)** | 65% (÷ 1.65) | 122.75% | 132.00% / 66.00% | 98.0% Chính Xác trắng → 85.0% vàng; 57% Hội Ý → 34.5% vàng |
| **Lv.100 Raid Endgame (Compass Divide / BT 18–20)** | 85% (÷ 1.85) | 129.75% | 148.00% / 74.00% | Khớp với ngưỡng tràn 148% Chí Mạng / 74% Hội Ý trên Gamersky |

Một sai lầm rất tốn kém khi điều luật trang bị là **Cái Bẫy Trần Ẩn (Hidden Cap Trap)**: nhiều người nhầm tưởng các buff Chí Mạng từ thiên phú võ học hay trạng thái chiến đấu được cộng vượt trần 80%, nhưng thực tế chúng lại **chiếm trực tiếp vào hạn mức trần 80% chữ Vàng**. Điển hình nhất là **Phá Trúc · Phong (Song đao — Nê Lê Tam Cấu)**: trạng thái Đao Đỏ (Nghiệp Hỏa) tự cộng +10% Chí Mạng tính chung vào trần 80%, nên bảng tĩnh chỉ nên dừng quanh 70% Chí Mạng chữ Vàng. Tương tự, với **Minh Kim · Hồng (Vô Danh Kiếm)** khi mang Dịch Thủy Ca (+4.6% Chí Mạng Trực Tiếp), Thiên Sơn Pháp (+2.3%–3% Hội Ý Trực Tiếp) và bộ Ngọc Đẩu (+7.5% Hội Ý), hướng dẫn Gamersky tính ra mức Chí Mạng chữ Vàng tối ưu chỉ dừng ở 38%–45.6% (tức không vượt 84.4% chữ Trắng ở kháng 85%) để tránh tràn khi cộng với 40% Hội Ý. Riêng với **Liệt Thạch · Uy (Đao Mạc — Ta Phu Đao Pháp)**, trong các bản cập nhật trước tháng 06/2026, thiên phú cấp tối đa từng ngầm cộng +8.5% Chí Mạng chung và +15% Chí Mạng tụ lực (tổng gần 24% tính vào trần 80%), khiến bảng tĩnh chỉ cần 56%–56.5% Chí Mạng vàng và 15.4% Hội Ý vàng; tuy nhiên, **bản vá cân bằng chính thức ngày 12/06/2026 đã làm lại thiên phú "Tăng Chí Mạng" theo Thể/Kính của Ta Phu Đao Pháp thành "Tăng Ngoại Công" (tăng Đại Ngoại Công)**, nên người chơi Đao Mạc ở phiên bản mới cần kiểm tra lại tổng Chí Mạng ẩn trong bảng võ học hiện tại thay vì rập khuôn mốc cũ 56%.

## Phần 3: Công Thức Sát Thương Tổng và Các Biến Thể Chiến Đấu

Sát thương của một chiêu thức trong Where Winds Meet không gộp Ngoại Công và Thuộc Tính thành một biến số đơn lẻ mà chạy theo **cấu trúc Ba Đường Ray song song**, cộng tổng lại thành Sát thương Cơ bản rồi nhân với chuỗi Khu Nhân Độc Lập bên ngoài.

### Công thức tổng quát cho Kỹ năng Vũ khí và Kỳ Thuật

* **Final DMG** = (Base\_Phys + Base\_MainAttr + ∑ Base\_OffAttr,i) × M\_Crit/Aff × M\_GenDMG × M\_HP\_DMG × M\_Dingyin × M\_Special × M\_DR

Đường ray đầu tiên là **Sát thương Ngoại Công (Physical Track)**, trong đó Phòng thủ Ngoại Công của mục tiêu trừ thẳng vào Ngoại Công của người chơi theo phép trừ tuyến tính, nhưng theo mô hình của wherewindsmeet.th.gl, phần hiệu số này không bao giờ giảm thấp hơn **sàn bảo hộ 10% Tiểu Ngoại Công**. Đáng chú ý, hệ số **Xuyên Ngoại Công (M\_Pen\_Phys) nhân lên cả khoản Sát thương Cố định (FlatDMG)** của kỹ năng:

* **Base\_Phys** = [max(ATK\_Phys − DEF\_Target, 0.10 × ATK\_Phys\_Min) × k\_Phys + FlatDMG] × M\_Pen\_Phys × (1 + Amp\_Phys)

Đường ray thứ hai là **Sát thương Thuộc Tính Bản Hệ + Vô Tướng (Main Path & Formless Track)**. Khi mở khóa thiên phú võ học tầng 3, thuộc tính trùng hệ với vũ khí đang cầm (Minh Kim, Liệt Thạch, Khiên Ty hoặc Phá Trúc) hưởng **bội số 1.5x (+50%)** so với bội số Ngoại Công (mô tả kỹ năng trong game thường đã nhân sẵn tỉ lệ này, ví dụ 50% Ngoại Công đi kèm 75% Thuộc Tính). Thuộc tính thích ứng **Vô Tướng (Formless / 无相)** xuất hiện từ trang bị bậc 96 trở lên không quyết toán riêng mà gộp thẳng vào Thuộc Tính Bản Hệ của vũ khí đang cầm, hưởng trọn bội số 1.5x, Xuyên và Khuếch đại bản hệ (tương tự với Xuyên Vô Tướng). Ngoài ra, các kỹ năng vũ khí có một khoản **Thuộc tính ẩn (HiddenAttr)** cộng thẳng — thử nghiệm cộng đồng trên Gamersky đo được +80 điểm tại mốc Đại Thế Giới cấp 9 + Võ Học cấp 70 — trong khi **Kỳ thuật (Mystic Skill / 奇术) không được hưởng khoản thuộc tính ẩn này**:

* **Base\_MainAttr** = [(ATK\_Main + ATK\_Formless + HiddenAttr) × (1.5 × k\_Phys)] × M\_Pen\_Main × (1 + Amp\_Main)

Đường ray thứ ba là **Sát thương Thuộc Tính Ngoại Hệ (Off-Path Attribute Tracks)**. Trái ngược với nhận định sai ở một số hướng dẫn tân thủ đời đầu (như bài tổng hợp sớm trên GameKee từng cho rằng thuộc tính khác hệ vô tác dụng), các bài test thực nghiệm trên Gamersky, Bahamut và Reddit xác nhận **cả ba thuộc tính khác hệ vẫn gây sát thương trên mọi đòn tấn công** ở bội số 1.0x và dùng Xuyên/Kháng riêng của từng hệ:

* **Base\_OffAttr,i** = (ATK\_Off,i × 1.0 × k\_Phys) × M\_Pen\_Off,i × (1 + Amp\_Off,i)

### Ba biến thể công thức đặc biệt: DoT, Xử Quyết và Trị Liệu

| Cơ chế đặc biệt | Điểm khác biệt cốt lõi so với Công thức Tiêu chuẩn | Quy tắc & Cập nhật quan trọng (tính đến cuối năm 2026) |
| :---- | :---- | :---- |
| **Sát thương Duy trì (DoT / Chảy Máu / Bạo Nhiên / Độc)** | Theo mô hình PvE giải ngược trên Gamersky và wherewindsmeetcalculator.com, DoT tiêu chuẩn **loại bỏ FlatDMG và bội số +50% (1.5x)** của Thuộc Tính Bản Hệ (chạy ở 1.0x). | DoT không kích hoạt nội tại đòn đánh trực tiếp như Cực Lạc Khấp Huyết, Sở Hận Niên Niên, Ngưng Thần Chương. Ngoại lệ quan trọng: lỗi Chảy Máu/Huyết Bạo Cửu Kiếm không ăn thêm thưởng Minh Kim đã được sửa từ 06/2025, và các bản vá 06/2026–10/2026 tiếp tục tăng hệ số công kích cho Chảy Máu Cửu Kiếm (+4% sau đột phá cấp 18), đồng bộ sát thương Chân Khí của mọi DoT, đồng thời thêm nhánh **Ám Chước (Dark Scorching)** cho Thần Long Thổ Hỏa để nhiều người phun lửa cùng lúc trong Raid không đè mất DoT của nhau. Giới hạn dữ liệu: Chưa có bộ test công khai xác nhận mọi DoT chụp chỉ số (snapshot) lúc gắn hay cập nhật động (dynamic) theo từng nhịp; riêng cơ chế nổ Huyết Bạo (tầng ảo thứ 6 của Cửu Kiếm) xét các debuff như Kinh Thần (+50% thương chảy máu) và Cường Giang Lưu tại thời điểm kích nổ. |
| **Khí Kiệt & Xử Quyết (Qi Exhaustion & Execution)** | Khi thanh Chân Khí về 0, mục tiêu rơi vào **Khí Kiệt**: nhận thêm +10% sát thương cơ bản (tối đa +40% nếu đầy thiên phú phó bản). | Thời lượng Khí Kiệt: cố định **10 giây** ở Boss phó bản nhiều người (không thể kéo dài), và **7 giây** ở Boss đơn/thế giới (Tán/Ô Trị Liệu giữ R tích lực kéo dài thêm 3 giây một lần). Bản vá chính thức tháng 08/2026 **điều chỉnh cấu trúc sát thương Xử Quyết** từ cố định 14% Máu Tối Đa thành **400% Ngoại Công + 10% Máu Tối Đa** (kỹ năng theo % máu giảm tỉ lệ trên Boss/tiểu Boss). Nguyên tắc tối ưu: luôn xả trọn combo kỳ thuật (Thái Bạch Túy Nguyệt, v.v.) suốt cửa sổ Khí Kiệt rồi mới bấm Xử Quyết ở giây cuối vì Xử Quyết hồi đầy ngay thanh Chân Khí Boss. |
| **Trị Liệu (Healing — Khiên Ty · Lâm / Vũ)** | **Không chịu tác động của Chính Xác, Sượt và Hội Ý** (mặc định Chính Xác 100%, chỉ roll **Chí Mạng +50%** hoặc Thường). Không trừ Phòng Thủ mục tiêu. | Chỉ tính **Ngoại Công** và **Thuộc Tính Khiên Ty / Vô Tướng**; toàn bộ thuộc tính Ngoại Hệ cho **đúng 0 giá trị**. Theo tổng hợp thử nghiệm trên Qieyou và thực hành Định âm của cộng đồng, **Xuyên Ngoại Công có tác dụng lên Trị Liệu** (cứ 1 điểm tràn Xuyên tăng +0.5% cả sát thương lẫn lượng hồi máu). Lượng hồi máu có thêm biên độ dao động ngẫu nhiên độc lập ±10%; phó bản cấp thấp có thêm +100% buff hồi máu trong khu chung, còn PvP Chỉ Qua áp mức **giảm trị liệu 90%**. |

## Phần 4: Khu Nhân Sát Thương, Quy Luật Xuyên Giáp và Biên Giới Tràn Hội Ý

Phân biệt rạch ròi giữa các khu **Cộng dồn (Additive — bị pha loãng)** và **Nhân độc lập (Multiplicative — không bị pha loãng)** giải thích vì sao một dòng Định Âm +7% hay Xuyên Ngoại Công +12.8 thường mang lại mức tăng DPS vượt xa nhiều nguồn tăng % sát thương khác trong Raid.

### Bản đồ toàn bộ các Khu Nhân Sát Thương (Multiplier Buckets)

| Khu nhân (Bucket) | Cơ chế gộp bên trong | Thành phần thuộc khu | Ghi chú thực nghiệm & Lưu ý pha loãng |
| :---- | :---- | :---- | :---- |
| **1. Khu Công Kích & Bội Số** | Cộng trong từng đường ray | Ngoại Công (trừ DEF), Flat DMG, Thuộc Tính Bản Hệ (×1.5) + Vô Tướng + Ẩn, Ngoại Hệ (×1.0) | Tạo nền Sát thương Cơ bản; bị trừ tuyến tính bởi DEF mục tiêu. |
| **2. Khu Xuyên Giáp / Kháng** | Nhân độc lập theo từng đường ray | Xuyên Ngoại Công vs. Kháng Ngoại Công; Xuyên Thuộc Tính vs. Kháng Thuộc Tính | Vận hành theo đường bẻ gãy 2 độ dốc (-1.0%/điểm vs. +0.5%/điểm). |
| **3. Khu Khuếch Đại Đường Ray (Deepening)** | Nhân độc lập theo từng đường ray | Thiên phú Võ Học tăng % Sát thương Ngoại Công hoặc % Sát thương Thuộc Tính | Nhân riêng cho đường ray tương ứng, không pha loãng với Khu Tăng Thương Chung. |
| **4. Khu Chí Mạng / Hội Ý** | Độc lập với Tăng Thương Chung; cộng dồn nội bộ | Chí Mạng: 1 + 0.50 + Bonus\_Crit; Hội Ý: 1 + 0.35 + Bonus\_Aff | Giá trị rất cao trong Raid 10 người khi Khu Tăng Thương Chung bị pha loãng nặng. |
| **5. Khu Tăng Thương Chung & Dị Thương** | **CỘNG DỒN (Additive)** | Tăng thương Võ học Vũ khí (+5%), Toàn Võ Học (+2.5%), **Thủ Lĩnh Tăng Thương (+2.5%)**, Dịch Thủy Ca (+5%), Uy Mãnh Ca, Đoạn Thạch (+25%+), Thương Q Giang Lưu (+25%), Khí Kiệt (+10–40%), Chân Khí Thất Hành (gộp chung khu với tăng thương cơ chế từ bản vá 06/2026), Dị Thương (Vulnerability), Set Yến Quy (+10%) | **Đính chính tranh luận cộng đồng**: Dù từng có bài viết trên 17173 đồn đoán Thủ Lĩnh Tăng Thương là khu nhân độc lập, thử nghiệm đối chứng chặt chẽ trên Hoành Đao / Đường Đao (Set A 17,222 vs. Set B 16,811 sát thương) chỉ ra **Thủ Lĩnh Tăng Thương cộng dồn chung** với Dịch Thủy Ca và kỹ năng vũ khí; nó vẫn đạt hạng T0 vì các phái sở hữu Khu Sát Thương Khí Huyết độc lập chịu ít pha loãng ở khu này. |
| **6. Khu Sát Thương Khí Huyết (Non-Player HP DMG)** | **Độc lập** với Khu 5; cộng dồn nội bộ | Nội tại "tăng % sát thương Khí Huyết lên mục tiêu không phải người chơi" (VD: Sương Thiên Bạch Dạ 20% — bản vá 05/2026 tăng lên 36% — cộng dồn với Phi Hồng Đạp Tuyết 12%) | Thử nghiệm Hoành Đao (Đường Đao) đối chứng chỉ ra khu này tách rời hoàn toàn khỏi Thủ Lĩnh Tăng Thương và Tăng thương Võ học. |
| **7. Khu Định Âm (Dingyin / Attuning)** | **NHÂN ĐỘC LẬP** | 4 dòng Định âm bên giáp phải (VD: 4 món × +7% = +28% sát thương kỹ năng tụ lực / chảy máu / kỹ năng chủ lực) | Không bị pha loãng bởi buff đồng đội hay Khí Kiệt — bắt buộc ưu tiên đúng kỹ năng chủ lực. |
| **8. Khu Đặc Biệt (Special Independent)** | **NHÂN ĐỘC LẬP** | Rất hiếm — kiểm chứng rõ nhất là Thằng Phiêu Cừu Sát Lệnh / Nê Ngư 3 (Rope Dart Vendetta) | Nhân ngoài cùng sau mọi khu khác. |
| **9. Khu Giảm Thương (Damage Reduction)** | **Còn khác biệt theo nhóm nguồn** | Buff tự giảm thương bản thân, Debuff giảm công Boss, Giảm thương Đỡ Đòn (Block) | Các bộ tính toán cộng đồng (wherewindsmeetcalculator.com, Reddit) mô hình hóa giảm thương tổng quát theo phép **nhân**: ∏(1 − DR\_i). Tuy nhiên, loạt thử nghiệm thực tế ở Thế Giới Đơn trên Sohu và 17173 (Bát Phương Thương 20% + Bàn Thạch Quyết 20% giảm sát thương từ 1,510 → 920 và 13,985 → 8,191, tức xấp xỉ 40%) cho thấy **các buff Tự Giảm Thương cộng dồn tuyến tính** (có thể chạm 70–100% ở chế độ Đơn), sau đó mới **nhân riêng** với debuff giảm sát thương Boss (-20%) và tỉ lệ Đỡ Đòn từng vũ khí (Đao Mạc 90%, Tán/Ô 80%, Kiếm/Thương/Song đao 60%, Thằng Phiêu 50%, Phiến/Quạt 45%). |

### Quy luật Xuyên Giáp vs. Kháng và Biên giới Pha "Tràn Hội Ý"

Xuyên Giáp (Pen) và Kháng (Res) triệt tiêu nhau trực tiếp theo hiệu số Δ = Pen − Res, nhưng **độ dốc hiệu suất bị bẻ gãy chính xác tại điểm triệt tiêu Δ = 0**:

* **Nếu Pen ≤ Res:** M\_Pen = 1 + (Pen − Res) / 100 *(mỗi điểm chênh lệch ăn 1.0% sát thương)*
* **Nếu Pen > Res:** M\_Pen = 1 + (Pen − Res) / 200 *(phần tràn Xuyên chỉ còn nửa hiệu suất: 0.5%/điểm)*

Cần đặc biệt cẩn trọng trước một lỗi sao chép phổ biến: trang wiki tiếng Anh wherewindsmeetcalculator.com và một bản dịch Reddit từng **ghi đảo ngược điều kiện** (<= 0: /200, > 0: /100). Đối chiếu với toàn bộ thử nghiệm gốc trên máy chủ Trung Quốc (17173, Gamersky, Qieyou, Sohu) cho thấy quy luật thực tế hoàn toàn nhất quán: **5 Xuyên đánh vào 10 Kháng gây 95% sát thương** (thiếu 5 xuyên mất 5%, tức 1.0%/điểm), trong khi **30 Xuyên đánh vào 10 Kháng gây 110% sát thương** (tràn 20 xuyên nhận 20 / 200 = +10%, tức 0.5%/điểm). Trên Boss Raid PvE vốn có Kháng gần bằng 0, Xuyên Giáp luôn hoạt động trong vùng tràn 1 + Pen / 200 (4 dòng Định Âm Xuyên Ngoại Công bậc 100 đạt 51.2 điểm mang lại +25.60% khuếch đại độc lập cho đường ray Ngoại Công). Ngược lại, trong PvP khi đối thủ có Kháng vượt Xuyên, mỗi điểm Kháng dư cắt tới 1.0% sát thương — gấp đôi hiệu suất của 1 điểm Xuyên tràn.

Tương tự tính chất phi tuyến của Xuyên Giáp, cơ chế Hội Ý ưu tiên chèn ép Chí Mạng (Phần 1) tạo ra một **biên giới pha quan trọng trên các lưu phái Chí Mạng**: khi đã đạt bão hòa (Chính Xác = 100%, Chí Mạng + Hội Ý ≥ 100%), mỗi +1% Hội Ý thêm vào sẽ cướp đi đúng 1% đòn Chí Mạng. Đặt r = Base\_Min / Base\_Max là tỉ lệ Sàn/Trần Sát thương Cơ bản. Điều kiện toán học để **đòn Chí Mạng trung bình mạnh hơn đòn Hội Ý** là:

* **((r + 1) / 2) × (1 + D\_crit) > (1 + D\_aff)  ⇔  r > r\* = 2(1 + D\_aff) / (1 + D\_crit) − 1**

![Động học phi tuyến của Xuyên Giáp vs Kháng và Tràn Hội Ý](/images/wwm/co-che-sat-thuong/image4.png)
*Hình 3: Động học phi tuyến của Xuyên Giáp vs. Kháng (-1.0%/điểm khi thiếu xuyên, +0.5%/điểm khi tràn xuyên) và mức sụt giảm DPS kỳ vọng khi Tràn Hội Ý vượt ngưỡng bão hòa 12% trên phái Chí Mạng.*

Bất cứ khi nào tỉ lệ r của nhân vật vượt ngưỡng pha r\*, **mọi điểm Hội Ý vượt quá phần trống (100% − C\_eff) đều gây ra lợi nhuận DPS ÂM**. Mô phỏng trên mô hình Raid cấp 100 chuẩn với build Chí Mạng có tổng Sát thương Chí Mạng +85% (1.85x) và Hội Ý cơ bản +35% (1.35x) cho thấy ngưỡng pha hạ xuống chỉ còn r\* = 45.9%: ngay cả build Đại Ngoại Chí Mạng chuẩn (r ≈ 47.8%) cũng bắt đầu mất nhẹ -0.35% DPS khi đẩy Hội Ý từ 12% lên 40%, còn build **Ngoại công tối thiểu lưu** (r ≈ 81.6%) lao dốc mất tới **-5.63% DPS kỳ vọng** vì đòn Hội Ý (39,017) yếu hơn rõ rệt so với đòn Chí Mạng trung bình (48,544).

Bảng dưới đây cho phép bạn tra nhanh ngưỡng pha r\* theo cặp hệ số Chí Mạng/Hội Ý thực tế của nhân vật: chỉ cần ước lượng tỉ lệ Base\_Min / Base\_Max (xấp xỉ Tiểu Ngoại / Đại Ngoại), nếu lớn hơn giá trị trong ô tương ứng thì tràn Hội Ý sẽ làm giảm sát thương kỳ vọng.

| ST Chí Mạng (1 + D\_crit) | Hội Ý +35% | Hội Ý +45% | Hội Ý +55% | Hội Ý +65% |
| :---- | :---- | :---- | :---- | :---- |
| **+50% (1.50x — Cơ bản)** | 80.0% | 93.3% | >100% (Hội Ý luôn cao hơn) | >100% (Hội Ý luôn cao hơn) |
| **+60% (1.60x)** | 68.8% | 81.2% | 93.8% | >100% (Hội Ý luôn cao hơn) |
| **+70% (1.70x)** | 58.8% | 70.6% | 82.4% | 94.1% |
| **+80% (1.80x)** | 50.0% | 61.1% | 72.2% | 83.3% |
| **+90% (1.90x)** | 42.1% | 52.6% | 63.2% | 73.7% |
| **+100% (2.00x)** | 35.0% | 45.0% | 55.0% | 65.0% |

## Phần 5: Hệ Thống Ngũ Duy và Toàn Bộ Chỉ Số Chiến Đấu

Hệ thống chỉ số nền tảng của nhân vật xoay quanh **Ngũ Duy (五维)**: **Thể (Body)**, **Ngự (Defense)**, **Kính (Power)**, **Mẫn (Agility)** và **Thế (Momentum)**. Một nguyên tắc quan trọng khi phối đồ là **chỉ số của cả Vũ khí Chính và Vũ khí Phụ đều cộng dồn 100% đồng thời vào bảng thuộc tính nhân vật**. Bên cạnh tỉ lệ quy đổi trực tiếp sang Công, Máu và Chí Mạng/Hội Ý, các nhánh võ học còn đặt mốc yêu cầu Ngũ Duy để mở hết thiên phú tăng sát thương (chẳng hạn Vũ Tấu Yêu Cổ của nhánh Khiên Ty · Dực yêu cầu tối đa 462 Mẫn để ăn trọn thưởng Tiểu Ngoại Công).

### Tỉ lệ quy đổi Ngũ Duy và biến thiên theo Kháng Phán Định

Hệ số quy đổi Ngũ Duy từng được điều chỉnh nhẹ giữa phiên bản đầu (cấp 60–70) và giai đoạn bậc 96–100+ hiện hành. Vì phần Chí Mạng từ **Mẫn** và Hội Ý từ **Thế** đều là **chỉ số chữ Trắng (Raw)**, hiệu suất thực tế của chúng bị thu nhỏ bởi hệ số chia (1 + R) khi đánh Boss Endgame.

| Ngũ Duy | Quy đổi hiện hành Lv.96–100+ *(và bản đầu Lv.60–70)* | 100 điểm tại Kháng 0% | 100 điểm tại Raid Lv.100 (R = 85%) | Vai trò ưu tiên |
| :---- | :---- | :---- | :---- | :---- |
| **Kính** (Power / 劲) | 0.225 Tiểu Ngoại + 1.36 Đại Ngoại *(bản đầu: 0.17 / 1.41 hoặc 0.246 / 1.315)* | +22.5 Tiểu + +136.0 Đại Ngoại | +22.5 Tiểu + +136.0 Đại Ngoại *(miễn kháng)* | T0/T1 cho hầu hết phái Đại Ngoại & Hội Ý |
| **Thế** (Momentum / 势) | 0.9 Đại Ngoại + 0.038% Hội Ý Trắng *(bản đầu: 0.9 Đại + 0.035% hoặc 0.04%)* | +90.0 Đại + +3.80% Hội Ý | +90.0 Đại + **+2.05%** Hội Ý vàng | Chỉ số chủ lực phái Hội Ý (Minh Kim) khi chưa chạm trần 40% |
| **Mẫn** (Agility / 敏) | 0.9 Tiểu Ngoại + 0.076% Chí Mạng Trắng *(bản đầu: 0.9 Tiểu + 0.081% hoặc 1.0 / 0.075%)* | +90.0 Tiểu + +7.60% Chí Mạng | +90.0 Tiểu + **+4.11%** Chí Mạng vàng | Cốt lõi phái Chí Mạng & bắt buộc cho meta Tiểu Ngoại Lưu |
| **Thể** (Body / 体) | 60 Khí Huyết *(bản đầu: 62 Khí Huyết)* | +6,000 Máu tối đa | +6,000 Máu tối đa | Sinh tồn / PvP / kích ngưỡng thiên phú HP |
| **Ngự** (Defense / 御) | 17 Khí Huyết + 0.5 Ngoại Phòng *(bản đầu: 16.95 Máu + 0.6 Ngoại Phòng)* | +1,700 Máu + +50.0 Phòng thủ | +1,700 Máu + +50.0 Phòng thủ | Tank / PvP chống bị sốc sát thương |

### Tài nguyên chiến đấu, Nội tại ngưỡng Máu và Cơ chế Thức Ăn (Bản vá 06/2026)

| Hạng mục | Thông số & Ngưỡng kích hoạt | Cơ chế vận hành trong thực chiến |
| :---- | :---- | :---- |
| **Thể Lực (Stamina / 耐力)** | Trần gốc 100; mở rộng thêm từ Vô Danh Thương (+20), Kỳ Ngộ/Hề Khiêu (+20) và Tắm suối (+20). | Hồi 15 điểm/giây ngoài giao tranh và 10 điểm/giây trong giao tranh (bắt đầu hồi sau **0.7 giây** kể từ lúc ngừng tiêu hao thể lực). |
| **Tinh Nguyên (Vitality / 精元)** | Trần gốc 100, đẩy tối đa lên 130+ nhờ Ngũ Âm Khải Thái Bình và Đan Dược (+15). | Dùng cho Kỳ Thuật (Thần Long Thổ Hỏa tốn cố định 20, Thái Bạch Túy Nguyệt tốn 10 uống rượu + 6 mỗi đấm). Đòn đánh hồi Tinh Nguyên có **CD ẩn 2 giây (mỗi lần hồi 2 điểm)**, giải thích vì sao tâm pháp Nộ Trảm Mã chỉ đột biến ở tầng 6 (hoàn trả 30% Tinh Nguyên tiêu hao trong 5 giây). |
| **Thủ Quan Nguyên** | Máu Tối Đa > 5,000 (Chế độ Đơn; CD 120s) | Miễn nhiễm 1 đòn chí tử, hồi 20% Máu và bất tử 3 giây. Trong PvP Chỉ Qua, bản vá v2.3 bổ sung chấm trắng báo sẵn sàng bên trái thanh máu và giải trừ phần lớn hiệu ứng xấu khi kích hoạt. |
| **Phiên Khí Hải** | Máu Tối Đa > 25,000 (Chế độ Đơn; CD 120s) | Miễn nhiễm 1 lần cạn Chân Khí, lập tức hồi đầy Chân Khí và gây sát thương diện rộng. |
| **Hóa Thần Khuyết** | Máu Tối Đa > 50,000 (Chế độ Đơn; CD 120s) | Miễn nhiễm 1 đòn đơn lẻ vượt quá 30% Máu tối đa. |

Một cập nhật công thức rất đáng chú ý từ **bản vá chính thức ngày 12/06/2026** là cơ chế tái cấu trúc **Thức Ăn Tăng Lực (Buff Food)**: thức ăn được tách làm hai nhóm tồn tại song song là **Ích Khí Thực Vật** và **Tăng Công Thực Vật**. Toàn bộ chỉ số từ thức ăn được cộng thẳng vào Chỉ số Cơ bản để tạo thành **Chỉ số Hiệu Lực (Effective Attributes)** — mọi hiệu ứng tăng % công kích lẫn phép kiểm tra ngưỡng giới hạn Tiểu Ngoại > Đại Ngoại đều tính toán dựa trên Chỉ số Hiệu Lực này sau khi đã ăn thức ăn.

## Phần 6: Trọng Số Chỉ Số và Hai Nghịch Lý Meta Endgame

Khi điều luật trang bị bậc 100–115, người chơi thường mắc hai sai lầm theo trực giác: vứt bỏ dòng Thuộc Tính Ngoại Hệ Tối Thiểu để giữ Thuộc Tính Bản Hệ Tối Thiểu, hoặc mặc định Đại Ngoại Công luôn vượt trội Tiểu Ngoại Công ở mọi lưu phái. Cả hai nhận định này đều bị đảo ngược bởi quy tắc khóa cận dưới của trò chơi.

### Nghịch lý 1: Tại sao "Tiểu Ngoại Hệ" mạnh hơn hẳn "Tiểu Bản Hệ"?

Luật quyết toán cốt lõi của engine quy định rằng **khi Min Attack ≥ Max Attack trên bất kỳ loại công kích nào (Ngoại Công hoặc một trong 4 Thuộc Tính), toàn bộ đòn đánh sẽ khóa cứng giá trị roll bằng đúng Min Attack**, áp dụng cho cả Đánh Thường, Chí Mạng lẫn Hội Ý. Thử nghiệm đối chứng của người chơi trên diễn đàn Bahamut với nhân vật Khiên Ty · Ngọc cấp 81 minh họa rất rõ quy tắc này: một dòng +26 Tiểu Bản Hệ Khiên Ty chỉ làm giá trị kỳ vọng sau khi nhân 1.5x tăng thêm +19.5, trong khi một dòng +26 Tiểu Ngoại Hệ (khi Đại Ngoại Hệ bằng 0) khóa cứng khoảng 26–26 và cộng thẳng +26 vào kỳ vọng (thực chiến sát thương gốc 977 tăng lên 985 với +22.4 Tiểu Minh Kim ngoại hệ, bám rất sát +18.1 Kính ở mức 987).

Khi mở rộng phép tính này lên một dòng Vàng bậc 100 (+51.4 điểm) trong mô hình Raid Lv.100, khoảng cách càng nới rộng. Một dòng +51.4 **Tiểu Bản Hệ** (trên nền 380–800) chỉ nâng trung bình lên một nửa (+25.7), nhân 1.5x được +38.55 cho đòn Thường/Chí Mạng và đóng góp đúng 0 cho đòn Hội Ý (vì Hội Ý chỉ lấy Max 800); ngay cả khi đã nhân thêm 29.6 Xuyên Bản Hệ (×1.148) và +11.8% Khuếch Đại Bản Hệ, giá trị kỳ vọng trọng số đạt 76.20 trên build Chí Mạng (88% Chí Mạng / 12% Hội Ý) và tụt xuống chỉ còn 39.65 trên build Hội Ý (40% Hội Ý / 50% Chí Mạng). Ngược lại, một dòng +51.4 **Tiểu Ngoại Hệ** (với Đại Ngoại Hệ = 0) tự khóa cứng 51.4–51.4, ăn trọn trên cả Thường, Chí Mạng lẫn Hội Ý dù chỉ chạy ở bội số 1.0x không Xuyên: giá trị kỳ vọng đạt 87.48 trên build Chí Mạng (**cao hơn Tiểu Bản Hệ +14.8%**) và 75.56 trên build Hội Ý (**gấp 1.91 lần Tiểu Bản Hệ**). Đổi chiều lại, **Đại Ngoại Hệ** là dòng rác nặng nhất game: khi đi một mình (0–51.4), kỳ vọng trung bình chỉ là 25.7, và nếu trên đồ đã có Tiểu Ngoại Hệ cùng loại (51.4–51.4), dòng Đại Ngoại Hệ đó cho giá trị bằng đúng 0.

![So sánh trọng số chỉ số bậc 100 — Build Hội Ý Minh Kim Ảnh](/images/wwm/co-che-sat-thuong/image5.png)

![So sánh trọng số chỉ số bậc 100 — Build Chí Mạng Liệt Thạch / Phá Trúc](/images/wwm/co-che-sat-thuong/image6.png)
*Hình 4: So sánh điểm trọng số quy đổi (mốc Đại Ngoại Vàng = 100) giữa phái Hội Ý (Minh Kim · Ảnh) và phái Chí Mạng (Liệt Thạch / Phá Trúc), làm rõ nghịch lý Tiểu Ngoại Hệ vượt Tiểu Bản Hệ.*

Kết quả mô phỏng trọng số ở trên tương đồng chặt chẽ với bảng điểm quy đổi cộng đồng Gamersky ở bậc 100 (quy ước Đại Ngoại = 100, Thế = 100, Kính = 85–100, Đại Minh Kim = 85, trong khi Tăng Thương Vũ Khí và Thủ Lĩnh Tăng Thương xếp vượt lên trên). Giá trị biên của từng dòng sẽ dịch chuyển mạnh theo trạng thái bão hòa Tam Suất: ngay khi chạm trần 40% Hội Ý trên Minh Kim · Ảnh, giá trị của **Thế** lập tức rớt từ 113.5 điểm xuống 57.0 điểm; còn trên các phái Chí Mạng, **Đại Ngoại** và **Tiểu Ngoại** bám khá sát nhau (100 vs. 84.3 điểm) chứ không chênh lệch áp đảo như trên phái Hội Ý.

### Nghịch lý 2: Meta "Tiểu Ngoại Lưu" (Min Physical > Max Physical)

Nghịch lý 2: Meta "Ngoại công tối thiểu lưu" (Min Physical > Max Physical)

Lợi thế thứ hai đến từ cấu trúc phân bổ 40 ô từ điều: theo bài phân tích thực nghiệm trên diễn đàn NGA, 8 dòng Mẫn đồng thời bơm cả Chí Mạng lẫn Ngoại công tối thiểu (432 Mẫn trên 8 món bậc 100 Thừa Âm cho gần 400 Ngoại công tối thiểu và khoảng 32.4%–32.8% Chí Mạng trắng), nhờ đó khung Ngoại công tối thiểu lưu chỉ tốn 12 Ngoại công tối thiểu + 8 Mẫn + 12 Tam Suất/Thần Lực = 32 ô, **dư ra 8 ô trống để nhồi Thuộc Tính** (đẩy Thuộc Tính từ 460–920 lên 600–1,200). Phần thuộc tính cộng thêm này giúp Ngoại công tối thiểu lưu vượt build Đại Ngoại truyền thống (2,000–4,200) khoảng **+7.85% (~8%) DPS kỳ vọng**. Về độ ổn định, cùng phân tích trên NGA chỉ ra biên độ 1 nhát tụ lực của Ngoại công tối thiểu lưu co gọn vào [195,018 – 241,565] so với dải quá rộng [134,507 – 271,603] của Đại Ngoại truyền thống — xác suất để Đại Ngoại liên tiếp đánh vượt trần Ngoại công tối thiểu trong 28 đòn tụ lực/phút chỉ là (21.91%)²⁸ ≈ 3.45 × 10⁻¹⁹, khiến Đại Ngoại chủ yếu chỉ còn lợi thế khi tổ đội đua tốc độ sẵn sàng đánh lại nhiều lần để câu chuỗi roll sát đỉnh Max.

Tuy nhiên, người chơi phải đáp ứng ba điều kiện khắt khe trước khi theo Ngoại công tối thiểu lưu: tuyệt đối **không dùng khi chưa hoàn thiện** — phải chạm tối thiểu tỷ lệ 12 Ngoại công tối thiểu + 4 Mẫn, 11 Ngoại công tối thiểu + 6 Mẫn hoặc 10 Ngoại công tối thiểu + 8 Mẫn để bảo đảm Ngoại công tối thiểu Hiệu Lực > Đại Ngoại Hiệu Lực ngay cả sau khi ăn Thức ăn Tăng Công; chấp nhận **độ khó điều luật cao hơn khoảng 50%** (theo nhận xét cộng đồng trên 233leyuan và Bahamut) vì gần như không tận dụng được dòng phụ Đại Ngoại, Kính hay Thế; và **chọn đúng lưu phái** (cực mạnh trên Song Thiết, Hoành Đao, Quyền Giáp, Trống, nhưng không phù hợp với Khiên Ty · Ngọc do nền Ngoại công tối thiểu cơ bản quá thấp, hụt khoảng 400 điểm).

## Phần 7: 8 Quy Tắc Vàng Về Trang Bị, Điều Luật, Thừa Âm và Định Âm

Theo tài liệu hệ thống trang bị mới nhất trên máy chủ Trung Quốc, trò chơi đã mở tới **Bậc 115 (mùa Nam Lữ Tương Hòa, từ 24/09/2026)** sau các mốc bậc 91, 96, 100 (Hoàng Chung Chính Hưởng), 105 và 110 (Nhuy Tân Điệp Tấu). Mỗi món trang bị Tím trở lên gồm **1 Từ điều Sơ thủy (Initial Affix)**, **4 Từ điều Điều luật (Tuned Affixes)** và **1 dòng Định Âm (Dingyin)** riêng. Màu chữ của mỗi dòng phản ánh tỉ lệ so với trần lý thuyết: Tím (~75%), Vàng (≥90%) và Vàng Đầy (~100%).

* **Luật Cấm Trùng Giữa 4 Dòng Điều Luật (nhưng ĐƯỢC trùng Dòng Sơ Thủy)**: 4 dòng mở thêm khi Điều luật không bao giờ trùng tên nhau, **nhưng hoàn toàn có thể trùng với Dòng Sơ Thủy**. Đây là con đường duy nhất để chế tạo trang bị "Truyền Gia Bảo" (Heirloom) sở hữu **2 dòng Đại Ngoại Công** (hoặc 2 dòng Tiểu Ngoại Công) trên Vũ khí, Nhẫn và Bội.
* **Luật Cấm Dòng Thuộc Tính Thứ 3 (Kỹ thuật Chặn Bể Chuyển Luật)**: Trong toàn bộ 5 dòng trên một món trang bị **không bao giờ xuất hiện quá 2 dòng Công Thuộc Tính** (tính chung Min/Max của 4 hệ và Vô Tướng; không tính Ngoại Công). Do đó, nếu vũ khí đã mang sẵn 2 dòng thuộc tính, khi bạn Chuyển Luật một dòng rác khác (như Tiểu Ngoại), bể roll tự động loại sạch mọi dòng thuộc tính và tăng mạnh xác suất ra Kính/Chí Mạng/Mẫn.
* **Luật Bể Thần Lực (Rare Divine Power Affixes)**: Các dòng cực phẩm như Tăng Thương Võ Học Vũ Khí, Thủ Lĩnh Tăng Thương, Toàn Võ Học Tăng Hiệu và Toàn Kỳ Thuật Tăng Thương (được gộp chung từ Đơn Thể và Quần Thể Kỳ Thuật ở bậc 100 từ bản vá 10/2026) **không tồn tại trong bể Chuyển Luật (Retuning)**. Trên các vị trí săn Thần Lực (Vũ khí, Nhẫn/Bội, Quần/Tay), nếu điều luật gốc không xuất hiện sẵn Thần Lực thì nên bỏ làm phôi thay vì đốt Đá Chuyển Luật.
* **Luật Thừa Âm (Chengyin / Relaying) và Trần 94%–95%**: Trang bị từ bậc 91 trở lên có thể Thừa Âm nối tiếp qua nhiều bậc (105 → 110 → 115) mà không bị trừ dồn nhiều lần, nhưng **trần tối đa từng dòng bị khóa ở mức 94%–95% so với đồ nguyên bản cùng bậc** (vẫn đạt màu Vàng). Lưu ý không dùng phôi ngũ sắc nâng vượt trần 95% cho dòng tím trước khi Thừa Âm cùng bậc, vì phần vượt trần sẽ bị khấu trừ sau khi Thừa Âm. Đồ nguyên bản bậc 110 (Lưu Tinh/Ngô Câu) và 115 (Thương Hải/Hàn Giang Tuyết) vẫn giữ quyền Chuyển Luật vô hạn (CD 7 ngày/lần) ngay cả sau khi đã Thừa Âm.
* **Luật Đồ Tím vs. Đồ Vàng (Tránh chạy theo điểm Tạo Nghệ)**: Chênh lệch duy nhất giữa Giáp Tím và Giáp Vàng nằm ở một ít chỉ số cơ bản (Máu, Ngoại Phòng), nên **Giáp Tím chuẩn 4–5 dòng vượt trội rõ rệt so với Giáp Vàng lệch dòng**. Với các phái Hội Ý không cần Tiểu Ngoại, **Nhẫn Tím** (chỉ thua Nhẫn Vàng ở dòng chính Tiểu Ngoại) có thể dùng thoải mái để lấy thêm phôi roll ra 2 dòng Đại Ngoại + Toàn Võ Học, trong khi **Bội (Pendant)** mang dòng chính Đại Ngoại nên bắt buộc dùng đồ Vàng.
* **Luật Vũ Khố (Arsenal) Ưu Tiên Vũ Khố Thuộc Tính**: Cùng một lượng điểm cộng từ Vũ Khố, Công Thuộc Tính Bản Hệ nhờ bội số 1.5x cho sát thương cao hơn Vũ Khố Ngoại Công Thông Dụng ở gần như mọi lưu phái (ngoại trừ nhánh Song đao Bộ Phi Chuẩn ưu tiên sát thương vật lý thuần).
* **Luật Định Âm (Dingyin) — Bên Trái Bắt Buộc Xuyên Ngoại Công**: Trong PvE, **cả 4 món bên trái (2 Vũ khí, Nhẫn, Bội) luôn ưu tiên Định Âm Xuyên Ngoại Công** — kể cả cho Trị Liệu và phái Thuộc Tính — bởi Ngoại Công chiếm khoảng 60%–70% sát thương, Xuyên Ngoại Công ăn luôn lên Flat DMG lẫn Trị Liệu, và cộng đồng NGA xác nhận Xuyên Ngoại Công Tím vẫn mạnh hơn Xuyên Vô Tướng Vàng trong PvE. 4 món giáp bên phải định âm đúng kỹ năng chiếm tỉ trọng DPS cao nhất trên cọc gỗ.
* **Luật Tránh Bẫy Biểu Tượng "Đề Cử (👍)"**: Biểu tượng 👍 trong game chứa nhiều gợi ý gây nhiễu — ví dụ nó gắn 👍 cho Tiểu Minh Kim trên phái Hội Ý (thực chất là dòng kém), nhưng lại bỏ qua Tiểu Ngoại Hệ (thực chất thuộc nhóm T2).

### Bảng quy hoạch Dòng Sơ Thủy và Dòng Thần Lực theo từng ô trang bị

| Vị trí trang bị | Dòng Sơ Thủy (Đại Ngoại / Hội Ý) | Dòng Sơ Thủy (Tiểu Ngoại Lưu) | Dòng Thần Lực độc quyền | Định Âm PvE chuẩn |
| :---- | :---- | :---- | :---- | :---- |
| **4 Món Trái: Vũ khí Chính & Phụ** *(Quyết định Set DPS)* | Đại Ngoại Công *(ưu tiên)* hoặc Thế/Mẫn | Tiểu Ngoại Công | **Tăng Thương Võ Học Vũ Khí** (~5%) | **Xuyên Ngoại Công** (+12.8 ở bậc 100) |
| **4 Món Trái: Nhẫn (Ring) & Bội (Pendant)** | Đại Ngoại Công *(mở khóa 2 dòng Đại Ngoại)* | Tiểu Ngoại Công | **Toàn Võ Học Tăng Hiệu** (~2.5%) | **Xuyên Ngoại Công** |
| **4 Món Phải: Mũ (Head) & Áo (Chest)** | Tam Suất (Chí Mạng / Chính Xác / Hội Ý) | Chí Mạng hoặc Chính Xác | **Toàn Kỳ Thuật Tăng Thương** *(ưu tiên Trị Liệu Hỏa Quyền; DPS tối ưu sau)* | **Tăng thương Kỹ năng chủ lực** (+7%/món) |
| **4 Món Phải: Quần (Legs) & Tay (Hands)** | **Kính** *(phái Chí Mạng)* hoặc **Hội Ý / Kính** *(phái Hội Ý)* | Chí Mạng hoặc Chính Xác | **Thủ Lĩnh Tăng Thương** (~2.5% PvE) / **Đối Người Chơi** (PvP/Heal) | **Tăng thương Kỹ năng chủ lực** (+7%/món) |

Ngoài 8 món chính, **Bộ Cung & Nhẫn Bắn Cung (Bow & Thumb Ring Set)** bậc cao cho phép chuyển đổi miễn phí hiệu ứng bộ sang Chính Xác (+4.0%–4.7%), Chí Mạng (+4.5%–5.2%) hoặc Hội Ý (+2.2%–2.6%) để bù khít phần Tam Suất còn thiếu mà không cần phá trang bị chủ lực.

## Phần 8: Ví Dụ Tính Toán Thực Chiến Từng Bước (Endgame Lv.100)

Để minh họa trực tiếp cách các công thức ở Phần 1–6 kết hợp với nhau thành con số hiển thị trên màn hình, mục này áp dụng mô hình tính toán cộng đồng vào **hai bài toán mẫu tại Raid Endgame cấp 100** (Boss có Ngoại Phòng 498, Kháng 0, Kháng Phán Định 85% — hệ số chia 1.85). Biểu đồ bên dưới đối chiếu song song khoảng dao động của Ngoại công tối thiểu lưu với Đại Ngoại Chuẩn cùng bốn mức sát thương đầu ra cụ thể của Ví dụ 1.

![So sánh Tiểu Ngoại Lưu vs Đại Ngoại Chuẩn và 4 mức sát thương Minh Kim Ảnh Lv.100](/images/wwm/co-che-sat-thuong/image7.png)
*Hình 5: Bốn mức sát thương đầu ra của chiêu Minh Kim · Ảnh 200% bội số tại Raid Lv.100 (đòn Hội Ý 40,600 gấp 3.52 lần đòn Sượt 11,530) và so sánh biên độ dao động 1 nhát tụ lực của Ngoại công tối thiểu lưu (+7.85% DPS) với Đại Ngoại Chuẩn.*

### Ví dụ 1: Minh Kim · Ảnh (Tích Củ Cửu Kiếm) đánh Boss Raid cấp 100

Giả lập nhân vật Minh Kim · Ảnh bậc 100 sở hữu Ngoại Công 1,700 – 3,900, Minh Kim Bản Hệ 400 – 850 (cộng 80 thuộc tính ẩn), Tiểu Ngoại Hệ Phá Trúc 120 – 0 (khóa cứng 120), Xuyên Ngoại Công 51.2 (4 Định Âm Vàng), Xuyên Minh Kim 20.0, Khuếch đại Minh Kim +10%. Chiêu kiếm thử nghiệm có bội số Ngoại Công 200% (Minh Kim Bản Hệ 200% × 1.5 = 300%) và FlatDMG = 500. Các khu nhân ngoài gồm Tăng Thương Chung +60% (1.60x: Dịch Thủy 5% + Kiếm 7.4% + Thủ Lĩnh 7.6% + Toàn Võ Học 5% + Giang Lưu 25% + Khí Kiệt 10%), Định Âm +28% (1.28x), Chí Mạng +50% (1.50x) và Hội Ý +55% (1.55x).

Đầu tiên, ta trừ Ngoại Phòng 498 của Boss (kiểm tra sàn bảo hộ 0.10 × 1,700 = 170) thu được Ngoại Công hiệu dụng Min = 1,202, Trung bình = 2,302, Max = 3,402. Do Boss Kháng = 0, Xuyên Giáp rơi vào vùng tràn: Xuyên Ngoại Công = 1 + 51.2 / 200 = 1.256 và Xuyên Minh Kim = 1 + 20.0 / 200 = 1.100. Bảng sau tổng hợp Sát thương Cơ bản trên ba đường ray:


| Đường ray sát thương | Công thức áp dụng | Min | Trung bình | Max |
| :---- | :---- | :---- | :---- | :---- |
| **1. Ngoại Công** | (Phys\_eff × 2.0 + 500) × 1.256 | 3,647.42 | 6,410.62 | 9,173.82 |
| **2. Minh Kim Bản Hệ** | (Main + 80) × 3.0 × 1.10 × 1.10 | 1,742.40 | 2,559.15 | 3,375.90 |
| **3. Ngoại Hệ (Khóa 120)** | 120 × 2.0 × 1.00 | 240.00 | 240.00 | 240.00 |
| **Tổng Sát thương Cơ bản** | **Cộng cả 3 đường ray** | **5,629.82** | **9,209.77** | **12,789.72** |

Tiếp theo, ta hoàn tất quyết toán theo ba bước tuần tự:
* **Nhân các Khu Độc Lập bên ngoài (1.60 × 1.28 = 2.048) để ra bốn loại đòn đánh**: Sượt (Xám) đạt cố định 11,529.9 (5,629.82 × 2.048); Đánh Thường (Trắng) dao động 11,529.9 – 26,193.4 (trung bình 18,861.6); Chí Mạng (Vàng, ×1.50) dao động 17,294.8 – 39,290.0 (trung bình 28,292.4); và Hội Ý (Cam, Max ×1.55) đạt cố định **40,599.7** (12,789.72 × 1.55 × 2.048) — gấp 3.52 lần đòn Sượt.
* **So sánh Sát thương Kỳ vọng giữa Kịch bản A (chưa đủ Chính Xác) và Kịch bản B (bão hòa tối ưu)**: Ở Kịch bản A (P = 95%, C = 45%, A = 38%), xác suất bốn kết quả lần lượt là Cam 38.00%, Vàng 42.75%, Trắng 16.15%, Xám 3.10%, cho sát thương kỳ vọng **30,926.5**. Khi nâng lên Kịch bản B (P = 100%, C = 55%, A = 45% nhờ +5% Hội Ý Trực Tiếp), xác suất trở thành Cam 45.00% và Vàng 55.00% (xóa sạch Trắng/Xám), kéo sát thương kỳ vọng lên **33,830.7** (**tăng +9.39% tổng DPS**).
* **Kiểm chứng tác động của Kịch bản C (build thừa Chí Mạng)**: Nếu đẩy Chí Mạng lên 75% trong khi giữ P = 100% và A = 45% (tổng 120%), Hội Ý vẫn chèn ép Chí Mạng trở về đúng 55.00% nên sát thương kỳ vọng đứng yên tại **33,830.7** — toàn bộ 20% Chí Mạng vượt ngưỡng trở thành chỉ số chết.

### Ví dụ 2: Mô phỏng Khiên Ty · Lâm (Phiến/Quạt Minh Xuyên Dược Điển)

*Lưu ý phương pháp*: Vì chưa có nguồn tài liệu công khai trích xuất nguyên văn phương trình đại số riêng của Trị Liệu, ví dụ dưới đây mô phỏng bằng cách kết hợp cấu trúc đường ray chuẩn với bốn quy tắc Trị Liệu đã được cộng đồng xác nhận (chỉ tính Ngoại Công và Khiên Ty, loại bỏ Ngoại Hệ, bỏ qua Chính Xác/Sượt/Hội Ý, Chí Mạng +50%, Xuyên Ngoại Công tràn tăng +0.5%/điểm, dao động ngẫu nhiên độc lập ±10%).

* Giả sử nhân vật Khiên Ty · Lâm có Ngoại Công 1,700 – 3,500, Khiên Ty 400 – 850 (cộng 80 ẩn), Ngoại Hệ 200 (cho 0 giá trị), Xuyên Ngoại Công 51.2 (×1.256), Xuyên Khiên Ty 20.0 (×1.100), Chí Mạng hiệu lực 84.6% (80% Vàng + 4.6% Trực Tiếp), Chính Xác 0% và Hội Ý 15% (cả hai đều bị bỏ qua). Giả định chiêu Quạt hồi 150% Ngoại Công + 225% Khiên Ty + 400 cố định, tổng Tăng Trị Liệu Chung +45% (1.45x) và Định Âm Trị Liệu +28% (1.28x):
* **Tính nền Trị Liệu Cơ bản (không trừ Phòng thủ mục tiêu)**: Giá trị Min là (1,700 × 1.5 + 400) × 1.256 + (400 + 80) × 2.25 × 1.10 = 4,893.2; giá trị Max là (3,500 × 1.5 + 400) × 1.256 + (850 + 80) × 2.25 × 1.10 = 9,398.2; mức trung bình nền đạt **7,145.7** (trong đó 4 dòng Định Âm Xuyên Ngoại Công nâng trực tiếp +25.6% cho toàn bộ phần Ngoại Công + hồi máu cố định).
* **Nhân khu ngoài (1.45 × 1.28 = 1.856) và tính Hồi máu Kỳ vọng**: Hồi máu Thường trung bình đạt 13,262.4 (biên độ ±10%: 11,936 – 14,589); Hồi máu Chí Mạng (×1.50) trung bình đạt 19,893.6 (biên độ ±10%: 17,904 – 21,883). Với 84.6% Chí Mạng, lượng hồi máu kỳ vọng mỗi lượt vẩy quạt đạt **18,872.4**, và cú hồi đỉnh tối đa (roll trúng Max + Chí Mạng + +10% dao động) chạm mốc **28,780.9**.

## Phần 9: Ma Trận Toàn Bộ Lưu Phái và Khác Biệt PvE vs. PvP Chỉ Qua

### Bảng tham chiếu chỉ số tốt nghiệp (Lv.100–115) cho toàn bộ Lưu Phái

Bảng sau tổng hợp chuẩn chỉ số chữ Vàng (sau Kháng Phán Định) ở cấp 100 tiêu chuẩn/Cơ Giáp từ các hướng dẫn tốt nghiệp (Entertainment14, 9game, Gamersky) kết hợp định hướng build mới nhất cuối năm 2026 cho các lưu phái ra mắt sau đó (Minh Kim · Đình, Phá Trúc · Tôn, Khiên Ty · Dực).

| Lưu phái & Vũ khí đại diện | Hướng Build cốt lõi | Tam Suất Vàng (CX / CM / HÝ) | Chỉ số Công ưu tiên (Bậc 100) | Bộ Set & Định âm Giáp Phải |
| :---- | :---- | :---- | :---- | :---- |
| **Minh Kim · Ảnh** *(Bellstrike - Umbra)* — Tích Củ Cửu Kiếm + Cửu Khúc Kinh Thần Thương | **Hội Ý** (Chảy máu / Huyết bạo) | CX: 97%–100% / CM: 44%–50% / HÝ: 37%–40% | Đại Ngoại 3,800–4,000+, Đại Minh Kim 850+, Thế/Kính | Bộ Phi Chuẩn (Hawkwing) / Định âm **Chảy Máu** |
| **Minh Kim · Hồng** *(Bellstrike - Splendor)* — Vô Danh Kiếm + Vô Danh Thương | **Hội Ý** (Kiếm Khí tích lực) | CX: 95%–100% / CM: 38%–42% / HÝ: 39%–40% | Đại Ngoại 3,800–4,000+, Đại Minh Kim 850+, Thế/Kính | Bộ Ngọc Đẩu / Phi Chuẩn / Định âm **Kỹ Năng Tụ Lực** |
| **Minh Kim · Đình** *(Bellstrike - Bolt — 11/2026)* — Song Thương (Quyết Ngục Huyền Phong + Bạt Sơn Thủ Nguyệt) | **Hội Ý** hoặc nhánh **Tiểu Công Chí Mạng** | CX: 98%–100% / CM: 40%–75% / HÝ: 12%–40% *(tùy nhánh)* | Đại Ngoại + Thế (Hội Ý) hoặc Tiểu Ngoại + Mẫn (Chí Mạng) | Bộ Phi Chuẩn / Hàn Mang |
| **Liệt Thạch · Uy** *(Stonesplit - Might)* — Ta Phu Đao Mạc + Bát Phương Phong Lôi Thương | **Chí Mạng** (Chịu Đòn / DPS trần cao) | CX: 98%–100% / CM: **56%** *(mốc trước 06/2026; kiểm tra lại sau rework)* / HÝ: 15%–15.5% | Ngoại Công 1,600–3,600, Đại Liệt Thạch 900, Kính | Bộ Thời Vũ / Ưng Dương / Định âm **Kỹ Năng Tụ Lực Đao Mạc** |
| **Liệt Thạch · Quân** *(Stonesplit - Strength)* — Hoành Đao + Thập Phương Phá Trận (Đao Mạc — Thuần Hoành Đao / Song Thiết) | **Chí Mạng** (hỗ trợ rất tốt **Tiểu Ngoại Lưu**) | CX: 98%–100% / CM: 65%–78% / HÝ: 10%–12% | Đại Ngoại 1,700–3,600 hoặc **Tiểu Ngoại 3,200+ + Mẫn** | Bộ Đoạn Nhạc / Phi Chuẩn / Định âm **Kỹ năng phái sinh / Tụ Lực** |
| **Phá Trúc · Phong** *(Bamboocut - Wind)* — Nê Lê Tam Cấu (Song đao) + Thằng Phiêu | **Chí Mạng** (Đại Ngoại hoặc Tiểu Ngoại) | CX: 98.5%–100% / CM: **65%–70%** *(+10% Đao Đỏ = 80%)* / HÝ: 10%–13% *(Phi Chuẩn: 16–18%)* | Ngoại Công 1,700–3,600 (hoặc Tiểu Ngoại + Mẫn), Đại Phá Trúc 800–850 | Bộ Yến Quy / Phi Chuẩn / Định âm **Thử Thử (Chuột)** |
| **Phá Trúc · Trần** *(Bamboocut - Dust)* — Tán/Ô + Thằng Phiêu (AoE) | **Chí Mạng** (AoE Dọn quái) | CX: 98.5%–100% / CM: 70%–78% / HÝ: 10%–13% | Ngoại Công 1,700–3,500, Đại Phá Trúc 800–850 | Bộ Liên Tinh / Yên Liễu / Định âm **Võ Học Kỹ Tán/Ô** |
| **Phá Trúc · Diên** *(Bamboocut - Kite)* — Quyền Giáp + Thiên Cơ Tác Thiên (Thằng Phiêu) | **Chí Mạng** (Phù Dao T4 chuyển Hội Ý 1:1 → Chí Mạng Trực Tiếp) | CX: 98%–100% / CM: 75%–78% / HÝ: 10%–12% *(không lấy dòng lẻ)* | Tiểu + Đại >4,950 hoặc **Tiểu Ngoại Lưu**, Mẫn 300–340 | Bộ Yên Liễu / Phá Ngũ / Định âm **Quyền Giáp** |
| **Phá Trúc · Tôn** *(Bamboocut - Reverence / Sovereign — 08/2026)* — Huyền Thân Quyền Pháp + Đoạn Thủy Song Quyết | **Chí Mạng** (Hỗ trợ **Tiểu Ngoại Lưu**; Cuồng Ẩm tăng ST Chí Mạng) | CX: 98%–100% / CM: 75%–80% / HÝ: Tối thiểu | Hỗ trợ **Tiểu Ngoại Lưu** (12 Tiểu + 8 Mẫn) | Ưu tiên Bộ Tăng Chí Mạng / Phá Trúc |
| **Khiên Ty · Ngọc** *(Silkbind - Jade)* — Cửu Trùng Xuân Sắc (Tán/Ô) + Thanh Sơn Chấp Bút (Phiến/Quạt) | **Chí Mạng** (Chỉ nên chơi **Đại Ngoại**) | CX: 98%–100% / CM: 65%–78% / HÝ: 12%–13% *(Phi Chuẩn: 18–21%)* | Ngoại Công 1,700–3,500, Đại Khiên Ty 800–850 | Bộ Phi Chuẩn / Yên Liễu / Định âm **Tuyệt Kỹ Tán/Ô** |
| **Khiên Ty · Dực** *(Silkbind - Wings — 2026)* — Vũ Tấu Yêu Cổ (Trống) | **Chí Mạng** (Thiên phú tăng Tiểu Ngoại theo Mẫn tới 462 & +30% ST Chí Mạng tại 60% CM) | CX: 98%–100% / CM: 60%–80% / HÝ: Tối thiểu | **Tiểu Ngoại Lưu** (12 Tiểu + 8 Mẫn + Tiểu Khiên Ty tới 447 cho thiên phú) | Bộ Vân Tiễn (Cloudshear) |
| **Khiên Ty · Lâm / Vũ** *(Silkbind - Deluge)* — Minh Xuyên Dược Điển (Phiến/Quạt) + Thiên Hương Dẫn Hồn Cổ (Tán/Ô) | **Trị Liệu Chí Mạng** *(Thuần Heal hoặc Hỏa Quyền Heal)* | CX: **0%** *(Thuần)* / 100% *(Hỏa Quyền)* / CM: 65%–80% / HÝ: **0%** *(Thuần)* / 11% *(Hỏa Quyền)* | **4 T0 Thuần Heal**: Đại Ngoại, Đại Khiên Ty, Tăng Hiệu Phiến/Quạt, Tăng Hiệu Người Chơi | Bộ Hoán Hoa / Thời Vũ / Định âm **Trị Liệu Phiến/Quạt** |

### Khác biệt sống còn giữa PvE Phó Bản và PvP (Chỉ Qua / Luận Kiếm / Bách Nghiệp Chiến)

Nhiều chỉ số phòng thủ kém giá trị trong PvE lại trở thành yếu tố quyết định thắng bại trong PvP do cấu trúc Ngoại Phòng và Kháng của người chơi đảo ngược hoàn toàn hiệu suất sát thương.

| Khía cạnh cơ học | PvE (Phó bản 5/10 người & Boss Thế Giới) | PvP (Chỉ Qua 1v1 / 2v2 / 5v5 & Bách Nghiệp Chiến) |
| :---- | :---- | :---- |
| **Ngoại Phòng (Physical DEF)** | Quái thế giới DEF rất thấp (10–39); Boss Raid Lv.100 có DEF khoảng 498–500. Giảm thủ/bỏ qua thủ kém hiệu quả hơn Xuyên. | Người chơi có DEF nền 480–490 và nên đẩy lên 600+ để tránh bị hạ gục trong 1 combo. Theo phân tích trên Qieyou, **2 dòng Ngoại Phòng triệt tiêu đồng thời 1 dòng Đại Ngoại + 1 dòng Tiểu Ngoại**. |
| **Xuyên Giáp vs. Kháng** | Boss PvE có Kháng gần bằng 0 → Xuyên Giáp chạy trong vùng tràn (+0.5%/điểm), luôn dùng 4 Định Âm Xuyên Ngoại Công. | Người chơi tích cực tăng **Kháng Ngoại Công & Kháng Thuộc Tính** (thiên phú Chỉ Qua). Vì 1 điểm Kháng dư cắt tới 1.0% sát thương (gấp đôi +0.5% của Xuyên tràn), **Kháng > Xuyên** trong PvP. |
| **Hồi máu & Sinh tồn** | Trị liệu dư thừa lớn; phó bản cấp thấp cộng thêm +100% buff hồi máu. | Áp dụng **giảm trị liệu 90%** trong Chỉ Qua (tâm pháp Đan Tâm Triện mất hiệu lực mạnh). Ưu tiên Thủ Quan Nguyên, Hút máu liên chiêu và Giảm thương khi máu thấp. |
| **Định Âm & Cân bằng** | Dùng Định Âm PvE thường (Xuyên Ngoại Công + Tăng thương Kỹ năng). | Dùng **Định Âm Chỉ Qua** riêng (có hiệu lực ở 1v1/2v2/5v5; **3v3 áp chế độ điều bình nên không kích hoạt**): Vũ khí lấy Xử Quyết hồi Tinh Nguyên, Mũ lấy Giải Khống Cường Nhận/Giảm CD, Áo lấy Giảm thương khi bị đánh 28%, Quần lấy Né hồi Chân Khí/Máu, Tay lấy Tá Thế hồi Chân Khí. |
| **Bách Nghiệp Chiến (30v30)** | Khu Tăng Thương Chung gồm Thủ Lĩnh Tăng Thương; không có buff thuộc tính quy mô lớn như chiến trường bang. | Buff Kỹ Nghệ chiến trường cộng +22% Tăng Thương Chung và +48% Thuộc Tính, khiến đơn lẻ 1 dòng **Đại Thuộc Tính Bản Hệ vượt Đại Ngoại Công** (trên Vô Danh) và Đối Người Chơi Tăng Thương ngang Toàn Võ Học. |
| **Thứ tự ưu tiên chiêu thức (PvP Priority)** | Tập trung phá Chân Khí bằng Tá Thế (E) và né đòn Kim Quang. | Quy luật ưu tiên kỹ năng tổng hợp trên 17173/Gamersky: **Xử Quyết = Vi Đà > Võ Học Kỹ/Tuyệt Kỹ Ngọc Phiến > Phá Phòng (Dược Xoa/Ưng Trảo) > Tá Thế = Phòng Phản > Né = Kỹ năng thường > Đánh Thường = Kỹ Năng Tụ Lực**. Miễn khống chế: **Bá Thể (Super Armor)** > **Cường Nhận (Toughness)**; đòn **Kim Quang** xuyên thẳng Đỡ Đòn và Tá Thế. |

### Danh sách kiểm tra tự rà soát nhân vật (Build Audit Checklist)

Trước mỗi đợt leo Raid hoặc sử dụng Đá Chuyển Luật, bạn nên rà soát nhân vật tuần tự theo 6 bước sau:

* **1. Kiểm tra Chính Xác chữ Vàng trước tiên**: Mở bảng Chi tiết nhân vật, đối chiếu số **chữ Vàng** (không dùng chữ Trắng) và bảo đảm đạt 98%–100% đối với lưu phái Chí Mạng hoặc 95%–99% đối với lưu phái Hội Ý để loại bỏ hoàn toàn sát thương Sượt màu Xám (lưu phái Thuần Trị Liệu bỏ qua bước này).
* **2. Kiểm tra Trần Cứng Chí Mạng & Hội Ý (tính cả buff ẩn)**: Cộng chỉ số Chí Mạng chữ Vàng với toàn bộ buff Chí Mạng ẩn từ trạng thái hoặc thiên phú võ học (chẳng hạn +10% từ trạng thái Đao Đỏ của Song đao) sao cho tổng không vượt quá 80%; tiếp đó cộng thêm Chí Mạng Trực Tiếp (+4.6% từ Dịch Thủy Ca tầng 5) và tổng Hội Ý để chạm sát ngưỡng 100% mà không tràn sâu trên lưu phái Chí Mạng.
* **3. Loại bỏ mọi dòng Đại Ngoại Hệ**: Rà soát toàn bộ 8 món trang bị, ưu tiên dùng Đá Chuyển Luật hoặc thay thế bất kỳ dòng Đại Thuộc Tính khác hệ nào đang nằm lạc trên trang bị; ngược lại, giữ lại dòng Tiểu Ngoại Hệ nếu thuộc tính đó đang có chỉ số Đại bằng 0.
* **4. Kiểm tra Định Âm & Vũ Khố**: Bảo đảm 4 món trang bị bên trái đều đã định âm **Xuyên Ngoại Công**, 4 món giáp bên phải định âm đúng kỹ năng chiếm tỉ trọng DPS hoặc Trị Liệu cao nhất trên cọc gỗ, đồng thời chọn đúng **Vũ Khố Thuộc Tính Bản Hệ**.
* **5. Chốt dứt khoát hướng Đại Ngoại hoặc Ngoại công tối thiểu lưu**: Tránh phối đồ nửa vời giữa hai hướng; nếu đi theo Ngoại công tối thiểu lưu, cần sử dụng kèm **Thức Ăn Tăng Công** để kiểm tra chắc chắn chỉ số Ngoại công tối thiểu Hiệu Lực lớn hơn Đại Ngoại Hiệu Lực trong trạng thái thực chiến.
* **6. Săn đúng Dòng Thần Lực trước khi đổ tài nguyên**: Chỉ đầu tư Đá Chuyển Luật và phôi Vàng vào Vũ khí, Nhẫn/Bội, Quần/Tay đã sở hữu sẵn Dòng Sơ Thủy chuẩn cùng Dòng Thần Lực đúng lưu phái, đồng thời không dùng phôi ngũ sắc nâng vượt trần 95% trước khi Thừa Âm lên bậc trang bị tiếp theo.
