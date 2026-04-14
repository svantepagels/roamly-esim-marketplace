import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Text.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'small' | 'caption' | 'lead';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'ink' | 'stone' | 'primary' | 'success' | 'error' | 'warning';
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
}

export function Text({
  variant = 'body',
  weight = 'regular',
  color = 'ink',
  as: Tag = 'p',
  children,
  className,
  ...props
}: TextProps) {
  const classNames = [
    styles.text,
    styles[variant],
    styles[`weight-${weight}`],
    styles[`color-${color}`],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
}
