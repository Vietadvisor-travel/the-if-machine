# NHẬN DIỆN KÊNH THE IF MACHINE (bản 1, 03/11/2026)

File này là bộ nhận diện chung của kênh: thương hiệu, tính cách, giọng văn, mood hình và âm thanh, chữ dùng sẵn cho từng nền tảng.
Anh dùng nó để tạo các kênh cho đồng bộ. Claude và Muse dùng nó cho mọi video, caption, bài đăng.
Phần giải thích viết tiếng Việt. Phần nằm trong khung xám là chữ tiếng Anh, copy dán thẳng lên nền tảng.
Chủ file: anh. Claude và Muse chỉ sửa khi anh bảo.

---

## 1. Cốt lõi thương hiệu

| | |
|---|---|
| Tên | **The If Machine** |
| Handle (mọi nền tảng) | **@theifmachine**. Nếu bị trùng thì lấy theo thứ tự: @theifmachinetv → @ifmachine. Mọi nền tảng phải dùng cùng một handle. |
| Câu khẩu hiệu chính | **One impossible question. One surprising answer.** |
| Câu khẩu hiệu ngắn | **Pull the lever.** (dùng cho kêu gọi subscribe/follow) |
| Một câu giới thiệu | The If Machine takes one impossible question, runs the whole world through it, and prints out the answer. |
| Khán giả | Người lớn tò mò, nói tiếng Anh, chủ yếu ở Mỹ, Anh, Canada, Úc. Thích kiến thức hay nhưng muốn được giải trí. |
| Lời hứa với người xem | Mỗi video là một câu hỏi không tưởng, chạy đến cùng, ra một đáp án mà người xem không đoán được. Có số liệu thật, có nguồn, và nói rõ chỗ nào là phỏng đoán. |

**Ý tưởng thương hiệu (một hình ảnh để nhớ):** "Cỗ máy If" là một cỗ máy to, thân thiện, hơi rườm rà, có **cần gạt**, **mặt số** và **khe in vé**.
Mỗi tập phim là **một lần chạy máy**:
1. Câu hỏi được nạp vào máy.
2. Gạt cần.
3. Cả thế giới chạy theo giả định.
4. Máy in ra **tấm vé đáp án**.

Cỗ máy là **ký hiệu thương hiệu, không phải nhân vật**: không mặt, không nói. Nó chỉ xuất hiện ở 3 giây đầu (gạt cần) và vài giây cuối (in vé). Ở giữa, hình ảnh luôn là chủ thể của câu chuyện.

**Ba nghi thức lặp lại ở mọi tập** (để người xem nhận ra kênh ngay):
- **Mở:** tiếng gạt cần, và câu hỏi hiện lên bắt đầu bằng **"What if…"**.
- **Giữa:** một **đồng hồ mô phỏng** ở góc hình đếm thời gian trong thế giới giả định (DAY 1 → DAY 365, HOUR 0 → HOUR 24). Đồng hồ này thay cho chương mục.
- **Kết:** máy in vé **"RUN #0xx · COMPLETE"**, sau đó hỏi người xem *"What should the machine run next?"*.

Mỗi tập có số thứ tự riêng: **RUN #001, #002…** Số này ghi trong mô tả và trên vé cuối.

---

## 2. Tính cách và giọng văn

**Tính cách:** như một người bạn rất thông minh, đọc đủ thứ mà vẫn hào hứng như trẻ con. Tò mò, tinh nghịch, thông minh mà không lên lớp, trung thực.

| Là | Không phải |
|---|---|
| Tinh nghịch | Nhảm, lố |
| Thông minh | Giảng bài, khoe chữ |
| Bất ngờ | Câu view, giật tít sai sự thật |
| Kỳ diệu, lạc quan có căn cứ | Doạ dẫm, tận thế |
| Trung thực khi không chắc | Bịa số cho kịch tính |
| Nhanh, gọn | Vội, dồn chữ |

