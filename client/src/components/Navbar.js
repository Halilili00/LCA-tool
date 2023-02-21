import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Divider, Grid, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useMsal } from "@azure/msal-react";

const Navbar = ({ activeMode, setAciveMode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { instance } = useMsal();
  const usingModes = ["Admin", "User"]


  const logoutUser = () => {
    handleClose();
    if (user.result.authMode === "Microsoft") {
      instance.logoutRedirect({ postLogoutRedirectUri: "/", })
      dispatch(logout())
    } else {
      dispatch(logout())
    }
    navigate("/")
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
    <AppBar component="nav" position="static" sx={{
      backgroundColor: "#282c34", "@media print": {
        "&":
          { display: "none"}
      }
    }}>
      <Toolbar>
        <Typography
          variant="h3"
          component={Link}
          to="/LCADatas"
          style={{ textDecoration: "none", color: "white" }}
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          LCA Tool
        </Typography>
        <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "none", md: "flex" } }}>
          <Button component={Link} variant="h4" to="/LCADatas" sx={{ color: "#fff" }}>
            Added Datas
          </Button>
          <Button component={Link} variant="h4" to="/Forms" sx={{ color: "#fff" }}>
            Machining form
          </Button>
          {user ?
            <>
              <Box display="flex">
                <div onClick={handleMenu} style={{ display: "flex" }}>
                  <Avatar alt={user.result.name} src={user.result.imageUrl}>{user?.result.name?.charAt(0)}</Avatar>
                  <Typography variant="h6" style={{ marginLeft: "5px", marginTop: "3px" }}>
                    {user?.result.name}
                  </Typography>
                </div>
                <Menu
                  sx={{ mt: "45px", display: { xs: "none", sm: "none", md: "flex" } }}
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
                  <MenuItem onClick={logoutUser}><ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>Logout</MenuItem>
                  {user?.result?.isAdmin && <Divider />}
                  {user?.result?.isAdmin && usingModes.map((um, index) => (
                    activeMode === um ? <MenuItem key={index} sx={{ color: "green" }}><ListItemIcon><ArrowForwardTwoToneIcon /></ListItemIcon>{um}</MenuItem> :
                      <MenuItem key={index} onClick={() => setAciveMode(um)}><ListItemIcon></ListItemIcon>{um}</MenuItem>
                  ))}
                </Menu>
              </Box>
            </> :
            <Button component={Link} variant="h4" to="/" sx={{ color: "#fff" }}>
              Sign in
            </Button>
          }
        </Box>
        <Box sx={{ flexGrow: 0, display: { xs: "flex", sm: "flex", md: "none" } }}>
          <MenuOutlinedIcon onClick={handleMenu} />
        </Box>
        <Menu
          sx={{ mt: "25px", display: { xs: "flex", sm: "flex", md: "none" } }}
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
          {user && <MenuItem>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item alignItems="center">
                <Avatar alt={user.result.name} src={user.result.imageUrl}>{user?.result.name?.charAt(0)}</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6">{user?.result.name}</Typography>
              </Grid>
            </Grid>
          </MenuItem>}
          <Divider />
          <MenuItem component={Link} to="/Forms">Machining form</MenuItem>
          <MenuItem component={Link} to="/LCADatas">Added Datas</MenuItem>
          <Divider />
          {user ? <MenuItem onClick={logoutUser}><ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>Logout</MenuItem>
            : <MenuItem component={Link} to="/">Sign in</MenuItem>}
          {user?.result?.isAdmin && <Divider />}
          {user?.result?.isAdmin && usingModes.map((um, index) => (
            activeMode === um ? <MenuItem key={index} sx={{ color: "green" }}><ListItemIcon><ArrowForwardTwoToneIcon /></ListItemIcon>{um}</MenuItem> :
              <MenuItem key={index} onClick={() => setAciveMode(um)}><ListItemIcon></ListItemIcon>{um}</MenuItem>
          ))}
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
