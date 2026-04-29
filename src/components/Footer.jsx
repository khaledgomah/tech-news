  
const Footer = () => {


  return (
    <footer style={styles.footerStyle}>
      <p>It is my footer</p>
    </footer>
  );
};
const styles = {
     footerStyle : {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    marginTop: '20px'
  }
};

export default Footer;
