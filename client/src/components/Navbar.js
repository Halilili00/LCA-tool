import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useMsal } from "@azure/msal-react";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { instance } = useMsal();


  const logoutUser = () => {
    handleClose();
    if (user.result.authMode === "Microsoft") {
      instance.logoutRedirect({postLogoutRedirectUri: "/SignIn",})
      dispatch(logout())
    } else {
      dispatch(logout())
    }
    navigate("/SignIn")
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      // googlella on 1h vanhenemis aika
      if (decodedToken.exp * 1000 < new Date().getTime()) logoutUser();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar component="nav" position="static" sx={{ backgroundColor: "#282c34" }}>
      <Toolbar>
        <Typography
          variant="h3"
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          LCA tool
        </Typography>
        <Box display="flex">
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
              <Box display="flex">
                <div onClick={handleMenu} style={{ display: "flex" }}>
                  <Avatar alt={user.result.name} src={user.result.imageUrl}>{user?.result.name?.charAt(0)}</Avatar>
                  <Typography
                    variant="h6"
                    style={{ marginLeft: "5px", marginTop: "3px" }}
                  >
                    {user?.result.name}
                  </Typography>
                </div>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </Menu>
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
