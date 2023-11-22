import { useCallback, useEffect, useRef } from "react";
import User from "../types/User";
import { useAppDispatch } from "../store";
import { authActions, signOut } from "../store/auth.slice";

export default function useAuth(user: User) {
  const dispatch = useAppDispatch();
  const logoutTimer = useRef(0);

  const autoLogin = useCallback(() => {
    try {
      if (!user.token) {
        const userDataJSON = localStorage.getItem("dine-finder-user");
        if (!userDataJSON) return;
        const userData = JSON.parse(userDataJSON);
        if (
          userData.token &&
          new Date(userData.tokenExpirationDate) > new Date()
        ) {
          dispatch(authActions.login(userData));
        }
      }
    } catch (error) {
      console.log("Error:", (error as Error).message);
    }
  }, [user]);

  const autoLogout = useCallback(() => {
    try {
      if (user.token) {
        const tokenExpirationDuration =
          new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
        logoutTimer.current = setTimeout(() => {
          dispatch(signOut());
        }, tokenExpirationDuration);
      } else {
        clearTimeout(logoutTimer.current);
      }
    } catch (error) {
      console.log("Error:", (error as Error).message);
    }
  }, [user]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout]);
}
