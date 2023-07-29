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

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [client, setClient] = useState<Client>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in newCompleted))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

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
        <Box 
          className="header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new client
          </Typography>
          <IconButton sx={{ p: 0 }}>
            <Close />
          </IconButton>
        </Box>
        
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]} sx={{ pl: 0 }}>
              <StepButton onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <PersonalDetails
            firstName={client.firstName}
            lastName={client.lastName}
            handleSetClient={setClient}
          />
        ) : (
          <ContactDetails
            email={client.email}
            phoneNumber={client.phoneNumber}
            handleSetClient={setClient}
          />
        )}

        <FooterActions
          client={client}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleCreateClient={handleCreateClient}
        />
      </Box>
    </Modal>
  );
};