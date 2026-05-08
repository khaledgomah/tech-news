import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('navbar');
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lng', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <header style={styles.headerStyle}>
      <div style={styles.topRow}>
        <h1 style={styles.title}>{t('app_name')}</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>{t('nav.home')}</Link>
          {!user ? (
            <>
              <Link to="/login" style={styles.navLink}>{t('nav.login')}</Link>
              <Link to="/signup" style={styles.navLink}>{t('nav.signup')}</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={styles.logoutBtn}>
              {t('nav.logout')} ({user.fullName})
            </button>
          )}
          <button onClick={toggleLanguage} style={styles.langBtn}>
            {(i18n.language || 'en').startsWith('en') ? t('arabic') : t('english')}
          </button>
        </nav>
      </div>
    </header>
  );
}

const styles = { 
  headerStyle : {
    backgroundColor: '#333',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
    padding: '5px 10px',
    borderRadius: '4px'
  },
  logoutBtn: {
    backgroundColor: '#b91c1c',
    color: 'white',
    border: 'none',
    padding: '5px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    marginLeft: '10px'
  },
  langBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    marginLeft: '10px',
    transition: 'all 0.3s ease'
  }
}

export default NavBar;
