import { useState } from "react";

export type ClientForm = FormStep[];
export interface FormStep {
  step: string;
  fields: Field[]; 
}
export interface Field {
  label: string;
  field: string;
  type: string;
  value: string;
  validator?: (v: string) => boolean;
  valid: boolean;
  error?: boolean;
  helperText?: string;
}

export default function useClientForm() {

  // Simple email validation using regular expression
  const validateEmail = (emailField: string) => {
    if (emailField) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailField);
    }
    return true;
  };

  // State to hold client information
  const [clientForm, setClientForm] = useState<ClientForm>([
    {
      step: "Personal Details",
      fields: [
        {
          label: "First name",
          field: "firstName",
          type: "text",
          validator: () => true,
          valid: true,
          value: ""
        },
        {
          label: "Last name",
          field: "lastName",
          type: "text",
          validator: () => true,
          valid: true,
          value: ""
        }
      ]
    },
    {
      step: "Contact details",
      fields: [
        {
          label: "Email",
          field: "email",
          type: "email",
          value: "",
          validator: validateEmail,
          valid: true,
          helperText: "Invalid email"
        },
        {
          label: "Contact",
          field: "phoneNumber",
          validator: () => true,
          valid: true,
          type: "text",
          value: ""
        }
      ]
    }
  ]);

  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  return {
    clientForm,
    setClientForm,
    isFormValid,
    setIsFormValid
  };
}