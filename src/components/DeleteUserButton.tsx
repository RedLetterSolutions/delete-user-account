"use client";

import { useState } from 'react';

interface DeleteUserButtonProps {
  apiKey: string;
  clientId: string;
}

export default function DeleteUserButton({ apiKey, clientId }: DeleteUserButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const deleteUser = async () => {
    if (!clientId) {
      setMessage('Client ID is required.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`https://api.copilot.com/v1/clients/${clientId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessage('User deleted successfully.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to delete user.'}`);
      }
    } catch (error) {
      setMessage('Request failed. Please check the API key and client ID.');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={deleteUser} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded">
        {loading ? 'Deleting...' : 'Delete User'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}