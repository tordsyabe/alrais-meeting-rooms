import React, { createContext, useState } from "react";

export const MeetingCardContext = createContext();

export default function MeetingCardContextProvider({ children }) {
  const [openFormDrawer, setOpenFormDrawer] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openPopperMeetingDetails, setOpenPopperMeetingDetails] = useState(
    false
  );

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const values = {
    openFormDrawer,
    setOpenFormDrawer,
    openDeleteDialog,
    setOpenDeleteDialog,
    handleCloseDeleteDialog,
    meetingToDelete,
    setMeetingToDelete,
    snackBarMessage,
    setSnackBarMessage,
    snackBarOpen,
    setSnackBarOpen,
    handleCloseSnackbar,
    openPopperMeetingDetails,
    setOpenPopperMeetingDetails,
  };
  return (
    <MeetingCardContext.Provider value={values}>
      {children}
    </MeetingCardContext.Provider>
  );
}
