import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import AudiosTable from './Audios/AudiosTable';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { PropTypes } from 'prop-types';

export default function Home() {
  const classes = useStyles();
  const [textToSearch, setTextToSearch] = useState('');

  return (
    <>
      <Box mt={10}>
        <Grid container>
          <Grid item xs={12} sm={8} md={5}>
            <Buscador
              label="Search the name of an audio"
              onChange={(e) => setTextToSearch(e.target.value)}
            />
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
        <AudiosTable textToSearch={textToSearch} />
      </Box>
    </>
  );
}

export function Buscador(props) {
  const { onChange, label } = props;

  return (
    <TextField
      fullWidth
      type="search"
      label={label}
      variant="outlined"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

Buscador.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
}));
