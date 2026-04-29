
const Header = () => {
  

  return (
    <header style={styles.headerStyle}>
      <h1>Tech News</h1>
    </header>
  );
};

const styles = { headerStyle : {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '20px'
  }}
export default Header;
