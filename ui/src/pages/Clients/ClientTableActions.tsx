import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction, useEffect } from "react";
interface Props {
  clients: IClient[];
  handleShowCreateClientModal: () => void;
  searchClient: string;
  setSearchClient: Dispatch<SetStateAction<string>>;
  setFilteredClients: Dispatch<SetStateAction<IClient[]>>;
};

export default function ClientTableActions({
  clients,
  searchClient,
  setSearchClient,
  handleShowCreateClientModal,
  setFilteredClients
}: Props) {

  /**
   * To handle search filter logic and sets 
   * new value to filteredClients
   */
  useEffect(() => {
    if (!searchClient) {
      // no search string has been inputted, set filter to all clients
      setFilteredClients(clients);
      return;
    }

    const searchLowerCase = searchClient.toLowerCase();

    const filterFunction = ({ firstName, lastName }: IClient) => {
      const fullName = `${firstName} ${lastName}`;
      return fullName.toLowerCase().includes(searchLowerCase);
    };

    const filteredClients = clients.filter(filterFunction);

    setFilteredClients(filteredClients);
  }, [searchClient, setFilteredClients, clients]);

  return (
    <Box 
      mt={3} 
      sx={{ 
        display: "flex", 
        gap: {
          md: "250px",
          sm: "20px",
          xs: "20px"
        }, 
        justifyContent: "space-between" 
      }}
    >
      <TextField 
        placeholder="Search clients..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{
          flex: 1
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