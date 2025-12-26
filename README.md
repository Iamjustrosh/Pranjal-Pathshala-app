# 🎓 Pranjal Pathshala - Coaching Institute Management App

A comprehensive coaching institute management system built with **React Native (Expo)** and **Supabase**, featuring multi-account support, real-time notifications, and complete student-admin workflows.

---

## 📱 **Features**

### **Student Features**
- ✅ Multi-account login (up to 5 accounts per device)
- ✅ View daily tasks with submission tracking
- ✅ Take timed quizzes with instant results
- ✅ Access study materials (PDFs, Google Drive links)
- ✅ Track performance analytics and class rankings
- ✅ View attendance records
- ✅ Check fee payment status
- ✅ Real-time notifications with unread badges

### **Admin Features**
- ✅ Approve/reject student registrations
- ✅ Create and manage quizzes
- ✅ Upload study materials (books, solutions, notes)
- ✅ Assign tasks to students
- ✅ Verify task submissions and award points
- ✅ Mark daily attendance
- ✅ Enter test marks
- ✅ Manage fee records
- ✅ Session management (yearly promotion system)

---

## 🛠️ **Tech Stack**

| Category | Technology |
|----------|------------|
| **Frontend** | React Native (Expo), TypeScript |
| **Backend** | Supabase (PostgreSQL) |
| **State Management** | Zustand |
| **Navigation** | Expo Router |
| **Forms** | React Hook Form + Zod |
| **Storage** | Expo SecureStore (encrypted) |
| **UI Styling** | Tailwind CSS (NativeWind) |
| **Notifications** | Expo Notifications + FCM |
| **Date Handling** | date-fns |

---

## 🏗️ **Architecture**

### **Session-Based System**
- Academic year = one session (e.g., "2025-26")
- Students promoted to new class each year
- Historical data preserved across sessions
- Username remains constant (e.g., PP25091000)

### **Multi-Account Support**
- Family-friendly: Multiple siblings can use one device
- Up to 5 accounts per device
- Encrypted local storage (Expo SecureStore)
- Real-time notification badges per account

### **Security**
- Row-Level Security (RLS) enabled on all tables
- Password hashing via Supabase Auth
- Encrypted session tokens
- Role-based access control (student/admin)

---

## 📂 **Project Structure**
```
Pranjal-Pathshala/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Authentication flow
│   ├── (student)/           # Student app (4 tabs)
│   ├── (admin)/             # Admin panel
│   └── (shared)/            # Shared screens (quiz, tasks)
├── components/              # Reusable UI components
│   ├── student/
│   ├── admin/
│   ├── shared/
│   └── ui/                  # Base components
├── lib/                     # Core libraries
│   ├── supabase.ts          # Supabase client
│   ├── accountManager.ts    # Multi-account logic
│   └── secureStorage.ts     # Encrypted storage
├── services/                # API service layer
│   ├── auth.service.ts
│   ├── quiz.service.ts
│   ├── task.service.ts
│   └── ...
├── store/                   # Zustand stores
│   ├── useAuthStore.ts
│   └── useNotificationStore.ts
├── types/                   # TypeScript definitions
├── utils/                   # Utility functions
└── constants/               # App constants
```

---

## 🗄️ **Database Schema**

### **Core Tables:**
- `profiles` - User accounts (students & admins)
- `academic_sessions` - Yearly sessions (2025-26, 2026-27)
- `student_sessions` - Links students to classes per session

### **Academic Tables:**
- `quizzes` - Quiz metadata with questions (JSONB)
- `quiz_attempts` - Student quiz submissions
- `study_materials` - Books, solutions, notes
- `tasks` - Daily homework assignments
- `task_submissions` - Student task submissions

### **Operations Tables:**
- `attendance` - Daily attendance records
- `test_marks` - Manual test score entry
- `fees` - Monthly fee tracking
- `notifications` - In-app notifications
- `monthly_analytics` - Pre-calculated performance metrics

**See [DATABASE.md](./docs/DATABASE.md) for detailed schema** *(create this later)*

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20+ or Bun 1.0+
- Expo Go app on your phone
- Supabase account

### **Installation**

