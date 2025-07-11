import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseClasses = 'badge'
    
    const variantClasses = {
      default: 'badge-default',
      secondary: 'badge-secondary',
      outline: 'badge-outline',
      destructive: 'badge-destructive'
    }
    
    const sizeClasses = {
      sm: 'badge-sm',
      md: 'badge-md'
    }
    
    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )
    
    return (
      <div
        id="badge-component"
        ref={ref}
        className={classes}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }