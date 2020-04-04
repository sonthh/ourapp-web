
// check is authenticated ?
export const checkAuth = () => {
  const json = localStorage.getItem('auth');
  const auth = JSON.parse(json);

  if (!auth) {
    return false;
  }

  return auth.token && auth.isAuthenticated;
}

// save auth data: token...
export const saveAuthData = (authData) => {
  localStorage.setItem('auth', JSON.stringify(authData));
}

export const logout = () => {
  localStorage.removeItem('auth');
}
