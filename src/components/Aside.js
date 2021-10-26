import React from "react";
import { Avatar, IconButton, MenuItem, Menu } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
function Aside() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e);
    setAnchorEl(null);
  };
  const logOut = () => {
    console.log("logOut");
    setAnchorEl(null);
  };
  return (
    <aside>
      <div className="header">
        <Tooltip title="Your Name" placement="right">
          <Avatar
            onClick={() => alert("Clicked")}
            sx={{ bgcolor: deepOrange[500] }}
          >
            N
          </Avatar>
        </Tooltip>

        <div className="header__info">
          <Tooltip title="Settings">
            <IconButton className="mx-5" aria-label="SettingsIcon">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat">
            <IconButton className="mx-5" aria-label="ChatIcon">
              <ChatIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="More">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              // className="mx-5"
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem className="MoreListItems" onClick={handleClose}>
              New Group
            </MenuItem>
            <MenuItem className="MoreListItems" onClick={handleClose}>
              Starred
            </MenuItem>
            <MenuItem className="MoreListItems" onClick={handleClose}>
              Settings
            </MenuItem>
            <MenuItem className="MoreListItems" onClick={logOut}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
