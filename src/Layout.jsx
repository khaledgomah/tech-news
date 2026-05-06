import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar Component/NavBar';
import ChatBot from './Components/ChatBot/ChatBot';

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <ChatBot />
    </>
  );
}

export default Layout;
