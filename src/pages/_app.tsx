import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useHandleAuth } from "../modules/auth/api/AuthAPI";
import getTheme from "../theme";
import React from "react";
import Wrapper from "../common/components/components/Wrapper";
import LoadingDialog from "../common/components/components/LoadingDialog";
import "dotenv/config";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = getTheme();
  const { user, isLoading, mutate } = useHandleAuth();
  const authProps = { user, mutate };
  const componentProps = { ...pageProps, ...authProps };
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <Wrapper authProps={authProps}>
          <Component {...componentProps} />
        </Wrapper>
        <LoadingDialog loading={isLoading} />
      </RecoilRoot>
    </ThemeProvider>
  );
}
