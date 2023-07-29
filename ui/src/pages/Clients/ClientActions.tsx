import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect, useState } from "react";
import { Client, StateContext } from "../../store/DataProvider";

interface Props {
  handleShowCreateClientModal: () => void;
  setFilteredClients: any;
};

export default function ClientActions({
  handleShowCreateClientModal,
  setFilteredClients
}: Props) {
  const { state } = useContext(StateContext);
  const { clients } = state;

  const [searchClient, setSearchClient] = useState<string>("");

  /**
   * @purpose to handle search filter logic
   * @sets new value to setFilteredClients
   */
  useEffect(() => {
    const searchLowerCase = searchClient.toLowerCase();

    const filterFunction = (client: Client) => {
      const firstNameLowerCase = client.firstName.toLowerCase();
      const lastNameLowerCase = client.lastName.toLowerCase();
      return (
        firstNameLowerCase.includes(searchLowerCase) ||
        lastNameLowerCase.includes(searchLowerCase)
      );
    };

    const filteredClients = searchClient
      ? clients.filter(filterFunction)
      : clients;

    setFilteredClients(filteredClients);
  }, [searchClient, clients]);

  return (
    <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField 
        placeholder="Search clients..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        value={searchClient}
        onChange={(e) => setSearchClient(e.target.value)}
      />
      <Button 
        variant="contained"
        onClick={handleShowCreateClientModal}
      >
        Create a new client
      </Button>
    </Box>
  );
}