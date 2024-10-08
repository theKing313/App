// pages/register.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import { api } from '@/app/api';

export default function Register() {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('/api/register', formData);
            const response = api.handler(formData)
            console.log(response)
            alert('User registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Register</button>
        </form>
    );
}
