import { Box, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Field } from "../../../hooks/useClientForm";
import FooterActions from "./FooterActions";

interface Props {
  fields: Field[];
  handleChange: (fieldIndex: number, value: string) => void;
  footerActions: ReactNode;
}

// Handler to update the clientForm state when the text fields change
// const handleChange = (field: Field, value: string): void => {
//   field.value = value
//   setClientForm(newClientForm);
// };

const ClientFormField = ({
  fields,
  handleChange,
  footerActions,
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