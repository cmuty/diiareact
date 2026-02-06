export default function ServicesView() {
    const services = [
        { icon: '⚡', name: 'Незламність' },
        { icon: '🛡️', name: 'Військові облігації' },
        { icon: '📱', name: 'QR-код' },
        { icon: '📄', name: 'Документи' },
        { icon: '🚗', name: 'Водійське посвідчення' },
        { icon: '💰', name: 'Податки' },
    ];

    return (
        <div className="view-container" style={{ paddingBottom: 'var(--tab-bar-height)' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '600', color: '#fff', marginBottom: '24px' }}>
                    Сервіси
                </h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="glassmorphic-card"
                            style={{
                                padding: '24px',
                                minHeight: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ fontSize: '48px' }}>{service.icon}</div>
                            <div style={{ fontSize: '16px', fontWeight: '500', color: '#000', textAlign: 'center' }}>
                                {service.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
