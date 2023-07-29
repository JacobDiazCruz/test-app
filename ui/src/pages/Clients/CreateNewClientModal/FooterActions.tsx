import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  handleCreateClient: () => void;
};

export default function FooterActions({
  activeStep,
  handleBack,
  handleNext,
  handleCreateClient
}: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      {activeStep === 1 && (
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      )}

      {activeStep === 0 ? (
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          onClick={handleNext}
        >
          Continue
        </Button>
      ) : (
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          onClick={handleCreateClient}
        >
          Create client
        </Button>
      )}
    </Box>
  );
}