import * as React from 'react';

import { IContact } from '../types';


interface IProp {
    contact: IContact;
    onNameChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
}

export default function ContactForm(props: IProp) {
    const maxInput = 10;

    const onNameChange = (e) => {
        const name = e.target.value.slice(0, maxInput);
        props.onNameChange(name);
    };
    const onPhoneChange = (e) => {
        const phone = e.target.value
            .replace(/[^0-9]/g, '')
            .slice(0, maxInput);
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
