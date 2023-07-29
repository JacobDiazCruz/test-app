import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { StateContext } from "../../../store/DataProvider";
import { modalBoxStyle } from "../../../utils/styles";
import useClientForm, { Field, FormStep } from "../../../hooks/useClientForm";
import ClientFormField from "./ClientFormField";
import CustomStepIcon from "./CustomStepIcon";

interface CreateNewClientModalProps {
  handleClose: () => void;
  emptySearchClient: () => void;
}

export default function CreateNewClientModal({
  handleClose,
  emptySearchClient
}: CreateNewClientModalProps) {
  const { dispatch } = useContext(StateContext);

  const {
    clientForm,
    setClientForm
  } = useClientForm();

  const [activeStep, setActiveStep] = useState<number>(0);
  
  // State to track completed steps in the form
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const totalSteps = (): number => {
    return clientForm.length;
  };

  const completedSteps = (): number => {
    return Object.keys(completed).length;
  };

  // Helper function to check if the current step is the last step in the form
  const isLastStep = (): boolean => {
    return activeStep === totalSteps() - 1;
  };

  // Helper function to check if all steps in the form are completed
  const allStepsCompleted = (): boolean => {
    return completedSteps() === totalSteps();
  };

  // Handler for navigating back to the previous step in the form
  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const newCompleted = { ...completed };
    newCompleted[activeStep] = false;
    setCompleted(newCompleted);
  };

  // Handler for navigating to the next step in the form
  const handleContinue = (): void => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? clientForm.findIndex((_, i) => !(i in newCompleted))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Handler for creating a new client and closing the modal
  const handleCreateClient = (): void => {
    const clientPayload: any = {};
    clientForm.forEach((step: FormStep) => {
      step.fields.forEach(({field, value}: Field) => {
        clientPayload[field] = value;
      });
    });
  
    dispatch({ type: "ADD_CLIENT", data: clientPayload });
    emptySearchClient();
    handleClose();
  };

  // Handler to update the clientForm state when the text fields change
  const handleChange = (index: number, fieldIndex: number, value: string): void => {
    // Create a copy of the clientForm array
    const newClientForm = [...clientForm];

    // Update the specific field value
    newClientForm[index].fields[fieldIndex].value = value;
    setClientForm(newClientForm);
  };

  return (
    <Modal open={true}>
      <Box sx={modalBoxStyle}>
        {/* Header section */}
        <Box 
          className="header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new client
          </Typography>
          <IconButton sx={{ p: 0 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 3 }}>
          {clientForm.map(({ step }, index) => (
            <Step disabled key={index} completed={completed[index]}>
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  {step}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {/* Render the form based on the active step */}
        <Box pt={2}>
          {clientForm.map((form: any, index: number) => (
            <Box
              key={index}
              pt={2}
              sx={{ display: activeStep === index ? 'block' : 'none' }}
            >
              <ClientFormField
                fields={form.fields}
                handleChange={(fieldIndex, value) => {
                  handleChange(index, fieldIndex, value)
                }}
                footerActions={
                  <ClientFormField.FooterActions
                    fields={form.fields}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleContinue={handleContinue}
                    handleCreateClient={handleCreateClient}
                  />
                }
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};