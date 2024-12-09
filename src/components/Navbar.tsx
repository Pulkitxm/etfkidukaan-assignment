import { MouseEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth";

import LOGO from "@/assets/logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { LuLoader } from "react-icons/lu";

export default function MenuAppBar() {
  const navigate = useNavigate();

  const { isLoggedOut, logOut } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-white text-black">
          <Link
            to="/"
            className="flex items-center text-black no-underline flex-grow"
          >
            <img
              src={LOGO}
              alt="logo"
              className="h-10 mr-2 border-2 border-gray-200 rounded-md"
            />
          </Link>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
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
              {isLoggedOut ? (
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={async () => {
                    setLoading(true);
                    await logOut();
                    handleClose();
                    setLoading(false);
                  }}
                  className="w-32 h-12"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {loading ? (
                      <LuLoader className="animate-spin w-5 h-5" />
                    ) : (
                      "Log Out"
                    )}
                  </div>
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
