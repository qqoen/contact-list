import * as React from 'react';

import { IContact } from '../types';


interface IProp {
    contact: IContact;
    onNameChange: React.ChangeEventHandler;
    onPhoneChange: React.ChangeEventHandler;
}

export default function ContactForm(props: IProp) {
    return (
        <div>
            <input
                className="input"
                type="text"
                placeholder="Name"
                value={props.contact.name}
                onChange={props.onNameChange} />

            <input
                className="input"
                type="text"
                placeholder="Phone"
                value={props.contact.phone}
                onChange={props.onPhoneChange} />
        </div>
    );
}
