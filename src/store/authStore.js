import { useState } from 'react';

export function useAuthStore() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return { user, setUser, loading, setLoading };
}


