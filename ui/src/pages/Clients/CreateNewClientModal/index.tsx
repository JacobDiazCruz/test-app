import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Client, StateContext } from "../../../store/DataProvider";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import FooterActions from "./FooterActions";
import { modalBoxStyle } from "../../../utils/styles";

interface CreateNewClientModalProps {
  handleClose: () => void;
};

const steps = ['Personal details', 'Contact details'];

export default function CreateNewClientModal({
  handleClose
}: CreateNewClientModalProps) {
  const { dispatch } = useContext(StateContext);
  
  // State to hold client information
  const [activeStep, setActiveStep] = useState(0);
  const [client, setClient] = useState<Client>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  // State to track completed steps in the form
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  // Helper function to check if the current step is the last step in the form
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  // Helper function to check if all steps in the form are completed
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  // Handler for navigating back to the previous step in the form
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handler for navigating to the next step in the form
  const handleContinue = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in newCompleted))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Handler for creating a new client and closing the modal
  const handleCreateClient = () => {
    dispatch({ type: "ADD_CLIENT", data: client });
    handleClose();
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
    >
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
            <Step key={label} completed={completed[index]} sx={{ pl: 0 }}>
              <StepButton onClick={() => setActiveStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {/* Render either PersonalDetails or ContactDetails based on the active step */}
        {!!activeStep ? (
          <ContactDetails
            email={client.email}
            phoneNumber={client.phoneNumber}
            handleSetClient={setClient}
          />
        ) : (
          <PersonalDetails
            firstName={client.firstName}
            lastName={client.lastName}
            handleSetClient={setClient}
          />
        )}

        <FooterActions
          client={client}
          activeStep={activeStep}
          handleBack={handleBack}
          handleContinue={handleContinue}
          handleCreateClient={handleCreateClient}
        />
      </Box>
    </Modal>
  );
};