import React from 'react';
import LikeDislike from './LikeDislike';
class Card extends React.Component {
  render() {
    const { data, onLike, onDislike, onEdit, onDelete } = this.props;
    const tagsList = Array.isArray(data.tags)
      ? data.tags
      : String(data.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean);
    const imageSrc =
      data.image || `https://placehold.co/800x400`;

    return (
    <div style={styles.cardStyle}>
      <img src={imageSrc} alt={data.ai_name} style={styles.imageStyle} />
      <h2 style={styles.titleStyle}>{data.ai_name}</h2>
      <p style={styles.descriptionStyle}>{data.description}</p>
      <p style={styles.descriptionStyle}><strong>Provider:</strong> {data.provider}</p>
      <div style={styles.tagsRow}>
        {tagsList.map((tag) => (
          <span style={styles.tagChip}>{tag}</span>
        ))}
      </div>
      <a href={data.link} target="_blank" rel="noopener noreferrer" style={styles.descriptionStyle}>
        {data.ai_name} link
      </a>
      <LikeDislike
        likes={data.likes}
        dislikes={data.dislikes}
        onLike={onLike}
        onDislike={onDislike}
      />
      <div style={styles.actionsRow}>
        <button type="button" style={styles.editButton} onClick={onEdit}>Update</button>
        <button type="button" style={styles.deleteButton} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
  }
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
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '10px',
  },
  tagChip: {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '4px 10px',
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
};
export default Card;
