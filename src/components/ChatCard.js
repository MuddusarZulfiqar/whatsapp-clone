import React from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
function ChatCard({ userdata, messageLast }) {
  return (
    <li title={userdata.name} className={`chat__listItem `}>
      <Avatar
        onClick={() => alert("Clicked")}
        sx={{ bgcolor: deepOrange[500] }}
      >
        {userdata?.name.charAt(0)}
      </Avatar>
      <div className="chat__listItem--detail">
        <div className="chat__listItem--detail_name">
          <span className="name">{userdata.name}</span>
          <span className="chat__listItem--detail_time">
            {messageLast.date_time.substring(12)}
          </span>
        </div>
        <span className="chat__listItem--detail_message">
          <p>{messageLast.message}</p>
          {/* <span>1</span> */}
        </span>
      </div>
    </li>
  );
}

export default ChatCard;
