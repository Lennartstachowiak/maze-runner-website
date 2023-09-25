/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { saveAlgorithmChanges } from "../../../../modules/API";
import { AlgorithmInterface } from "../AlgorithmPreviewList/types";
import {
  ConstrainedEditorInterface,
  constrainedEditor,
} from "constrained-editor-plugin";

interface CodeBlockProps {
  showLineNumbers: boolean;
  algorithm: AlgorithmInterface | null;
}

const CodeBlockComponent = (props: CodeBlockProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const constrainedInstanceRef = useRef<ConstrainedEditorInterface | null>(
    null
  );
  const { algorithm, showLineNumbers } = props;
  const algorithmCode = algorithm?.code;
  const algorithmId = algorithm?.id;
  const headerName = algorithm?.name;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [code, codeText] = React.useState(algorithmCode);
  const [editableCode, setEditableCode] = React.useState(algorithmCode);
  if (code !== algorithmCode) {
    codeText(algorithmCode);
    setEditableCode(algorithmCode);
  }
  const handleSaveChanges = async () => {
    if (editableCode && algorithmId) {
      await saveAlgorithmChanges({
        algorithmId: algorithmId,
        newCode: editableCode,
      });
    }
  };

  // Change value for editor
  useEffect(() => {
    if (editorRef.current && code && constrainedInstanceRef.current) {
      const model = editorRef.current.getModel()!;
      model.setValue(code || "");
      let lastEditableLineIndex = 3;
      let lastEditableLineLength = 1;
      try {
        const codeLinesSplit = code.split("\n");
        const codeLines = codeLinesSplit.length;
        lastEditableLineIndex = codeLines - 3;
        lastEditableLineLength =
          codeLinesSplit[lastEditableLineIndex - 1].length + 1;
      } catch (error) {
        console.error(error);
      }

      const restrictions = [
        {
          range: [10, 1, lastEditableLineIndex, lastEditableLineLength],
          label: "funcDefinition",
          allowMultiline: true,
        },
      ];
      constrainedInstanceRef.current.removeRestrictionsIn(model);
      constrainedInstanceRef.current.addRestrictionsTo(model, restrictions);
    }
  }, [code]);

  const restrictions: object[] = [];

  // Restrict area fields
  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
    const constrainedInstance = constrainedEditor(monaco);
    constrainedInstanceRef.current = constrainedInstance;
    const model = editor.getModel()!;
    constrainedInstance.initializeIn(editor);
    let lastEditableLineIndex = 3;
    let lastEditableLineLength = 1;
    if (code) {
      try {
        const codeLinesSplit = code.split("\n");
        const codeLines = codeLinesSplit.length;
        lastEditableLineIndex = codeLines - 3;
        lastEditableLineLength =
          codeLinesSplit[lastEditableLineIndex - 1].length + 1;
      } catch (error) {
        console.error(error);
      }
    }
    const restrictions = [
      {
        range: [10, 1, lastEditableLineIndex, lastEditableLineLength],
        label: "funcDefinition",
        allowMultiline: true,
      },
    ];

    constrainedInstance.addRestrictionsTo(model, restrictions);
  }
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
            {headerName}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSaveChanges}
          >
            <Typography variant="h5" color="secondary">
              Save Changes
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        height="calc(100% - 52px)"
        overflow="auto"
        sx={{ borderRadius: 4 }}
      >
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
        {editableCode && (
          <Editor
            height="70vh"
            defaultLanguage="javascript"
            value={editableCode}
            onChange={(code) => setEditableCode(code)}
            onMount={handleEditorDidMount}
          />
        )}

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
