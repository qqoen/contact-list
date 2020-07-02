import * as React from 'react';
import { Link } from 'react-router-dom';

import ContactListItem from './ContactListItem';
import { IState, IContact } from '../types';
import { getContacts, addContact, deleteContact } from '../service';


const initialState = {
    contacts: [],
};

export default class ContactList extends React.Component<unknown, IState> {
    private isAuthenticated = false;

    constructor(props: unknown) {
        super(props);

        this.state = initialState;

        getContacts()
            .then((data) => {
                this.isAuthenticated = true;

                this.setState({
                    contacts: data,
                });
            }, (response) => {
            });
    }

    public render() {
        const contacts = this.state.contacts;

        const page = (
            <div className="contact-list panel">
                <h1 className="title">Contact List</h1>
                <button className="button" onClick={this.addContact.bind(this)}>Add new contact</button>

                <ul>
                    {contacts.map((contact) => (
                        <ContactListItem
                            key={contact.id}
                            contact={contact}
                            onDelete={this.deleteContact.bind(this, contact.id)} />
                    ))}
                </ul>

                <hr/>

                <Link className="link" to="/">Login page</Link>
            </div>
        );

        if (this.isAuthenticated) {
            return page;
        } else {
            return (
                <div>
                    <h1>You are not authorized</h1>
                    <Link className="link" to="/">Login page</Link>
                </div>
            );
        }
    }

    private addContact() {
        const newContact: IContact = { name: `New Contact`, phone: '' };

        addContact(newContact).then((data) => {
            newContact.id = data.id;

            this.setState({
                contacts: this.state.contacts.concat([newContact])
            });
        });
    }

    private deleteContact(id: number) {
        this.setState({
            contacts: this.state.contacts.filter((contact) => contact.id !== id),
        });

        deleteContact(id);
    }
}
