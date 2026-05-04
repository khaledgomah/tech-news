import { useCallback, useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Slider from "./components/Slider";
import Body from "./components/body";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const handleSearchTermChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSearchByChange = useCallback((value) => {
    setSearchBy(value);
  }, []);

  return (
    <div style={styles.containerStyle}>
      <Header
        searchTerm={searchTerm}
        searchBy={searchBy}
        onSearchTermChange={handleSearchTermChange}
        onSearchByChange={handleSearchByChange}
      />
      <div style={styles.contentWrapper}>
        <aside style={styles.sidebarStyle}>
          <Sidebar />
        </aside>
        <main style={styles.mainContent}>
          <Slider />
          <Body searchTerm={searchTerm} searchBy={searchBy} />
        </main>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  sidebarStyle: {
    flex: '0 0 250px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRight: '1px solid #ddd',
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
};

export default App;