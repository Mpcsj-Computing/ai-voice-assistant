import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";

export interface SnackbarMessageInfo {
  message: string;
  messageVariant: AlertColor;
}

interface SnackbarMessageProps {
  messageInfo?: SnackbarMessageInfo;
  onClose: () => void;
}

const SnackbarMessage = ({ messageInfo, onClose }: SnackbarMessageProps) => {
  if (!messageInfo) {
    return null;
  }

  const { message, messageVariant } = messageInfo;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={true}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity={messageVariant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackbarMessage;
