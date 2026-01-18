// src/app/profile/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [email, setEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Get the logged-in user from localStorage
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost/api/update_profile.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newName }),
        });
        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <main className="flex min-h-screen items-center justify-center pt-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <h2 className="text-3xl font-bold mb-2">User Profile</h2>
                <p className="text-gray-400 mb-8">Logged in as: <span className="text-blue-400">{email}</span></p>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter new name"
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 outline-none text-white" 
                        />
                    </div>
                    <button className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition-all">
                        Update Profile
                    </button>
                    {message && <p className="text-center text-sm text-blue-400">{message}</p>}
                </form>
            </motion.div>
        </main>
    );
}