export const getSafeAuthRedirect = (redirect?: string) => {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return '/';
  }

  return redirect;
};
