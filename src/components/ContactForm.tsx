import * as React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { IContact } from '../types';


interface IProp {
    contact: IContact;
    onNameChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    readOnly: boolean;
}

const maxNameInput = 20;

export default function ContactForm(props: IProp): JSX.Element {
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value.slice(0, maxNameInput);

        props.onNameChange(name);
    };

    return (
        <div className="flex">
            <input
                className="input item"
                type="text"
                placeholder="Name"
                value={props.contact.name}
                onChange={onNameChange}
                readOnly={props.readOnly} />

            <div className="item">
                <PhoneInput
                    country={'us'}
                    value={props.contact.phone}
                    onChange={props.onPhoneChange}
                    disabled={props.readOnly} />
            </div>
        </div>
    );
}
