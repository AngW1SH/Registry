export const logout = async () => {
  return fetch(process.env.NEXT_PUBLIC_SERVER_URL + "api/user/logout").then(
    (result) => result.status == 200 || result.status == 401,
  );
  /* 
  User not being logged in at the time of the request (hence the 401 status)
  kinda works out too, although really that shouldn't happen
  upd: unless they decide to mash the 'logout' button, sending multiple logout requests
  */
};
