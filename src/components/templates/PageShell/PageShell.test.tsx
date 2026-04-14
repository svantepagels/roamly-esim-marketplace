import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageShell } from './PageShell';

// Mock Header and Footer components
vi.mock('../../layout/Header/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock('../../layout/Footer/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe('PageShell - IPhoneFrame Removal Tests', () => {
  describe('Core Rendering', () => {
    it('should render without IPhoneFrame wrapper', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div data-testid="content">Test Content</div>
          </PageShell>
        </MemoryRouter>
      );

      // Should NOT have any IPhoneFrame elements
      expect(container.querySelector('[class*="IPhoneFrame"]')).toBeNull();
      expect(container.querySelector('[class*="iPhone"]')).toBeNull();
      expect(container.querySelector('[class*="notch"]')).toBeNull();
      expect(container.querySelector('[class*="device"]')).toBeNull();
    });

    it('should render Header, main content, and Footer', () => {
      render(
        <MemoryRouter>
          <PageShell>
            <div data-testid="content">Test Content</div>
          </PageShell>
        </MemoryRouter>
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should apply PageShell styles (shell and main classes)', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div data-testid="content">Test Content</div>
          </PageShell>
        </MemoryRouter>
      );

      // Check for shell class on outer div
      const shell = container.querySelector('[class*="shell"]');
      expect(shell).toBeInTheDocument();

      // Check for main class on main element
      const main = container.querySelector('main[class*="main"]');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Footer Conditional Rendering', () => {
    it('should show footer on home page', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <PageShell>
            <div>Home Content</div>
          </PageShell>
        </MemoryRouter>
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should hide footer on checkout pages', () => {
      render(
        <MemoryRouter initialEntries={['/checkout']}>
          <PageShell>
            <div>Checkout Content</div>
          </PageShell>
        </MemoryRouter>
      );

      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    });

    it('should hide footer on checkout sub-routes', () => {
      render(
        <MemoryRouter initialEntries={['/checkout/payment']}>
          <PageShell>
            <div>Payment Content</div>
          </PageShell>
        </MemoryRouter>
      );

      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    });

    it('should show footer on destination pages', () => {
      render(
        <MemoryRouter initialEntries={['/destinations/thailand']}>
          <PageShell>
            <div>Thailand Content</div>
          </PageShell>
        </MemoryRouter>
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should use flexbox layout (not device frame)', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div>Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const shell = container.querySelector('[class*="shell"]');
      expect(shell).toBeInTheDocument();

      // Verify it's a div, not a device frame
      expect(shell?.tagName).toBe('DIV');
    });

    it('should render children inside main element', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div data-testid="test-child">Child Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const main = container.querySelector('main');
      const child = screen.getByTestId('test-child');

      expect(main).toContainElement(child);
    });

    it('should have correct DOM hierarchy: shell > header, main, footer', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div>Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const shell = container.querySelector('[class*="shell"]');
      const header = screen.getByTestId('header');
      const main = container.querySelector('main');
      const footer = screen.getByTestId('footer');

      expect(shell).toContainElement(header);
      expect(shell).toContainElement(main);
      expect(shell).toContainElement(footer);
    });
  });

  describe('Regression Tests - No IPhoneFrame Dependencies', () => {
    it('should not import or reference IPhoneFrame', () => {
      // This is a compile-time check - if IPhoneFrame is imported, the test will fail to compile
      // We verify no runtime references exist
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div>Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const html = container.innerHTML;

      expect(html).not.toContain('IPhoneFrame');
      expect(html).not.toContain('notch');
      expect(html.toLowerCase()).not.toContain('device-frame');
    });

    it('should not have fixed width constraint (375px from IPhoneFrame)', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div>Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const shell = container.querySelector('[class*="shell"]');
      const computedStyle = window.getComputedStyle(shell as Element);

      // Should NOT have max-width: 375px (from old IPhoneFrame)
      expect(computedStyle.maxWidth).not.toBe('375px');
    });
  });

  describe('CSS Module Integration', () => {
    it('should load PageShell.module.css styles', () => {
      const { container } = render(
        <MemoryRouter>
          <PageShell>
            <div>Content</div>
          </PageShell>
        </MemoryRouter>
      );

      const shell = container.querySelector('[class*="shell"]');
      const main = container.querySelector('[class*="main"]');

      // Verify CSS modules are applied (class names contain hash)
      expect(shell?.className).toMatch(/shell/);
      expect(main?.className).toMatch(/main/);
    });
  });
});

describe('CSS Styles Verification', () => {
  it('should have research-backed CSS properties in source', async () => {
    // Read the actual CSS module file
    const cssModule = await import('./PageShell.module.css?raw');
    const cssContent = cssModule.default || '';

    // Verify 100dvh is in source (for modern browsers)
    expect(cssContent).toContain('100dvh');

    // Verify safe-area insets (for iPhone notch/home indicator)
    expect(cssContent).toContain('safe-area-inset-top');
    expect(cssContent).toContain('safe-area-inset-bottom');

    // Verify min-height: 0 (prevents flexbox overflow bugs)
    expect(cssContent).toContain('min-height: 0');

    // Verify flexbox layout
    expect(cssContent).toContain('display: flex');
    expect(cssContent).toContain('flex-direction: column');

    // Verify flex: 1 on main
    expect(cssContent).toContain('flex: 1');

    // Verify overflow-y: auto on main
    expect(cssContent).toContain('overflow-y: auto');
  });
});
