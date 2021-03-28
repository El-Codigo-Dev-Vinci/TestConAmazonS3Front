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
import { everyFile } from '../../state/files';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function AudiosTable() {
  const filesRecoil = useRecoilValue(everyFile);

  return (
    <>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesRecoil.map((file) => (
              <TableRow key={file.name}>
                <TableCell component="th" scope="row">
                  {file.fileName}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(file.creationDate)
                    .setLocale('es')
                    .toFormat('dd/MM HH:mm')}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <GetAppIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
