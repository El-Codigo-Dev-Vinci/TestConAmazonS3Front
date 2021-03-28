import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useApi } from '../Utils/fetchApi';
import { useNotifyUpdate } from '../../state/updates';
import { DangerButton } from './DangerButton';

export default function DeleteModal({
  openModal,
  setOpenModal,
  route,
  fileToDelete,
}) {
  const notifyUpdate = useNotifyUpdate(route);
  const { deleteById } = useApi(route);

  const closeModal = () => {
    setOpenModal(false);
  };

  const deleteFile = async () => {
    await deleteById(fileToDelete.key);
    await notifyUpdate();
    closeModal();
  };

  return (
    <Dialog
      onClose={() => closeModal()}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        ¿Are you sure you want to delete{' '}
        <strong>{fileToDelete?.fileName}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <DangerButton variant="contained" onClick={deleteFile}>
          Delete
        </DangerButton>
      </DialogActions>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  route: PropTypes.string,
  fileToDelete: PropTypes.object,
};
