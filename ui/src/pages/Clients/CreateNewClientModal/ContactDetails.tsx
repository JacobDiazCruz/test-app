import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction } from "react";
import { Client } from "../../../store/DataProvider";

interface Props {
  email: string;
  phoneNumber: string;
  handleSetClient: Dispatch<SetStateAction<Client>>;
};

export default function ContactDetails({
  email,
  phoneNumber,
  handleSetClient
}: Props) {
  return (
    <Box py={3}>
      <Box>
        <Typography>
          Email
        </Typography>
        <TextField 
          sx={{ width: '100%' }}
          value={email}
          onChange={(e) => {
            handleSetClient((prev) => ({
              ...prev,
              email: e.target.value
            }))
          }}
        />
      </Box>
      <Box mt={2}>
        <Typography>
          Contact
        </Typography>
        <TextField 
          sx={{ width: '100%' }}
          value={phoneNumber}
          onChange={(e) => {
            handleSetClient((prev) => ({
              ...prev,
              phoneNumber: e.target.value
            }))
          }}
        />
      </Box>
    </Box>
  );
};