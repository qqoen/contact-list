import * as React from 'react';
import { Link } from 'react-router-dom';

import ContactListItem from './ContactListItem';
import { IContact, IDomEvent } from '../types';
import { getContacts, addContact, deleteContact } from '../service';
import { spinner } from '../spinner';


export interface IState {
    contacts: IContact[];
    newContact: IContact;
    search: string;
}

export default class ContactList extends React.Component<unknown, IState> {
    private isAuthenticated = false;

    constructor(props: unknown) {
        super(props);

        this.state = {
            contacts: [],
            newContact: {
                name: '',
                phone: '',
            },
            search: '',
        };

        this.addContact = this.addContact.bind(this);
        this.logout = this.logout.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    public render() {
        const contacts = this.state.contacts;

        const page = (
            <div className="contact-list panel">
                <h1 className="title">Contact List</h1>

                <div className="panel">
                    <input type="text" className="input" placeholder="Name" />
                    <input type="text" className="input" placeholder="Phone" />
                    <button className="button" onClick={this.addContact}>Add new contact</button>
                </div>

                <div>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search..."
                        onChange={this.onSearch} />
                </div>

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

    public componentDidMount() {
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
                    contacts: this.state.contacts.concat([newContact]),
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

    private onSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            search: event.target.value,
        });
    }
}
