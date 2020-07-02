import * as React from 'react';

import { login } from '../service';
import { spinner } from '../spinner';


interface IState {
    username: string;
    password: string;
    error: string;
}

export default class Auth extends React.Component<unknown, IState> {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: '',
        };

        this.login = this.login.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    public render() {
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
                        onChange={this.onUsernameChange} />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        onChange={this.onPasswordChange} />

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

    private login() {
        spinner.start();

        login(this.state.username, this.state.password)
            .then((data) => {
                localStorage.setItem('token', data);
                location.href = '/contacts';
            }, () => {
                this.setState({
                    ...this.state,
                    error: 'Invalid username or password',
                });
            })
            .finally(() => {
                spinner.stop();
            });
    }

    private onUsernameChange(event) {
        this.setState({
            ...this.state,
            username: event.target.value,
        });
    }

    private onPasswordChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value,
        });
    }

    private isValid() {
        return this.state.username !== '' && this.state.password !== '';
    }
}
