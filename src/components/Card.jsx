import React from 'react';

class Card extends React.Component {
  render() {
    const { title, description } = this.props;
    return (
    <div style={styles.cardStyle}>
      <h2 style={styles.titleStyle}>{title}</h2>
      <p style={styles.descriptionStyle}>{description}</p>
    </div>
  );
  }
}


const styles = {
  cardStyle: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },

  titleStyle: {
    marginTop: 0,
    color: "#333",
  },

  descriptionStyle: {
    color: "#666",
  },
};
export default Card;
