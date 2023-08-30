import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useHandleAuth } from "../modules/auth/api/AuthAPI";
import getTheme from "../theme";
import React from "react";
import Wrapper from "../common/components/components/Wrapper";
import LoadingDialog from "../common/components/components/LoadingDialog";
import dotenv from "dotenv";

dotenv.config();

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = getTheme();
  const { user, isLoading } = useHandleAuth();
  const componentProps = { ...pageProps, user };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper user={user}>
        <Component {...componentProps} />
      </Wrapper>
      <LoadingDialog loading={isLoading} />
    </ThemeProvider>
  );
}
