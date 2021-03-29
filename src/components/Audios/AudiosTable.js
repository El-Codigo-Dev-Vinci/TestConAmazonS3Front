import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { DateTime } from 'luxon';
import { useRecoilValue } from 'recoil';
import { allFiles } from '../../state/files';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteModal from '../ui/DeleteModal';
import { useMemo, useState } from 'react';
import UpdateModal from '../ui/UpdateModal';
import ReactAudioPlayer from 'react-audio-player';
import { anyPass, filter } from 'ramda';
import { PropTypes } from 'prop-types';
import { validateSearch } from '../Utils/validateSearch';
import axios from 'axios';
import { invokeSaveAsDialog } from 'recordrtc';

export default function AudiosTable(props) {
  const { textToSearch } = props;
  const filesRecoil = useRecoilValue(allFiles);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [fileSelected, setFileSelected] = useState('');

  const downloadAudio = async (path, name) => {
    const file = await axios.post(
      `${process.env.REACT_APP_API_URL}/files/download`,
      { path: path },
      { responseType: 'blob' }
    );

    const blob = new Blob([file.data], { type: 'audio/webm' });
    invokeSaveAsDialog(blob, `${name}.webm`);
  };

  const validateByName = (it) => {
    return validateSearch(textToSearch, it.fileName);
  };

  const validate = anyPass([validateByName]);

  const fileRecoilFilter = useMemo(() => filter(validate, filesRecoil), [
    filesRecoil,
    validate,
  ]);

  return (
    <>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Audio</TableCell>
              <TableCell>File name</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileRecoilFilter.map((file) => (
              <TableRow key={file.key}>
                <TableCell>
                  <ReactAudioPlayer src={file.linkFile} controls />
                </TableCell>
                <TableCell component="th" scope="row">
                  {file.fileName}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(file.creationDate)
                    .setLocale('es')
                    .toFormat('dd/MM HH:mm')}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setFileSelected(file);
                      setOpenUpdateModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => downloadAudio(file.path, file.fileName)}
                  >
                    <GetAppIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setFileSelected(file);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateModal
        openModal={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        route={'files'}
        fileToUpdate={fileSelected}
      />
      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        route={'files'}
        fileToDelete={fileSelected}
      />
    </>
  );
}

AudiosTable.propTypes = {
  textToSearch: PropTypes.string,
};
