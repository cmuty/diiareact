import MarqueeText from './MarqueeText';
import { useAuth } from '../contexts/AuthContext';

export default function PassportCard({ onMenuTap }) {
    const { userData, getSignature } = useAuth();

    const user = userData || {
        lastName: 'Зарва',
        firstName: 'Богдан',
        patronymic: 'Олегович',
        birthDate: '07.01.2010',
        passportNumber: '010322300',
        photo: null,
    };

    const signature = getSignature();
    return (
        <div className="glassmorphic-card">
            {/* Контент карточки */}
            <div style={{ padding: '22px 20px 0', position: 'relative', zIndex: 2 }}>
                {/* Заголовок */}
                <div style={{ marginBottom: '20px' }}>
                    <div className="card-title">Паспорт громадянина</div>
                    <div className="card-title">України</div>
                </div>

                {/* Фото и данные */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                    {/* Фото */}
                    <div className="photo-container">
                        {user.photo ? (
                            <img src={user.photo} alt="Фото" />
                        ) : (
                            <div
                                style={{
                                    width: 'var(--photo-width)',
                                    height: 'var(--photo-height)',
                                    borderRadius: 'calc(var(--photo-radius) - 4px)',
                                    background: 'rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                }}
                            >
                                👤
                            </div>
                        )}
                    </div>

                    {/* Данные */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                        {/* Дата народження */}
                        <div>
                            <div className="card-label">Дата</div>
                            <div className="card-label">народження:</div>
                            <div className="card-data">{user.birthDate}</div>
                        </div>

                        {/* Номер */}
                        <div>
                            <div className="card-label">Номер:</div>
                            <div className="card-data">{user.passportNumber}</div>
                        </div>

                        {/* Подпись */}
                        <div>
                            {signature ? (
                                <img
                                    src={signature}
                                    alt="Підпис"
                                    style={{ width: '100px', height: '40px', objectFit: 'contain' }}
                                />
                            ) : (
                                <div style={{ fontSize: '30px', color: 'rgba(0,0,0,0.3)' }}>✍️</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Spacer */}
                <div style={{ minHeight: '20px' }} />
            </div>

            {/* Бегущая строка */}
            <MarqueeText />

            {/* ФИО и кнопка меню */}
            <div style={{ padding: '24px 20px 24px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    {/* ФИО */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="card-name">{user.lastName}</div>
                        <div className="card-name">{user.firstName}</div>
                        <div className="card-name">{user.patronymic}</div>
                    </div>
                </div>

                {/* Кнопка меню */}
                <button className="menu-button" onClick={onMenuTap} style={{ bottom: '34px' }}>
                    <span className="menu-button-icon">⋯</span>
                </button>
            </div>
        </div>
    );
}
