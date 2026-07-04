import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteExpense } from "../services";
import { DeleteExpenseModalProps } from "../types";

export default function DeleteExpenseModal({
  openModal,
  handleClose,
  expenseId,
  onExpenseDeleted,
}: DeleteExpenseModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!expenseId) return;

    setIsDeleting(true);
    try {
      await deleteExpense(expenseId);
      onExpenseDeleted?.();
      handleClose();
    } catch (error) {
      console.error("Failed to delete expense", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 2, mb: 2, mr: 2 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="inherit"
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          color="error"
          disabled={isDeleting}
          startIcon={
            isDeleting ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
