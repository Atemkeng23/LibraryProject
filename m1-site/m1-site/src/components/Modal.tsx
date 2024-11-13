import { FC, ReactElement } from "react";
import { Button } from "./Button";

type Props = {
  children: ReactElement | ReactElement[]
  isOpen: boolean
  title: string
  onCancel: () => void
  onClose: () => void
  onOk: () => void
}

export const Modal: FC<Props> = ({ children, isOpen, title, onCancel, onClose, onOk }) => {
  return isOpen ? (
    <div className="bg-slate-200 w-1/2 h-1/2 absolute top-1/4 left-1/4">
      <div className="flex justify-between p-2 vertical-align">
        <h3>{title}</h3>
        <Button onClick={onClose}>X</Button>
      </div>
      <div className="p-2">{children}</div>
      <div className="absolute bottom-0 p-2">
        <Button onClick={onOk}>Ok</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  ) : <></>
}