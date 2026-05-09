'use client'

export function ReaderFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-secondary">
      <div className="space-y-2">
        <p>
          <span className="font-semibold text-foreground">Quran Mazid</span> - A beautiful platform for reading and learning the Quran
        </p>
        <p className="text-xs">
          Audio provided by Mishary Al-Afasy • Translations from Sahih International
        </p>
        <p className="text-xs text-muted">
          © 2024 Quran Mazid. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
