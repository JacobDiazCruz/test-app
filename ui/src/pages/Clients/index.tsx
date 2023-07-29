import { memo, useContext, useEffect } from "react";
import { Button, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

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
        >
          Create a new client
        </Button>
      </Box>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
}

export default memo(Clients);
