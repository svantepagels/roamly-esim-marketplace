import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { IPhoneFrame } from '../IPhoneFrame';
import { Header } from '../../layout/Header/Header';
import { Footer } from '../../layout/Footer/Footer';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  
  // Show footer on all pages except checkout flow
  const showFooter = !location.pathname.includes('/checkout');

  return (
    <IPhoneFrame
      header={<Header />}
      footer={showFooter ? <Footer /> : undefined}
      showNotch={true}
    >
      {children}
    </IPhoneFrame>
  );
}
