import React from 'react'
import { Languages } from 'lucide-react'
import { useI18n } from '../hooks/useI18n'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

export function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useI18n()

  const getLabel = () => {
    return language === 'ja' ? '日本語' : 'English'
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        'flex items-center gap-2 px-3 py-2',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
      title={t('common.language')}
    >
      <Languages className="icon-md" />
      <span className="hidden sm:inline-block text-sm">
        {getLabel()}
      </span>
    </Button>
  )
}

export default LanguageSwitcher