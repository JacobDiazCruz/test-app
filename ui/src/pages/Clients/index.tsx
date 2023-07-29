import { memo, useContext, useEffect, useState } from "react";
import { Button, InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import CreateNewClientModal from "./CreateNewClientModal";

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
      <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField 
          label="Standard" 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button 
          variant="contained"
          onClick={() => setShowCreateClientModal(true)}
        >
          Create a new client
        </Button>
      </Box>
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
