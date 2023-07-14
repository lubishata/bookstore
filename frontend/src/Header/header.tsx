import React from "react"

interface Props {
    message: string;
}

const Proba = ({ message }: Props): JSX.Element => <div>{message}</div>;

export default Proba;