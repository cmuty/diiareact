import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import MarqueeText from './MarqueeText';
import { useAuth } from '../contexts/AuthContext';

export default function IDCard({ onMenuTap }) {
    const { userData } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);

    const user = userData || {
        lastName: 'Зарва',
        firstName: 'Богдан',
        patronymic: 'Олегович',
        birthDate: '07.01.2010',
        taxId: '3234567890',
        photo: null,
    };

    const handleCardClick = (e) => {
        // Prevent flip if clicking menu button
        if (e.target.closest('.menu-button')) return;
        setIsFlipped(!isFlipped);
    };

    return (
        <div style={{ perspective: '1000px', width: '100%', height: '100%' }}>
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
                onClick={handleCardClick}
            >
                {/* Front Face */}
                <div
                    className="glassmorphic-card"
                    style={{
                        backfaceVisibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        transform: 'rotateY(0deg)', // Ensure explicit rotation
                    }}
                >
                    <div style={{ padding: '22px 20px 0', position: 'relative', zIndex: 2 }}>
                        {/* Заголовок */}
                        <div style={{ marginBottom: '20px' }}>
                            <div className="card-title">єДокумент</div>
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
                                <div>
                                    <div className="card-label">Дата</div>
                                    <div className="card-label">народження:</div>
                                    <div className="card-data">{user.birthDate}</div>
                                </div>

                                <div>
                                    <div className="card-label">РНОКПП:</div>
                                    <div className="card-data">{user.taxId}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ minHeight: '50px' }} />
                    </div>

                    <MarqueeText />

                    <div style={{ padding: '15px 20px 20px', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div className="card-name">{user.lastName}</div>
                            <div className="card-name">{user.firstName}</div>
                            <div className="card-name">{user.patronymic}</div>
                        </div>

                        <button className="menu-button" onClick={(e) => { e.stopPropagation(); onMenuTap(); }}>
                            <span className="menu-button-icon">⋯</span>
                        </button>
                    </div>
                </div>

                {/* Back Face (QR Code) */}
                <div style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'rotateY(180deg)',
                    background: '#ffffff',
                    borderRadius: 'var(--card-radius)', // Use variable from CSS
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    zIndex: 1,
                    // Replicate shadow/border radius from glassmorphic-card if needed, but solid white
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                }}>
                    <QRCodeSVG
                        value={`EU-DIIA-${user.taxId}-${Date.now()}-${'x'.repeat(150)}`} // Add padding for density
                        size={270}
                        level="M" // Lower error correction slightly allows more dots for same version, but high data forces density
                    />
                </div>
            </motion.div>
        </div>
    );
}
