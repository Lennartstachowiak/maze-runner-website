/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { saveAlgorithmChanges } from "../../../../modules/API";
import { AlgorithmInterface } from "../AlgorithmPreviewList/types";
import {
  ConstrainedEditorInterface,
  constrainedEditor,
} from "constrained-editor-plugin";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface CodeBlockProps {
  showLineNumbers: boolean;
  algorithm: AlgorithmInterface | null;
  handleOpenDeleteDialog: () => void;
  handleEditName: (algorithmId: string) => Promise<void>;
}

const CodeBlockComponent = (props: CodeBlockProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const constrainedInstanceRef = useRef<ConstrainedEditorInterface | null>(
    null
  );
  const { algorithm, showLineNumbers, handleOpenDeleteDialog, handleEditName } =
    props;
  const algorithmCode = algorithm?.code;
  const algorithmId = algorithm?.id;
  const headerName = algorithm?.name;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [code, codeText] = useState(algorithmCode);
  const [editableCode, setEditableCode] = useState(algorithmCode);
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
    if (
      editorRef.current?.getModel() &&
      code &&
      constrainedInstanceRef.current
    ) {
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

  // Restrict area fields
  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
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
        lastEditableLineIndex = codeLines - 6;
        lastEditableLineLength =
          codeLinesSplit[lastEditableLineIndex - 1].length + 1;
      } catch (error) {
        console.error(error);
      }
    }
    const restrictions = [
      {
        range: [6, 1, lastEditableLineIndex, lastEditableLineLength],
        label: "funcDefinition",
        allowMultiline: true,
      },
    ];

    constrainedInstance.addRestrictionsTo(model, restrictions);
  };

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
      {!algorithm && (
        <Grid container justifyContent="center">
          <Typography variant="h4" color="initial">
            No algorithm selected.
          </Typography>
        </Grid>
      )}
      {algorithm && (
        <>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Grid container alignContent="center">
                <Grid item>
                  <Typography variant="h3" color="initial" paddingBottom={2.5}>
                    {headerName}
                  </Typography>
                </Grid>
                <Grid item paddingLeft={2}>
                  <Grid container>
                    <Grid item>
                      <IconButton
                        aria-label="editName"
                        onClick={() => handleEditName(algorithmId!)}
                      >
                        <EditRoundedIcon sx={{ height: 20 }} />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-label="deleteAlgorithm"
                        onClick={handleOpenDeleteDialog}
                      >
                        <DeleteRoundedIcon sx={{ height: 20 }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
        </>
      )}
    </Grid>
  );
};

export default CodeBlockComponent;
