import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { Client } from "../../store/DataProvider";

interface Props {
  clients: Client[];
  handleShowCreateClientModal: () => void;
  setFilteredClients: any;
};

export default function ClientActions({
  clients,
  handleShowCreateClientModal,
  setFilteredClients
}: Props) {
  const [searchClient, setSearchClient] = useState<string>("");

  /**
   * @purpose to handle search filter logic
   * @action sets new value to filteredClients
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
  }, [searchClient, setFilteredClients, clients]);

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
        Create new client
      </Button>
    </Box>
  );
};