import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.images = [
      "src/assets/ai.png",
      "src/assets/coding.png",
      "src/assets/robot.png",
      "src/assets/robot2.png",
    ];
  }

  nextSlide= ()=>{
    console.log("next slide");
   var  newIndex = this.state.currentIndex +1;
   if (newIndex>this.images.length-1) {
      newIndex = 0;
   }
    return this.setState(() => ({
      currentIndex: newIndex
    }));
  };

  prevSlide = () => {
    console.log("previous slide");
    var newIndex = this.state.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = this.images.length - 1;
    }
    this.setState(() => ({
      currentIndex: newIndex
    }));
  };

  componentDidMount() {
    this.timer = setInterval(this.nextSlide, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { currentIndex } = this.state;
    return (
      <div style={{ textAlign: 'center', position: 'relative', maxWidth: '600px', margin: 'auto' }}>
        <img 
          src={this.images[currentIndex]} 
          alt={`Slide ${currentIndex}`} 
          style={{ width: '100%', height: '300px', borderRadius: '10px', objectFit: 'cover' }} 
        />
        
        <div style={{ margin: '10px' }}>
          <button onClick={this.prevSlide} style={buttonStyle}>previous</button>
          <button onClick={this.nextSlide} style={buttonStyle}>next</button>
        </div>

      </div>
    );
  }
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

export default Slider;