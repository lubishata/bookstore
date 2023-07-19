import validationRules from './validationRules';

export function validateField(fieldName: string, value: string) {
    const inputValue = value;
    const rules = validationRules[fieldName as keyof typeof validationRules];

    if (rules) {
        if (rules.isRequired) {
            if (!inputValue) {
                return rules.isRequired.message;
            }
        }
    }
    if (rules.pattern) {
        const regex = rules.pattern.value;
        const match = regex.exec(inputValue);
        const hasMatch = (match && (match.index === 0) && (match[0].length === inputValue.length));
        if (!hasMatch) {
            return rules.pattern.message;
        }
    }

    return null;
}

export default validateField;