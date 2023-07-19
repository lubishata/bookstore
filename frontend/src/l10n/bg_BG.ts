import { register } from './index';

register({
    bundle: 'bg-localization',
    resources: {
        login: 'Влез',
        registration: 'Регистрация',
        forgottenPassword: 'Забравена Парола',
        loremIpsumDummyText: `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        registrationForm: {
            passwordContainEmail: 'Паролата не трябва да е част от имейл адреса',
            passwordsDoesntMatch: 'Паролите не съвпадат.',
        },
        footer: {
            footerLinkLabel1: 'Lorem Ipsum1',
            footerLinkLabel2: 'Lorem Ipsum2',
            footerLinkLabel3: 'Lorem Ipsum3',
        },
        fields: {
            email: 'Имейл',
            emailPlaceholder: 'Въведете имейл',
            password: 'Парола',
            passwordPlaceholder: 'Въведете парола',
            confirmPassword: 'Потвърдете парола',
            isRequired: (s: string) => `Полето "${s}" е задължително.`,
            invalidEmail: 'Въведеният имейл адрес е грешен или непълен.',
            invalidPassword: 'Паролата трябва да съдържа букви (малки и главни на латиница), цифри и специални символи (с изключение на "\\" и "/").',
        },
    }
})