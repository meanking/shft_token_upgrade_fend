import './index.scss';

import ToastProvider from 'components/Toast/ToastProvider';
import ThemeProvider from 'providers/ThemeProvider';
import ReactDOM from 'react-dom';

import WrappedWeb3ReactProvider from 'providers/WrappedWeb3ReactProvider';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CurrencyProvider from 'providers/CurrencyProvider';
import Web3ConnectionProvider from 'providers/Web3ConnectionProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <WrappedWeb3ReactProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <Web3ConnectionProvider>
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          </Web3ConnectionProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </WrappedWeb3ReactProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
