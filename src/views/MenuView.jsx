import { useAuth } from '../contexts/AuthContext';

export default function MenuView() {
    const { logout } = useAuth();
    const menuSections = [
        {
            title: 'Повідомлення',
            items: [{ icon: '✉️', name: 'Повідомлення' }],
        },
        {
            title: 'Дія.Підпис',
            items: [
                { icon: '🔑', name: 'Дія.Підпис' },
                { icon: '📄', name: 'Історія підписань' },
            ],
        },
        {
            title: 'Налаштування',
            items: [
                { icon: '⚙️', name: 'Налаштування' },
                { icon: '🔄', name: 'Оновити застосунок' },
                { icon: '📱', name: 'Підключені пристрої' },
            ],
        },
        {
            title: 'Служба підтримки',
            items: [
                { icon: '💬', name: 'Служба підтримки' },
                { icon: '📋', name: 'Копіювати номер пристрою' },
                { icon: '❓', name: 'Питання та відповіді' },
            ],
        },
    ];

    return (
        <div
            className="view-container"
            style={{
                paddingBottom: 'var(--tab-bar-height)',
                background: 'linear-gradient(180deg, #C8E6F5 0%, #E8F5FC 100%)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'auto',
            }}
        >
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
                {/* Заголовок */}
                <div style={{ marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#000', margin: 0 }}>
                        Меню
                    </h1>
                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)', margin: '4px 0 0 0' }}>
                        Версія Дії: 4.23.0.2195
                    </p>
                </div>

                {/* Секції меню */}
                {menuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} style={{ marginTop: '24px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>
                            {section.title}
                        </h3>
                        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
                            {section.items.map((item, itemIndex) => (
                                <button
                                    key={itemIndex}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: itemIndex < section.items.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        cursor: 'pointer',
                                        fontSize: '17px',
                                        color: '#000',
                                        textAlign: 'left',
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                                    <span style={{ flex: 1 }}>{item.name}</span>
                                    <span style={{ fontSize: '20px', color: 'rgba(0,0,0,0.3)' }}>›</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Кнопка выхода */}
                <button
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: '#000',
                        border: 'none',
                        borderRadius: '16px',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: '600',
                        marginTop: '24px',
                        cursor: 'pointer',
                    }}
                    onClick={logout}
                >
                    Вийти
                </button>

                {/* Ссылка */}
                <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', marginTop: '16px', textAlign: 'center', textDecoration: 'underline' }}>
                    Повідомлення про обробку персональних даних
                </p>
            </div>
        </div>
    );
}
