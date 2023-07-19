// import { ValidatePasswordFieldProps } from "../../../interfaces/ValidatePaswordFieldProps";

interface ValidatePasswordFieldProps {
    email: string;
    currentPassword: string;
}

function comparePasswords(nPassword: string, cPassword: string) {

    if (nPassword.trim().length < 2) {
        return false;
    }

    const newPassword = nPassword.toLocaleLowerCase();
    const currentPassword = cPassword.toLocaleLowerCase();

    if (newPassword === currentPassword) {
        return false;
    }

    const tokens = currentPassword.split(/[\~\!\@\#\$\%\^\&\*<>\+\-=]/);
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].length > 3) {
            const subTokens = tokens[i];
            for (let j = 0; j < subTokens.length - 2; j++) {
                const subToken = subTokens.substring(j, j + 3);
                if (newPassword.indexOf(subToken) > -1) {
                    return false;
                }
            }
        }
        if (tokens[i].length > 2 && newPassword.indexOf(tokens[i]) > -1) {
            return false;
        }
    }
    return true;
};

export function checkStringNotInAnotherString(password: string, fieldText: string) {
    if (password.length === 0) {
        return false;
    }

    if (fieldText === undefined) {
        return true;
    }

    if (password === fieldText) {
        return true;
    }
    return false;
};

export function validatePasswordField(password: string, { email, currentPassword }: ValidatePasswordFieldProps) {

    const errors: { [x: string]: boolean } = {};

    //validate the length
    if ((/[\s]/).test(password)) {
        errors.length = true;
    }

    if (password.length > 20 || password.length < 8) {
        errors.length = true;
    }

    //validate contents
    if (checkStringNotInAnotherString(password, email)) {
        errors.email = true;
    }

    //validate latin letter
    if (!(/^[a-zA-Z0-9~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?<>'\":;`%|-]{1,}$/).test(password)) {
        errors.latin = true;
        // if (!(/^[a-zA-Z0-9~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?<>'\":;`%|-]{1,}$/).test(password) && password.match(/[\/\\]/)) {
        //     errors.latin = undefined;
        // }
    }

    // validate capital letter
    if (!password.match(/[A-Z]/)) {
        errors.upperCase = true;
    }
    // validate small caps letter
    if (!password.match(/[a-z]/)) {
        errors.lowerCase = true;
    }

    // validate digit
    if (!password.match(/\d/)) {
        errors.number = true;
    }

    // validate special symbol
    if (!password.match(/[~!@#\^\$&\*\(\)_\+=\[\]\{\}\|,\.\?<>'\":;`%|-]/)) {
        errors.specialSymbol = true;
    }

    // preventing non-allowed special symbol use
    if (password.match(/[\/\\]/)) {
        errors.specialSymbol = true;
    }

    // validate (compare) current with new password
    if (currentPassword && currentPassword.trim().length) {
        if (!comparePasswords(password, currentPassword)) {
            errors.compare = true;
        }
    }
    return {
        errors,
        options: {
            showComparePassword: currentPassword !== undefined,
        },
    };
};

export default { validatePasswordField };