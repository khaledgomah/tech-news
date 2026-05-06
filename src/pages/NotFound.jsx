import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={styles.button}>
        Return Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  errorCode: {
    fontSize: '120px',
    margin: 0,
    color: '#eee',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '32px',
    margin: '-20px 0 20px',
    color: '#333',
  },
  message: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
    maxWidth: '500px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#333',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  }
};

export default NotFound;
