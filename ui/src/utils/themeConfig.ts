import { createTheme, Theme } from "@mui/material";

const palette = {
  primary: {
    main: "#2d63ff"
  },
  success: {
    main: "#007f25",
  },
  text: {
    primary: "#000",
    secondary: "#a3a4a5",
  },
}

export const theme: Theme = createTheme({
  palette,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px #ebeef2',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '8px',
          height: '45px',
          '&:hover': {
            opacity: 0.9
          }
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.2)"
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: 30
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: "bold"
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "& .Mui-completed": {
            color: '#007f25'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '45px',
          backgroundColor: 'white',
          '& fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: '1px',
            borderRadius: '4px'
          },
        }
      }
    }
  }
});