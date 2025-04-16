// pages/_app.tsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthLoader>
        <Component {...pageProps} />
      </AuthLoader>
    </Provider>
  );
}

export default MyApp;

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(setUser({ token, user: JSON.parse(user) }));
    }
  }, []);

  return <>{children}</>;
};
