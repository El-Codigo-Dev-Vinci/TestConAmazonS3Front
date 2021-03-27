import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { invokeSaveAsDialog } from 'recordrtc';
import * as AudioRecord from './Helpers/AudioRecorder';
import AudiosTable from './Audios/AudiosTable';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid>
        <Grid item className={classes.floatRight}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/new/audio`}
            startIcon={<AddIcon />}
          >
            New Audio
          </Button>
        </Grid>
      </Grid>
      <AudiosTable />
    </>
  );
}

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
}));
