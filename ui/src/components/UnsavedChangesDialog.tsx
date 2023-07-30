import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { Dispatch } from "react";

interface Props {
  setShowConfirmExit: Dispatch<boolean>;
  handleCloseModal: () => void;
};

export default function UnsavedChangesDialog({
  setShowConfirmExit,
  handleCloseModal
}: Props) {
  return (
    <Dialog open={true} onClose={() => setShowConfirmExit(false)}>
      <DialogContent sx={{ p: 3 }}>
        <DialogContentText sx={{ color: 'text.primary' }}>
          Are you sure you want to close this modal without finishing?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setShowConfirmExit(false)}>
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowConfirmExit(false);
            handleCloseModal();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}