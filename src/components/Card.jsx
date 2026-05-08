import { useCallback, useMemo } from 'react';
import LikeDislike from './LikeDislike';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Card({ data, onLike, onDislike, onEdit, onDelete }) {
  const { t } = useTranslation('home');
  const category = useMemo(
    () => String(data.category ?? '').trim(),
    [data.category],
  );

  const imageSrc = useMemo(() => data.image || 'https://placehold.co/800x400', [data.image]);

  const handleLikeClick = useCallback(() => {
    onLike(data);
  }, [onLike, data]);

  const handleDislikeClick = useCallback(() => {
    onDislike(data);
  }, [onDislike, data]);

  const handleEditClick = useCallback(() => {
    onEdit(data);
  }, [onEdit, data]);

  const handleDeleteClick = useCallback(() => {
    onDelete(data.id);
  }, [onDelete, data.id]);

  return (
    <div style={styles.cardStyle}>
      <img src={imageSrc} alt={data.ai_name} style={styles.imageStyle} />
      <h2 style={styles.titleStyle}>{data.ai_name}</h2>
      <p style={styles.descriptionStyle}>{data.description}</p>
      <p style={styles.descriptionStyle}><strong>{t('posts.provider')}:</strong> {data.provider}</p>
      {category ? (
        <p style={styles.categoryLine}>
          <strong>{t('posts.category')}:</strong> <span style={styles.categoryChip}>{category}</span>
        </p>
      ) : null}
      <a href={data.link} target="_blank" rel="noopener noreferrer" style={styles.descriptionStyle}>
        {data.ai_name} {t('posts.link')}
      </a>
      <LikeDislike
        likes={data.likes}
        dislikes={data.dislikes}
        onLike={handleLikeClick}
        onDislike={handleDislikeClick}
      />
      <div style={styles.actionsRow}>
        <button type="button" style={styles.editButton} onClick={handleEditClick}>{t('posts.update')}</button>
        <button type="button" style={styles.deleteButton} onClick={handleDeleteClick}>{t('posts.delete')}</button>
        <Link to={`/news/${data.id}`} style={styles.detailsButton}>{t('posts.details')}</Link>
      </div>
    </div>
  );
}


const styles = {
  cardStyle: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  imageStyle: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '14px',
  },

  titleStyle: {
    marginTop: 0,
    color: "black",
  },

  descriptionStyle: {
    color: "#666",
    fontSize: "14px",
  },
  categoryLine: {
    color: '#666',
    fontSize: '14px',
    margin: '8px 0 10px',
  },
  categoryChip: {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '12px',
    color: '#374151',
    backgroundColor: '#f9fafb',
  },
  actionsRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '14px',
    flexWrap: 'wrap',
  },
  editButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    cursor: 'pointer',
    fontWeight: 600,
  },
  deleteButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    cursor: 'pointer',
    fontWeight: 600,
  },
  detailsButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '14px',
    display: 'inline-block',
    textAlign: 'center'
  },
};
export default Card;
