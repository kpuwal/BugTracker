export type authType = {
  name?: string,
  email: string,
  password: string,
  repeatPassword?: string,
}

export type MessageType = {
  message: string,
}

export type User = {
  id: number,
  name: string,
  email: string,
  accessToken: string
}

export type authSliceTypes = {
  isLoggedIn: boolean,
  user: User | null
}