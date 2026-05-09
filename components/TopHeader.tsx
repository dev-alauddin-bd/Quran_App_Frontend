'use client'

import { Search, Menu, Home, BookOpen, Clock, Heart, Settings, Bell, Sun, Moon, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'

interface TopHeaderProps {
  onSearchClick: () => void
  onSettingsClick: () => void
  onMenuClick: () => void
  onHomeClick: () => void
  onQuranClick: () => void
  currentView: 'home' | 'reader'
}

export function TopHeader({
  onSearchClick,
  onSettingsClick,
  onMenuClick,
  onHomeClick,
  onQuranClick,
  currentView
}: TopHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 md:hidden text-foreground/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
          >
            <Menu size={22} />
          </button>

          <div
            onClick={onHomeClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
              QM
            </div>
            <span className="hidden sm:block text-lg font-display font-black text-foreground tracking-tight">
              Quran Mazid
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-2xl border border-border/50">
          <button
            onClick={onHomeClick}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${currentView === 'home'
                ? 'bg-background text-primary shadow-sm'
                : 'text-foreground/40 hover:text-foreground'
              }`}
          >
            <Home size={14} />
            Home
          </button>
          <button
            onClick={onQuranClick}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${currentView === 'reader'
                ? 'bg-background text-primary shadow-sm'
                : 'text-foreground/40 hover:text-foreground'
              }`}
          >
            <BookOpen size={14} />
            Read Quran
          </button>
          <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-all flex items-center gap-2">
            <Clock size={14} />
            Prayer Time
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Simple Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted text-foreground/60 hover:text-primary border border-border/50 transition-all group"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="group-hover:rotate-45 transition-transform duration-500" />
            ) : (
              <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          <button
            onClick={onSearchClick}
            className="p-2.5 rounded-xl bg-muted/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary/30 transition-all flex items-center gap-3 group"
          >
            <Search size={18} className="group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Search</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onSettingsClick}
              className="p-2.5 rounded-xl text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 hidden sm:block">
            Support Us
          </button>
        </div>
      </div>
    </header>
  )
}
