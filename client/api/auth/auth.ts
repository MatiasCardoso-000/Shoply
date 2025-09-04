export const registerRequest = async (user: any) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const loginRequest = async (user: any) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const logoutRequest = async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST'
    });
    return response.json();
};

export const refreshToken = async () => {
    const response = await fetch('/api/auth/refresh-token', {
        method: 'POST'
    });
    return response.json();
};
