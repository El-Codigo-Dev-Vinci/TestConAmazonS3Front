import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  return (
    <>
      <Typography>Recording: {recording ? 'Yes' : 'No'}</Typography>
      <Grid>
        <Button variant="contained" onClick={startRecording}>
          Start
        </Button>
        <Button>Pause</Button>
        <Button variant="contained" onClick={stopRecording}>
          Stop
        </Button>
      </Grid>
    </>
  );
}
