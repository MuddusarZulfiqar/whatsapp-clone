import React from "react";
import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
function ChatCard({active}) {
  return (
    <li title="Ameer Hamza" className={`chat__listItem ${active ? 'active':''}`}>
      <Avatar
        onClick={() => alert("Clicked")}
        sx={{ bgcolor: deepOrange[500] }}
      >
        N
      </Avatar>
      <div className="chat__listItem--detail">
        <div className="chat__listItem--detail_name">
          <span className="name">Ameer Hamza</span>
          <span className="chat__listItem--detail_time">9:02PM</span>
        </div>
        <span className="chat__listItem--detail_message">
            <p>ji mosam change ho rha ha is leya mujay b ha suba sa 105 tha bss mosam change ho rha ha is waja sa ho rha ha allah bhtr kry ga insallah jldi sa thek kry ga unko</p>
            <span>1</span>
        </span>
      </div>
    </li>
  );
}

export default ChatCard;
