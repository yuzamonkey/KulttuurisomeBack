export interface Message {
  id: Object
  body: String
  sender: User
}

export interface Conversation {
  id: Object
  users: [User]
  messages: [Message]
}

export interface Jobquery {
  id: Object
  content: String
  date: Date
  user: User
}

export interface User {
  id: Object
  username: String
  passwordHash: String
  jobQueries: [Jobquery]
  conversations: [Conversation]
}