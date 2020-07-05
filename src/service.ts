import { IContact } from './types';

const baseUrl = 'http://localhost:3000';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
});

const responseHandler = (response: Response) => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
};

export function getContacts(): Promise<IContact[]> {
    return fetch(`${baseUrl}/contacts`, {
        headers: getHeaders(),
    }).then(responseHandler);
}

export function addContact(contact: IContact): Promise<IContact> {
    return fetch(`${baseUrl}/contacts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(contact),
    }).then(responseHandler);
}

export function deleteContact(id: number): Promise<unknown> {
    return fetch(`${baseUrl}/contacts/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });
}

export function updateContact(contact: IContact): Promise<unknown> {
    return fetch(`${baseUrl}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(contact),
    });
}

export function login(username: string, password: string): Promise<string> {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            username,
            password,
        }),
    }).then(responseHandler);
}
