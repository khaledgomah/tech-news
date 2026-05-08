import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('home');
  return (
    <footer style={styles.footerStyle}>
      <p>{t('footer.text')}</p>
    </footer>
  );
}

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
