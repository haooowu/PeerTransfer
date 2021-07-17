import React from 'react';
import {EnterType} from 'src/types';
import {useDropzone} from 'react-dropzone';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER} from 'src/constants/numericValues';
import handleFileRejectedToast from 'src/utils/handleFileRejectedToast';

interface Props {
  shouldDisableActionBtn: boolean;
  handleFileInputChange: (files: File[]) => Promise<void> | void;
}

const useCustomDropzone = ({shouldDisableActionBtn, handleFileInputChange}: Props) => {
  const [enterType, setEnterType] = React.useState<EnterType>(null);

  const onDragEnter = () => setEnterType('drag');
  const onDragLeave = () => setEnterType(null);
  const onMouseEnter = () => setEnterType('mouse');
  const onMouseLeave = () => setEnterType(null);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: MAXIMUM_FILE_NUMBER,
    maxSize: MAXIMUM_FILE_BYTE,
    disabled: shouldDisableActionBtn,
    onDragEnter,
    onDragLeave,
    onDropAccepted: handleFileInputChange,
    onDropRejected: handleFileRejectedToast,
  });

  React.useEffect(() => {
    if (shouldDisableActionBtn) setEnterType(null);
  }, [shouldDisableActionBtn]);

  return {
    getRootProps,
    getInputProps,
    onMouseEnter,
    onMouseLeave,
    enterType,
  };
};

export default useCustomDropzone;
