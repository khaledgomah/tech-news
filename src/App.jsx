import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import React from 'react';
class App extends React.Component {

    newsData = [
    {
      title: "React",
      description: "It is a static data for testing the card component.",
    },
    {
      title: "Vite",
      description: "It is a static data for testing the card component.",
    },
    {
      title: "JavaScript",
      description: "It is a static data for testing the card component.",
    },
  ];
  render() {
    return (
      <div style={styles.containerStyle}>
        <Header />
        <div style={styles.mainAreaStyle}>
          <Sidebar />
          <main style={styles.contentStyle}>
            {this.newsData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
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
  mainAreaStyle: {
    display: "flex",
    flex: 1,
    padding: "0 20px",
  },

  contentStyle: {
    flex: 1,
    padding: "0 20px",
  },
};
export default App;
