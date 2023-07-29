import { Close } from "@mui/icons-material";
import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function CreateNewClientModal({
  open,
  handleClose
}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Box 
          className="header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new client
          </Typography>
          <IconButton>
            <Close />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}