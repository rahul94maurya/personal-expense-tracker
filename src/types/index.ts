export type StatusType = "idle" | "loading" | "success" | "error";

export interface DrawerProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleTransitionEnd: () => void;
  handleClose: () => void;
}

export interface HeaderProps {
  drawerWidth: number;
  handleToggle: () => void;
}
