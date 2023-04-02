import React from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Dashboard = (props) => {
  const { auth, user, handleLogOut, token, getToken } = props;

  return (
    <>
      {!auth ? (
        <Navigate to="/" />
      ) : (
        <Box
          p={2}
          sx={{
            width: "400px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "100px auto",
            border: "1px solid #000",
          }}
        >
          <Typography textAlign="center" fontSize={20} fontWeight={500}>
            Username: {user.username}, Role: {user.role}
          </Typography>
          <Box
            mt={3}
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Typography textAlign="center" fontSize={20} fontWeight={500}>
              {token ? token : "Token will show here..."}
            </Typography>
          </Box>

          <Box
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                getToken();
              }}
            >
              Get token
            </Button>
          </Box>
          <Box
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                handleLogOut();
              }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
