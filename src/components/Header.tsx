import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Tooltip from "@mui/material/Tooltip";
import { removeAuthToken } from "../utils";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logout } from "../features/auth/slices/authSlice";
import { HeaderProps } from "../types";

const Header = ({ drawerWidth, handleToggle }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = function () {
    removeAuthToken();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Header
        </Typography>
        <Tooltip title="Logout" arrow>
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            sx={{ "&:hover": { backgroundColor: "primary.light" }, ml: "auto" }}
            onClick={handleLogout}
          >
            <LockOpenOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
