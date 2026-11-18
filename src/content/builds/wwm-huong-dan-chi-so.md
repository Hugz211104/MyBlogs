---
title: 'Báo Cáo Khung Dữ Liệu Chỉ Số & Cẩm Nang Build Nhân Vật WWM'
date: 2026-10-23
game: 'Where Winds Meet'
role: 'Cẩm nang chỉ số / Cơ chế'
cover: '/images/posts/builds-chi-so-wwm.jpg'
badge: 'Cẩm nang'
tags: ['Where Winds Meet', 'Chỉ số', 'Gear Tuning', 'Tân thủ']
summary: 'Giải mã toàn bộ hệ thống chỉ số Ngũ Hành, ma trận 4 trạng thái đòn đánh (Precision, Crit, Affinity, Abrasion), nghịch lý Other Path Min, cơ chế kháng cấp 96-100 và quy trình Tuning cho tân thủ.'
---

> Nguồn: [Google Doc — Hướng Dẫn Chỉ Số Game WWM](https://docs.google.com/document/d/1nJF5Cr5p6kB4qXCgDI5E1yiv0eNqXwRhp_3QhXlqGoU/edit)

Báo cáo này được cấu trúc thành hai phần chuyên biệt nhằm đáp ứng trọn vẹn nhu cầu tìm hiểu hệ thống chỉ số của **Where Winds Meet (WWM)**. Phần 1 giải mã các công thức toán học ẩn dưới hệ thống chiến đấu và cơ chế tinh chỉnh trang bị; Phần 2 là cẩm nang trực quan giúp tân thủ phân bổ chỉ số, tránh bẫy tài nguyên và Tuning đồ chuẩn xác.

## Phần 1: Phân Tích Cơ Chế & Khung Dữ Liệu Chỉ Số Chuyên Sâu

Where Winds Meet (Everstone Studio & NetEase) sở hữu quy mô PvE lớn cùng các hoạt động PvP/GvG phức tạp, với hệ thống chỉ số đa tầng cực kỳ chi tiết.

### 1.1. Cấu Trúc Phân Nhánh Của Hệ Thống Chỉ Số

Hệ thống chỉ số trong WWM chia thành 3 nhánh chính: **Chỉ số Chiến đấu (Combat Attributes)**, **Chỉ số Khám phá (Exploration Attributes)** và **Chỉ số Nghề nghiệp (Career Attributes)**.

#### 1.1.1. Chỉ Số Chiến Đấu Cơ Bản (Ngũ Hành)

| Chỉ Số Cơ Bản (Primary Attribute) | Tác Động Cốt Lõi (Core Conversion) | Tác Động Phụ Trợ (Secondary Effect) |
| --- | --- | --- |
| **Body (Thể Chất)** | `1 Body = 60 Max HP` | Nền tảng sinh tồn cơ bản |
| **Defense (Phòng Thủ)** | `1 Defense = 17 HP + 0.5 Physical Defense` | Kháng sát thương vật lý trực tiếp |
| **Agility (Nhanh Nhẹn)** | `1 Agility = 0.9 Min Physical Attack` | Tăng `0.076%` Critical Rate (Tỷ lệ bạo kích) |
| **Momentum (Động Lực)** | `1 Momentum = 0.9 Max Physical Attack` | Tăng `0.038%` Affinity Rate (Tỷ lệ hội ý) |
| **Power (Sức Mạnh)** | `1 Power = 1.36 Max Physical Attack` | Tăng `0.225` Min Physical Attack |

Phân tích dữ liệu cho thấy **Power** mang lại trần sát thương vật lý (*Max Physical Attack*) cao nhất (hệ số `1.36`). Tuy nhiên, **Momentum** lại đóng vai trò quyết định ở Endgame vì cung cấp **Affinity Rate** — chỉ số khuếch đại sát thương độc lập. **Agility** cung cấp *Crit Rate*, nhưng do Crit phụ thuộc hoàn toàn vào tỷ lệ chuẩn xác (*Precision*), mức ưu tiên thường đặt sau Momentum trong các build tối ưu DPS.

#### 1.1.2. Ma Trận Chỉ Số Phụ Trợ (Secondary Attributes)

| Tên Chỉ Số Phụ Trợ | Chức Năng và Ý Nghĩa Cơ Chế | Nguồn Thu Thập / Cải Thiện |
| --- | --- | --- |
| **Max HP & Max Qi** | Tổng lượng máu và nội năng. Khi Qi cạn, nhân vật rơi vào trạng thái Kiệt sức (*Exhausted*), nhận thêm sát thương và dễ dính khống chế. | Đột phá nhân vật, Nâng cấp trang bị, Melodies of Peace |
| **Physical Attack (Min/Max)** | Dải sát thương vật lý gốc. Nếu đòn đánh bị *Abrasion (Sượt)*, sát thương bị ép về mức Min Attack. | Power, Agility, Momentum; Gear Tuning |
| **Physical Defense** | Giảm trừ trực tiếp sát thương vật lý gánh chịu. | Defense |
| **Precision Rate** | Tỷ lệ đánh chuẩn xác. Quyết định đòn đánh có thể kích hoạt Crit hoặc bị giáng thành Abrasion hay không. | Solo Level, Tuning, Đột phá Inner Way |
| **Critical Rate** | Tỷ lệ bạo kích (`+35%` sát thương, `+50%` trị liệu). Chỉ xảy ra trên đòn Precision. | Agility, Tuning, Inner Way |
| **Affinity Rate** | Tỷ lệ hội ý. Gây thêm `20%` sát thương dựa trên Max Attack. Hoạt động độc lập, không cần Precision. | Momentum, Tuning, Inner Way |
| **Abrasion Conversion Rate** | Xác suất cứu vãn đòn Sượt (*Abrasion*) thành đòn thường. | Tuning |
| **Direct Critical / Affinity Rate** | Tỷ lệ cộng thẳng (giới hạn `20%` Crit và `10%` Affinity), không bị chia bởi Resistance của mục tiêu. | Đột phá Inner Way |
| **Attribute Attack** | Sát thương thuộc tính bổ trợ (Bellstrike, Bamboocut, Silkbind, Stonesplit). | Martial Arts Talents, Tuning |
| **Physical Penetration & Resistance** | Xuyên giáp vật lý và Kháng vật lý. | Gear Sound Tuning, Inner Way |

#### 1.1.3. Chỉ Số Nghề Nghiệp (Career) & Khám Phá (Exploration)

- **Career Attributes:** Gồm **Y Sư (Healer)** — phát triển qua chẩn đoán/chữa bệnh cho NPC và người chơi, tăng sức chống chịu trong minigame chữa bệnh; và **Học Giả (Scholar)** — dùng cho tranh biện (*verbal sparring*) với các bộ kỹ năng như *Nagging*, *Ranting*, *Rebuttals*.
- **Exploration Attributes:** Tăng qua tương tác thế giới, chơi nhạc cụ, giải đố; mở khóa các kỹ năng sinh tồn môi trường như miễn nhiễm sát thương rơi (*falling damage immunity*) hoặc giảm tiêu hao nội năng khi bơi.

---

### 1.2. Thuyết Động Lực Học Sát Thương: Ma Trận 4 Trạng Thái Đòn Đánh

Mỗi đòn đánh cơ bản được kiểm duyệt qua 4 trạng thái loại trừ lẫn nhau:

1. **Cánh Cổng Precision (Chuẩn xác):** Không trực tiếp tăng sát thương, mà là điều kiện để hệ thống roll xem đòn đánh có **Critical** được hay không.
2. **Critical Hit (Số màu Vàng):** Gây thêm `35%` sát thương vật lý (`+50%` trị liệu). Bắt buộc phải vượt qua Precision trước.
3. **Affinity Hit (Số màu Cam):** Trạng thái tối thượng, gây sát thương tăng cường dựa trên **Max Physical Attack** (`+20%` bonus). Hoạt động hoàn toàn **độc lập**, không cần Precision vẫn kích hoạt được. Trần cơ bản là `40%`.
4. **Abrasion (Số màu Xám — Sượt):** Nếu đòn đánh trượt cả Precision lẫn Affinity, sát thương bị ép về mức **Min Physical Attack**.

#### Phương trình phân phối xác suất

Hệ thống luôn ưu tiên kiểm tra **Affinity** trước **Crit** (một đòn đánh không thể vừa Crit vừa Affinity):

```text
Actual Affinity Rate = Affinity Rate
Actual Crit Rate     = Precision Rate × (1 − Affinity Rate)
Abrasion Rate        = (1 − Precision Rate) × (1 − Affinity Rate)
Standard Rate        = 1 − Actual Affinity Rate − Actual Crit Rate − Abrasion Rate
```

**Hệ quả chiến lược:**

- Nếu `Crit Rate + Affinity Rate > 100%`, Affinity vẫn giữ nguyên và ghi đè trực tiếp lên Crit Rate.
- Để triệt tiêu hoàn toàn đòn Sượt (`Abrasion Rate = 0%`), bắt buộc đẩy **Precision Rate = 100%**.
- Mục tiêu tối thượng khi Tuning: **Precision = 100%** và **(Crit + Affinity) >= 100%**, khi đó đòn đánh chỉ nhảy số Cam (Affinity) hoặc Vàng (Crit).

---

### 1.3. Mô Hình Tính Toán Sát Thương & Nghịch Lý "Other Path Min"

Nền tảng sát thương vật lý được tính theo cấu trúc:

```text
Base Dmg = Weapon / Skill Attack + Flat Dmg + Elemental Logic
```

Trong đó thành phần `Elemental Logic` cho 4 nhánh võ công (**Bellstrike, Bamboocut, Silkbind, Stonesplit**) vận hành như sau:

```text
Elemental Logic = (Matching Path Atk + Formless Atk) × Matching Scaling
                + (Non-Matching Path Atk × Non-Matching Scaling)
```

Điều thú vị là hiện tượng **Other Path Min (Min của hệ phái ngoại lai)**: giả sử bạn chơi Bellstrike nhưng trang bị có dòng `Bamboocut Min Attack` và **hoàn toàn không có dòng `Bamboocut Max Attack` (`Max = 0`)**. Khi đó hệ thống gộp toàn bộ giá trị Min Attack ngoại lai đó thành một hằng số sát thương cộng thẳng vào mọi đòn đánh.

Thứ tự giá trị dòng công khi Tuning:

```text
Other Path Min Atk > Own Path Max Atk > Own Path Min Atk
```

#### Cấu trúc Kháng chỉ số theo cấp độ (Resistance Modifiers)

Ở ngưỡng cấp độ cao (đặc biệt Level 91+), hệ thống áp dụng cơ chế `Resistance` làm suy giảm tỷ lệ Crit và Affinity gốc:

```text
Final Crit Rate     = min(80%, Raw Crit Rate / (1 + Resistance)) + Direct Crit Rate
Final Affinity Rate = min(40%, Raw Affinity Rate / (1 + Resistance)) + Direct Affinity Rate
```

Mức `Resistance` tăng dần theo khung cấp độ:
- **Level 81–85:** `15%` Resistance
- **Level 86–90:** `30%` Resistance
- **Level 91–95:** `45%` Resistance
- **Level 96–100:** `65%` Resistance

Do ở Level 96–100 chỉ số Raw bị chia cho `1.65`, giải pháp hiệu quả ở Endgame là đầu tư vào **Direct Crit Rate** và **Direct Affinity Rate** (từ đột phá Tâm pháp / Inner Way) vì chúng cộng ngoài hàm `min(...)` và không bị cắt giảm bởi `Resistance`.

---

### 1.4. Kinh Tế Tinh Chỉnh Trang Bị (Gear Tuning Economy)

#### 1.4.1. Các loại đá Tuning

- **Retuning Stones:** Dùng để reroll 1 trong 5 dòng chỉ số đầu tiên sang nhánh khác. Có thể mua giới hạn từ Battle Pass Shop hoặc NPC thương nhân **"Bar"** cạnh điểm dịch chuyển *Fortress Pass* ở vùng Hexi (`100,000 coins` mua 1 lần, hoặc `200 Echo Jades/viên`, giới hạn 1 viên/tuần trong chu kỳ 5 tuần).
- **Alteration Stones:** Dùng riêng để reroll dòng thứ 6 (*Attunement / Arena Attunement*), cho phép chọn giữ dòng cũ hoặc nhận dòng mới. Tính năng *Historical Attuning* (tốn 20 Echo Jades) cho phép khôi phục lại bất kỳ dòng nào từng roll trước đó trên món đồ. Có thể mua 2 viên/tuần tại BP Shop.
- **Supreme Stones:** Khóa chắc chắn dòng reroll ra sẽ đạt cấp tối đa (**Gold / Max stat**). **Chỉ nên dùng trên món trang bị vốn drop ra với dòng đầu tiên là Huyền thoại (Legendary)**.

#### 1.4.2. Vòng tuần hoàn tài nguyên (Recycle vs. Feed)

Từ cấp 90 trở đi, tính năng **Kế thừa (Pass on)** cho phép chuyển các dòng đã Tuning từ đồ Tier thấp sang đồ Tier cao hơn. Tuyệt đối không dùng đồ rác *Feed* trực tiếp vào trang bị chính — hãy **Tháo dỡ (Recycle)** trước để thu hồi tối đa nguyên liệu XP (*Gear Echoes*) và tiết kiệm lượng lớn Coins. Các vỏ tím (Purple shells) có thể quy đổi sang vỏ vàng (Gold shells) theo tỷ lệ `3:1` ở cấp 90.

---

### 1.5. Phân Nhánh Hệ Phái Võ Công & Quy Tắc Cộng Hưởng

1. **Bellstrike (Chuông Trống):** Sword & Spear.
   - *Splendor (Hào Quang):* Nameless Sword / Nameless Spear — cận chiến hạng nặng, tối ưu đòn tụ lực.
   - *Umbra (Bóng Tối):* Strategic Sword / Heavenquaker Spear — cấu rỉa, gây Chảy máu (Bleed), ưu tiên Max Attack & Affinity %.
2. **Bamboocut (Tre Cắt):** Infernal Twinblades & Mortal Rope Dart — cơ động cao, chuỗi combo nhanh kích Precision/Crit.
3. **Silkbind (Tơ Trói):** Umbrella / Fan — nhánh *Jade* và *Deluge*, thiên về thuộc tính & hỗ trợ.
4. **Stonesplit (Đá Chẻ):** Stormbreaker Spear — thiên về *Body*, *Defense*, Tank Survivability.

> **Quy tắc cộng hưởng (Synergy Rule):** Luôn đồng bộ hệ phái của vũ khí với Tâm pháp (Inner Ways) để không bị hụt sát thương cộng hưởng. Cung (Bow) đóng vai trò vũ khí thứ ba phổ quát để kéo quái hoặc lấy buff mở màn.

---

## Phần 2: Cẩm Nang Tân Thủ (Newbie Guide)

### 2.1. Cách xem chỉ số thật trong UI

1. Mở **Menu chính** → chọn tab **Develop**.
2. Tìm mục **Current Build** → nhấn **Details**.
3. Đừng chỉ nhìn *Gear Score* bên ngoài; sức mạnh thật nằm ở bảng chi tiết *Combat Attributes* bên trong.

### 2.2. Thứ tự ưu tiên chỉ số cho DPS

1. **Precision Rate = 100%:** Bắt buộc để loại bỏ đòn Sượt (số xám).
2. **Affinity Rate & Momentum:** Đạt trần `40%` Affinity (số cam, +20% trên Max Attack).
3. **Critical Rate & Power:** Đẩy trần Max Attack và sát thương Crit (số vàng, +35%).
4. **Other Path Min Attack:** Tận dụng quy tắc `Other Path Min > Own Path Max > Own Path Min` (không nhận Other Path Max).

### 2.3. 4 bẫy tân thủ cần tránh

1. **Đốt thuốc năng lượng (Energy Pills / Pillow Powder) quá sớm:** Hãy giữ lại tới mốc Solo Level 12 (Tier 81) hoặc farm Inner Way hiếm.
2. **Chọn nhầm vũ khí khởi đầu:** Tránh chọn Dual Blades hoặc Fan lúc đầu (nhặt rất dễ sau vài nhiệm vụ); hãy ưu tiên **Spear** hoặc **Umbrella**.
3. **Đập Supreme Stones vào phôi rác:** Chỉ đầu tư Supreme Stones vào đồ có dòng đầu màu Vàng/Legendary và đúng hệ phái.
4. **Feed trực tiếp thay vì Recycle:** Luôn bấm **Recycle** đồ cũ để thu hồi Gear Echoes và tiết kiệm Coins.

### 2.4. Quy trình Tuning chuẩn khi lên Tier 71–81+

1. **Chắt lọc Base:** Giữ món có dòng đầu tiên phẩm Vàng và đúng hệ phái.
2. **Sửa 5 dòng đầu (Retuning):** Dùng *Retuning Stones* đổi dòng rác sang Precision / Momentum / Max Attack.
3. **Tái sinh dòng 6 (Alteration):** Dùng *Alteration Stones* tối ưu dòng Attunement (có thể giữ dòng cũ hoặc khôi phục qua *Historical Attuning*).

---

### Nguồn tham khảo

1. Where Winds Meet Wiki — Stats & Attributes (`wherewindsmeet.wiki.fextralife.com/Stats`)
2. LootBar — Stats and Attributes Explained (`lootbar.com`)
3. Reddit `r/WhereWindsMeet` & `r/wherewindsmeet_` — WWM In-depth Damage Formula, Hit Rates & Gear Tuning Guides
4. BlueStacks & MuMu Player — Where Winds Meet Classes, Mistakes & Gear Upgrade Guides
