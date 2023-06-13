import Input from "../../form/input"
import { ChangeEvent, useState,MouseEvent } from "react"
import { UserType } from "../../../types/user-type"
import { updateUser } from "../../../services/api"
import { saveUser} from "../../../services/api"

type Values = Partial<Omit<UserType, 'maritalStatus'>> & {
    maritalStatus: string
}
type ErrorsType = {
  [key: string]: string
}
type Props = {
  user?: UserType
}
const INITIAL_USER = {
  fullname: "",
  dateOfBirth:"",
  email: "",
  maritalStatus: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
}

export default function UserForm ({ user }: Props) {
  const [values, setValues] = useState<Values>(user?.id ? user : INITIAL_USER)

    const [errors, setErrors] = useState<ErrorsType>({})
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        setValues({
            ...values,// spread operator
            [name]: value
        })
    }
    

    const handleSaveOrUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    
    const fieldsNotRequired = ['complement']

    const requiredFields = Object.keys(values).reduce((accumulator, currentValue) => {
      if (!fieldsNotRequired.includes(currentValue) && values[currentValue as keyof typeof values] === '') {
        return {
          ...accumulator,
          [currentValue]: 'Campo obrigatório'
        }
      }

      return accumulator
    }, {})

    setErrors(requiredFields)

    if (Object.values(requiredFields).filter(item => item).length > 0) {
      return
    }

    if (user?.id) {
      await updateUser(values as UserType)
    } else {
      await saveUser(values as UserType)
    }
  }

  return (
    <div>
      <form>
        <Input label="Nome Completo" name="fullname" onChange={handleChange} errorMessage={errors?.fullname} value={values.fullname} />
        <Input label="Data de Nascimento" name="dateOfBirth" onChange={handleChange} errorMessage={errors?.dateOfBirth} value={values.dateOfBirth} />
        <Input label="E-mail" name="email" type="email" onChange={handleChange} errorMessage={errors?.email} value={values.email}/>

        <div className="form-group">
          <label htmlFor="maritalStatus">Estado Civil:</label>
          <select name="maritalStatus" id="maritalStatus" onChange={handleChange} defaultValue={values.maritalStatus}>
            <option value="" disabled>Selecione...</option>
            <option value="single">Solteiro(a)</option>
            <option value="married">Casado(a)</option>
            <option value="divorced">Divorciado(a)</option>
          </select>
          <p>{errors.maritalStatus}</p>
        </div>

        <Input label="Endereço" name="address" onChange={handleChange} errorMessage={errors?.address} value={values.address} />
        <Input label="Número" name="number" onChange={handleChange} errorMessage={errors?.number} value={values.number} />
        <Input label="Complemento" name="complement" onChange={handleChange} errorMessage={errors?.complement} value={values.complement} />
        <Input label="Bairro" name="neighborhood" onChange={handleChange} errorMessage={errors?.neighborhood} value={values.neighborhood} />
        <Input label="Cidade" name="city" onChange={handleChange} errorMessage={errors?.city} value={values.city} />
        <Input label="Estado" name="state" onChange={handleChange} errorMessage={errors?.state} value={values.state} />

        <button onClick={handleSaveOrUpdate}>{user?.id ? 'Editar' : 'Salvar'}</button>
      </form>      
    </div>
  )
}