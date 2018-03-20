import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Chatbox from './components/Chatbox'
import Sidebar from './components/Sidebar'
import { initializeSfCanvas, cnvService } from './utils/salesforce'

import './App.css'

class App extends Component {
  state = {
    from: 'codebeast',
    currentUser: {},
    users: [],
    content: ''
  }

  componentWillMount = async () => {
    try {
      const context = await initializeSfCanvas()
      console.log(context)

      var query = 'Select Id, Name, UserName, SmallPhotoUrl From User Limit 10'
      const { payload: { records: users } } = await cnvService.querySalesforce(query)

      this.setState({
        from: context.user.userName,
        currentUser: { ...context.user },
        users
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this._subscribeToNewChats()
  }
  _subscribeToNewChats = () => {
    this.props.allChatsQuery.subscribeToMore({
      document: gql`
        subscription {
          Chat(filter: { mutation_in: [CREATED] }) {
            node {
              id
              from
              content
              createdAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newChatLinks = [...previous.allChats, subscriptionData.data.Chat.node]
        const result = {
          ...previous,
          allChats: newChatLinks
        }
        console.log(result, previous, subscriptionData)
        return result
      }
    })
  }
  _createChat = async e => {
    if (e.key === 'Enter') {
      const { content, from } = this.state
      await this.props.createChatMutation({
        variables: { content, from }
      })
      this.setState({ content: '' })
    }
  }
  render() {
    const allChats = this.props.allChatsQuery.allChats || []
    const { currentUser, users, from } = this.state

    return (
      <div className="chat-container" key="app">
        <Sidebar currentUser={currentUser} users={users} />
        <div className="container">
          <div className="headerChat">
            <h2>Chats</h2>
          </div>
          <div className="messageList">
            {allChats.map(message => <Chatbox key={message.id} message={message} me={from} />)}
          </div>
          <input
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            placeholder="Start typing"
            onKeyPress={this._createChat}
          />
        </div>
      </div>
    )
  }
}

const ALL_CHATS_QUERY = gql`
  query AllChatsQuery {
    allChats {
      id
      createdAt
      from
      content
    }
  }
`

const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($content: String!, $from: String!) {
    createChat(content: $content, from: $from) {
      id
      createdAt
      from
      content
    }
  }
`

export default compose(
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' })
)(App)
