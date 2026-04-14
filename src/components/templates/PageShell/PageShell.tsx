import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../layout/Header/Header';
import { Footer } from '../../layout/Footer/Footer';
import styles from './PageShell.module.css';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  
  // Show footer on all pages except checkout flow
  const showFooter = !location.pathname.includes('/checkout');

  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
