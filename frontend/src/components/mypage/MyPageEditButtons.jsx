import { useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";

function MyPageEditButtons({
  onSave,
  onCancel,
  disabled,
}) {

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
      >
        <Button variant="outlined" onClick={onCancel} sx={{ flex: 1 }}>
          취소
        </Button>

        <Button variant="contained" onClick={onSave} disabled={disabled} sx={{ flex: 1 }}>
          저장
        </Button>
      </Stack>


    </>
  );
}

export default MyPageEditButtons;
