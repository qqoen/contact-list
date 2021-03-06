import * as React from 'react';

import ContactForm from './ContactForm';
import { IContact } from '../types';
import { updateContact } from '../service';
import { spinner } from '../spinner';


interface IProps {
    contact: IContact;
    onDelete: React.MouseEventHandler;
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

    public render(): JSX.Element {
        const viewControls = (
            <div className="flex contact-list-controls">
                <button className="button item" onClick={this.togleEditContact}>Edit</button>

                <button className="button danger item" onClick={this.props.onDelete}>Delete</button>
            </div>
        );

        const editControls = (
            <div className="flex contact-list-controls">
                <button
                    className="button primary item"
                    onClick={this.saveContact}
                    disabled={!this.isFormValid()}>Save</button>

                <button className="button item" onClick={this.cancelEdit}>Cancel</button>
            </div>
        );

        return (
            <li className="item flex">
                <div className="item">
                    <ContactForm
                        contact={this.state.contact}
                        onNameChange={this.onNameChange}
                        onPhoneChange={this.onPhoneChange}
                        readOnly={!this.state.isEditing} />
                </div>

                <div className="it">
                    {this.state.isEditing ? editControls : viewControls}
                </div>
            </li>
        );
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

    private isFormValid = () => {
        return this.state.contact.name !== '' &&
            this.state.contact.phone.length >= 11;
    };
}
