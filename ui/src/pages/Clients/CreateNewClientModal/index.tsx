import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, Stepper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { StateContext } from "../../../store/DataProvider";
import FooterActions from "./FooterActions";
import { modalBoxStyle } from "../../../utils/styles";
import useClientForm, { ClientForm } from "../../../hooks/useClientForm";

interface CreateNewClientModalProps {
  handleClose: () => void;
}

export const steps = ['Personal details', 'Contact details'];

export default function CreateNewClientModal({
  handleClose
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
    return steps.length;
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
  };

  // Handler for navigating to the next step in the form
  const handleContinue = (): void => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in newCompleted))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Handler for creating a new client and closing the modal
  const handleCreateClient = (): void => {
    const clientPayload: any = {};
    clientForm.forEach((client: ClientForm) => {
      clientPayload[client.field] = client.value;
    });

    dispatch({ type: "ADD_CLIENT", data: clientPayload });
    handleClose();
  };

  // Handler to update the clientForm state when the text fields change
  const handleChange = (index: number, value: string): void => {
    setClientForm((prevClientForm) => {
      const newClientForm = [...prevClientForm];
      const currentStepFields = newClientForm.filter((client) => client.step === steps[activeStep]);
      currentStepFields[index] = {
        ...currentStepFields[index],
        value: value
      };
      return newClientForm.map((client) =>
        client.step === steps[activeStep] ? currentStepFields.shift()! : client
      );
    });
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
        
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label, index) => (
            <Step disabled key={label} completed={completed[index]}>
              <StepButton onClick={() => setActiveStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {/* Render the text fields based on the active step */}
        {clientForm
          .filter((client) => client.step === steps[activeStep])
          .map((client: ClientForm, index: number) => (
            <Box key={index} py={3}>
              <Typography sx={{ color: "text.secondary" }}>
                {client.label}
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                value={client.value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </Box>
        ))}

        <FooterActions
          clientForm={clientForm}
          activeStep={activeStep}
          handleBack={handleBack}
          handleContinue={handleContinue}
          handleCreateClient={handleCreateClient}
        />
      </Box>
    </Modal>
  );
};