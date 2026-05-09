'use client'

import { useState, useEffect } from 'react'
import { Search, BookOpen, Clock, Heart, Bookmark, Pin, Download, ExternalLink, Mail, Facebook, Instagram, Twitter, MessageSquare } from 'lucide-react'
import { SmoothScroll } from './SmoothScroll'

interface LandingPageProps {
  surahs: any[]
  onSurahSelect: (id: number) => void
  onQuickLinkClick?: (path: string) => void
}

export function LandingPage({ surahs, onSurahSelect }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'surah' | 'juz' | 'page'>('surah')
  const [searchQuery, setSearchQuery] = useState('')

  const quickLinks = [
    { name: 'Al Mulk', id: 67 },
    { name: 'Yasin', id: 36 },
    { name: 'Al Kahf', id: 18 },
    { name: 'Al Ikhlas', id: 112 },
  ]

  const dailyVerses = [
    {
      text: "And the criminals will see the Fire and will be certain that they are to fall therein. And they will not find from it a way elsewhere.",
      reference: "[ Al Kahf : 53 ]"
    },
    {
      text: "And worship your Lord until there comes to you the certainty (death).",
      reference: "[ Al Hijr : 99 ]"
    }
  ]

  const [lastReads, setLastReads] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('quran-last-reads') || '[]')
    setLastReads(stored)
  }, [])

  const filteredSurahs = surahs?.filter(s => 
    s?.transliteration?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s?.name?.includes(searchQuery) ||
    s?.number?.toString().includes(searchQuery)
  ) || []

  return (
    <SmoothScroll root={true}>
      <div className="flex-1 min-h-screen bg-background custom-scrollbar">
        {/* Elegant Clean Hero Section */}
        <div className="relative pt-32 pb-24 px-6 md:px-12 text-center overflow-hidden border-b border-border/50 bg-background">
          {/* Subtle Traditional Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] bg-repeat pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            {/* Main Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-foreground/60 border border-border text-[10px] font-bold uppercase tracking-widest">
                <BookOpen size={14} className="text-primary" />
                <span>Quran Mazid V2.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-foreground tracking-tight leading-[1.1]">
                Read, Study, and <br />
                <span className="text-primary">
                  Understand the Quran
                </span>
              </h1>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed font-serif">
                Experience a beautiful, distraction-free reading environment tailored for deep focus and spiritual connection.
              </p>
              
              {/* Primary Call to Action */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => onSurahSelect(1)}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 transition-all uppercase tracking-widest"
                >
                  <BookOpen size={18} />
                  Start Reading
                </button>
              </div>
            </div>
            
            {/* Clean Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center bg-card border border-border rounded-2xl p-2 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                <div className="w-12 h-12 flex items-center justify-center text-foreground/40">
                  <Search size={22} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search Surah, Juz or Ayah..."
                  className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-4 text-lg font-medium text-foreground placeholder:text-foreground/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="hidden md:flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-xl text-sm font-bold shadow-sm hover:bg-foreground/90 transition-all">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2 space-y-5">
              <div className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-border" />
                Popular Surahs
                <div className="h-px w-8 bg-border" />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {quickLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => onSurahSelect(link.id)}
                    className="px-6 py-2.5 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-all text-xs font-bold shadow-sm uppercase tracking-widest text-foreground/80"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Daily Quotes & App Promo */}
            <div className="lg:w-1/3 space-y-12">
              {/* Daily Verse Card */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Heart size={20} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verse of the Day</span>
                </div>
                {dailyVerses.map((v, i) => (
                  <div key={i} className="p-8 rounded-[32px] bg-card border border-border space-y-6 group hover:border-primary/30 transition-all">
                    <p className="text-lg font-serif italic text-foreground/80 leading-relaxed">"{v.text}"</p>
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{v.reference}</div>
                  </div>
                ))}
              </div>

              {/* App Promotion Card */}
              <div className="p-10 rounded-[40px] bg-primary text-primary-foreground space-y-8 relative overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-all duration-700" />
                <div className="relative z-10 space-y-6">
                  <Download size={40} strokeWidth={2.5} />
                  <h3 className="text-2xl font-display font-black leading-tight">Download the App Quran Mazid</h3>
                  <p className="text-sm opacity-80 leading-relaxed font-medium">
                    Access 82+ Translations, 20+ Tafsir, and beautiful recitations on the go.
                  </p>
                  <button className="w-full py-4 bg-white text-primary font-bold text-xs rounded-2xl hover:bg-white/90 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                    Get Started <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Sadaqah Jariyah Card */}
              <div className="p-8 rounded-[32px] border-2 border-dashed border-primary/20 bg-primary/5 space-y-6 text-center">
                 <h3 className="text-xl font-display font-black text-foreground">Be part of Sadaqah Jariyah</h3>
                 <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                   IRD Foundation is providing Islamic apps for the benefit of Mankind. Your support helps us grow.
                 </p>
                 <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
                   I want to support
                 </button>
              </div>
            </div>

            {/* Right Column: Surah List & Collection */}
            <div className="lg:w-2/3 space-y-12">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex gap-10">
                  {(['surah', 'juz', 'page'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative py-2 text-xs font-black uppercase tracking-[0.3em] transition-all ${
                        activeTab === tab ? 'text-primary' : 'text-foreground/40 hover:text-foreground'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-4">
                   <button className="p-2 text-foreground/40 hover:text-primary transition-all"><Bookmark size={20} /></button>
                   <button className="p-2 text-foreground/40 hover:text-primary transition-all"><Pin size={20} /></button>
                </div>
              </div>

              {/* Surah Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSurahs.slice(0, 20).map(surah => (
                  <button
                    key={surah.number}
                    onClick={() => onSurahSelect(surah.number)}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary group transition-all text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center text-foreground group-hover:text-primary transition-all font-display font-bold">
                        {surah.number}
                      </div>
                      <div>
                        <div className="text-sm font-black text-foreground mb-0.5 group-hover:text-primary transition-all uppercase tracking-wider">{surah.transliteration}</div>
                        <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">{surah.translation}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-arabic text-foreground/30 group-hover:text-primary/40 transition-all">
                      {surah.name}
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full py-6 border-2 border-dotted border-border rounded-2xl text-xs font-black text-foreground/40 uppercase tracking-[0.3em] hover:border-primary/30 hover:text-primary transition-all">
                Show More Surahs
              </button>

              {/* Last Reads Section */}
              <div className="pt-12 border-t border-border space-y-8">
                 <div className="flex items-center justify-between">
                   <h3 className="text-xl font-display font-black text-foreground uppercase tracking-widest flex items-center gap-4">
                     <Clock size={20} className="text-primary" />
                     Last Reads
                   </h3>
                   <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {lastReads.length > 0 ? lastReads.map((read, i) => (
                      <div 
                        key={i} 
                        onClick={() => onSurahSelect(read.id)}
                        className="p-6 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 transition-all group cursor-pointer"
                      >
                         <div className="text-sm font-black text-foreground group-hover:text-primary transition-all mb-1">{read.name}</div>
                         <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">
                           {new Date(read.time).toLocaleDateString()}
                         </div>
                      </div>
                   )) : (
                     <div className="col-span-full py-10 text-center text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] border-2 border-dashed border-border rounded-2xl">
                       Your reading history will appear here
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl">QM</div>
                <h2 className="text-2xl font-display font-black tracking-tight">Quran Mazid</h2>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed font-medium">
                A comprehensive Islamic platform for reading and studying the Holy Quran. 
                Built with love for the Ummah.
              </p>
              <div className="flex gap-4">
                 {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                   <button key={i} className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground/40 hover:bg-primary hover:text-primary-foreground transition-all">
                     <Icon size={18} />
                   </button>
                 ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">Our Projects</h4>
              <ul className="space-y-4">
                {['Quranmazid.com', 'Dua & Ruqyah', 'IHadith', 'Al Quran Online'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs font-bold text-foreground/60 hover:text-primary transition-all">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Privacy Policy', 'Our Mission', 'Contact Us'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs font-bold text-foreground/60 hover:text-primary transition-all">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">Support</h4>
              <p className="text-xs text-foreground/40 leading-relaxed font-medium">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <button className="flex items-center gap-3 text-xs font-bold text-primary group">
                Contact Support <MessageSquare size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">
              © 2026 IRD Foundation. All rights reserved.
            </div>
            <div className="flex gap-8 text-[10px] font-black text-foreground/20 uppercase tracking-widest">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  )
}
