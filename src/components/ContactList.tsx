import * as React from 'react';
import { Link } from 'react-router-dom';

import ContactListItem from './ContactListItem';
import { IState, IContact } from '../types';
import { getContacts, addContact, deleteContact } from '../service';
import { spinner } from '../spinner';


const initialState = {
    contacts: [],
};

export default class ContactList extends React.Component<unknown, IState> {
    private isAuthenticated = false;

    constructor(props: unknown) {
        super(props);

        this.state = initialState;

        this.addContact = this.addContact.bind(this);
        this.logout = this.logout.bind(this);

        this.init();
    }

    public render() {
        const contacts = this.state.contacts;

        const page = (
            <div className="contact-list panel">
                <h1 className="title">Contact List</h1>
                <button className="button" onClick={this.addContact}>Add new contact</button>

                <ul>
                    {contacts.map((contact) => (
                        <ContactListItem
                            key={contact.id}
                            contact={contact}
                            onDelete={this.deleteContact.bind(this, contact.id)} />
                    ))}
                </ul>

                <hr/>

                <button className="button danger" onClick={this.logout}>Logout</button>
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

    private init() {
        spinner.start();

        getContacts()
            .then((data) => {
                this.isAuthenticated = true;

                this.setState({
                    contacts: data,
                });
            })
            .finally(() => {
                spinner.stop();
            });
    }

    private addContact() {
        const newContact: IContact = { name: `New Contact`, phone: '' };

        spinner.start();

        addContact(newContact)
            .then((data) => {
                newContact.id = data.id;

                this.setState({
                    contacts: this.state.contacts.concat([newContact])
                });
            })
            .finally(() => {
                spinner.stop();
            });
    }

    private deleteContact(id: number) {
        this.setState({
            contacts: this.state.contacts.filter((contact) => contact.id !== id),
        });

        spinner.start();

        deleteContact(id)
            .finally(() => {
                spinner.stop();
            });
    }

    private logout() {
        localStorage.setItem('token', undefined);
        location.href = '/';
    }
}
