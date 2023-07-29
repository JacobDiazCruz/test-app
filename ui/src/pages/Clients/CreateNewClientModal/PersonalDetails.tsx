import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction } from "react";
import { Client } from "../../../store/DataProvider";

interface Props {
  firstName: string;
  lastName: string;
  handleSetClient: Dispatch<SetStateAction<Client>>;
};

export default function PersonalDetails({
  firstName,
  lastName,
  handleSetClient
}: Props) {
  return (
    <Box py={3}>
      <Box>
        <Typography sx={{ color: 'text.secondary' }}>
          First name
        </Typography>
        <TextField 
          sx={{ width: '100%' }}
          value={firstName}
          onChange={(e) => {
            handleSetClient((prev: any) => ({
              ...prev,
              firstName: e.target.value
            }))
          }}
        />
      </Box>
      <Box mt={1}>
        <Typography sx={{ color: 'text.secondary' }}>
          Last name
        </Typography>
        <TextField 
          sx={{ width: '100%' }}
          value={lastName}
          onChange={(e) => {
            handleSetClient((prev: any) => ({
              ...prev,
              lastName: e.target.value
            }))
          }}
        />
      </Box>
    </Box>
  );
};