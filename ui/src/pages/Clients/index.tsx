import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import CreateNewClientModal from "./CreateNewClientModal";
import ClientTableActions from "./ClientTableActions";
import { useStateContext } from "../../store/DataProvider";

function Clients() {
  const { state, dispatch } = useStateContext();
  const { clients } = state;

  const [filteredClients, setFilteredClients] = useState(clients);
  const [showCreateClientModal, setShowCreateClientModal] = useState<boolean>(false);
  const [searchClient, setSearchClient]: 
    [string, Dispatch<SetStateAction<string>>] = useState<string>("");

  /**
   * To fetch all clients data from the api and store it to
   * the clients state.
   */
  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  return (
    <Page>
      <Typography 
        variant="h5" 
        sx={{ textAlign: "start", fontWeight: "bold" }}
      >
        Clients
      </Typography>

      <ClientTableActions
        clients={clients}
        searchClient={searchClient}
        setSearchClient={setSearchClient}
        handleShowCreateClientModal={() => setShowCreateClientModal(true)}
        setFilteredClients={setFilteredClients}
      />

      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={filteredClients} />
      </Paper>

      {showCreateClientModal && (
        <CreateNewClientModal
          handleClose={() => {
            setShowCreateClientModal(false);
            dispatch({
              type: "RESET_CREATE_CLIENT",
              data: {}
            })
          }}
          emptySearchClient={() => setSearchClient("")}
        />
      )}
    </Page>
  );
}

export default memo(Clients);
