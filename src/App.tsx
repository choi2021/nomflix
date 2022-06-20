import { ThemeProvider } from 'styled-components';
import './App.css';

import { Reset } from './reset';
import Router from './Router';
import { Theme } from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router></Router>
        <Reset></Reset>
      </ThemeProvider>
    </>
  );
}

export default App;
