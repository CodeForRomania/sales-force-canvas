import React from 'react'

import './Sidebar.css'

const Sidebar = ({ users = [] }) => (
  <div id="sidebar">
    <ul>
      {users.map(u => {
        return <li> {JSON.stringify(u)} </li>
      })}
    </ul>
  </div>
)

export default Sidebar
