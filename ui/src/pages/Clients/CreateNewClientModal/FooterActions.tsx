import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useClientForm, { Field } from "../../../hooks/useClientForm";

interface Props {
  fields: Field[];
  activeStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  handleCreateClient: () => void;
};

export default function FooterActions({
  fields,
  activeStep,
  handleBack,
  handleContinue,
  handleCreateClient
}: Props) {

  const { clientForm } = useClientForm();

  const continueValidation = () => {
    return fields.some(({ value, validator }) => !value || !validator?.(value));
  };

  return (
    <Box sx={{ display: 'flex', mt: 5 }}>
      {activeStep > 0 && (
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      )}

      {activeStep < clientForm.length - 1 ? (
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          onClick={handleContinue}
          disabled={continueValidation()}
        >
          Continue
        </Button>
      ) : (
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          onClick={handleCreateClient}
          disabled={continueValidation()}
        >
          Create client
        </Button>
      )}
    </Box>
  );
}