import { School } from "@mui/icons-material";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

export const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            ÜBEREINSTIMMUNG
          </Typography>
          <Typography color="textPrimary" variant="h4">
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <School />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
