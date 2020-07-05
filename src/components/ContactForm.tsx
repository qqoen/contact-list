import * as React from 'react';

import { IContact } from '../types';


interface IProp {
    contact: IContact;
    onNameChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
}

const maxNameInput = 20;
const maxPhoneInput = 10;

export default function ContactForm(props: IProp): JSX.Element {
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value.slice(0, maxNameInput);

        props.onNameChange(name);
    };

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value
            .replace(/[^0-9]/g, '')
            .slice(0, maxPhoneInput);

        props.onPhoneChange(phone);
    };

    return (
        <div className="flex">
            <input
                className="input item"
                type="text"
                placeholder="Name"
                value={props.contact.name}
                onChange={onNameChange} />

            <input
                className="input item"
                type="text"
                placeholder="Phone"
                value={props.contact.phone}
                onChange={onPhoneChange} />
        </div>
    );
}
