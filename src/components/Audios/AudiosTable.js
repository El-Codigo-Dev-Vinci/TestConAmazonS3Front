import {
  Button,
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
import { allFiles, everyFile } from '../../state/files';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteModal from '../ui/DeleteModal';
import { useState } from 'react';
import UpdateModal from '../ui/UpdateModal';
import ReactAudioPlayer from 'react-audio-player';
import { invokeSaveAsDialog } from 'recordrtc';
import axios from 'axios';
import download from 'download-file';

export default function AudiosTable() {
  const filesRecoil = useRecoilValue(allFiles);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [fileSelected, setFileSelected] = useState('');

  const downloadAudio = async (name, link) => {
    var options = {
      directory: './downloads',
      filename: name,
    };

    download(link, options, function (err) {
      if (err) throw err;
      console.log('meow');
    });
  };

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
            {filesRecoil.map((file) => (
              <TableRow key={file.key}>
                <TableCell>
                  <ReactAudioPlayer src={file.linkFile} autoPlay controls />
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
                    onClick={() => downloadAudio(file.fileName, file.linkFile)}
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
