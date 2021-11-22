import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip, FormControl, Input } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useSelector } from "react-redux";

function Main({ messagesMain }) {
  const [userDetail, setUserDetails] = useState("");
  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const googleReduxUser = useSelector((state) => state.User);
  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUserDetails(snapshot.data());
      });
  }, [userId]);
  const sendDataInput = (e) => {
    if (e.keyCode === 13) {
      const dataInput = {
        date_time: new Date().toLocaleString(),
        message,
        sender_id: userId,
        sender_name: userDetail.name,
      };
      db.collection("messages").add(dataInput);
      return setMessage("");
    }
  };
  return (
    userDetail && (
      <div className="chatContent">
        <div className="chatContent__head">
          <div className="chatContent__head--name">
            <Avatar
              onClick={() => alert("Clicked")}
              sx={{ bgcolor: deepOrange[500] }}
            >
              {userDetail.name.charAt(0)}
            </Avatar>
            <span className="name">{userDetail.name}</span>
          </div>
          <div className="chatContent__head--info">
            <IconButton onClick={() => alert("clik")} aria-label="back">
              <SearchIcon />
            </IconButton>
            <Tooltip title="More">
              <IconButton
              // className="mx-5"
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="chatContent__body">
          <style>
            {`
        .chatContent__body:after{
          background-image:url(/chatBg.png)
        }
        `}
          </style>
          <div className="chatContent__chat">
            {messagesMain.map((messagess) => (
              <div
                key={messagess.id}
                className={`message ${
                  messagess.sender_id === userId ? "send" : ""
                }`}
              >
                <span className="userName">
                  {messagess.sender_id === userId
                    ? "you"
                    : messagess.sender_name}
                </span>
                <span>{messagess.message}</span>
              </div>
            ))}
          </div>
          <div className="chatContent__footer">
            <div className="chatContent__footer--fileEmoji">
              <IconButton>
                <MoodIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
            </div>
            <div className="chatContent__footer--input">
              <FormControl variant="standard">
                <Input
                  className="inputField"
                  id="input-with-icon-adornment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type a message"
                  autoComplete="off"
                  onKeyDown={(e) => sendDataInput(e)}
                />
              </FormControl>
            </div>
            <div className="chatContent__footer--voice">
              <IconButton
              // className="mx-5"
              >
                <KeyboardVoiceIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Main;
