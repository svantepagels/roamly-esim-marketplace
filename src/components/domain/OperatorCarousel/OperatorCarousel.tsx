import React from 'react';
import styles from './OperatorCarousel.module.css';
import { OPERATORS } from './operators';

export const OperatorCarousel: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Supported Mobile Networks">
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>TRUSTED BY TRAVELERS WORLDWIDE</p>
        <h2 className={styles.title}>Supported Networks</h2>
        <p className={styles.subtitle}>
          Connect via 200+ mobile operators worldwide
        </p>
      </div>

      {/* Carousel */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {/* First copy of operators */}
          {OPERATORS.map((operator) => (
            <img
              key={`${operator.id}-1`}
              src={operator.logoPath}
              alt={`${operator.name} network operator logo`}
              className={styles.logo}
              loading="lazy"
            />
          ))}
          {/* Second copy for infinite loop */}
          {OPERATORS.map((operator) => (
            <img
              key={`${operator.id}-2`}
              src={operator.logoPath}
              alt={`${operator.name} network operator logo`}
              className={styles.logo}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Optional footer disclaimer */}
      <p className={styles.disclaimer}>
        Network logos are trademarks of their respective owners. Displayed to indicate network compatibility.
      </p>
    </section>
  );
};
