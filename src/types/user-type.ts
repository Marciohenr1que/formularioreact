export type MaritalstatusType =  'single' | 'married' | 'divorced'

export type UserType = {
      id: number,
      fullname: string,
      dateOfBirth: string,
      email: string,
      maritalStatus: MaritalstatusType,
      address: string,
      number: string,
      complement: string,
      neighborhood: string,
      city: string,
      state: string
}