**Luật viết (lời đọc, caption, mô tả, bình luận):**
- Nói với **"you"**, kể ở thì hiện tại khi đang chạy giả định: *"It's 9 a.m. The internet is gone. Your phone still works. Nothing on it does."*
- Câu ngắn, mỗi câu một ý, trung bình dưới 14 từ.
- Số liệu phải cụ thể và có nguồn. Số ước lượng thì nói *"about"* hoặc *"roughly"*. Đến chỗ phải đoán thì nói thẳng: *"Here's where the machine has to guess."*
- Đùa nhẹ, kiểu quan sát, khoảng 30 giây một câu. Không đùa về thảm kịch, không chế giễu ai.
- **Cấm dùng:** "mind-blowing", "you won't believe", "scientists are baffled", "shocking", "insane", ngôn ngữ tận thế, thúc ép giả ("watch before it's deleted").

**Câu cửa miệng của kênh** (dùng gần như nguyên văn mỗi tập):
- Mở: *"What if…"*
- Bắt đầu chạy: *"Let's run it."*
- Trước twist: *"But that's not what the machine printed."*
- Kết: *"That's the run. What should the machine try next?"*

---

## 3. Giọng đọc

- **Một người dẫn duy nhất cho cả kênh**, gọi là *The Operator*: ấm, tò mò, hơi mỉm cười trong giọng, tốc độ vừa (khoảng 150–160 từ/phút), không gào, không thì thầm kịch tính.
- Giọng chính lấy từ bộ đã duyệt trong `brief/VOICE_MODELS.md` (Kokoro, Chatterbox Turbo, Supertonic 3). **Anh nghe mẫu rồi chọn một giọng**, sau đó giữ cố định. Claude sẽ làm mẫu nghe khi sang bước engine.
- Cảm xúc đổi theo đoạn: tò mò (mở), hào hứng tăng dần (chạy), chậm và trầm một nhịp (trước twist), ấm (kết).
- Kênh không lộ mặt, anh không lên hình, không lên tiếng. Chỉ dùng giọng AI.

---

## 4. Hình ảnh

**Phong cách:** hoạt hình 2D vẽ bằng code (engine canvas): mảng màu phẳng, gradient mềm, ánh viền, không nét viền đen.
**Nhân vật (anh chốt 03/11/2026):** bỏ hẳn kiểu nhân vật đầu to cũ. Dùng hệ nhân vật mới của kênh với 4 kiểu: phẳng thon dài (mặc định), viên nang, bóng đen viền sáng, nét mảnh. Mỗi tập có thể đổi kiểu để không lặp.
**Đa dạng (anh chốt 03/11/2026):** trong một tập không lặp cảnh, góc máy, chuyển cảnh; tập sau không dựa vào cảnh của tập trước. Mỗi tập có cảnh vẽ riêng cho nội dung của nó. Chỉ nghi thức thương hiệu được lặp. Không dùng 3D giả game, không dùng footage thật, không dùng ảnh AI về người thật, tài liệu thật, logo hay tít báo giả.
Hoạt hình chỉ để minh hoạ, không bao giờ giả làm tư liệu.

**Màu thương hiệu:**

| Tên | Mã | Dùng cho |
|---|---|---|
| Midnight | `#0F1226` | Nền chính, khoảng 60 % khung hình thương hiệu |
| Deep Space | `#1C2347` | Nền phụ, bảng, khung |
| Lever Yellow | `#FFC531` | **Màu chủ đạo**: chữ "IF", cần gạt, số nhấn, kêu gọi hành động (khoảng 10 %) |
| Twist Coral | `#FF5B4F` | **Chỉ dùng cho twist và đáp án**, cảnh báo (khoảng 5 %) |
| Sim Teal | `#2EE6C5` | Máy đang chạy: đồng hồ mô phỏng, dữ liệu, giao diện |
| Paper | `#F6F1E7` | Chữ sáng, tấm vé |
| Steel | `#8C95B8` | Chữ phụ |

Thế giới trong phim vẫn đủ màu thật (biển xanh, rừng lục, sao Hỏa đỏ). Màu thương hiệu chỉ làm khung: chữ, giao diện máy, chuyển cảnh, mở và kết.
Ánh sáng nghiêng về hoàng hôn và đêm, có điểm sáng vàng.

