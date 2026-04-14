import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OperatorCarousel } from './OperatorCarousel';
import { OPERATORS } from './operators';

describe('OperatorCarousel', () => {
  describe('Component Rendering', () => {
    it('should render the carousel section with correct ARIA label', () => {
      render(<OperatorCarousel />);
      const section = screen.getByRole('region', { name: /supported mobile networks/i });
      expect(section).toBeInTheDocument();
    });

    it('should display the header content', () => {
      render(<OperatorCarousel />);
      expect(screen.getByText('TRUSTED BY TRAVELERS WORLDWIDE')).toBeInTheDocument();
      expect(screen.getByText('Supported Networks')).toBeInTheDocument();
      expect(screen.getByText('Connect via 200+ mobile operators worldwide')).toBeInTheDocument();
    });

    it('should display the disclaimer text', () => {
      render(<OperatorCarousel />);
      expect(screen.getByText(/network logos are trademarks/i)).toBeInTheDocument();
    });
  });

  describe('Logo Rendering', () => {
    it('should render all 29 operator logos twice (for infinite loop)', () => {
      render(<OperatorCarousel />);
      const images = screen.getAllByRole('img');
      // 29 operators × 2 copies = 58 images
      expect(images).toHaveLength(58);
    });

    it('should have correct alt text for all logos', () => {
      render(<OperatorCarousel />);
      OPERATORS.forEach((operator) => {
        const logos = screen.getAllByAltText(`${operator.name} network operator logo`);
        // Each logo should appear twice (original + duplicate for loop)
        expect(logos).toHaveLength(2);
      });
    });

    it('should have correct logo paths', () => {
      render(<OperatorCarousel />);
      const firstLogo = screen.getAllByAltText('AT&T network operator logo')[0];
      expect(firstLogo).toHaveAttribute('src', '/logos/att.svg');
    });

    it('should have lazy loading enabled on all images', () => {
      render(<OperatorCarousel />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading structure', () => {
      render(<OperatorCarousel />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Supported Networks');
    });

    it('should have meaningful aria-label on section', () => {
      render(<OperatorCarousel />);
      const section = screen.getByLabelText(/supported mobile networks/i);
      expect(section).toBeInTheDocument();
    });

    it('should have descriptive alt text for all images', () => {
      render(<OperatorCarousel />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        const altText = img.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText).toContain('network operator logo');
      });
    });
  });

  describe('Data Integrity', () => {
    it('should have exactly 29 operators', () => {
      expect(OPERATORS).toHaveLength(29);
    });

    it('should have operators from all major regions', () => {
      const regions = new Set(OPERATORS.flatMap((op) => op.regions));
      expect(regions.has('North America')).toBe(true);
      expect(regions.has('Europe')).toBe(true);
      expect(regions.has('Asia')).toBe(true);
      expect(regions.has('Oceania')).toBe(true);
      expect(regions.has('Africa')).toBe(true);
      expect(regions.has('Latin America')).toBe(true);
    });

    it('should have valid logo paths for all operators', () => {
      OPERATORS.forEach((operator) => {
        expect(operator.logoPath).toMatch(/^\/logos\/[a-z0-9-]+\.svg$/);
      });
    });

    it('should have unique operator IDs', () => {
      const ids = OPERATORS.map((op) => op.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Regional Coverage', () => {
    it('should have 6 North American operators', () => {
      const naOperators = OPERATORS.filter((op) =>
        op.regions.includes('North America')
      );
      expect(naOperators).toHaveLength(6);
    });

    it('should have 11 European operators', () => {
      const euOperators = OPERATORS.filter((op) =>
        op.regions.includes('Europe')
      );
      expect(euOperators).toHaveLength(11);
    });

    it('should have 10 Asian operators', () => {
      const asiaOperators = OPERATORS.filter((op) =>
        op.regions.includes('Asia')
      );
      expect(asiaOperators).toHaveLength(10);
    });

    it('should include major US carriers', () => {
      const usCarriers = ['AT&T', 'T-Mobile', 'Verizon'];
      const foundCarriers = OPERATORS.filter((op) =>
        usCarriers.includes(op.name)
      );
      expect(foundCarriers).toHaveLength(3);
    });

    it('should include major global operators', () => {
      const globalOperators = ['Vodafone', 'Orange', 'China Mobile'];
      const found = OPERATORS.filter((op) =>
        globalOperators.includes(op.name)
      );
      expect(found).toHaveLength(3);
    });
  });
});
