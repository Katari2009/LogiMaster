
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <p style={styles.text}>
          Creado por Christian Núñez Vega, Asesor Pedagógico, Programa PACE-UDA, 2025.
        </p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: '1.5rem 0',
    marginTop: 'auto',
  },
  container: {
    textAlign: 'center'
  },
  text: {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    opacity: 0.8,
  }
};

export default Footer;