export type authType = {
  name?: string,
  email: string,
  password: string,
  repeatPassword?: string,
}

export type Message = {
  message: string,
}

export type User = {
  _id: string,
  name: string,
  email: string,
  roles: RoleTypes,
}

export type Card = {
  _id: string,
  title: string,
  description: string,
  createdBy: string,
  category?: string,
  date?: string,
  status?: StatusTypes,
}

// export interface TokenUser extends User {
//   accessToken: string,
// }

export interface UserCard extends User {
  isAdmin?: User,
  isModerator?: boolean | null,
}

export type userUpdateCardTypes = {
  _id: string,
  status: StatusTypes,
}

export type authSliceTypes = {
  isLoggedIn: boolean,
  user: User,
}

export type roleSliceTypes = {
  isAdmin: boolean,
  isModerator: boolean,
}

export type StatusTypes = {
  toDo: boolean,
  doing: boolean,
  done: boolean,
}

export type CreateCardTypes = {
  title: string,
  description: string,
  createdBy: string,
  category?: string,
}

export interface CardTypes extends Card {
  isModerator: boolean,
}

export type CardSliceTypes = {
  isCreated?: boolean,
  activeCard: Card,
  cards: {
    toDo: Card[],
    doing: Card[],
    done: Card[],
  }
}

export type RoleTypes = {
  admin: boolean,
  moderator: boolean,
  user: boolean,
}

export type updateTypes = {
  _id: string,
  roles: RoleTypes,
}

export type deleteTypes = {_id: string };

export type UserInitialTypes = {
  users: User[],
  isUpdated: boolean,
}
