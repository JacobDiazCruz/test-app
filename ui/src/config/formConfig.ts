import { validateEmail } from "../utils/validations";

export const clientForm = [
  {
    step: "Personal Details",
    fields: [
      {
        label: "First name",
        field: "firstName",
        type: "text",
        validator: () => true,
        value: ""
      },
      {
        label: "Last name",
        field: "lastName",
        type: "text",
        validator: () => true,
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
        helperText: "Invalid email"
      },
      {
        label: "Contact",
        field: "phoneNumber",
        validator: () => true,
        type: "text",
        value: ""
      }
    ]
  }
];