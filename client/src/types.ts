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
  id: number,
  name: string,
  email: string,
  role: string,
  accessToken: string,
}

export type authSliceTypes = {
  isLoggedIn: boolean,
  user: User | null
}