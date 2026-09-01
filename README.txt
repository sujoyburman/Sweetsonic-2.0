SweetSonic v3.9 — MIDI Academy Admin + Student Desk

NEW STUDENT PORTAL
- midi-student.html provides a student login and dashboard.
- Students can see their batch/slot, faculty, start date, 12-week/24-session plan, session progress, and upload minor project file metadata.
- Demo login: SS-MIDI-123456 / demo@example.com
- Approved, Payment Pending, Paid, and Enrolled records can access the prototype portal.

ADMIN
- midi-admin.html remains the admin student desk.
- Application records currently use browser localStorage. This is a prototype only.

PRODUCTION NEXT STEP
Use a secure backend/database and authenticated student/admin accounts. Store files in secure object storage, enforce authorization per student, and connect the payment gateway server-side. Do not use localStorage for production student PII or coursework.
