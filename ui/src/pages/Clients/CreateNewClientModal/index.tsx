import { Close } from "@mui/icons-material";
import { IconButton, Modal, Step, StepButton, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useStateContext } from "../../../store/DataProvider";
import { FormStep } from "../../../types/clientForm";
import { modalBoxStyle } from "../../../utils/styles";
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
  const { state } = useStateContext();
  const { createClient } = state;
  const { activeStep, completed, clientForm } = createClient;

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
          <IconButton sx={{ p: 0 }} onClick={handleClose}>
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
                    handleClose={handleClose}
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