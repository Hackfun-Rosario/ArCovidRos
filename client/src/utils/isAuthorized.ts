const isAuthorized = (): boolean => {
  let isAuthorized = false;
  const covidapi = JSON.parse(localStorage.getItem('covidapi'));

  if (covidapi && covidapi.token) {
    isAuthorized = true;
  }

  return isAuthorized;
};

export default isAuthorized;