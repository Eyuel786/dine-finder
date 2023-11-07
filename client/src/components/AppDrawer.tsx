import {
  IconButton,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import TABS from "../utils/myTabs";

const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
})) as typeof ListItemButton;

const SignInBtn = styled(ListItemButton)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "#fff",
  "&:active": {
    background: theme.palette.secondary.main,
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    background: theme.palette.secondary.light,
    "&:active": {
      background: theme.palette.secondary.main,
    },
  },
})) as typeof ListItemButton;

const MyListItemText = styled(ListItemText)(({ theme }) => ({
  fontFamily: ["Inter", "sans-serif"].join(","),
  fontWeight: 500,
  fontSize: "1.1rem",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9rem",
  },
})) as typeof ListItemText;

interface AppDrawerProps {
  open: boolean;
  selectedTab: boolean | number;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export default function AppDrawer({
  open,
  selectedTab,
  onOpen,
  onClose,
  onToggle,
}: AppDrawerProps) {
  const location = useLocation();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <SwipeableDrawer
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Toolbar variant={matchesMd ? "regular" : "dense"} />
        <List>
          {TABS.map((p, index) => (
            <MyListItemButton
              key={p.name}
              selected={selectedTab === index}
              component={Link}
              to={p.pathname}
              onClick={onClose}
              divider
            >
              <MyListItemText primary={p.name} disableTypography />
            </MyListItemButton>
          ))}
          <SignInBtn
            selected={location.pathname === "/signin"}
            onClick={onClose}
            component={Link}
            to="/signin"
          >
            <MyListItemText primary="Sign in" disableTypography />
          </SignInBtn>
        </List>
      </SwipeableDrawer>
      <IconButton onClick={onToggle} sx={{ mr: 1 }}>
        <MenuIcon fontSize="large" color="primary" />
      </IconButton>
    </>
  );
}
