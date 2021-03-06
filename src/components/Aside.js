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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NavLink } from "react-router-dom";

import { auth } from "../firebase.js";
import { SignOut } from "../App/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import firebase from "@firebase/app-compat";
function Aside({ message, user, googleUser }) {
  const { email } = firebase.auth().currentUser;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [inputBgChange, setinputBgChange] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const googleReduxUser = useSelector((state) => state.User);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e);
    setAnchorEl(null);
  };
  const logOut = () => {
    console.log("logOut");
    auth.signOut().then(() => {
      dispatch(SignOut());
    }).finally(() => {
      window.location.reload(true);
    })
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
  const handleClickLink = (e, disable) => {
    if (disable === 'disabled') {
      e.preventDefault()
    }
  }
  return (
    <aside>
      <div className="header">
        <Tooltip title={googleReduxUser.name} placement="right">
          <Avatar
            alt={googleReduxUser.name}
            src={googleReduxUser.photo}
            sx={{ width: 40, height: 40 }}
            onClick={() => alert("Clicked")}
          />
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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={(e) => {
              setinputBgChange(true);
            }}
            onBlur={(e) => {
              setinputBgChange(false);
            }}
            value={search}
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
        {user.map((users, index) => (
          <NavLink className={users.email === email ? '' : 'disabled'} onClick={(e) => handleClickLink(e, users.email === email ? '' : 'disabled')} key={users.id} to={`/user/${users.id}`}>
            <ChatCard
              key={users.id}
              userdata={users}
              messageLast={message[message.length - 1]}
            />
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
