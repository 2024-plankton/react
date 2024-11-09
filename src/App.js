// import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat/Chat';
import {Link, Element} from 'react-scroll';
import logo from './components/Chat/itda_logo.jpg';

function App() {
  return (
    <div className = "head">
      <div className = "name">
        <Link to = "chat" smooth = {true} duration = {500} className = 'cursor'>
          <img src = {logo} alt = "ITDA" className = "logo" />
        </Link>
      </div>

      <div className = "body">
        <Element name = 'chat'>
          <Chat></Chat>
        </Element>
      </div>
    </div>
  );
}

export default App;
