import './topbar.css'
import { ArrowDropDown, Language, NotificationsNone, Settings } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import { useContext} from 'react';

export default function topbar() {
  const {dispatch} = useContext(AuthContext)

  return (
      <div className='topbar'>
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">
              adminpanel
            </span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNone/>
              <span className="topIconBadge">
                2
              </span>
            </div>
            <div className="topbarIconContainer">
              <Language/>
              <span className="topIconBadge">
                2
              </span>
            </div>
            <div className="topbarIconContainer">
              <Settings/>
            </div>
              <img src="https://avatarfiles.alphacoders.com/366/366712.jpg" alt="" className="topAvatar" />
              <div className="profile">
                <ArrowDropDown className="icon"/>
                <div className="options">
                    <span>Settings</span>
                    <span onClick={() => dispatch(logout())}>Logout</span>
                </div>
            </div>
          </div>
        </div>
      </div> 
  )
}
