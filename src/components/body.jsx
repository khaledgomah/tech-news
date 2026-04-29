import  AiPosts from "../../AiPosts.json";
import Card from "./Card";
import React from 'react';

class Body extends React.Component {
    render() {
return (<main style={styles.contentStyle}>
            {AiPosts.map((item, index) => (
              <Card
                key={index}
                data={{...item}}
              />
            ))}
          </main>)
}}



const styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
};
export default Body;