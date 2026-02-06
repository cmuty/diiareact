export default function HomeView() {
    return (
        <div className="view-container" style={{ paddingBottom: 'var(--tab-bar-height)', overflowY: 'auto' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
                {/* Привітання */}
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '400', color: '#fff', margin: 0 }}>
                        Привіт, Богдан 👋
                    </h1>
                </div>

                {/* Незламність */}
                <div className="glassmorphic-card" style={{ padding: '20px', marginBottom: '20px', minHeight: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '32px' }}>🛡️</div>
                        <div style={{ fontSize: '32px', marginLeft: '-16px' }}>⚡</div>
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 8px 0', color: '#000' }}>
                        Незламність
                    </h3>
                    <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.7)', margin: 0 }}>
                        Підтримайте Україну разом з Дією
                    </p>
                    <button
                        style={{
                            position: 'absolute',
                            bottom: '16px',
                            right: '16px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#000',
                            border: 'none',
                            color: '#fff',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        →
                    </button>
                </div>

                {/* Кнопки сервісів */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    {['📱 Сканувати QR', '🛡️ Військові облігації', '📡 Відсутній зв\'язок'].map((service, i) => (
                        <button
                            key={i}
                            style={{
                                background: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '16px 12px',
                                color: '#fff',
                                fontSize: '13px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                minHeight: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {service}
                        </button>
                    ))}
                </div>

                {/* Що нового */}
                <div className="glassmorphic-card" style={{ padding: '20px', marginBottom: '20px', minHeight: 'auto' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#000' }}>
                        Що нового?
                    </h3>
                    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', padding: '16px', color: '#fff' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚗🚫</div>
                        <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>23 жовтня, 17:15</div>
                        <div style={{ fontSize: '16px', fontWeight: '500' }}>Нові можливості в Дії</div>
                    </div>
                </div>

                {/* Популярні послуги */}
                <div className="glassmorphic-card" style={{ padding: '20px', minHeight: 'auto' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#000' }}>
                        Популярні послуги
                    </h3>
                    {['Опитування', 'Заміна водійського посвідчення', 'Податки ФОП'].map((service, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 0',
                                borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                            }}
                        >
                            <span style={{ fontSize: '16px', color: '#000' }}>{service}</span>
                            <button
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: '#000',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
