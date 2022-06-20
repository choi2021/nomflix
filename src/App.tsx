import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { myContentsAtom } from './atoms';

import { Reset } from './reset';
import Router from './Router';
import { Theme } from './theme';

function App() {
  const setMyContents = useSetRecoilState(myContentsAtom);
  useEffect(() => {
    setMyContents((prev) => {
      const strPrevContents = localStorage.getItem('my_contents');
      if (!strPrevContents) {
        return prev;
      } else {
        const myContents = JSON.parse(strPrevContents!);
        return myContents;
      }
    });
  }, [setMyContents]);
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
