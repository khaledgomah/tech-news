import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

function Signup() {
  const { t } = useTranslation(['auth', 'navbar']);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('passwordsDoNotMatch'));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/users?email=${formData.email}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        toast.error(t('userAlreadyExists'));
        setLoading(false);
        return;
      }

      const createResponse = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      if (createResponse.ok) {
        toast.success(t('accountCreated'));
        navigate('/login');
      } else {
        toast.error(t('failedToCreateAccount'));
      }
    } catch (err) {
      toast.error(t('connectionError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>{t('createAccount')}</h2>
        <p style={styles.subtitle}>{t('joinCommunity')}</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('fullName')}</label>
            <input 
              name="fullName"
              type="text" 
              placeholder={t('fullNamePlaceholder')} 
              style={styles.input} 
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('email')}</label>
            <input 
              name="email"
              type="email" 
              placeholder={t('emailPlaceholder')} 
              style={styles.input} 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('password')}</label>
            <input 
              name="password"
              type="password" 
              placeholder={t('createPasswordPlaceholder')} 
              style={styles.input} 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('confirmPassword')}</label>
            <input 
              name="confirmPassword"
              type="password" 
              placeholder={t('confirmPasswordPlaceholder')} 
              style={styles.input} 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? t('creatingAccount') : t('navbar:nav.signup')}
          </button>
        </form>
        <p style={styles.footerText}>
          {t('alreadyHaveAccount')} <Link to="/login" style={styles.link}>{t('navbar:nav.login')}</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  formCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 30px',
    color: '#666',
    textAlign: 'center',
    fontSize: '14px',
  },
  errorText: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  footerText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#333',
    fontWeight: '600',
    textDecoration: 'none',
  }
};

export default Signup;
