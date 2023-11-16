import React from "react";
import RegisterDialog from "../organisms/RegisterAndLogin";
import { KeyedMutator } from "swr";
import TextButton from "../atoms/Button/TextButton";

interface RegisterDialogButtonProps {
  mutate: KeyedMutator<unknown>;
}

const RegisterDialogButton = (props: RegisterDialogButtonProps) => {
  const { mutate } = props;
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <div>
      <TextButton
        text="Login / Register"
        handleClick={handleOpenRegisterDialog}
      />
      <RegisterDialog
        openRegisterDialog={openRegisterDialog}
        handleCloseRegisterDialog={handleCloseRegisterDialog}
        mutate={mutate}
      />
    </div>
  );
};

export default RegisterDialogButton;
