import config from './config';

const redirectToLogin = async (reason?: 'SessionExpired' | 'CredentialsSignin'): Promise<void> => {
  const search = new URLSearchParams({
    callbackUrl: window.location.href,
  });

  if (reason) {
    search.set('error', reason);
  }

  window.location.href = `${config.loginPath}?${search}`;
};

export default redirectToLogin;
