export interface ISpringUser {
  id: number,
  companyId: number,

  username: string,
  password: string,

  email: string,
  roles: string,

  firstName: string,
  lastName: string,


  createdBy: number,

  lastUpdatedBy: number,

  createdTime: Date,
  updatedTime: Date,

  enabled: boolean,

  token: string
}
