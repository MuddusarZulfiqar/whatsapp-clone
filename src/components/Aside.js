import React from "react";
import {
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import ChatCard from "./ChatCard";
import { deepOrange, deepPurple } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
function Aside() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [inputBgChange, setinputBgChange] = React.useState(null);
  const inputField = React.useRef("");
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
  React.useEffect(() => {
    let input = document.querySelector(".aside__search input");
    if (inputBgChange) {
      input.focus();
    }
    return () => {
      input = "";
    };
  }, [inputBgChange]);
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
      <div className={`aside__search ${inputBgChange ? "bg-white" : ""}`}>
        <FormControl variant="standard">
          <Input
            className="inputField"
            id="input-with-icon-adornment"
            placeholder={inputBgChange ? "" : "Search or start new chart"}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => {
              setinputBgChange(true);
            }}
            onBlur={(e) => {
              setinputBgChange(false);
            }}
            type="search"
            startAdornment={
              <InputAdornment position="start">
                {inputBgChange ? (
                  <IconButton
                    onClick={() => setinputBgChange((prev) => !prev)}
                    aria-label="back"
                  >
                    <KeyboardBackspaceIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => setinputBgChange((prev) => !prev)}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <ul className="chat">
        <ChatCard active={true} />
        <ChatCard active={false}/>
      </ul>
    </aside>
  );
}

export default Aside;
