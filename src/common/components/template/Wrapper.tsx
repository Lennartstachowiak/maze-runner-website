import { Grid, IconButton, Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthPropsInterface } from "../../types";
import WebsiteHeader from "../organisms/WebsiteHeader";

const Footer = () => {
  return <div></div>;
};

type ChildrenType = React.ReactNode | string;

interface WrapperProps {
  children: ChildrenType;
  authProps: AuthPropsInterface;
}

const Wrapper = (props: WrapperProps) => {
  const { children, authProps } = props;
  const router = useRouter();
  const isRootPath = router.pathname === "/";
  return (
    <div>
      <WebsiteHeader authProps={authProps} />
      <Container>
        <Grid container direction="row">
          {!isRootPath && (
            <Grid item xs={0.7}>
              <IconButton
                aria-label="back"
                onClick={() => router.back()}
                size="large"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={!isRootPath ? 11.3 : 12}>
            {children}
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </div>
  );
};

export default Wrapper;
