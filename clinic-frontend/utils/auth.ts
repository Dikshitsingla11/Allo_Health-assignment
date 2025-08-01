export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const login = (token: string) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};