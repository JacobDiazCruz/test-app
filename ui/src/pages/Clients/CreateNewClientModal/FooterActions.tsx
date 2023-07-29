import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { steps } from ".";
import { ClientForm } from "../../../hooks/useClientForm";

interface Props {
  clientForm: ClientForm[];
  activeStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  handleCreateClient: () => void;
};

export default function FooterActions({
  clientForm,
  activeStep,
  handleBack,
  handleContinue,
  handleCreateClient
}: Props) {
  const isPersonalDetailsValid = clientForm.some((client) => client.step === steps[0] && client.value.trim() !== '');

  const clientFormValidation = (clientForm: ClientForm[]) => {
    // Check if any of the fields in the current step is empty
    const currentStepFields = clientForm.filter((client) => client.step === steps[activeStep]);
    const isCurrentStepValid = currentStepFields.every((field) => field.value.trim() !== "");

    // Check if all the previous steps are completed and valid
    const previousSteps = steps.slice(0, activeStep);
    const isPreviousStepsValid = previousSteps.every((step) => {
      const stepFields = clientForm.filter((client) => client.step === step);
      return stepFields.every((field) => field.value.trim() !== "");
    });

    return isCurrentStepValid && isPreviousStepsValid;
  };

  return (
    <Box sx={{ display: 'flex', mt: 5 }}>
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
          onClick={handleContinue}
          disabled={!isPersonalDetailsValid}
        >
          Continue
        </Button>
      ) : (
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          onClick={handleCreateClient}
          disabled={!clientFormValidation(clientForm)}
        >
          Create client
        </Button>
      )}
    </Box>
  );
}