import {FileRejection} from 'react-dropzone';
import {toast} from 'react-toastify';
import {MAXIMUM_FILE_NUMBER} from 'src/constants';
import trimName from 'src/utils/trimName';

function handleFileRejectedToast(fileRejections: FileRejection[]) {
  if (fileRejections.length > MAXIMUM_FILE_NUMBER) {
    toast.error(`The maximum number of transfer files is set up to ${MAXIMUM_FILE_NUMBER}`);
  } else {
    fileRejections.forEach(({file, errors}) => {
      toast.error(
        `Unable to transfer ${trimName(file.name, 9)}${
          errors.find((error) => error.code === 'file-too-large') ? '. The maximum size per file is set up to 16mb' : ''
        }`,
      );
    });
  }
}

export default handleFileRejectedToast;
