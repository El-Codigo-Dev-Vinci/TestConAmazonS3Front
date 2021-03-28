import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useState } from 'react';
import { invokeSaveAsDialog } from 'recordrtc';
import * as AudioRecord from '../Utils/AudioRecorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import { Link } from 'react-router-dom';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useApi } from '../Utils/fetchApi';
import { dateFormatter } from '../Utils/dateUtils';
import { DateTime } from 'luxon';
import axios from 'axios';

export function NewAudio() {
  const [recordingState, setRecordingState] = useState('');
  const [fileName, setFileName] = useState('');
  const { create } = useApi('files');

  const startRecording = async () => {
    AudioRecord.startRecording(setRecordingState);
  };

  const stopRecording = () => {
    AudioRecord.stopRecording();
  };

  const saveRecord = async () => {
    //Para descargar invokeSaveAsDialog(blob, 'File');
    try {
      const file = AudioRecord.getAudio(fileName);

      let formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      formData.append('creationDate', dateFormatter(DateTime.local()));

      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/files`,
        formData
      );
    } catch (error) {
      console.log(error);
    } finally {
      AudioRecord.cleanRecorder();
    }
  };

  const pauseRecording = () => {
    AudioRecord.pauseRecording();
  };

  return (
    <ValidatorForm onSubmit={saveRecord} instantValidate={false}>
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
          <IconButton
            onClick={pauseRecording}
            disabled={!AudioRecord.canPause()}
          >
            <PauseIcon />
          </IconButton>
          <IconButton onClick={stopRecording} disabled={!AudioRecord.canStop()}>
            <StopIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={4}>
            <TextValidator
              label="File name"
              variant="outlined"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              validators={['required']}
              errorMessages={[ERRORS.required]}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            <SaveAltIcon /> Save
          </Button>
          <Button component={Link} to="/">
            Volver
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
}

const ERRORS = {
  required: 'This field is required',
};
