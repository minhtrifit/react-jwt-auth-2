import { Navigate } from "react-router-dom";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";

const Login = (props) => {
  const { auth, username, setUsername, password, setPassword, handleLogin } =
    props;
  return (
    <>
      {auth ? (
        <Navigate to="/dashboard" />
      ) : (
        <Box
          p={2}
          sx={{
            width: "400px",
            height: "400px",
            margin: "100px auto",
            border: "1px solid #000",
          }}
        >
          <Typography textAlign="center" fontSize={20} fontWeight={700}>
            ACCOUNT LOG IN
          </Typography>
          <Stack spacing={3} mt={5} mb={5}>
            <TextField
              label="Username: user1"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              label="Password: 123"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                handleLogin();
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
