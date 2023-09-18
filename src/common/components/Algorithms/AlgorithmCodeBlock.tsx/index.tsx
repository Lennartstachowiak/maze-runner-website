/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Typography, CircularProgress } from "@mui/material";
import { CopyBlock, atomOneLight } from "react-code-blocks";
import React from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prism-themes/themes/prism-one-light.css";

interface CodeBlockProps {
  showLineNumbers: boolean;
  header: string;
  initCode: string;
}

const CodeBlockComponent = (props: CodeBlockProps) => {
  const { initCode, showLineNumbers, header } = props;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [previousText, setPreviousText] = React.useState<string | null>(null);

  const [code, setCode] = React.useState(initCode);

  return (
    <Grid
      container
      padding={7}
      overflow="auto"
      sx={{
        borderRadius: 10,
        color: (theme) => theme.palette.background.default,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h3" color="initial" paddingBottom={2.5}>
            {header}
          </Typography>
        </Grid>
      </Grid>
      <Grid height="calc(100% - 52px)" overflow="auto" sx={{ borderRadius: 4 }}>
        {loading && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
            height="100%"
          >
            <CircularProgress />
            <Typography variant="h4" color="initial" paddingTop={2}>
              Loading...
            </Typography>
          </Grid>
        )}
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.python, "python")
          }
          padding={10}
          style={{
            color: "#262B47",
          }}
        />

        {error && (
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
            height="100%"
          >
            <SentimentDissatisfiedIcon
              fontSize="large"
              sx={{ color: "#000000" }}
            />
            <Typography variant="h4" color="initial" paddingTop={2}>
              Error
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CodeBlockComponent;
