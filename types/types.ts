export interface IMessage {
  _id: Object
  body: String
  sender: IUser
}

export interface IConversation {
  _id: Object
  users: [IUser]
  messages: [IMessage]
}

export interface IJobquery {
  _id: Object
  content: String
  date: Date
  user: IUser
}

export interface IUser {
  _id: Object
  username: String
  passwordHash: String
  jobQueries: [IJobquery]
  conversations: [IConversation]
}

export interface IToken {
  value: String
}