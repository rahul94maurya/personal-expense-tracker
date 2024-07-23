import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Typography from "@mui/material/Typography";

const navigationLinks = [
  { label: "Home", path: "/home", icon: <HomeIcon /> },
  { label: "Dashboard", path: "/", icon: <SummarizeIcon /> },
  { label: "Analysis", path: "/analysis", icon: <HomeRepairServiceIcon /> },
];
const MainNavigation = () => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          Rahul Maurya
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigationLinks.map((route) => (
          <ListItem
            key={route.label}
            disablePadding
            component={RouterLink}
            to={route.path}
          >
            <ListItemButton>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MainNavigation;
