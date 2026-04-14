import { type ReactNode } from 'react';
import styles from './IPhoneFrame.module.css';

interface IPhoneFrameProps {
  children: ReactNode;
  header?: ReactNode;     // Pinned top zone (optional)
  footer?: ReactNode;     // Pinned bottom zone (optional)
  showNotch?: boolean;    // iPhone notch decoration (default: true)
}

export function IPhoneFrame({
  children,
  header,
  footer,
  showNotch = true,
}: IPhoneFrameProps) {
  return (
    <div className={styles.frame} data-testid="iphone-frame">
      {showNotch && <div className={styles.notch} data-testid="notch" />}
      {header && (
        <div className={styles.header} data-testid="header-zone">
          {header}
        </div>
      )}
      <div className={styles.content} data-testid="content-zone">
        {children}
      </div>
      {footer && (
        <div className={styles.footer} data-testid="footer-zone">
          {footer}
        </div>
      )}
    </div>
  );
}
