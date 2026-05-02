import React from 'react';

class LikeDislike extends React.Component {
  render() {
    const { likes = 0, dislikes = 0, onLike, onDislike } = this.props;

    return (
      <div style={styles.actionsRow}>
        <button style={styles.likeButton} onClick={onLike}>
          Like ({likes})
        </button>
        <button style={styles.dislikeButton} onClick={onDislike}>
          Dislike ({dislikes})
        </button>
      </div>
    );
  }
}

const styles = {
  actionsRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '14px',
  },
  likeButton: {
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    backgroundColor: '#d1fae5',
    cursor: 'pointer',
    fontWeight: 600,
  },
  dislikeButton: {
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    backgroundColor: '#fee2e2',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

export default LikeDislike;
