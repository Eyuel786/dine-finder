import {
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { LogoContainer, LogoText } from "../utils/MyStyledComponents";

const FooterContainer = styled("div")(() => ({
  marginTop: "auto",
  padding: "0.5rem",
})) as typeof Container;

export default function Footer() {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        <Grid container columnSpacing={8} rowSpacing={4}>
          <Grid item xs={12} md={4}>
            <LogoContainer>
              <RestaurantIcon
                color="primary"
                fontSize={matchesMd ? "large" : "medium"}
              />
              <LogoText>DineFinder</LogoText>
            </LogoContainer>
          </Grid>
          {[
            ["Home", "Restaurants", "Add Restaurant"],
            ["About Us", "FAQs"],
            ["Contact Us", "Terms of Use", "Privacy Policy"],
            ["Login", "Register"],
          ].map((el, index) => (
            <Grid key={index} item xs={6} sm={3} md={2}>
              <Grid container direction="column" rowSpacing={1}>
                {el.map((s) => (
                  <Grid item key={s}>
                    <Typography
                      color="text.secondary"
                      sx={{ userSelect: "none" }}
                    >
                      {s}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ mt: 4 }} />
        <Typography color="text.secondary" variant="subtitle2" sx={{ my: 3 }}>
          &copy; 2023 DineAdvisor. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
}
