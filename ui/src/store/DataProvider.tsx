import React, { createContext, useContext, useReducer } from "react";
import { clientForm } from "../config/formConfig";
import deepCopy from "../utils/deepCopy";

const initialState: IApplicationState = {
  clients: [],
  createClient: {
    clientForm: deepCopy(clientForm),
    dirty: false,
    activeStep: 0,
    completed: {},
  }
};

export const StateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

export const ACTIONS = {
  FETCH_ALL_CLIENTS: "FETCH_ALL_CLIENTS",
  ADD_CLIENT: "ADD_CLIENT",
  UPDATE_CLIENT_FORM: "UPDATE_CLIENT_FORM",
  UPDATE_ACTIVE_STEP: "UPDATE_ACTIVE_STEP",
  UPDATE_COMPLETED_STEP: "UPDATE_COMPLETED_STEP",
  RESET_CREATE_CLIENT: "RESET_CREATE_CLIENT",
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_CLIENTS:
      return { ...state, clients: action.data };
    case ACTIONS.ADD_CLIENT:
      return { ...state, clients: [...state.clients, action.data] };
    case ACTIONS.UPDATE_CLIENT_FORM:
      return { 
        ...state, 
        "createClient": {
          ...state.createClient,
          clientForm: action.data,
          dirty: true
        } 
      };
    case ACTIONS.UPDATE_ACTIVE_STEP:
      return { ...state, "createClient": {...state.createClient, activeStep: action.data} };
    case ACTIONS.UPDATE_COMPLETED_STEP:
      return { ...state, "createClient": {...state.createClient, completed: action.data} };
    case ACTIONS.RESET_CREATE_CLIENT:
      return { 
        ...state,
        createClient: { 
          clientForm: deepCopy(clientForm),
          activeStep: 0,
          dirty: false,
          completed: {},
        },
      };
    default:
      return state;
  }
};

export default function DataProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error("useStateContext must be used within StateContext")
  }
  return context;
};