import { ReactNode, SetStateAction, Dispatch } from 'react'

type Props = {
  children: ReactNode
  onClose: Dispatch<SetStateAction<boolean>>
}

export default function Modal ({ children, onClose }: Props) {
  return (
    <div className="modal">
      <div className="over" onClick={()=>onClose(false)}/>
      <div className="content">
        <div className="modal-header">
          <div className="title">Título do modal</div>
          <div className="close" onClick={()=>onClose(false)}>&times;</div>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}