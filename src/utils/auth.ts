export function setAccessTokenToLS(access: string) {
  return localStorage.setItem('access_token', access);
}

export function getAccessTokenFromLS() {
  return localStorage.getItem('access_token') || '';
}

export function removeLocalStorage() {
  localStorage.clear();
}

export function setProfileToLS(profile: object) {
  const profileString = JSON.stringify(profile);
  return profileString ? localStorage.setItem('profile', profileString) : null;
}

export function getProfileFromLS() {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) : null;
}
