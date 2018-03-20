import React from 'react'
import { cnv } from '../utils/salesforce'

import './Sidebar.css'

const CurrentUser = ({ currentUser: { userName, userType, profileThumbnailUrl } }) => {
  return (
    <div className="currentUser">
      <img src={profileThumbnailUrl} alt="profile" />
      <div>
        <h1>{userName}</h1>
        <h6>{userType}</h6>
      </div>
    </div>
  )
}

const User = ({ Id, Username, SmallPhotoUrl, attributes: { type, url } }) => {
  const openProfile = id => () => {
    console.log(id)
    cnv.navigate(id, url, false)
  }
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

    console.log(users)

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
