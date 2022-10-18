import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LoadAuth from '../utils/LoadAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoadAuth>
        <Component {...pageProps} />
      </LoadAuth>
    </Provider>
  );
}

export default MyApp;
