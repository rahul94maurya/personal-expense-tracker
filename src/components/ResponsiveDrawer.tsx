import Drawer from "@mui/material/Drawer";

import MainNavigation from "./MainNavigation";

interface DrawerProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleTransitionEnd: () => void;
  handleClose: () => void;
}

const ResponsiveDrawer = ({
  drawerWidth,
  mobileOpen,
  handleClose,
  handleTransitionEnd,
}: DrawerProps) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleTransitionEnd}
        onClick={handleClose}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { md: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <MainNavigation />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <MainNavigation />
      </Drawer>
    </>
  );
};

export default ResponsiveDrawer;
