import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar,IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './SidebarChat.js';
import SidebarChat from './SidebarChat.js';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar_header">
      <Avatar src="/icon-5404125_1280.png" />
        <div className="sidebar_headerRight">
            <IconButton>
                <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
            <SearchOutlinedIcon/>
            <input placeholder='type something' type="text"/>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
      </div>
    </div>
  );
}

export default Sidebar;
