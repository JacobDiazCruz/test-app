import { memo, useContext, useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import CreateNewClientModal from "./CreateNewClientModal";
import ClientActions from "./ClientActions";

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

  const [filteredClients, setFilteredClients] = useState(clients);
  const [showCreateClientModal, setShowCreateClientModal] = useState<boolean>(false);

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  return (
    <Page>
      <Typography variant="h4" sx={{ textAlign: "start" }}>
        Clients
      </Typography>

      <ClientActions
        handleShowCreateClientModal={() => setShowCreateClientModal(true)}
        setFilteredClients={setFilteredClients}
      />

      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={filteredClients} />
      </Paper>

      {/* Modal */}
      <CreateNewClientModal
        open={showCreateClientModal}
        handleClose={() => setShowCreateClientModal(false)}
      />
    </Page>
  );
}

export default memo(Clients);
