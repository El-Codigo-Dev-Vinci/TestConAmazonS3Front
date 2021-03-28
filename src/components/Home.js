import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import AudiosTable from './Audios/AudiosTable';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TextField label="Search a audio" />
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
    </>
  );
}

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
}));
