# 🍕 MEchelin Guide [100% API LEAK FREE]

> **Discover hidden gems, not tourist traps.**

A crowdsourced local recommendations app with a retro pixel art aesthetic. Built for people who want to explore cities like a local, not a tourist.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## ✨ Features

### 🗺️ Explore Mode
- **Interactive Map** - Browse pins on a map centered on your current location
- **AI-Powered Search** - Natural language queries like "cheap food in NYC" or "romantic bars"
- **Location Detection** - Search "coffee in Providence" to filter pins by city
- **Tag Filtering** - Filter by categories: 🍕 Food, 🍺 Bars, 👀 Views, 💎 Hidden Gems, and more

### 📌 Share Mode
- **Create Pins** - Long-press anywhere to add your own hidden gem
- **AI Tag Suggestions** - Automatically suggests relevant tags based on your description
- **No Photos Required** - Keep the mystery alive! Descriptions only.

### 🔥 Trending
- **Leaderboard** - See the most upvoted spots this week
- **Time Filters** - Today, This Week, This Month
- **Gold/Silver/Bronze** badges for top 3

### 👤 Profile & Preferences
- **Save Spots** - Bookmark pins to visit later
- **Set Interests** - Choose up to 5 tags to get personalized recommendations
- **Receive Tips** - Add your Venmo/CashApp handle to receive tips for great recommendations

### 🎨 Retro Pixel Art UI
- **Windows 95 Aesthetic** - Beveled 3D buttons, window frames, title bars
- **Cream & Sky Blue** color palette
- **No rounded corners** - Pure pixel perfection

---

## 📱 Screenshots

| Explore | Trending | Profile |
|---------|----------|---------|
| *Map with pixel markers* | *Leaderboard view* | *Preferences & saved spots* |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React Native + Expo SDK 54 |
| **Maps** | react-native-maps (Google Maps) |
| **Backend** | Supabase (PostgreSQL + PostGIS) |
| **AI Search** | OpenAI GPT-4o-mini |
| **Auth** | Supabase Auth |
| **Location** | expo-location |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your phone
- Supabase account
- OpenAI API key (optional - fallback search works without it)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/mechelin-guide.git
cd mechelin-guide

# Install dependencies
npm install

# Start the development server
npx expo start --tunnel
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

---

## ⚙️ Configuration

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run these files in order:
   ```
   sql/complete-setup.sql      # Tables, functions, triggers
   sql/fix-all-issues.sql      # RLS policies
   sql/preferences-trending.sql # Preferences & trending features
   sql/providence-seed-data.sql # 25 Providence, RI locations
   ```
3. Go to **Authentication → Providers → Email** and disable "Confirm email"
4. Copy your project URL and anon key from **Settings → API**

### 2. Update Credentials

Edit `src/lib/supabase.js`:
```javascript
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';
```

### 3. OpenAI API Key (Optional)

Edit `src/lib/ai.js`:
```javascript
const OPENAI_API_KEY = 'sk-your-api-key';
```

> **Note:** The app works without an OpenAI key! The fallback search uses intelligent category detection and tag matching.

---

## 📁 Project Structure

```
mechelin-guide/
├── App.js                    # Navigation & tab setup
├── app.json                  # Expo config
├── src/
│   ├── components/
│   │   ├── CreatePinModal.js     # Pin creation form
│   │   ├── ModeTogglePixel.js    # Explore/Share toggle
│   │   ├── PinDetailsPixel.js    # Pin detail sheet
│   │   ├── PixelUI.js            # Reusable pixel components
│   │   ├── PreferencesSelector.js # Tag preference picker
│   │   ├── RecommendationPopup.js # Personalized recommendations
│   │   ├── SearchBarPixel.js     # AI search + tag filters
│   │   └── TrendingSection.js    # Trending component
│   ├── hooks/
│   │   ├── useAuth.js            # Authentication context
│   │   └── useAppMode.js         # Explore/Share mode context
│   ├── lib/
│   │   ├── ai.js                 # OpenAI search + fallback
│   │   ├── constants.js          # Colors, tags, theme
│   │   ├── stripe.js             # Tipping utilities
│   │   └── supabase.js           # Database functions
│   └── screens/
│       ├── AuthScreen.js         # Login/Signup
│       ├── MapScreenPixel.js     # Main map view
│       ├── ProfileScreen.js      # User profile
│       └── TrendingScreen.js     # Trending leaderboard
└── sql/
    ├── complete-setup.sql        # Full database schema
    ├── fix-all-issues.sql        # RLS policy fixes
    ├── preferences-trending.sql  # New features
    └── providence-seed-data.sql  # Seed data
```

---

## 🎯 Search Examples

| Query | What it does |
|-------|--------------|
| `cheap food` | Finds pins tagged with `restaurant` + `cheap` |
| `bars in NYC` | Filters to New York City, shows bars |
| `romantic date spots` | Matches `romantic` tag |
| `free things to do` | Shows pins tagged `free` |
| `hidden gems providence` | Filters to Providence, shows `hidden-gem` tags |

### Supported Cities
- New York City / NYC / Manhattan / Brooklyn
- Providence / PVD / Rhode Island
- Boston
- Los Angeles / LA
- Chicago
- San Francisco / SF

---

## 🗄️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with preferences |
| `pins` | Location pins with PostGIS geometry |
| `votes` | Upvotes/downvotes on pins |
| `saved_pins` | User's saved/bookmarked pins |
| `tips` | Tip transactions between users |

### Key Functions

| Function | Description |
|----------|-------------|
| `get_pins_with_votes()` | Returns pins with vote counts |
| `get_trending_pins(days, limit)` | Trending pins by recent votes |
| `get_recommendations_for_user(user_id)` | Personalized recommendations |
| `handle_new_user()` | Auto-creates profile on signup |

---

## 🎨 Theme Customization

The pixel art theme is defined in `src/lib/constants.js`:

```javascript
export const COLORS = {
  background: '#D4E4F7',    // Light blue grid
  surface: '#FFF8E7',       // Cream panels
  surfaceAlt: '#FFE4C9',    // Peachy panels
  titleBar: '#7BC9FF',      // Sky blue headers
  primary: '#FF6B6B',       // Coral red buttons
  text: '#5D4E37',          // Dark brown text
  upvote: '#7BC9FF',        // Blue upvote
  downvote: '#FFB4B4',      // Pink downvote
};
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the anti-algorithm movement
- Windows 95 UI aesthetic
- Local food bloggers and hidden gem hunters everywhere

---

<p align="center">
  <b>Stop following the algorithm. Start exploring.</b>
</p>

<p align="center">
  Hack@Brown 2026 SOLO HACK
</p>
