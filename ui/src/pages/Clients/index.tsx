import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import CreateNewClientModal from "./CreateNewClientModal";
import ClientTableActions from "./ClientTableActions";
import { useStateContext } from "../../store/DataProvider";
import UnsavedChangesDialog from "../../components/UnsavedChangesDialog";
import { Paper, Typography } from "@mui/material";

function Clients() {
  const { state, dispatch } = useStateContext();
  const { clients } = state;

  const [filteredClients, setFilteredClients] = useState(clients);
  const [showCreateClientModal, setShowCreateClientModal] = useState<boolean>(false);
  const [searchClient, setSearchClient]: 
    [string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);

  /**
   * To fetch all clients data from the api and store it to
   * the clients state.
   */
  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowCreateClientModal(false);
    dispatch({
      type: "RESET_CREATE_CLIENT",
      data: {}
    });
  };

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
          setShowConfirmExit={setShowConfirmExit}
          handleCloseModal={handleCloseModal}
          emptySearchClient={() => setSearchClient("")}
        />
      )}
      {showConfirmExit && (
        <UnsavedChangesDialog 
          setShowConfirmExit={setShowConfirmExit}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Page>
  );
}

export default memo(Clients);
