import { useOutletContext } from 'react-router-dom';
import Slider from '../components/Slider';
import Body from '../components/body';

function Home() {
  const context = useOutletContext() || { searchTerm: '', searchBy: 'title' };
  const { searchTerm, searchBy } = context;

  return (
    <>
      <Slider />
      <Body searchTerm={searchTerm} searchBy={searchBy} />
    </>
  );
}

export default Home;
