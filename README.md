📌 Overview

Bridge هو نظام متكامل لإدارة طلبات الشراء عبر الإنترنت، يربط بين:

العملاء (Customers)
المحلات (Stores)
المندوبين (Drivers)
الإدارة (Admin Panel)

النظام يهدف إلى معالجة الطلبات بشكل تلقائي وسريع، من لحظة إنشاء الطلب حتى تسليمه للزبون.

🧠 System Architecture

يتكون النظام من 4 أجزاء رئيسية:

1. Customer App (Flutter)
المستخدم يقوم بإنشاء الطلب
الطلب يُرسل إلى النظام بحالة New
2. Store Dashboard (Seller)
يستقبل الطلبات بشكل لحظي (Real-time)
يقوم بـ:
تغيير الحالة إلى Processing
ثم إلى Ready for Pickup
لا يتعامل مع التوصيل مباشرة
3. Delivery System (Drivers)
يستلم الطلبات بعد تجهيزها
يتم تجميع الطلبات داخل Batches
يتم تعيين الطلبات إلى Missions للمندوبين
حالات الطلب:
Assigned
On the way
Delivered
4. Admin Panel
إدارة كاملة للنظام:
الطلبات (Orders)
المحلات (Stores)
المندوبين (Drivers)
التجميع (Batches)
المهمات (Missions)
عرض إحصائيات وتقارير
التحكم في إعدادات النظام
تسجيل كل العمليات في Audit Logs
🔁 Order Flow
العميل ينشئ الطلب → الحالة: new
يظهر للمحل مباشرة (WebSocket)
المحل يضغط:
processing
ثم ready
عند ready:
يتم إرسال الطلب إلى Queue
يدخل في نظام Batching
يتم إنشاء Batch
يتم تعيين الطلب لمندوب (Mission)
يبدأ التوصيل → delivering
يتم التسليم → delivered
⚙️ Technologies Used
Backend: Node.js + Express.js
Database: PostgreSQL
Real-time: WebSocket (Socket.io)
Queue System: Redis + BullMQ
🧱 Database Design (Main Tables)
Users (customers, admins, drivers, stores)
Orders
Order_Items
Stores
Drivers
Batches
Batch_Orders
Missions
Roles & Permissions
Audit Logs
🔌 Main APIs
Store APIs
GET /store/orders
POST /store/order/:id/processing
POST /store/order/:id/ready
Admin APIs
GET /admin/orders
PATCH /admin/order/:id
GET /admin/batches
GET /admin/drivers
Driver APIs
GET /driver/missions
POST /driver/order/:id/start
POST /driver/order/:id/delivered
📡 Real-Time Updates
يتم استخدام WebSocket لإرسال الطلبات الجديدة للمحل مباشرة
بدون الحاجة لعمل Refresh
🔐 Security & Roles

النظام يعتمد على:

Roles (Admin, Support, Finance, Driver, Store)
Permissions لكل Role
حماية APIs حسب الصلاحيات
📊 Additional Features
Dashboard إحصائي
تقارير مالية (Finance Reports)
إعدادات ديناميكية (Batch size, delivery limits)
تتبع العمليات (Audit Logs)
🎯 Goal

بناء نظام سريع، منظم، وقابل للتوسع، بحيث:

المحل يجهز فقط
النظام يدير باقي العمليات تلقائيًا
تقليل الأخطاء البشرية
تحسين سرعة التوصيل
