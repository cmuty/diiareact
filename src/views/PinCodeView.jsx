import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pincode.css';

export default function PinCodeView({ mode = 'entry' }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const { setPinCode, logout, hasPinCode, isPinVerified } = useAuth();

    console.log('[PinCodeView] State:', { mode, hasPinCode, isPinVerified });

    const isSetupMode = mode === 'setup';
    const title = isSetupMode ? 'Створіть код для входу' : 'Код для входу';

    useEffect(() => {
        if (pin.length === 4) {
            // Don't await in useEffect, just call the function
            handlePinComplete();
        }
    }, [pin]);

    const handlePinComplete = async () => {
        console.log('PIN Complete - accepting immediately');

        // Just accept any PIN and reload
        if (isSetupMode) {
            await setPinCode(pin);
        }

        sessionStorage.setItem('isPinVerified', 'true');
        console.log('PIN accepted, reloading...');

        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const handleNumberPress = (num) => {
        if (pin.length < 4) {
            setPin(pin + num);
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
    };

    const handleForgotPin = () => {
        if (window.confirm('Ви впевнені? Вам доведеться увійти знову.')) {
            logout();
        }
    };

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="pincode-view">
            <div className="pincode-container">
                <h1 className={`pincode-title ${error ? 'shake' : ''}`}>{title}</h1>

                {/* PIN Dots Indicator */}
                <div className="pin-dots">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`pin-dot ${i < pin.length ? 'filled' : ''}`}
                        />
                    ))}
                </div>

                {/* Number Pad */}
                <div className="number-pad">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            className="number-button"
                            onClick={() => handleNumberPress(num.toString())}
                        >
                            {num}
                        </button>
                    ))}

                    {/* Bottom Row */}
                    <div className="number-button placeholder">
                        <img src="/face-id.png" alt="Face ID" className="face-id-icon" />
                    </div>
                    <button
                        className="number-button"
                        onClick={() => handleNumberPress('0')}
                    >
                        0
                    </button>
                    <button
                        className="number-button"
                        onClick={handleBackspace}
                        disabled={pin.length === 0}
                    >
                        <span className="backspace-icon">⌫</span>
                    </button>
                </div>

                {/* Forgot PIN Link */}
                {!isSetupMode && (
                    <button className="forgot-pin-link" onClick={handleForgotPin}>
                        Не пам'ятаю код для входу
                    </button>
                )}
            </div>
        </div>
    );
}
