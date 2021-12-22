import { useContext } from 'react';
import Header from 'components/Header/Header';
import { ThemeContext } from 'providers/ThemeProvider';
import styles from './App.module.scss';
import Main from 'pages/Main';

function App() {
  const { mode } = useContext(ThemeContext);

  return (
    <div className={mode}>
      <div className={`bg-white-200 dark:bg-black-400 ${styles.app_background}`}>
        <Header />
        <div className={`${styles.container} mx-auto px-4`}>
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;