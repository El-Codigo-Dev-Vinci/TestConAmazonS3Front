import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useNotifyUpdate } from '../../state/updates';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useState } from 'react';
import { ERRORS } from '../Utils/Text';
import axios from 'axios';

export default function UpdateModal({
  openModal,
  setOpenModal,
  route,
  fileToUpdate,
}) {
  const notifyUpdate = useNotifyUpdate(route);
  const [newName, setNewName] = useState(fileToUpdate.fileName);

  const closeModal = () => {
    setOpenModal(false);
  };

  const updateFile = async () => {
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/files/${fileToUpdate?.key}`,
      { fileName: newName }
    );
    await notifyUpdate();
    closeModal();
  };

  return (
    <Dialog
      onClose={() => closeModal()}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <ValidatorForm onSubmit={updateFile} instantValidate={false}>
        <DialogTitle id="alert-dialog-slide-title">
          <TextValidator
            label="New name"
            value={newName}
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
            validators={['required']}
            errorMessages={[ERRORS.required]}
          />
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

UpdateModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  route: PropTypes.string,
  fileToUpdate: PropTypes.object,
};
