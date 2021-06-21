import React from 'react';
import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const LinearProgressWithLabel = (props: LinearProgressProps & {progress: number}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} value={props.progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(props.progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
