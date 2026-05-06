import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        &larr; Back to News
      </button>
      <div style={styles.detailsCard}>
        <h2 style={styles.title}>News Details</h2>
        <div style={styles.infoBox}>
          <p style={styles.label}>Viewing details for Post ID:</p>
          <span style={styles.idBadge}>{id}</span>
        </div>
        <p style={styles.description}>
          This page demonstrates dynamic routing in React. The ID <strong>{id}</strong> was retrieved from the URL using <code>useParams()</code>.
        </p>
        <div style={styles.placeholderContent}>
          <div style={styles.skeletonLine}></div>
          <div style={styles.skeletonLine}></div>
          <div style={styles.skeletonLineShort}></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  backButton: {
    padding: '8px 16px',
    marginBottom: '20px',
    backgroundColor: 'transparent',
    border: '1px solid #333',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#333',
    transition: 'all 0.2s',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
  },
  title: {
    margin: '0 0 20px',
    fontSize: '28px',
    color: '#333',
  },
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  label: {
    margin: 0,
    fontSize: '16px',
    color: '#666',
  },
  idBadge: {
    backgroundColor: '#333',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '30px',
  },
  placeholderContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  skeletonLine: {
    height: '16px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    width: '100%',
  },
  skeletonLineShort: {
    height: '16px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    width: '60%',
  }
};

export default NewsDetails;
