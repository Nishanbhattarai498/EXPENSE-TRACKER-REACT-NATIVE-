# Bill Record - Expense Tracker App 💰

A modern, full-stack expense tracking application built with **React Native (Expo)** and **Node.js**. Keep track of your income and expenses, visualize your financial health, and manage your budget with ease.

<p align="center">
  <img src="(https://github.com/user-attachments/assets/e2a96ffd-8e38-479a-96a5-53f31e3a4359)
" width="250" />
  <img src="/mnt/data/WhatsApp Image 2025-11-23 at 10.38.26_69197a85.jpg" width="250" />
  <img src="/mnt/data/WhatsApp Image 2025-11-23 at 10.38.26_a768f13b.jpg" width="250" />
</p>







## 🚀 Features

- **Authentication**: Secure Sign-in/Sign-up using **Clerk** (supports Email, Google, and Facebook).
- **Dashboard**: Real-time overview of total balance, income, and expenses.
- **Transaction Management**: 
  - Add new income or expense records.
  - Categorize transactions (Food, Shopping, Transport, etc.).
  - Delete unwanted transactions.
- **Theming System**: Switch between multiple themes (Ocean, Forest, Coffee, Purple) with persistence.
- **Pull-to-Refresh**: Update your data instantly.
- **Backend API**: Custom Node.js/Express server with PostgreSQL database.

## 🛠️ Tech Stack

### Mobile (Frontend)
- **Framework**: React Native (Expo SDK 52)
- **Routing**: Expo Router
- **Styling**: StyleSheet (Dynamic Theming)
- **Authentication**: Clerk (Clerk Expo)
- **State Management**: React Hooks & Context API
- **Storage**: AsyncStorage (for theme persistence)

### Backend (API)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (NeonDB)
- **ORM/Query Builder**: Drizzle ORM / Neon Serverless
- **Rate Limiting**: Upstash Redis

## 📂 Project Structure

```
EXPENSE-TRACKER-REACT-NATIVE/
├── Backend/             # Node.js Express Server
│   ├── config/          # DB & Redis configuration
│   ├── controllers/     # Logic for transactions
│   ├── middleware/      # Rate limiting & Auth
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
│
└── mobile/              # React Native Expo App
    ├── app/             # Expo Router screens
    ├── components/      # Reusable UI components
    ├── context/         # Theme & Auth context
    ├── hooks/           # Custom hooks (useTransaction)
    └── styles/          # Theme-aware stylesheets
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your phone (or Android Studio/Xcode for simulation)

### 1. Clone the Repository
```bash
git clone https://github.com/Nishanbhattarai498/EXPENSE-TRACKER-REACT-NATIVE-.git
cd EXPENSE-TRACKER-REACT-NATIVE-
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:
```env
PORT=3000
DATABASE_URL=your_neondb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Start the server:
```bash
npm run dev
```

### 3. Mobile App Setup
Open a new terminal, navigate to the mobile folder, and install dependencies:
```bash
cd mobile
npm install
```

Create a `.env` file in the `mobile` folder:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_API_URL=http://localhost:3000/api  # Or your deployed backend URL
```

Start the app:
```bash
npx expo start
```
Scan the QR code with the **Expo Go** app on your Android/iOS device.

## 📱 Building the APK (Android)

To generate a standalone APK file for Android:

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   eas login
   ```
2. Build the preview profile:
   ```bash
   cd mobile
   eas build -p android --profile preview
   ```

## 🤝 Contributing
