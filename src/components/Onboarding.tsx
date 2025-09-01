
import React, { useState, useEffect } from 'react';
import { UserIcon } from './icons/UserIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { backgrounds } from '../data/backgrounds';
import { useGamification } from '../contexts/GamificationContext';

const Onboarding: React.FC = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('3° AHC');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [background, setBackground] = useState('');
  const { createUserProfile } = useGamification();

  useEffect(() => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBg);
  }, []);

  const courses = ["3° AHC", "3° BHC", "3° ATP", "3° BTP", "3° CTP"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          setError('La imagen es muy grande. Elige una de menos de 2MB.');
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre.');
      return;
    }
    setError('');
    createUserProfile({ name, course, profilePic });
  };

  const dynamicStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative' as 'relative',
      overflow: 'hidden',
    },
    background: {
      position: 'absolute' as 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -2,
    },
    overlay: {
      position: 'absolute' as 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 10, 20, 0.5)',
      zIndex: -1,
    }
  };


  return (
    <div style={dynamicStyles.container}>
      <div style={dynamicStyles.background}></div>
      <div style={dynamicStyles.overlay}></div>

      <div style={styles.card} className="animate-fade-in">
        <div style={styles.header}>
          <BookOpenIcon style={{ height: '3rem', width: '3rem', color: 'var(--color-primary)' }} />
          <h1 style={styles.title}>Bienvenido/a a LogiMaster</h1>
          <p style={styles.subtitle}>Crea tu perfil para comenzar tu aventura con los logaritmos.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={{ textAlign: 'center' }}>
            <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
              <div style={styles.profilePicWrapper}>
                {profilePic ? (
                  <img src={profilePic} alt="Perfil" style={styles.profilePicImage} />
                ) : (
                  <UserIcon style={{ width: '3.5rem', height: '3.5rem', color: 'var(--color-text-secondary)' }} />
                )}
              </div>
            </label>
            <input id="profile-pic-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Toca para subir una foto</p>
          </div>

          <div>
            <label htmlFor="name" style={styles.label}>Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Tu nombre y apellido"
            />
          </div>
          
          <div>
            <label htmlFor="course" style={styles.label}>Curso</label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              style={styles.input}
            >
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {error && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" style={styles.button} className="button-pop">
            Comenzar a Aprender
          </button>
        </form>
      </div>
       <style>{`
          select option {
            background-color: #1a193b;
            color: var(--color-text-primary);
          }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '2.5rem',
    border: '1px solid var(--color-border-glass)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginTop: '0.5rem'
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  profilePicWrapper: {
    width: '7rem',
    height: '7rem',
    margin: '0 auto',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '2px solid var(--color-border-glass)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  profilePicImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: '0.5rem'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '1px solid var(--color-border-glass)',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    color: 'var(--color-text-primary)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  button: {
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.875rem 1rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '0.5rem'
  },
};


export default Onboarding;