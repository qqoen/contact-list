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

    public render() {
        return (
            <section className="auth panel">
                <header className="auth-header">
                    <h1 className="title">Auth</h1>
                </header>

                <div className="auth-body">
                    <input
                        type="text"
                        placeholder="Username"
                        className="input"
                        name="username"
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown} />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        name="password"
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown} />

                    <div className="error">{this.state.error}</div>
                </div>

                <footer className="auth-footer">
                    <button
                        className="button primary"
                        onClick={this.login}
                        disabled={!this.isValid()}>Login</button>
                </footer>
            </section>
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

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value,
        } as any);
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
