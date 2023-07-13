import { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Chat from './Components/Chat/Chat';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

function App() {
  // const [dark, setDark] = useState(false);

  // const theme = createTheme({
  //   palette: {
  //     type: dark ? 'dark' : 'light',
  //     primary: {
  //       main: '#3f51b5',
  //     },
  //     secondary: {
  //       main: '#f50057',
  //     },
  //   },
  //   mylight: {
  //     chat__message: {
  //       backgroundColor: '#ffffff',
  //     },
  //   },
  // });

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
