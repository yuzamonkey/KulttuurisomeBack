export interface Message {
  _id: Object
  body: String
  sender: User
}

export interface Conversation {
  _id: Object
  users: [User]
  messages: [Message]
}

export interface Jobquery {
  _id: Object
  content: String
  date: Date
  user: User
}

export interface User {
  _id: Object
  username: String
  passwordHash: String
  jobQueries: [Jobquery]
  conversations: [Conversation]
}