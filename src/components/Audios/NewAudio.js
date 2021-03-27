import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useState } from 'react';
import { invokeSaveAsDialog } from 'recordrtc';
import * as AudioRecord from '../Helpers/AudioRecorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import { Link } from 'react-router-dom';

export function NewAudio() {
  const [recordingState, setRecordingState] = useState('');

  const startRecording = async () => {
    AudioRecord.startRecording(setRecordingState);
  };

  const stopRecording = () => {
    AudioRecord.stopRecording(saveRecord);
  };

  const saveRecord = (blob) => {
    invokeSaveAsDialog(blob, 'File');
  };

  const pauseRecording = () => {
    AudioRecord.pauseRecording();
  };

  return (
    <Grid container align="center" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          New audio
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton
          onClick={startRecording}
          color="secondary"
          disabled={!AudioRecord.canRecord()}
        >
          <FiberManualRecordIcon />
        </IconButton>
        <IconButton onClick={pauseRecording} disabled={!AudioRecord.canPause()}>
          <PauseIcon />
        </IconButton>
        <IconButton onClick={stopRecording} disabled={!AudioRecord.canStop()}>
          <StopIcon />
        </IconButton>
        <Button component={Link} to="/">
          Volver
        </Button>
      </Grid>
    </Grid>
  );
}
