export interface IForm extends React.Component {
    submit: () => void;
    handleSubmit: () => void;
    reset: () => void;
    setState: (state: any) => void;
    showServerValidationErrors: (Fields: string[], messages: string[]) => void;
}
