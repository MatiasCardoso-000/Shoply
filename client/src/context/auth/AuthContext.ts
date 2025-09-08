import { createContext } from 'react';
import type { User } from '../../types/user.types';

interface AuthContextType {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;
    errors:string[];
    signup: (user: User) => Promise<void>;
    signin: (user: User) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
