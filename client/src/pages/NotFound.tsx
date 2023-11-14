import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Title = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "2rem",
}));

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Title align="center">Page not found</Title>
    </Container>
  );
}
