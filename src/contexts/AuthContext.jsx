import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSignature, setHasSignature] = useState(false);
    const [hasPinCode, setHasPinCode] = useState(false);
    const [isPinVerified, setIsPinVerified] = useState(false);
    const [serverStatus, setServerStatus] = useState('checking'); // checking, online, offline

    const API_URL = 'https://diia-backend.onrender.com';

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = () => {
            const authStatus = localStorage.getItem('isAuthenticated');
            const storedUserData = localStorage.getItem('userData');

            if (authStatus === 'true' && storedUserData) {
                setIsAuthenticated(true);
                setUserData(JSON.parse(storedUserData));
            }

            // Check for signature
            const signature = localStorage.getItem('userSignature');
            setHasSignature(!!signature);

            // Check for PIN code
            const pinHash = localStorage.getItem('userPinHash');
            setHasPinCode(!!pinHash);

            // Check if PIN was verified in this session
            const pinVerified = sessionStorage.getItem('isPinVerified');
            if (pinVerified === 'true') {
                setIsPinVerified(true);
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // Check server status
    useEffect(() => {
        const checkStatus = async () => {
            try {
                // Using a simple fetch to the wakeup endpoint or just the root
                const response = await fetch(`${API_URL}/health`, { method: 'GET' }).catch(() => null);

                // If /health doesn't exist, we might get 404 but the server is reachable.
                // However, let's try to just hit the API_URL.
                // Since I don't know the exact "health" endpoint, I'll assume if fetch creates a network error it's offline.
                // If it returns 404, it means it's ONLINE but route missing.

                // Let's try a safer approach: fetch root.
                const res = await fetch(API_URL).catch(() => null);

                if (res) {
                    setServerStatus('online');
                } else {
                    setServerStatus('offline');
                }
            } catch (e) {
                setServerStatus('offline');
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: username, password }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Невірний логін або пароль');
            }

            // Parse full_name into separate fields
            const fullNameParts = (data.user.full_name || '').split(' ');
            const [lastName = '', firstName = '', patronymic = ''] = fullNameParts;

            // Generate random RNOKPP (10 digits)
            const generateRNOKPP = () => {
                let rnokpp = '';
                for (let i = 0; i < 10; i++) {
                    rnokpp += Math.floor(Math.random() * 10);
                }
                return rnokpp;
            };

            // Generate random passport number (9 digits, first digit 0-3)
            const generatePassportNumber = () => {
                const firstDigit = Math.floor(Math.random() * 4); // 0-3
                let passportNumber = firstDigit.toString();
                for (let i = 0; i < 8; i++) {
                    passportNumber += Math.floor(Math.random() * 10);
                }
                return passportNumber;
            };

            // 2. Fetch full user details to get photo_url (Cloudinary)
            let photoUrl = null;
            try {
                const userResponse = await fetch(`${API_URL}/api/user/${data.user.login}`);
                if (userResponse.ok) {
                    const userDataFull = await userResponse.json();
                    if (userDataFull.photo_url) {
                        console.log('[Auth] Found photo URL:', userDataFull.photo_url);
                        photoUrl = userDataFull.photo_url;
                    }
                }
            } catch (err) {
                console.error('[Auth] Failed to fetch user photo:', err);
            }

            // Transform backend data to match our app format
            const userData = {
                id: data.user.id,
                username: data.user.login,
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                fullName: data.user.full_name,
                birthDate: data.user.birth_date,
                taxId: generateRNOKPP(), // Random RNOKPP on each login
                passportNumber: generatePassportNumber(), // Random passport number on each login
                photo: photoUrl, // Populated from backend
                signature: null,
                subscriptionActive: data.user.subscription_active,
                subscriptionType: data.user.subscription_type,
                lastLogin: data.user.last_login,
                registeredAt: data.user.registered_at
            };

            // Save to localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(userData));

            setIsAuthenticated(true);
            setUserData(userData);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        sessionStorage.removeItem('isPinVerified');
        setIsAuthenticated(false);
        setUserData(null);
        setIsPinVerified(false);
    };

    const saveSignature = (imageData) => {
        localStorage.setItem('userSignature', imageData);
        setHasSignature(true);
    };

    const getSignature = () => {
        return localStorage.getItem('userSignature');
    };

    // Hash PIN using SHA-256
    const hashPin = async (pin) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(pin);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    // Set PIN code (hash and save)
    const setPinCode = async (pin) => {
        console.log('[AuthContext] setPinCode called with pin:', pin);
        const hash = await hashPin(pin);
        console.log('[AuthContext] PIN hash:', hash);
        localStorage.setItem('userPinHash', hash);
        console.log('[AuthContext] Setting hasPinCode=true, isPinVerified=true');
        setHasPinCode(true);
        setIsPinVerified(true);
        sessionStorage.setItem('isPinVerified', 'true');
        console.log('[AuthContext] setPinCode complete');
    };

    // Verify PIN code
    const verifyPinCode = async (pin) => {
        console.log('[AuthContext] verifyPinCode called with pin:', pin);
        const hash = await hashPin(pin);
        const storedHash = localStorage.getItem('userPinHash');
        console.log('[AuthContext] Comparing hashes:', { computed: hash, stored: storedHash });
        const isValid = hash === storedHash;
        console.log('[AuthContext] PIN valid:', isValid);
        if (isValid) {
            console.log('[AuthContext] Setting isPinVerified=true');
            setIsPinVerified(true);
            sessionStorage.setItem('isPinVerified', 'true');
        }
        return isValid;
    };

    const value = {
        isAuthenticated,
        userData,
        isLoading,
        hasSignature,
        hasPinCode,
        isPinVerified,
        login,
        logout,
        saveSignature,
        getSignature,
        setPinCode,
        verifyPinCode,
        serverStatus
    };

    return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
