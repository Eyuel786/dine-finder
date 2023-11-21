import UserForm from "../components/UserForm";
import { useAppDispatch } from "../store";
import { sendSignInRequest } from "../store/auth.thunks";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const login = (userData: { email: string; password: string }) => {
    dispatch(sendSignInRequest(userData));
  };

  return <UserForm login={login} />;
}
