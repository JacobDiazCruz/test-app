import { Box, TextField, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { Field } from "../../../hooks/useClientForm";

interface ClientFormStepProps {
  fields: Field[];
  footerActions: ReactNode;
  handleChange: (index: number, value: string) => void;
}

const ClientFormStep: React.FC<ClientFormStepProps> = ({
  fields,
  footerActions,
  handleChange,
}) => {
  return (
    <>
      {fields.map((field: Field, index) => {
        const isFieldError = !field.validator?.(field.value);

        return (
          <Box key={index} py={1}>
            <Typography sx={{ color: "text.secondary" }}>
              {field.label}
            </Typography>
            <TextField
              sx={{ width: "100%" }}
              value={field.value}
              type={field.type}
              error={isFieldError}
              helperText={isFieldError && field.helperText}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </Box>
        )
      })}
      {footerActions}
    </>
  );
};

export default ClientFormStep;