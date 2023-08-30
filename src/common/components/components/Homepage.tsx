import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
  workerSrc: "/pdf.worker.js",
};

function App() {
  const [question, setQuestion] = useState(new Object());
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const text = "";

  const [file, setFile] = useState({} as File);
  const pdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const newFile = (target.files as FileList)[0];
    setFile(newFile);
  };

  function isEmpty(object: File) {
    for (const property in object) {
      return false;
    }
    return true;
  }

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isEmpty(file)) {
      return;
    }
    setPageNumber(1);
    setImageUrl(URL.createObjectURL(file));
  }, [file]);

  const [pageNumber, setPageNumber] = useState(1);

  const reducePage = () => {
    setPageNumber(pageNumber - 1);
  };

  const addPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      <Grid item>
        <Typography variant="body1" color="initial">
          {text}
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" component="label">
          Upload
          <input
            multiple
            hidden
            id="book"
            name="book"
            accept=".pdf"
            type="file"
            onChange={pdfChange}
          />
        </Button>
      </Grid>
      {file["name"]}
      <Box sx={{ boxShadow: 5 }}>
        <Document file={imageUrl} options={options}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </Box>
      <Grid item>
        <IconButton aria-label="" onClick={reducePage}>
          <RemoveIcon />
        </IconButton>
        <IconButton aria-label="" onClick={addPage}>
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <TextField
          id=""
          label="What is your question regarding thid book?"
          value={question}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default App;
