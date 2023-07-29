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
      />

      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
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
