import * as React from 'react';

import { IContact } from '../types';
import { updateContact } from '../service';
import { spinner } from '../spinner';


interface IProps {
    contact: IContact;
    onDelete: React.EventHandler<any>;
}

interface IState {
    isEditing: boolean;
    contact: IContact;
    defaultContact: IContact;
}

export default class ContactListItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isEditing: false,
            contact: this.props.contact,
            defaultContact: this.props.contact,
        };

        this.togleEditContact = this.togleEditContact.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
    }

    public render() {
        if (this.state.isEditing) {
            return (
                <li>
                    <div>
                        <input
                            type="text"
                            value={this.state.contact.name}
                            className="input"
                            onChange={this.onNameChange} />

                        <input
                            type="text"
                            value={this.state.contact.phone}
                            className="input"
                            onChange={this.onPhoneChange} />
                    </div>

                    <button className="button" onClick={this.saveContact}>Save</button>
                    <button className="button" onClick={this.cancelEdit}>Cancel</button>
                </li>
            );
        } else {
            return (
                <li>
                    <div>Name: {this.state.contact.name} ({this.state.contact.id}) Phone: {this.state.contact.phone}</div>

                    <button className="button" onClick={this.togleEditContact}>Edit</button>
                    <button className="button" onClick={this.props.onDelete}>Delete</button>
                </li>
            );
        }
    }

    private togleEditContact() {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    private saveContact() {
        this.setState({
            defaultContact: this.state.contact,
            isEditing: false,
        });

        spinner.start();

        updateContact(this.state.contact)
            .finally(() => {
                spinner.stop();
            });
    }

    private cancelEdit() {
        this.setState({
            contact: this.state.defaultContact,
            isEditing: false,
        });
    }

    private onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            contact: {
                ...this.state.contact,
                name: event.target.value,
            },
        });
    }

    private onPhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            contact: {
                ...this.state.contact,
                phone: event.target.value,
            },
        });
    }
}
