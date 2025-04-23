import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  role: 'freelancer' | 'recruiter';
};

// Accepts components that expect a `user` prop
export function withAuth<P extends { user: User }>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: Omit<P, 'user'>) {
    const { token, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      // Wait until redux-persist rehydrates
      if (typeof window !== 'undefined') {
        setIsReady(true);
      }
    }, []);

    useEffect(() => {
      if (isReady && !token) {
        router.replace('/login');
      }
    }, [isReady, token]);

    if (!isReady || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };
}
