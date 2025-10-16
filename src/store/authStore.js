import { useState, useCallback } from 'react';

export function useAuthStore() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate reading a persisted session
      await new Promise((r) => setTimeout(r, 300));
      setUser(null); // set to object to simulate logged-in
    } finally {
      setLoading(false);
    }
  }, []);

  const isSignedIn = !!user;

  return { user, setUser, loading, setLoading, initialize, isSignedIn };
}


