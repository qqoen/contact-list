import * as React from 'react';

import { login } from '../service';
import { spinner } from '../spinner';


interface IState {
    username: string;
    password: string;
    error: string;
}

export default class Auth extends React.Component<unknown, IState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
        };
    }

    public render(): JSX.Element {
        return (
            <div className="auth panel">
                <div className="auth-header">
                    <h1 className="title">Auth</h1>
                </div>

                <div className="auth-body">
                    <input
                        type="text"
                        placeholder="Username"
                        className="input"
                        name="username"
                        onChange={this.onNameChange}
                        onKeyDown={this.onKeyDown} />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        name="password"
                        onChange={this.onPasswordChange}
                        onKeyDown={this.onKeyDown} />

                    <div className="error">{this.state.error}</div>
                </div>

                <div className="auth-footer">
                    <button
                        className="button primary"
                        onClick={this.login}
                        disabled={!this.isValid()}>Login</button>
                </div>
            </div>
        );
    }

    private login = () => {
        spinner.start();

        login(this.state.username, this.state.password)
            .then((data) => {
                localStorage.setItem('token', data);
                location.href = '/contacts';
            }, () => {
                this.setState({
                    error: 'Invalid username or password',
                });
            })
            .finally(() => {
                spinner.stop();
            });
    };

    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: event.target.value,
        });
    };

    private onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value,
        });
    };

    private isValid() {
        return this.state.username !== '' && this.state.password !== '';
    }

    private onKeyDown = (event: React.KeyboardEvent) => {
        // On enter
        if (event.keyCode === 13 && this.isValid()) {
            this.login();
        }
    };
}
