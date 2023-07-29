import { Box, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Field } from "../../../hooks/useClientForm";
import FooterActions from "./FooterActions";

interface Props {
  fields: Field[];
  footerActions: ReactNode;
  handleChange: (index: number, value: string) => void;
}

const ClientFormField = ({
  fields,
  footerActions,
  handleChange,
}: Props) => {
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

ClientFormField.FooterActions = FooterActions;

export default ClientFormField;