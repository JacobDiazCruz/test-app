import { useContext, useState } from "react";
import { StateContext } from "../store/DataProvider";

export interface ClientForm {
  label: string;
  field: string;
  type: "text" | "email";
  step: "Personal details" | "Contact details";
  value: string;
}

export default function useClientForm() {
  const { dispatch } = useContext(StateContext);

  // State to hold client information
  const [clientForm, setClientForm] = useState<ClientForm[]>([
    {
      label: "First name",
      field: "firstName",
      type: "text",
      step: "Personal details",
      value: ""
    },
    {
      label: "Last name",
      field: "lastName",
      type: "text",
      step: "Personal details",
      value: ""
    },
    {
      label: "Email",
      field: "email",
      type: "email",
      step: "Contact details",
      value: ""
    },
    {
      label: "Contact",
      field: "phoneNumber",
      type: "text",
      step: "Contact details",
      value: ""
    }
  ]);

  // Handler for creating a new client and closing the modal
  const handleCreateClient = (): void => {
    const clientPayload: any = {};
    clientForm.forEach((client: ClientForm) => {
      clientPayload[client.field] = client.value;
    });

    dispatch({ type: "ADD_CLIENT", data: clientPayload });
  };

  return {
    clientForm,
    setClientForm,
    handleCreateClient
  };
}