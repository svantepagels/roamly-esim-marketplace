import { BrowserRouter } from 'react-router-dom';
import { PageShell } from '../components/templates/PageShell';
import { ErrorBoundary } from './ErrorBoundary';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <PageShell>
          <AppRoutes />
        </PageShell>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
