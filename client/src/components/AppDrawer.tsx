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
import User from "../types/User";
import { useAppDispatch } from "../store";
import { signOut } from "../store/auth.slice";

const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
})) as typeof ListItemButton;

const AuthBtn = styled(ListItemButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    background: theme.palette.primary.main,
  },
  "&:active": {
    background: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    color: theme.palette.secondary.light,
    background: theme.palette.primary.light,
    "&:hover": {
      background: theme.palette.primary.main,
    },
    "&:active": {
      background: theme.palette.primary.main,
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
  user: User;
  myPaths: { name: string; pathname: string }[];
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export default function AppDrawer({
  open,
  selectedTab,
  myPaths,
  user,
  onOpen,
  onClose,
  onToggle,
}: AppDrawerProps) {
  const location = useLocation();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const logout = () => dispatch(signOut());

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
          {myPaths.map((p, index) => (
            <MyListItemButton
              key={p.name}
              selected={selectedTab === index}
              component={Link}
              to={p.pathname}
              onClick={onClose}
              disableRipple
              divider
            >
              <MyListItemText primary={p.name} disableTypography />
            </MyListItemButton>
          ))}
          {!user.token && (
            <AuthBtn
              selected={location.pathname === "/signin"}
              onClick={onClose}
              component={Link}
              to="/signin"
              disableRipple
            >
              <MyListItemText primary="Sign in" disableTypography />
            </AuthBtn>
          )}

          {user.token && (
            <AuthBtn
              selected={location.pathname === "/signin"}
              onClick={() => {
                onClose();
                logout();
              }}
              disableRipple
            >
              <MyListItemText primary="Sign out" disableTypography />
            </AuthBtn>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton onClick={onToggle} sx={{ mr: 1 }}>
        <MenuIcon fontSize="large" color="primary" />
      </IconButton>
    </>
  );
}