**Chữ (font miễn phí, giấy phép OFL, có trên Google Fonts):**
- **Unbounded** (đậm): logo, tiêu đề, chữ to trong phim.
- **Inter** (Bold): phụ đề, mô tả.
- **Space Mono**: chữ của máy, như đồng hồ mô phỏng, số đếm, chữ trên vé, "RUN #001".

**Logo:** chữ **"IF"** trong đó chữ **I là một cần gạt** (thân vàng, núm tròn màu coral, đế xanh đậm), chữ F màu vàng, bên cạnh là "MACHINE" màu Paper, chữ nhỏ "THE" nằm trên.
- **Avatar** mọi nền tảng: chỉ có "IF" có cần gạt trên nền Midnight tròn.
- Banner và cover: logo đầy đủ, khẩu hiệu, nền đêm có lưới mờ và vài hành tinh.

**Vật liệu đồ hoạ lặp lại:** cần gạt, tấm vé có răng cưa và đường đục lỗ, lưới mờ kiểu bản vẽ kỹ thuật, đồng hồ mô phỏng.

**Chuyển động:**
- Lúc nào cũng có chuyển động: camera trôi nhẹ, vật thể xây dần, ánh sáng đổi.
- Thế giới chuyển động mềm, có nảy. Phần của máy chuyển động kiểu cơ khí: bật từng nấc, cạch.
- Mỗi 2–3 giây (bản dọc 1–1,5 giây) có một ý hình mới.
- Có các cú "wow": zoom một mạch từ vũ trụ xuống tận con phố, chia đôi màn hình thế giới bây giờ và thế giới "nếu như", tua nhanh thời gian, con số lớn dần thành hình.

**Phụ đề:** chữ Inter Bold, trắng có bóng mờ, từ đang đọc tô vàng, tối đa 2 dòng, cố định ở dải dưới.

---

## 5. Âm thanh

- **Âm hiệu thương hiệu (khoảng 2 giây):** tiếng gạt cần "cạch", tiếng máy quay lên "vù", rồi 3 nốt chuông sáng. Phát ở đầu mỗi video và lúc in vé cuối.
- **Mood nhạc** (không lời, an toàn bản quyền YouTube):
  - Tò mò: pizzicato, marimba, synth nhẹ.
  - Kỳ diệu: pad, arpeggio, 80–100 bpm.
  - Đà tiến: nhịp synth-pop đều.
  - Hồi hộp nhẹ: tích tắc, dây trầm. Không dùng nhạc kinh dị.
  - Một tiếng "sting" cho twist.
  - Kết ấm.
- **Tránh:** drone u tối kiểu phim tội phạm, lạm dụng tiếng "braam" trailer, nhạc có lời.
- **Hiệu ứng âm thanh:**
  - Tiếng máy: cạch, rơ-le, bánh cóc, máy in vé, gõ phím.
  - Tiếng whoosh khi chuyển cảnh, tiếng bíp giao diện nhẹ.
  - Âm thanh thật của thế giới trong cảnh.
- **Một khoảng lặng 0,4–0,8 giây ngay trước twist.**
- Giọng đọc luôn nằm trên nhạc. Bản cuối khoảng −14 LUFS.

---

## 6. Khuôn mỗi tập

**Bản dài 16:9, 3–6 phút (độ dài theo nội dung, không dưới 3 phút; anh chốt 03/11/2026):**
1. 0–3 giây: gạt cần, câu hỏi, một hình gây sốc thị giác.
2. Đến giây 30: đặt luật chơi, hứa với người xem.
3. Chạy giả định theo đồng hồ mô phỏng, căng dần.
4. Twist ở khoảng 70 % thời lượng.
5. Đáp án, máy in vé.
6. 8 giây khung kết: câu hỏi tập sau và kêu gọi subscribe.

**Bản dọc 9:16, 60–90 giây:** hook riêng, một câu đặt luật, 3 nấc leo thang, twist, vé, câu cuối dẫn ngược về đầu để người xem xem lại.

**Tiêu đề:** *"What If [điều không tưởng]?"*, tối đa 55 ký tự. Với chủ đề kiến thức đời thường: *"Why Do We [việc quen thuộc]?"*.
Ví dụ:
- What If the Internet Shut Down for 24 Hours?
- What If You Never Had to Sleep Again?
- Why Do We Say "Cheese" in Photos?

