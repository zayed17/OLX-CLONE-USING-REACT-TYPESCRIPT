import { createContext, useState } from 'react';
import { FirebaseApp } from 'firebase/app';

export const firebaseContext = createContext<FirebaseApp | null>(null);

export const AuthContext = createContext<any>(null);

export default function Context({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any >(null);

    return (
        <AuthContext.Provider value={{ user ,setUser}}>
            {children}
        </AuthContext.Provider>
    );
}
