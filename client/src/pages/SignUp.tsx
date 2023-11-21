import UserForm from "../components/UserForm";
import { useAppDispatch } from "../store";
import { sendSignUpRequest } from "../store/auth.thunks";

export default function SignUp() {
  const dispatch = useAppDispatch();

  const register = (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(sendSignUpRequest(userData));
  };

  return <UserForm register={register} />;
}
