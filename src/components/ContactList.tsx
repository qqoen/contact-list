import * as React from 'react';
import { Link } from 'react-router-dom';

import ContactListItem from './ContactListItem';
import ContactForm from './ContactForm';
import { IContact } from '../types';
import { getContacts, addContact, deleteContact } from '../service';
import { spinner } from '../spinner';


export interface IState {
    contacts: IContact[];
    newContact: IContact;
    search: string;
    isLoaded: boolean;
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
            isLoaded: false,
        };
    }

    public render() {
        const search = this.state.search.toLocaleLowerCase();
        const contacts = this.state.contacts
            .filter((contact) => {
                const name = contact.name.toLowerCase();
                const phone = contact.phone.toLowerCase();

                return name.includes(search) || phone.includes(search);
            });

        const contactEls = contacts.map((contact) => (
            <ContactListItem
                key={contact.id}
                contact={contact}
                onDelete={() => this.deleteContact(contact.id)} />
        ));

        const page = (
            <div className="contact-list panel">
                <h1 className="title">Contact List</h1>

                <div className="panel inner flex">
                    <div className="item">
                        <ContactForm
                            contact={this.state.newContact}
                            onNameChange={this.onNewNameChange}
                            onPhoneChange={this.onNewPhoneChange} />
                    </div>

                    <button
                        className="button item"
                        onClick={this.addContact}
                        disabled={!this.isAddFormValid()}>Add new contact</button>
                </div>

                <div className="flex">
                    <input
                        className="input item"
                        type="text"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={this.onSearch} />
                    
                    <button
                        className="button item"
                        onClick={this.onClear}>Clear</button>
                </div>

                <ul className="list-container">{contactEls}</ul>

                <h2 className="title">{contactEls.length === 0 ? 'No contacts' : ''}</h2>

                <hr/>

                <button className="button danger" onClick={this.logout}>Logout</button>
            </div>
        );

        if (this.isAuthenticated) {
            return page;
        } else if (this.state.isLoaded) {
            return (
                <div className="panel no-auth">
                    <h1 className="title">You are not authorized</h1>
                    <Link className="link" to="/">Login page</Link>
                </div>
            );
        } else {
            return null;
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
            }, () => {
                this.isAuthenticated = false;
            })
            .finally(() => {
                spinner.stop();

                this.setState({
                    isLoaded: true,
                });
            });
    }

    private addContact = () => {
        spinner.start();

        addContact(this.state.newContact)
            .then((data) => {
                const contact = {
                    ...this.state.newContact,
                    id: data.id,
                };

                this.setState({
                    contacts: this.state.contacts.concat([contact]),
                    newContact: {
                        name: '',
                        phone: '',
                    },
                });
            })
            .finally(() => {
                spinner.stop();
            });
    };

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

    private logout = () => {
        localStorage.setItem('token', undefined);
        location.href = '/';
    };

    private onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;

        this.setState({
            search,
        });
    };

    private onNewNameChange = (value: string) => {
        this.setState({
            newContact: {
                ...this.state.newContact,
                name: value,
            },
        });
    };

    private onNewPhoneChange = (value: string) => {
        this.setState({
            newContact: {
                ...this.state.newContact,
                phone: value,
            },
        });
    };

    private isAddFormValid = () => {
        return this.state.newContact.name !== '' &&
            this.state.newContact.phone !== '';
    };

    private onClear = () => {
        this.setState({ search: '' });
    };
}
