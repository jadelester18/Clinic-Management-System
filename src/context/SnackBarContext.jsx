import { Alert, IconButton, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSuccessMessage = (message) => {
    setSnackbarMessage(message);
    setAlertType(true);
    setOpenSnackbar(true);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  const handleFailMessage = (message) => {
    setSnackbarMessage(message);
    setAlertType(false);
    setOpenSnackbar(true);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  return (
    <SnackBarContext.Provider
      value={{
        onShowSuccess: handleSuccessMessage,
        onShowFail: handleFailMessage,
      }}
    >
      {children}
      <Snackbar open={openSnackbar} autoHideDuration={6000} sx={{ width: 300 }}>
        <Alert
          severity={alertType ? "success" : "error"}
          variant="filled"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={handleCloseSnackbar}
            ></IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
