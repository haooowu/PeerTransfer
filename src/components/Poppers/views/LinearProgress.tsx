import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// TODO-sprint: style progress and notification

const LinearProgressWithLabel = (props: {progress: number}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <progress id="file" max="100" value={props.progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${props.progress}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
