import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Slider() {
  const { t } = useTranslation('home');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(
    () => ['src/assets/ai.png', 'src/assets/coding.png', 'src/assets/robot.png', 'src/assets/robot2.png'],
    [],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [nextSlide]);

  const currentSlideSrc = useMemo(() => images[currentIndex], [images, currentIndex]);

  return (
    <div style={{ textAlign: 'center', position: 'relative', maxWidth: '600px', margin: 'auto' }}>
      <img
        src={currentSlideSrc}
        alt={`Slide ${currentIndex}`}
        style={{ width: '100%', height: '300px', borderRadius: '10px', objectFit: 'cover' }}
      />

      <div style={{ margin: '10px' }}>
        <button onClick={prevSlide} style={buttonStyle}>{t('slider.previous')}</button>
        <button onClick={nextSlide} style={buttonStyle}>{t('slider.next')}</button>
      </div>

    </div>
  );
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