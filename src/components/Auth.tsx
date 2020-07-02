import * as React from 'react';
import { Link } from 'react-router-dom';

import { login } from '../service';


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
        this.logout = this.logout.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    render() {
        return (
            <div className="auth panel">
                <div className="auth-header">
                    <h1 className="title">Auth</h1>
                </div>

                <div className="auth-body">
                    <div>Links:</div>
                    <Link className="link" to="/contacts">- contact list</Link>

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
                    <button className="button primary" onClick={this.login}>Login</button>
                    <button className="button danger" onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }

    login() {
        login(this.state.username, this.state.password)
            .then((data) => {
                localStorage.setItem('token', data);
                location.href = '/contacts';
            }, () => {
                this.setState({
                    ...this.state,
                    error: 'Invalid username or password',
                });
            });
    }

    logout() {
        localStorage.setItem('token', undefined);
    }

    onUsernameChange(event) {
        this.setState({
            ...this.state,
            username: event.target.value,
        });
    }

    onPasswordChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value,
        });
    }
}
