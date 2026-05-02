import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Slider from "./components/Slider";
import Body from "./components/body";

class App extends React.Component {
  render() {
    return (
      <div style={styles.containerStyle}>
        <Header />
        <div style={styles.contentWrapper}>
          <aside style={styles.sidebarStyle}>
            <Sidebar />
          </aside>
          <main style={styles.mainContent}>
            <Slider />
            <Body />
          </main>
        </div>

        <Footer />
      </div>
    );
  }
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