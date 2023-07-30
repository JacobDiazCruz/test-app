interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface IApplicationState {
  clients: IClient[];
  createClient: ICreateClientState;
}

interface ICreateClientState {
  clientForm: ClientForm;
  dirty: boolean;
  activeStep: number;
  completed: Record<number, boolean>;
}