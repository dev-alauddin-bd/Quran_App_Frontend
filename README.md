# Quran Mazid

A beautiful, modern Quranic reading platform built with Next.js 16, featuring audio playback, customizable fonts, and responsive design.

## Features

### Reading Experience
- **All 114 Surahs**: Complete Quran with English translations from Sahih International
- **Beautiful Arabic Typography**: Support for three Arabic fonts (KFGQ, Amiri, Scheherazade)
- **Adjustable Font Sizes**: Customize Arabic text size (20-48px) and translation size (12-24px)
- **Verse Navigation**: Easy navigation between verses with audio synchronization
- **Copy & Bookmark**: Copy verses or bookmark them for later reference

### Audio Features
- **Quranic Recitation**: High-quality audio from Mishary Al-Afasy
- **Playback Controls**: Play, pause, volume control, and progress tracking
- **Time Display**: See current and total duration of each surah's recitation

### User Interface
- **Dark Theme**: Professional dark interface optimized for reading
- **Three-Sidebar Layout**: Icon sidebar, surah navigator, and main reader
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Mobile Navigation**: Collapsible drawer for surah selection on mobile
- **Search Functionality**: Quick search to find specific surahs

### Customization
- **Font Settings Panel**: Easily adjust fonts and sizes with an intuitive modal
- **Persistent Settings**: Font preferences saved to localStorage
- **Theme Colors**: Green accent color for primary actions

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Usage

1. **Browse Surahs**: Click on any surah in the left sidebar to start reading
2. **Search**: Use the search icon to quickly find a surah by name or number
3. **Adjust Fonts**: Click "Font Settings" to customize text appearance
4. **Play Audio**: Use the audio player to listen to the recitation
5. **Copy Verses**: Click the copy icon on any verse to copy to clipboard
6. **Navigate**: Use Previous/Next buttons to move between surahs

## Project Structure

```
/components
  - IconSidebar.tsx          # Left icon navigation
  - SurahSidebar.tsx         # Surah list sidebar
  - MobileSurahDrawer.tsx    # Mobile surah selection
  - QuranReader.tsx          # Main reader component
  - AyahDisplay.tsx          # Individual verse display
  - AudioPlayer.tsx          # Audio playback controls
  - FontSettingsPanel.tsx    # Font customization modal
  - SearchModal.tsx          # Surah search interface
  - ReaderFooter.tsx         # Footer information

/hooks
  - useQuranData.ts          # Fetch Quran from API
  - useFontSettings.ts       # Manage font preferences
  - useMobileView.ts         # Detect mobile viewport

/app
  - layout.tsx               # Root layout with metadata
  - page.tsx                 # Main page orchestration
  - globals.css              # Design tokens and styles
```

## API Integration

The app integrates with:
- **Quran.com API**: Retrieves all surahs and verses
- **EveryAyah API**: Provides high-quality audio recitations

## Design System

### Colors
- **Background**: Deep charcoal (#0f0f0f)
- **Foreground**: Off-white (#f5f5f5)
- **Primary**: Green accent (#22c55e)
- **Card**: Dark gray (#1f2937)
- **Border**: Medium gray (#374151)

### Typography
- **Body Font**: Geist Sans
- **Mono Font**: Geist Mono
- **Arabic Fonts**: KFGQ (default), Amiri, Scheherazade

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Static Generation (SSG) for 114 surah pages
- Optimized images and lazy loading
- Responsive images for mobile devices
- Minimal JavaScript for fast interactions

## License

This project is provided as-is for educational and personal use. Quranic content is publicly available.

## Acknowledgments

- Quran text from Quran.com API
- Audio recitation by Mishary Al-Afasy
- English translation by Sahih International
- Built with Next.js and React

---

**Quran Mazid** - A modern platform for reading and learning the Quran
