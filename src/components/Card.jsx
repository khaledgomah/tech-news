import React from 'react';
class Card extends React.Component {
  render() {
    return (
    <div style={styles.cardStyle}>
      <h2 style={styles.titleStyle}>{this.props.data.ai_name}</h2>
      <p style={styles.descriptionStyle}>{this.props.data.description}</p>
      <p style={styles.descriptionStyle}>{this.props.data.provider}</p>
      <p style={styles.descriptionStyle}>{this.props.data.main_feature}</p>
      <p style={styles.descriptionStyle}>{this.props.data.tags}</p>
      <a href={this.props.data.link} target="_blank" rel="noopener noreferrer" style={styles.descriptionStyle}>
        {this.props.data.ai_name} link
      </a>
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
    color: "black",
  },

  descriptionStyle: {
    color: "#666",
    fontSize: "14px",
  },
};
export default Card;
