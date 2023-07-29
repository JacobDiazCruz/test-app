import { StepIconProps } from "@mui/material";
import { CheckCircle } from '@mui/icons-material';
import { Box } from "@mui/system";

const iconContainerStyle = {
  width: '20px', 
  height: '20px', 
  display: 'flex', 
  alignItems: 'center', 
  borderRadius: '100%',
};

export default function CustomStepIcon(props: StepIconProps) {
  const { active, completed } = props;

  if(completed) {
    return <CheckCircle style={{ color: 'green' }} />;
  }
  
  if (active) {
    return (
      <Box
        sx={{ ...iconContainerStyle, bgcolor: 'primary.main' }}
      >
        <Box sx={{ m: 'auto', color: 'white' }}>{props.icon}</Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{ ...iconContainerStyle, bgcolor: 'text.secondary' }}
    >
      <Box sx={{ m: 'auto', color: 'white' }}>{props.icon}</Box>
    </Box>
  );
};