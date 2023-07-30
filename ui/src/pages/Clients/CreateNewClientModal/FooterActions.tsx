import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStateContext } from "../../../store/DataProvider";
import { ClientForm, Field, FormStep } from "../../../types/clientForm";

interface Props {
  fields: Field[];
  handleCloseDirtyCheck: (v: boolean) => void;
  emptySearchClient: () => void;
};

// Helper function to check if the current step is the last step in the form
const isLastStep = (activeStep: number, clientForm: ClientForm): boolean => {
  return activeStep === clientForm.length - 1;
};

export default function FooterActions({
  fields,
  handleCloseDirtyCheck,
  emptySearchClient
}: Props) {
  const { state, dispatch } = useStateContext();
  const { clients, createClient } = state;
  const { completed, activeStep, clientForm } = createClient;

  // Handler for navigating back to the previous step in the form
  const handleBack = (): void => {
    dispatch({
      type: "UPDATE_ACTIVE_STEP",
      data: activeStep - 1
    });

    const newCompleted = { ...completed };
    newCompleted[activeStep] = false;
    dispatch({
      type: "UPDATE_COMPLETED_STEP",
      data: newCompleted
    });
  };

  // Handler for navigating to the next step in the form
  const handleContinue = (): void => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    dispatch({
      type: "UPDATE_COMPLETED_STEP",
      data: newCompleted
    });
    
    const newActiveStep = activeStep + 1;
    dispatch({
      type: "UPDATE_ACTIVE_STEP",
      data: newActiveStep
    });
  };

  const continueValidation = () => {
    return fields.some(({ value, validator }) => !value || !validator?.(value));
  };

  // Handler for creating a new client and closing the modal
  const handleCreateClient = (): void => {
    const clientPayload: any = {
      id: clients.length
    };
    clientForm.forEach((step: FormStep) => {
      step.fields.forEach(({field, value}: Field) => {
        clientPayload[field] = value;
      });
    });
  
    dispatch({ type: "ADD_CLIENT", data: clientPayload });
    dispatch({ type: "RESET_CREATE_CLIENT", data: {} });

    emptySearchClient();
    handleCloseDirtyCheck(false);
  };

  return (
    <Box sx={{ display: "flex", mt: 5 }}>
      {activeStep > 0 && (
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      )}

      {!isLastStep(activeStep, clientForm) ? (
        <Button
          sx={{ ml: "auto" }}
          variant="contained"
          onClick={handleContinue}
          disabled={continueValidation()}
        >
          Continue
        </Button>
      ) : (
        <Button
          sx={{ ml: "auto" }}
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