1. **Clone the repository:**
```bash
   git clone https://github.com/iamjustrosh/pranjal-pathshala.git
   cd pranjal-pathshala
```

2. **Install dependencies:**
```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install
```

3. **Setup environment variables:**
```bash
   cp .env.example .env
```
   
   Edit `.env` and add your Supabase credentials:
```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Setup Supabase database:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project
   - Run the SQL scripts in `supabase/migrations/` (in order)
   - Or use the SQL Editor to create tables manually

5. **Start the development server:**
```bash
   bun start
   # or
   npm start
```

6. **Open on your phone:**
   - Scan QR code with Expo Go (Android)
   - Scan with Camera app (iOS)

---

## 📱 **Running the App**
```bash
# Start development server
bun start

# Start on Android emulator
bun run android

# Start on iOS simulator (Mac only)
bun run ios

# Start in web browser
bun run web
```

---

## 🧪 **Testing**

### **Test Accounts**

Create test accounts via Signup flow or manually insert into database:

**Admin Account:**
```
Username: PP25000001
Password: admin123
```

**Student Accounts:**
```
Username: PP25091000 (Class 09)
Password: 01012010 (DOB-based)

Username: PP25091001 (Class 09)
Password: 15052010
```

### **Testing Multi-Account:**
1. Login with first student account
2. Tap profile icon → "Add Another Account"
3. Login with second account
4. Switch between accounts to see notification badges

---

## 📊 **Development Progress**

### **✅ Completed (Phase 0)**
- [x] Project setup with Expo + Bun
- [x] Supabase configuration
- [x] Database schema design
- [x] 13 tables created with proper relationships
- [x] Row-Level Security enabled
- [x] Test data inserted
- [x] App connected to database

### **🚧 In Progress (Phase 1)**
- [ ] Authentication system
  - [ ] Multi-account support
  - [ ] Login screen
  - [ ] Signup flow
  - [ ] Admin approval workflow
- [ ] Account switcher UI
- [ ] Notification badge system

### **📅 Planned**
- **Phase 2:** Student Home Tab
- **Phase 3:** Admin Task Management
- **Phase 4:** Study Materials
- **Phase 5:** Quiz System
- **Phase 6:** Analytics & Leaderboard
- **Phase 7:** Operations (Attendance, Fees, Marks)
- **Phase 8:** Push Notifications
- **Phase 9:** Session Management
- **Phase 10:** Testing & Polish
- **Phase 11:** APK Build & Deployment
- **Phase 12:** Marketing Website

---

## 🎯 **Key Features Roadmap**

| Feature | Status | Priority |
|---------|--------|----------|
| Multi-account login | 🚧 In Progress | High |
| Student signup/approval | 📅 Planned | High |
| Quiz system with timer | 📅 Planned | High |
| Task assignment | 📅 Planned | High |
| Study material upload | 📅 Planned | Medium |
| Attendance tracking | 📅 Planned | Medium |
| Fee management | 📅 Planned | Medium |
| Analytics dashboard | 📅 Planned | Medium |
| WhatsApp notifications | 📅 Planned | Low |
| Email notifications | 📅 Planned | Low |
| Biometric auth | 💡 Future | Low |

---

## 📚 **Documentation**

- [Setup Guide](./docs/SETUP.md) *(create later)*
- [Database Schema](./docs/DATABASE.md) *(create later)*
- [API Documentation](./docs/API.md) *(create later)*
- [Deployment Guide](./docs/DEPLOYMENT.md) *(create later)*

---

## 🤝 **Contributing**

This is a personal learning project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@iamjustrosh](https://github.com/iamjustrosh)
- Email: roshanjain7422@gmail.com

---

## 🙏 **Acknowledgments**

- [Expo](https://expo.dev/) - Amazing React Native framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service platform
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- Claude (Anthropic) - AI mentor for this project

---

## 📞 **Support**

If you have any questions or need help:
- Open an [Issue](https://github.com/iamjustrosh/pranjal-pathshala/issues)
- Email: roshanjain7422@gmail.com

---

## 🌟 **Star this repo if you find it helpful!**

---

**Built with ❤️ for coaching institutes in India**
