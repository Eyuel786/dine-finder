import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LogoContainer = styled("div")(() => ({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  userSelect: "none",
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "2.4rem",
  color: theme.palette.primary.main,
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
  },
})) as typeof Typography;

export const PageTitle = styled(Typography)(() => ({
  fontSize: "2.4rem",
  fontWeight: 600,
  textAlign: "center",
  marginBottom: "2.5rem",
})) as typeof Typography;
