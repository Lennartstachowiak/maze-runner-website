import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { handleLogin, handleRegister } from "../../../modules/auth/api/AuthAPI";
import DialogComponent from "../molecules/DialogComponet";
import { KeyedMutator } from "swr";

interface RegisterDialogProps {
  openRegisterDialog?: boolean;
  handleCloseRegisterDialog: () => void;
  mutate: KeyedMutator<unknown>;
}

const RegisterDialog = (props: RegisterDialogProps) => {
  const {
    openRegisterDialog = true,
    handleCloseRegisterDialog,
    mutate,
  } = props;
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  React.useEffect(() => {
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    setIsEmailValid(validEmail);
    setIsPasswordValid(validPassword);
  }, [email, password]);

  const handleClickLogin = async () => {
    await handleLogin(email, password);
    await mutate();
  };

  const handleClickRegister = async () => {
    await handleRegister(email, password, repeatedPassword);
    await mutate();
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    // Regular expression pattern for password validation
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const showEmailInfo = !isEmailValid && email != "" && !isLogin;
  const showPasswordInfo = !isPasswordValid && password != "" && !isLogin;

  const dialogTitle = (
    <DialogTitle id={"title"}>{isLogin ? "Login" : "Register"}</DialogTitle>
  );
  const dialogContent = (
    <DialogContent>
      <Stack spacing={2} paddingY={1}>
        <TextField
          id="email"
          label="E-Mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {showEmailInfo && (
          <Typography color="error">
            Please enter a valid email address in the format
            example@example.com.
          </Typography>
        )}
        <TextField
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {showPasswordInfo && (
          <Typography color="error">
            Password must be 8 characters or more and include at least one
            letter, one digit, and one special symbol.
          </Typography>
        )}
        {isLogin ? (
          <></>
        ) : (
          <TextField
            type="password"
            id="repeatPassword"
            label="Repeat password"
            value={repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.target.value)}
          />
        )}
      </Stack>
    </DialogContent>
  );
  const dialogActions = (
    <DialogActions>
      <FormControlLabel
        control={<Switch onClick={() => setIsLogin(!isLogin)} />}
        label={isLogin ? "Switch to register" : "Switch to login"}
      />
      {isLogin ? (
        <Button onClick={handleClickLogin} color="primary">
          Login
        </Button>
      ) : (
        <Button
          disabled={!isEmailValid || !isPasswordValid}
          onClick={handleClickRegister}
          color="primary"
        >
          Register
        </Button>
      )}
    </DialogActions>
  );
  return (
    <DialogComponent
      id="dialog-register"
      openDialog={openRegisterDialog}
      handleCloseDialog={handleCloseRegisterDialog}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
};

export default RegisterDialog;
