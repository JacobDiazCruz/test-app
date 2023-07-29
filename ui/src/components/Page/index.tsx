import { Box } from "@mui/material";
import React from "react";

export default function Page({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        margin: "auto",
        marginTop: 5,
        maxWidth: "700px",
        p: {
          xs: "16px",
          sm: "24px"
        }
      }}
    >
      {children}
    </Box>
  );
}