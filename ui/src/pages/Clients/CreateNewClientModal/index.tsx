import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch } from "react";
import { useStateContext } from "../../../store/DataProvider";
import { FormStep } from "../../../types/clientForm";
import { modalBoxStyle } from "../../../utils/styles";
import ClientFormField from "./ClientFormField";
import CustomStepIcon from "./CustomStepIcon";

interface CreateNewClientModalProps {
  emptySearchClient: () => void;
  handleCloseModal: () => void;
  setShowConfirmExit: Dispatch<boolean>;
}

export default function CreateNewClientModal({
  emptySearchClient,
  handleCloseModal,
  setShowConfirmExit
}: CreateNewClientModalProps) {
  const { state } = useStateContext();
  const { createClient } = state;
  const { dirty, activeStep, completed, clientForm } = createClient;

  const handleCloseDirtyCheck = (dirtyCheck: boolean) => {
    if (dirtyCheck) {
      setShowConfirmExit(true);
    } else {
      handleCloseModal();
    }
  };

  return (
    <Modal open={true}>
      <Box sx={modalBoxStyle}>
        {/* Header section */}
        <Box 
          className="header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new client
          </Typography>
          <IconButton sx={{ p: 0 }} onClick={() => handleCloseDirtyCheck(dirty)}>
            <Close />
          </IconButton>
        </Box>
        
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 3 }}>
          {clientForm.map(({ step }: FormStep, index: number) => (
            <Step disabled key={index} completed={completed[index]}>
              <StepButton>
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
              sx={{ display: activeStep === index ? "block" : "none" }}
            >
              <ClientFormField
                fields={form.fields}
                formStepIndex={index}
                footerActions={
                  <ClientFormField.FooterActions
                    fields={form.fields}
                    handleCloseDirtyCheck={handleCloseDirtyCheck}
                    emptySearchClient={emptySearchClient}
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