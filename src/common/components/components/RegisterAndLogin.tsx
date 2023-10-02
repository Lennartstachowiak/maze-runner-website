import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { handleLogin, handleRegister } from "../../../modules/auth/api/AuthAPI";
import DialogComponent from "./DialogComponet";

interface RegisterDialogProps {
  openRegisterDialog?: boolean;
  handleCloseRegisterDialog: () => void;
}

const RegisterDialog = (props: RegisterDialogProps) => {
  const { openRegisterDialog = true, handleCloseRegisterDialog } = props;
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  const handleClickLogin = () => {
    handleLogin(email, password);
  };

  const handleClickRegister = () => {
    handleRegister(email, password, repeatedPassword);
  };
  const dialogTitle = (
    <DialogTitle id={"title"}>{isLogin ? "Login" : "Register"}</DialogTitle>
  );
  const dialogContent = (
    <DialogContent>
      <Stack spacing={2}>
        <TextField
          id="email"
          label="E-Mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
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
        <Button onClick={handleClickRegister} color="primary">
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
