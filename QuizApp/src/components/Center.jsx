import { Grid } from "@mui/material";

const Center = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={1}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Center;
