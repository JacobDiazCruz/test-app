import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Client } from "../../../store/DataProvider";

interface Props {
  client: Client;
  activeStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  handleCreateClient: () => void;
};

const clientFormValidation = (client: Client) => {
  const { firstName, lastName, email, phoneNumber } = client;
  return firstName !== "" && lastName !== "" && email !== "" && phoneNumber !== "";
};

export default function FooterActions({
  client,
  activeStep,
  handleBack,
  handleContinue,
  handleCreateClient
}: Props) {
  const isPersonalDetailsValid = client.firstName !== '' && client.lastName !== '';
  const isClientFormValid = clientFormValidation(client);

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
          disabled={!isClientFormValid}
        >
          Create client
        </Button>
      )}
    </Box>
  );
}