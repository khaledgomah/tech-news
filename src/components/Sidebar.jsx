import { useTranslation } from 'react-i18next';

function Sidebar() {
  const { t } = useTranslation('home');
  return (
    <div>

      <h3>{t('sidebar.title')}</h3>
      <form style={styles.formStyle} onSubmit={(e) => e.preventDefault()}>
        <input style={styles.inputStyle} type="email" placeholder={t('sidebar.emailPlaceholder')} required />
        <button style={styles.buttonStyle} type="submit">{t('sidebar.subscribe')}</button>
      </form>
    </div>
  );
}
const styles = {


   formStyle : {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

   inputStyle : {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },

   buttonStyle : {
    padding: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
export default Sidebar;
