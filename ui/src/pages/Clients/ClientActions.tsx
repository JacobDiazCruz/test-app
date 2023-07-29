import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  handleShowCreateClientModal: () => void;
};

export default function ClientActions({
  handleShowCreateClientModal
}: Props) {
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