import { FC } from "react";

type Props = {
  children: string
  name: string
}

export const Hello: FC<Props> = (props) => {
  return (
    <>
      <h1>Hello {props.name} !</h1>
      <h2>{props.children}</h2>
    </>
  );
}