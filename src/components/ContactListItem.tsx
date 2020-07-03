import * as React from 'react';

import ContactForm from './ContactForm';
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
    }

    public render() {
        if (this.state.isEditing) {
            return (
                <li className="item">
                    <ContactForm
                        contact={this.state.contact}
                        onNameChange={this.onNameChange}
                        onPhoneChange={this.onPhoneChange} />

                    <div className="flex">
                        <button className="button primary item" onClick={this.saveContact}>Save</button>
                        <button className="button item" onClick={this.cancelEdit}>Cancel</button>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="item">
                    <div className="flex">
                        <div className="flex item">
                            <label className="label item">Name</label>
                            <div className="item">{this.state.contact.name}</div>
                        </div>

                        <div className="flex item">
                            <label className="label item">Phone</label>
                            <div className="item">{this.state.contact.phone}</div>
                        </div>
                    </div>

                    <div className="flex">
                        <button className="button item" onClick={this.togleEditContact}>Edit</button>
                        <button className="button danger item" onClick={this.props.onDelete}>Delete</button>
                    </div>
                </li>
            );
        }
    }

    private togleEditContact = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    };

    private saveContact = () => {
        this.setState({
            defaultContact: this.state.contact,
            isEditing: false,
        });

        spinner.start();

        updateContact(this.state.contact)
            .finally(() => {
                spinner.stop();
            });
    };

    private cancelEdit = () => {
        this.setState({
            contact: this.state.defaultContact,
            isEditing: false,
        });
    };

    private onNameChange = (value: string) => {
        this.setState({
            contact: {
                ...this.state.contact,
                name: value,
            },
        });
    };

    private onPhoneChange = (value: string) => {
        this.setState({
            contact: {
                ...this.state.contact,
                phone: value,
            },
        });
    }
}
