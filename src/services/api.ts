import { UserType } from "../types/user-type";
const baseUrl = 'http://localhost:3000'
export async function loadUsers(): Promise<UserType[]> {
    const response = await fetch(baseUrl + '/users')
    return await response.json()
}
export async function saveUser(user: Omit<UserType, 'id'>): Promise<UserType> {
    const response = await fetch(baseUrl + '/users', {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }

    })
    return await response.json()
}
export async function loadUser(userId: number): Promise<UserType> {
    const response = await fetch(`${baseUrl}/users/${userId}`)
         
    return await response.json()
}
export async function updateUser(user: UserType): Promise<UserType> {
    const userId = user.id
    const response = await fetch(`${baseUrl}/users/${userId}`,{
        body: JSON.stringify(user),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
         
    return await response.json()
}