import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

export default function AuthView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(username, password);

        if (!result.success) {
            setError('Невірний логін або пароль');
        }

        setIsLoading(false);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const openTelegramBot = () => {
        window.open('https://t.me/maijediiabot', '_blank');
    };

    return (
        <div className="auth-view">
            <div className="auth-container">
                <div className="auth-content">
                    <h1 className="auth-title">Вітаємо в Дія 👋</h1>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Логін</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Ваш логін"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Пароль</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input-field"
                                    placeholder="Ваш пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePassword}
                                >
                                    <span>{showPassword ? '🙈' : '👁️'}</span>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="link-button"
                                onClick={openTelegramBot}
                            >
                                Забули пароль?
                            </button>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="server-status">
                            <span className="status-dot online"></span>
                            <span className="status-text">Сервер підключено</span>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Вхід...' : 'Увійти'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <div className="register-info">
                            <p>Не зареєстровані?</p>
                            <p className="register-subtitle">Реєстрація доступна в нашому боті</p>
                        </div>
                        <button className="btn-secondary" onClick={openTelegramBot}>
                            Перейти до бота →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