**Thumbnail (anh tự làm), giữ đồng bộ:**
- Thẻ vàng **"IF"** có cần gạt luôn ở góc trên trái.
- Một chủ thể to.
- Tối đa 3 từ, font Unbounded.
- Màu coral chỉ dùng cho chi tiết twist.
- Nền Midnight hoặc nền thế giới tối.

---

## 7. Chữ dùng sẵn cho từng nền tảng

### YouTube
- **Tên kênh:** The If Machine
- **Handle:** @theifmachine
- **Mô tả kênh** (dưới 1000 ký tự):
```
What if the internet shut down for a day? What if you never had to sleep? What if money just… disappeared?

The If Machine takes one impossible question, runs the whole world through it, and prints out the answer. It's rarely the one you expect.

Every episode is a short animated thought experiment built on real science, history and numbers. When the facts run out, we say so, and show you where the machine has to guess.

New runs 3 times a week:
• Long runs (3–6 min) here on YouTube
• Quick runs (60–90 s) on Shorts, TikTok, Instagram and Facebook

Got a what-if you want the machine to run? Drop it in the comments. We read every one.

Narration is AI-generated. All visuals are original animation, made to illustrate, not real footage.
```
- **Từ khoá kênh:** what if, hypothetical, thought experiment, animated explainer, science, curiosity, future, space, history, explained
- **Khuôn mô tả mỗi video** (Muse điền vào chỗ trong ngoặc):
```
What if [question]? We ran it through the machine. RUN #[0xx].

[2–3 sentences: the setup and the hook, no spoilers of the twist]

Sources:
[list from the research pack]

Some parts of this run are educated guesses; we say where on screen.
Narration is AI-generated. Animation is illustrative, not real footage.

#whatif #theifmachine #[topic]
```
- **Bình luận ghim:**
```
The machine has spoken. Now it's your turn: what should it run next? 🕹️
```

### Facebook Page
- **Tên Page:** The If Machine
- **Hạng mục:** chọn mục gần nhất với "Entertainment website" và "Education website".
- **Giới thiệu ngắn (Intro, dưới 101 ký tự):**
```
One impossible question. One surprising answer. Animated what-ifs, 3 times a week.
```

### Instagram
- **Name** (ô này tìm kiếm được): `The If Machine | What If?`
- **Username:** theifmachine
- **Bio** (dưới 150 ký tự):
```
One impossible question.
One surprising answer. 🕹️
Animated what-ifs, 3x a week.
Full runs on YouTube 👇
```
- **Hạng mục:** Entertainment Website, hoặc Education.

### TikTok
- **Name:** The If Machine
- **Username:** theifmachine
- **Bio** (dưới 80 ký tự):
```
One impossible question. One surprising answer. New what-ifs 3x a week 🕹️
```

### Dùng chung
- **Emoji thương hiệu:** 🕹️ (cần gạt). Mỗi bài tối đa 1–2 emoji.
- **Hashtag cố định:** #whatif #theifmachine. Thêm 2–4 hashtag theo chủ đề. Không nhồi hashtag.
- **Ảnh đại diện, banner, cover:** cùng logo và màu ở mục 4 trên mọi nền tảng.
- **Link trong bio:** trỏ về kênh YouTube.
- **Dòng công bố AI:** mọi video đều ghi giọng đọc tạo bằng AI (bắt buộc khi dùng Supertonic 3, áp dụng chung cho cả kênh để đồng nhất).

---

## 8. Ai dùng phần nào

- **Anh:** tạo tài khoản theo mục 1 và 7, làm avatar, banner, thumbnail theo mục 4 và 6. Duyệt video.
- **Claude:** đưa mục 2–6 vào engine (màu, font, logo động, âm hiệu, khung kết, phụ đề, giọng) và làm video theo đúng file này.
- **Muse:**
  - viết caption, mô tả và bình luận ghim theo mục 2 và 7;
  - chọn chủ đề hợp tính cách kênh;
  - khi tìm nhạc thì theo mood ở mục 5.
