import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { PageTitle } from "../utils/MyStyledComponents";
import useInputState from "../hooks/useInputState";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/user.validators";

interface SignUpAction {
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

interface SignInAction {
  login: (userData: { email: string; password: string }) => void;
}

type UserFormProps = SignUpAction | SignInAction;

export default function UserForm(props: UserFormProps) {
  const isLoggingIn = "login" in props;

  const {
    enteredValue: username,
    inputIsValid: usernameIsValid,
    inputHasError: usernameHasError,
    errorMessage: usernameErrorMessage,
    handleChange: handleUsernameChange,
    handleBlur: handleUsernameBlur,
    reset: resetUsername,
  } = useInputState({ validator: validateUsername });

  const {
    enteredValue: email,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    errorMessage: emailErrorMessage,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    reset: resetEmail,
  } = useInputState({ validator: validateEmail });

  const {
    enteredValue: password,
    inputIsValid: passwordIsValid,
    inputHasError: passwordHasError,
    errorMessage: passwordErrorMessage,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    reset: resetPassword,
  } = useInputState({ validator: validatePassword });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  let formIsValid = emailIsValid && passwordIsValid;
  if (!isLoggingIn) {
    formIsValid = formIsValid && usernameIsValid;
  }

  const clearForm = () => {
    !isLoggingIn && resetUsername();
    resetEmail();
    resetPassword();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    !isLoggingIn && handleUsernameBlur();
    handleEmailBlur();
    handlePasswordBlur();

    if (!formIsValid) {
      console.log("Form is invalid");
      return;
    }

    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    if (isLoggingIn) {
      props.login(userData);
    } else {
      props.register({ ...userData, username: username.trim() });
    }

    clearForm();
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 12 }}>
      <PageTitle>{isLoggingIn ? "Sign in" : "Sign up"}</PageTitle>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          {!isLoggingIn && (
            <TextField
              placeholder="Username"
              size="small"
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              error={usernameHasError}
              helperText={usernameHasError && usernameErrorMessage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <TextField
            placeholder="Email"
            size="small"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={emailHasError}
            helperText={emailHasError && emailErrorMessage}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            size="small"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={passwordHasError}
            helperText={passwordHasError && passwordErrorMessage}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <div style={{ display: "flex", gap: "0.4rem", marginTop: "2.5rem" }}>
          <Button color="error" variant="contained" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="contained" type="submit">
            {isLoggingIn ? "Login" : "Register"}
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography>
            {isLoggingIn
              ? "Don't have an account?"
              : "Already have an account?"}
          </Typography>
          <Link
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
            to={isLoggingIn ? "/signup" : "/signin"}
          >
            {isLoggingIn ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </form>
    </Container>
  );
}
