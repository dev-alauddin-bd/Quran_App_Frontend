'use client'

import { BookOpen, Home, Search, Settings, HelpCircle, Moon, Sun, Share2, Volume2, Bookmark, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

interface IconSidebarProps {
  onSearchClick: () => void
  onSettingsClick?: () => void
  onHomeClick?: () => void
  onQuranClick?: () => void
  onMenuClick?: () => void
}

export function IconSidebar({
  onSearchClick,
  onSettingsClick,
  onHomeClick,
  onQuranClick,
  onMenuClick
}: IconSidebarProps) {
  const [activeIcon, setActiveIcon] = useState('home')
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const icons = [
    { id: 'menu', icon: Menu, label: 'Menu', onClick: onMenuClick, className: 'md:hidden' },
    { id: 'home', icon: Home, label: 'Home', onClick: onHomeClick },
    { id: 'quran', icon: BookOpen, label: 'Read Quran', onClick: onQuranClick },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { id: 'audio', icon: Volume2, label: 'Audio' },
    { id: 'search', icon: Search, label: 'Search', onClick: onSearchClick },
  ]

  return (
    <div className="relative h-screen w-[76px] bg-card border-r border-border hidden md:flex flex-col items-center py-12 gap-8 transition-all duration-300 flex-shrink-0">
      <div className="flex flex-col gap-6 w-full px-3">
        {icons.map(({ id, icon: Icon, label, onClick, className }) => (
          <button
            key={id}
            onClick={() => {
              if (id !== 'theme' && id !== 'menu') setActiveIcon(id)
              onClick?.()
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group ${className || ''} ${activeIcon === id
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/60 hover:bg-muted hover:text-foreground'
              }`}
          >
            <Icon size={22} strokeWidth={2.5} className="transition-all duration-300" />

            {/* Flat Tooltip */}
            <div className="absolute left-[85px] top-1/2 -translate-y-1/2 bg-foreground text-background text-[10px] font-black px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 border border-border -translate-x-2 group-hover:translate-x-0 z-[60] uppercase tracking-widest">
              {label}
            </div>

            {/* Active Indicator Line - Flat */}
            {activeIcon === id && (
              <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-2 h-10 bg-primary rounded-r-full" />
            )}
          </button>
        ))}
      </div>



    </div>
  )
}
