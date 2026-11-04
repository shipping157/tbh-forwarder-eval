# Forwarder Evaluation Reports — เว็บแอป (GitHub Pages + Firebase)

โปรแกรมประเมิน Freight Forwarder ของ บริษัท ยางไทยปักษ์ใต้ จำกัด (Teck Bee Hang)
หน้าเว็บอยู่บน **GitHub Pages** (ฟรี) ส่วนข้อมูลเก็บใน **Firebase Firestore** (ฟรี) ทุกคนล็อกอินด้วยบัญชี Google
และผู้ดูแลระบบกำหนดได้ว่าใครแก้ไขได้ ใครดูได้อย่างเดียว

> ในที่เก็บ (repository) นี้มีแต่ตัวโปรแกรม **ไม่มีข้อมูลบริษัท** ข้อมูลทั้งหมดอยู่ใน Firebase และอ่านได้เฉพาะคนที่ได้รับสิทธิ์
> ค่า `apiKey` ใน `firebase-config.js` เปิดเผยได้ตามปกติของ Firebase ความปลอดภัยมาจากกฎ `firestore.rules`

---

## ไฟล์

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| `index.html` | ตัวโปรแกรมทั้งหมด |
| `firebase-config.js` | ค่าการเชื่อมต่อ Firebase และอีเมลผู้ดูแลระบบ (ต้องแก้ก่อนใช้) |
| `firestore.rules` *(โฟลเดอร์ setup — ไม่ต้องอัปโหลดขึ้น GitHub)* | กฎความปลอดภัย วางใน Firebase |
| `TBH_Evaluation_Backup_2026-11-04.json` *(โฟลเดอร์ setup — ห้ามอัปโหลดขึ้น GitHub)* | ข้อมูลเดิมทั้งหมด ใช้นำเข้าครั้งแรก |

---

## ขั้นที่ 1 — สร้าง Firebase (ประมาณ 10 นาที)

1. เข้า <https://console.firebase.google.com> ด้วยบัญชี Google ของผู้ดูแลระบบ › **Create a project**
   ตั้งชื่อ เช่น `tbh-forwarder-eval` (Google Analytics ปิดได้)
2. **เปิดการล็อกอินด้วย Google**: เมนูซ้าย **Build › Authentication › Get started** › แท็บ **Sign-in method** › **Google** › เปิด **Enable** › เลือกอีเมล support › **Save**
3. **สร้างฐานข้อมูล**: **Build › Firestore Database › Create database**
   เลือก location `asia-southeast1 (Singapore)` › **Start in production mode** › Create
4. **วางกฎความปลอดภัย**: ใน Firestore Database แท็บ **Rules** › ลบของเดิมทั้งหมด ›
   วางเนื้อหาทั้งไฟล์ `firestore.rules` › ตรวจอีเมลในบรรทัด `isOwner` ให้เป็นอีเมลผู้ดูแลระบบ › **Publish**
5. **เอาค่าเชื่อมต่อ**: ไอคอนเฟือง ⚙ › **Project settings** › แท็บ General › ส่วน **Your apps** › กดไอคอน **`</>`** (Web)
   ตั้งชื่อแอป เช่น `web` (ไม่ต้องติ๊ก Firebase Hosting) › **Register app**
   จะเห็นโค้ด `const firebaseConfig = { apiKey: "...", ... }` — เก็บไว้ใช้ในขั้นที่ 2

## ขั้นที่ 2 — ขึ้นเว็บด้วย GitHub Pages (ประมาณ 5 นาที)

1. เข้า <https://github.com> › **New repository** › ชื่อ เช่น `tbh-forwarder-eval` › เลือก **Public** › **Create repository**
   (GitHub Pages แบบฟรีต้องเป็น Public — ปลอดภัยเพราะไม่มีข้อมูลบริษัทอยู่ใน repository)
2. ในหน้า repository กด **uploading an existing file** › ลากไฟล์ `index.html`, `firebase-config.js`, `README.md` ใส่ › **Commit changes**
3. เปิดไฟล์ `firebase-config.js` › ไอคอนดินสอ ✏ (Edit) ›
   แทนที่ค่า `PASTE_...` ทั้งก้อนด้วยค่า `firebaseConfig` จากขั้นที่ 1 ข้อ 5 › ตรวจ `OWNER_EMAILS` › **Commit changes**
