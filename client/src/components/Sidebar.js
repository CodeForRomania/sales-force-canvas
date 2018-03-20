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

const User = ({ Username, SmallPhotoUrl, attributes: { type } }) => {
  const openProfile = id => () => {
    console.log(id)
    console.log(cnv)
  }
  return (
    <div className="user" onClick={openProfile(0)}>
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
