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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = ({ activeMode, setAciveMode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const [formsMenu, setFormsMenu] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleFormsMenu = (event) => {
    setFormsMenu(event.currentTarget);
  };

  const handleCollapse = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setFormsMenu(null);
  };

  return (
    <AppBar component="nav" position="static" sx={{
      backgroundColor: "#282c34", "@media print": {
        "&":
          { display: "none" }
      }
    }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/LCADatas"
          style={{ textDecoration: "none", color: "white" }}
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          Calculations for Greenhouse Gas Emissions
        </Typography>
        <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "none", md: "flex" } }}>
          <Button component={Link} variant="h4" to="/LCADatas" sx={{ color: "#fff" }}>
            Calculations
          </Button>
          <Button variant="h4" sx={{ color: "#fff" }} endIcon={<KeyboardArrowDownIcon />} onClick={handleFormsMenu}>
            Add new calculation
          </Button>
          <Menu anchorEl={formsMenu} onClose={handleClose} open={Boolean(formsMenu)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}>
            <MenuItem component={Link} to="/Forms" onClick={handleClose}>Machining</MenuItem>
            <MenuItem component={Link} to="/Forms" onClick={handleClose}>Temp2</MenuItem>
          </Menu>
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
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
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
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
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
          <MenuItem onClick={handleCollapse}>Add new calculation</MenuItem>
          {open && <li style={{marginLeft: "15px"}}>
            <MenuItem component={Link} to="/Forms" onClick={() => setOpen(false)}>Machining</MenuItem>
            <MenuItem component={Link} to="/Forms" onClick={() => setOpen(false)}>Temp2</MenuItem>
          </li>}
          <MenuItem component={Link} to="/LCADatas">
            Calculations
          </MenuItem>
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