4. **Settings › Pages** › Source: **Deploy from a branch** › Branch: **main** / **(root)** › **Save**
   รอ 1–2 นาที ด้านบนจะขึ้นลิงก์ `https://ชื่อผู้ใช้.github.io/tbh-forwarder-eval/`
5. **อนุญาตโดเมนให้ล็อกอินได้**: กลับไป Firebase › **Authentication › Settings › Authorized domains** › **Add domain** ›
   ใส่ `ชื่อผู้ใช้.github.io` (ไม่ต้องมี https:// และไม่ต้องมีชื่อ repository) › Add

## ขั้นที่ 3 — เริ่มใช้งานและนำเข้าข้อมูลเดิม

1. เปิดลิงก์จากขั้นที่ 2 ข้อ 4 › **เข้าสู่ระบบด้วย Google** ด้วยอีเมลผู้ดูแลระบบ
2. เมนูซ้าย **นำเข้า / ส่งออกข้อมูล** › การ์ด **นำเข้าไฟล์สำรอง** › เลือกไฟล์ `TBH_Evaluation_Backup_2026-11-04.json` › **ยืนยันนำเข้า**
   รอจนมุมขวาบนขึ้น “บันทึกแล้ว”
3. **เพิ่มผู้ใช้**: กดชื่อของคุณมุมขวาบน › **จัดการผู้ใช้** › ใส่อีเมล Google หนึ่งบรรทัดต่อคน
   - **ผู้แก้ไข** — กรอก/แก้คะแนน สรุปผล ข้อเสนอแนะ ตั้งค่า และส่งออกเอกสารได้
   - **ดูอย่างเดียว** — เปิดดูข้อมูล Dashboard และดาวน์โหลดเอกสารได้ แต่แก้ไม่ได้
   แล้วส่งลิงก์ให้แต่ละคน (ใช้บัญชี Google ฟรีได้)

---

## การใช้งานต่อไป

- **อัปเดตโปรแกรม**: เมื่อได้ `index.html` เวอร์ชันใหม่ ให้เข้า repository › เปิด `index.html` › ไอคอน ⋯ › **Delete file** แล้วอัปโหลดไฟล์ใหม่ หรือใช้ **Add file › Upload files** อัปโหลดทับชื่อเดิม ข้อมูลใน Firebase ไม่หาย
- **สำรองข้อมูล**: เมนู **นำเข้า / ส่งออกข้อมูล › JSON** (ไฟล์สำรองเต็ม) แนะนำทำทุกเดือนและหลังปิดรอบประเมิน
- **เพิ่มผู้ดูแลระบบอีกคน**: ใส่อีเมลเพิ่มทั้งใน `OWNER_EMAILS` (firebase-config.js) และในบรรทัด `isOwner` ของกฎ Firestore แล้ว Publish
- **ค่าใช้จ่าย**: Firebase แผนฟรี (Spark) อ่านได้ 50,000 ครั้ง/วัน เขียน 20,000 ครั้ง/วัน — เกินพอสำหรับทีมหลายสิบคน ไม่ต้องผูกบัตร

## แก้ปัญหา

| อาการ | สาเหตุ / วิธีแก้ |
|---|---|
| ขึ้น “ยังไม่ได้ตั้งค่า Firebase” | ยังไม่ได้วางค่าใน `firebase-config.js` (ขั้นที่ 2 ข้อ 3) |
| กดเข้าสู่ระบบแล้วขึ้น `auth/unauthorized-domain` | ยังไม่ได้เพิ่มโดเมน `ชื่อผู้ใช้.github.io` (ขั้นที่ 2 ข้อ 5) |
| ขึ้น “บัญชี … ยังไม่ได้รับสิทธิ์ใช้งาน” | ผู้ดูแลระบบยังไม่ได้เพิ่มอีเมลนี้ใน **จัดการผู้ใช้** |
| ผู้ดูแลระบบเองก็ขึ้นว่ายังไม่ได้รับสิทธิ์ หรือบันทึกไม่ได้ | อีเมลใน `OWNER_EMAILS` กับในกฎ `isOwner` ไม่ตรงกัน หรือยังไม่ได้กด Publish กฎ |
| แก้หน้าเว็บแล้วยังเห็นของเก่า | รอ GitHub Pages 1–2 นาที แล้วกด Ctrl+F5 · การ์ด “ข้อมูลระบบ” ในเมนูนำเข้า/ส่งออก บอกเวอร์ชันโปรแกรม |
