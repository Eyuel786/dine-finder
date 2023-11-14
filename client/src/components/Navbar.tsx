import { useState, SyntheticEvent, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link, useLocation } from "react-router-dom";
import AppDrawer from "./AppDrawer";
import TABS from "../utils/myTabs";
import { LogoContainer, LogoText } from "../utils/MyStyledComponents";

const MyAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
  background: "rgba(255,255,255,0.9)",
})) as typeof AppBar;

const MyTabs = styled(Tabs)(() => ({
  "& .MuiTabs-indicator": {
    background: "transparent",
  },
})) as typeof Tabs;

const MyTab = styled(Tab)(() => ({
  fontWeight: 600,
  fontSize: "1.1rem",
})) as typeof Tab;

const SignInBtn = styled(Button)(() => ({
  color: "#fff",
  fontSize: "1.1rem",
  minWidth: "97px",
})) as typeof Button;

export default function Navbar() {
  const theme = useTheme();
  const location = useLocation();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const [tabIndex, setTabIndex] = useState<boolean | number>(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleTabChange = (_: SyntheticEvent, newVal: number) =>
    setTabIndex(newVal);

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  useEffect(() => {
    const index = TABS.findIndex((p) => p.pathname === location.pathname);
    index !== -1 ? setTabIndex(index) : setTabIndex(false);
  }, [location]);

  return (
    <>
      <MyAppBar elevation={0}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{ justifyContent: "space-between" }}
            variant={matchesMd ? "regular" : "dense"}
            disableGutters
          >
            <LogoContainer>
              <RestaurantIcon
                color="primary"
                fontSize={matchesMd ? "large" : "medium"}
              />
              <LogoText>DineAdvisor</LogoText>
            </LogoContainer>
            {matchesMd && (
              <MyTabs
                textColor="primary"
                value={tabIndex}
                onChange={handleTabChange}
              >
                {TABS.map((p) => (
                  <MyTab
                    key={p.name}
                    label={p.name}
                    component={Link}
                    to={p.pathname}
                    disableRipple
                  />
                ))}
              </MyTabs>
            )}

            {!matchesMd && (
              <AppDrawer
                open={openDrawer}
                onOpen={showDrawer}
                onClose={closeDrawer}
                onToggle={toggleDrawer}
                selectedTab={tabIndex}
              />
            )}
            {matchesMd && (
              <SignInBtn
                variant="contained"
                color="primary"
                component={Link}
                to="/signin"
              >
                Sign in
              </SignInBtn>
            )}
          </Toolbar>
        </Container>
      </MyAppBar>
      <Toolbar />
    </>
  );
}
