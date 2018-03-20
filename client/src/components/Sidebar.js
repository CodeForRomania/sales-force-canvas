import React from 'react'
import { cnv } from '../utils/salesforce'

import './Sidebar.css'

const openProfile = id => () => {
  cnv.navigate(id, null, true)
}

const CurrentUser = ({ currentUser: { userId, userName, userType, profileThumbnailUrl } }) => {
  return (
    <div className="currentUser">
      <img src={profileThumbnailUrl} alt="profile" onClick={openProfile(userId)} />
      <div>
        <h1>{userName}</h1>
        <h6>{userType}</h6>
      </div>
    </div>
  )
}

const User = ({ Id, Username, SmallPhotoUrl, attributes: { type, url } }) => {
  return (
    <div className="user" onClick={openProfile(Id)}>
      <img src={SmallPhotoUrl} alt="profile" />
      <div>
        <h2>{Username}</h2>
        <h6>{type}</h6>
      </div>
    </div>
  )
}

class Sidebar extends React.Component {
  render() {
    const { currentUser, users } = this.props

    return (
      <div id="sidebar">
        <CurrentUser currentUser={currentUser} />
        <ul>
          {users.map(u => {
            return <li> {<User {...u} />} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default Sidebar
