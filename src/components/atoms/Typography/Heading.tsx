import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Heading.module.css';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export function Heading({
  level = 2,
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
  
  const classNames = [
    styles.heading,
    styles[`level${level}`],
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
