import { UserType } from '../types/user-type'
import { loadUsers } from '../services/api'
import { useEffect, useState } from 'react'
import '../assets/style.css'
import Modal from '../components/modal'
import UserForma from '../components/modal/user-form'

export default function UsersListPage() {
    const [users, setUsers] = useState<UserType[]>([])
    const [currentUser, setCurrentUser] = useState<UserType>()
    console.log(users)
    const [modal, setModal] = useState<boolean>(false)
    
    useEffect( () => { 
        const loadData = async () => { 
            const response = await loadUsers()
            setUsers(response)
        }
     loadData()
    }, [])
    const showUser = (user: UserType) => { 
        setModal(true)
        setCurrentUser(user)
    }
    return (
        <div>
            <h1>usuarios</h1>
            <button onClick={() => setModal(true)}>Adicionar novo usuario</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome Completo</th>
                        <th>Email</th>
                        <th>Cidade/Estado</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                            <td>{user.fullname }</td>
                            <td>{user.email }</td>
                            <td>{user.city}/{user.state}</td>
                            <td><button onClick={() => showUser(user)}>Editar</button></td>
                            
                            
                    </tr>  
                    ))}
                    
                </tbody>
            </table>
            {modal && <Modal onClose={setModal}>
            <UserForma user={currentUser} />
            </Modal>}
        </div>
    )
}
