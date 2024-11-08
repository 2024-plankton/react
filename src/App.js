// import logo from './logo.svg';
import './App.css';

import Chat from './components/Chat/Chat';

import {Link, Element} from 'react-scroll';

function App() {
  return (
    <div className = "head">
      {/* <img src={logo} className="App-logo" alt="logo" />*/}
      <div className = "name">
        <Link to = "chat" smooth = {true} duration = {500} className = 'cursor'>Logo</Link>
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
