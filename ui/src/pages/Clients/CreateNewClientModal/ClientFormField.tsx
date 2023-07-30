import { Box, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useStateContext } from "../../../store/DataProvider";
import { Field } from "../../../types/clientForm";
import FooterActions from "./FooterActions";

interface Props {
  fields: Field[];
  formStepIndex: number;
  footerActions: ReactNode;
}

const ClientFormField = ({
  fields,
  formStepIndex,
  footerActions
}: Props) => {
  const { state, dispatch } = useStateContext();
  const { clientForm } = state.createClient;

  // Handler to update the clientForm state when the text fields change
  const handleChange = (fieldIndex: number, value: string): void => {
    // Create a copy of the clientForm array
    const newClientForm = [...clientForm];

    // Update the specific field value
    newClientForm[formStepIndex].fields[fieldIndex].value = value;
    dispatch({
      type: "UPDATE_CLIENT_FORM",
      data: newClientForm
    })
  };

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