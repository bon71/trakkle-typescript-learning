import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useI18n } from '../hooks/useI18n'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="icon-md" />
      case 'dark':
        return <Moon className="icon-md" />
      case 'system':
        return <Monitor className="icon-md" />
      default:
        return <Sun className="icon-md" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return t('theme.light')
      case 'dark':
        return t('theme.dark')
      case 'system':
        return t('theme.system')
      default:
        return t('theme.light')
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        'flex items-center gap-2 px-3 py-2',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
      title={getLabel()}
    >
      {getIcon()}
      <span className="hidden sm:inline-block text-sm">
        {getLabel()}
      </span>
    </Button>
  )
}

export default ThemeSwitcher