import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  interactive = false,
  selected = false,
  children,
  className,
  ...props
}: CardProps) {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    interactive ? styles.interactive : '',
    selected ? styles.selected : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
