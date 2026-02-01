# 🍽️ MEchelin Guide

A crowdsourced mobile app that lets locals pin and share their favorite spots with tourists. Like Michelin Guide, but by the people, for the people.

## Features

- 📍 **Interactive Map** - Browse pins on a beautiful Mapbox map
- 🏷️ **Tag System** - Filter by restaurant, view, nightlife, hidden-gem, and more
- 🔍 **AI-Powered Search** - Natural language search ("quiet place to read outside")
- 👆 **Voting** - Upvote/downvote to surface the best spots
- 🔄 **Visitor/Poster Mode** - Toggle between exploring and contributing
- 👤 **User Accounts** - Sign up to drop pins and vote

## Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Maps**: Mapbox
- **AI**: Google Gemini API (for natural language search)
- **Geospatial**: PostGIS

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)
- Accounts: Supabase, Mapbox, Google AI Studio (for AI features)

### 1. Clone and Install

```bash
cd mechelin-guide
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `sql/setup.sql`
3. Go to **Settings → API** and copy your:
   - Project URL
   - Anon public key

4. Update `src/lib/supabase.js`:
```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 3. Configure Mapbox

1. Create account at [mapbox.com](https://mapbox.com)
2. Get your public access token from the dashboard
3. Update `src/lib/constants.js`:
```javascript
export const MAPBOX_ACCESS_TOKEN = 'pk.your-token-here';
```

4. Update `app.json` with your secret token (for builds):
```json
"plugins": [
  ["@rnmapbox/maps", {
    "RNMapboxMapsDownloadToken": "sk.your-secret-token"
  }]
]
```

### 4. Configure AI Search (Optional)

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update `src/lib/ai.js`:
```javascript
const GEMINI_API_KEY = 'your-gemini-api-key-here';
```

### 5. Set Your City

Update `src/lib/constants.js` with your city's coordinates:
```javascript
export const DEFAULT_LOCATION = {
  longitude: -73.9857,  // Your city's longitude
  latitude: 40.7484,    // Your city's latitude
  zoom: 12,
};
```

### 6. Run the App

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

---

## 📁 Project Structure

```
mechelin-guide/
├── App.js                    # Entry point with navigation
├── app.json                  # Expo config
├── package.json
├── sql/
│   └── setup.sql            # Database schema & functions
└── src/
    ├── components/
    │   ├── CreatePinModal.js    # Pin creation form
    │   ├── ModeToggle.js        # Visitor/Poster switch
    │   ├── PinDetails.js        # Bottom sheet for pin info
    │   ├── PinMarker.js         # Custom map marker
    │   └── SearchBar.js         # AI-powered search
    ├── hooks/
    │   ├── useAppMode.js        # Visitor/Poster state
    │   └── useAuth.js           # Authentication context
    ├── lib/
    │   ├── ai.js                # Claude API integration
    │   ├── constants.js         # Tags, colors, config
    │   └── supabase.js          # Database client & functions
    └── screens/
        ├── AuthScreen.js        # Login/Signup
        ├── MapScreen.js         # Main map view
        └── ProfileScreen.js     # User profile
```

---

## 🗄️ Database Schema

### Tables

- **profiles** - User data (extends Supabase auth)
- **pins** - Location pins with title, description, tags
- **votes** - Upvotes/downvotes on pins

### Key Functions

- `get_pins_with_votes()` - Fetch all pins with aggregated vote counts
- `pins_within_distance(lng, lat, meters)` - Geospatial proximity search
- `upsert_vote(pin_id, user_id, value)` - Create or update a vote

---

## 🎯 Hackathon Build Order

| Hour | Task |
|------|------|
| 0-2 | Set up accounts, run SQL, get map displaying |
| 2-4 | Fetch and display pins from Supabase |
| 4-6 | Pin details view on tap |
| 6-8 | Create pin flow (long-press → form → save) |
| 8-10 | Voting functionality |
| 10-12 | Visitor/Poster mode toggle |
| 12-14 | AI-powered search |
| 14-16 | Polish UI, loading states |
| 16-18 | Bug fixes, edge cases |
| 18-22 | Testing on real device |
| 22-24 | Demo prep, pitch practice |

### If Behind Schedule, Cut:

1. AI search → just use tag filtering
2. Auth → let everyone post anonymously
3. Visitor/Poster toggle → single mode

---

## 🧪 Seed Data

Add some test pins in Supabase Table Editor or run:

```sql
INSERT INTO pins (title, description, tags, location) VALUES
('Best Coffee Downtown', 'Tiny shop with amazing pour-over. Try the Ethiopian.', 
 ARRAY['cafe', 'hidden-gem'], ST_MakePoint(-73.985, 40.748)::geography),
 
('Sunset View Spot', 'Perfect for golden hour photos. Free parking nearby.', 
 ARRAY['view', 'free', 'romantic'], ST_MakePoint(-73.990, 40.750)::geography),
 
('Late Night Tacos', 'Cash only, open until 3am. The al pastor is incredible.', 
 ARRAY['restaurant', 'cheap', 'nightlife'], ST_MakePoint(-73.982, 40.745)::geography);
```

---

## 🐛 Troubleshooting

### Map not loading
- Check Mapbox token is correct
- Ensure `@rnmapbox/maps` is properly installed
- Try running `npx expo start --clear`

### Supabase errors
- Verify RLS policies are set up
- Check the anon key (not the service key)
- Enable PostGIS extension

### Location not working
- Grant location permissions in device settings
- iOS requires explicit permission request

---

## 📱 Demo Tips

1. Pre-seed 10-15 diverse pins across different neighborhoods
2. Test the full flow: sign up → drop pin → vote
3. Show AI search with natural language queries
4. Highlight the visitor/poster mode switch
5. Emphasize the hyperlocal, community-driven angle

---

## 🚢 Next Steps (Post-Hackathon)

- [ ] Photo uploads for pins
- [ ] User verification system
- [ ] Curated "trails" (walking tours)
- [ ] Push notifications for nearby pins
- [ ] Tipping/support for contributors
- [ ] Web version for trip planning

---

Built with ❤️ for [Hackathon Name]
