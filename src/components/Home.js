import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import AudiosTable from './Audios/AudiosTable';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <ValidatorForm>
        <Grid container>
          <Grid item xs={12}>
            <TextValidator label="Hola" />
          </Grid>
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
      </ValidatorForm>
    </>
  );
}

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
}));
