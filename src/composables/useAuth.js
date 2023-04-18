export const isAuth = () => {
  const loggedIn = localStorage.getItem("isAuth");

  return { loggedIn };
};
