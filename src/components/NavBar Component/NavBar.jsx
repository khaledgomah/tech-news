import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={styles.headerStyle}>
      <div style={styles.topRow}>
        <h1 style={styles.title}>Tech News</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          {!user ? (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.navLink}>Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout ({user.fullName})</button>
          )}
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
  }
}

export default NavBar;
