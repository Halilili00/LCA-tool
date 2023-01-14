import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => { 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location]) 

  const logout = () => {
    localStorage.clear()
    navigate("/SignIn")
  }

  return (
    <AppBar component="nav" sx={{ backgroundColor: "#282c34" }}>
      <Toolbar>
        <Typography
          variant="h3"
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          LCA tool
        </Typography>
        <Box>
          <Button
            component={Link}
            variant="h4"
            to="/LCADatas"
            sx={{ color: "#fff" }}
          >
            Added Datas
          </Button>
          <Button component={Link} variant="h4" to="/" sx={{ color: "#fff" }}>
            Machining form
          </Button> 
          {user ? 
          <>
          <Box>
            <Avatar alt={user.result.name} src={user.result.imageUrl}>{user?.result.name?.charAt(0)}</Avatar>
            <Typography
                variant="h6"
                style={{ marginLeft: "5px", marginTop: "3px" }}
              >
                {user?.result.name}
              </Typography>
              <Button onClick={logout}>Log out</Button>
          </Box>
          </> :
          <Button
          component={Link}
          variant="h4"
          to="/SignIn"
          sx={{ color: "#fff" }} 
          
        >
          Sign in
        </Button>
          }
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
