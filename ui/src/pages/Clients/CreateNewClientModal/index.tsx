import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Client, StateContext } from "../../../store/DataProvider";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import FooterActions from "./FooterActions";
interface CreateNewClientModalProps {
  handleClose: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
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
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
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
      <Box sx={style}>
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
              <StepButton color="inherit" onClick={handleStep(index)}>
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
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleCreateClient={handleCreateClient}
        />
      </Box>
    </Modal>
  );
};