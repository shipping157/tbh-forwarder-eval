// ===== ตั้งค่า Firebase =====
// 1) วางค่าจาก Firebase Console › Project settings (ไอคอนเฟือง) › General › Your apps › SDK setup and configuration › Config
//    แทนที่ทั้งก้อน firebaseConfig ด้านล่าง
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// 2) อีเมล Google ของผู้ดูแลระบบ — แก้ไขได้ทุกอย่างและเพิ่ม/ลบผู้ใช้ได้
//    ต้องตรงกับรายชื่อในกฎ firestore.rules (ไฟล์ในโฟลเดอร์ setup)
export const OWNER_EMAILS = ["shipping@teckbeehang.com"];
