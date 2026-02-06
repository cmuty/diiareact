import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import MarqueeText from './MarqueeText';
import { useAuth } from '../contexts/AuthContext';

export default function BirthCertificateCard({ onMenuTap }) {
    const { userData } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);
    const [timeLeft, setTimeLeft] = useState(179);
    const [activeTab, setActiveTab] = useState('qr');
    const [dynamicCode, setDynamicCode] = useState('');
    const [barcodeValue, setBarcodeValue] = useState('1234567890123');

    const user = userData || {
        lastName: 'Зарва',
        firstName: 'Богдан',
        patronymic: 'Олегович',
        birthDate: '07.01.2010',
    };

    // Simulated Birth Certificate Number
    const docNumber = "1234 567890";

    // Generate new code and reset timer on flip
    useEffect(() => {
        if (isFlipped) {
            setDynamicCode(`BIRTH-${Date.now()}-${'x'.repeat(150)}`);

            // Generate random 13-digit number for barcode
            const randomBarcode = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
            setBarcodeValue(randomBarcode);

            setTimeLeft(179);
        }
    }, [isFlipped]);

    // Timer countdown
    useEffect(() => {
        let interval;
        if (isFlipped && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFlipped, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleCardClick = (e) => {
        if (e.target.closest('.menu-button') || e.target.closest('.toggle-button')) return;
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
                    WebkitTapHighlightColor: 'transparent',
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
                        transform: 'rotateY(0deg)',
                    }}
                >
                    <div style={{ padding: '22px 20px 0', position: 'relative', zIndex: 2 }}>
                        {/* Заголовок */}
                        <div style={{ marginBottom: '20px' }}>
                            <div className="card-title">Актовий запис про</div>
                            <div className="card-title">народження</div>
                        </div>

                        {/* Spacer (заполняет место убранных данных) */}
                        <div style={{ minHeight: '240px' }} />
                    </div>

                    <MarqueeText />

                    <div style={{ padding: '10px 20px 24px', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div className="card-name">{user.lastName}</div>
                            <div className="card-name">{user.firstName}</div>
                            <div className="card-name">{user.patronymic}</div>
                        </div>

                        <button className="menu-button" onClick={(e) => { e.stopPropagation(); onMenuTap(); }} style={{ bottom: '34px' }}>
                            <span className="menu-button-icon">⋯</span>
                        </button>
                    </div>
                </div>

                {/* Back Face (QR/Barcode) */}
                <div style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'rotateY(180deg)',
                    background: '#ffffff',
                    borderRadius: 'var(--card-radius)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '30px 20px',
                    zIndex: 1,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                }}>
                    {/* Timer Text */}
                    <div style={{
                        color: '#666',
                        fontSize: '15px',
                        marginBottom: '20px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        Код діятиме ще {formatTime(timeLeft)} хв
                    </div>

                    {/* Code Container */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        {activeTab === 'qr' ? (
                            <QRCodeSVG
                                value={dynamicCode}
                                size={260}
                                level="M"
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Barcode
                                    value={barcodeValue}
                                    format="CODE128"
                                    width={2.3}
                                    height={90}
                                    displayValue={false}
                                    background="transparent"
                                />
                                <div style={{
                                    marginTop: '15px',
                                    fontSize: '24px',
                                    fontWeight: '500',
                                    letterSpacing: '4px',
                                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, monospace'
                                }}>
                                    {barcodeValue.replace(/(\d{4})(\d{4})(\d{5})/, '$1 $2 $3')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Toggle Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <div
                            className="toggle-button"
                            onClick={() => setActiveTab('qr')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                opacity: activeTab === 'qr' ? 1 : 0.4,
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: '#000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H9V9H3V3Z" fill="white" />
                                    <path d="M15 3H21V9H15V3Z" fill="white" />
                                    <path d="M3 15H9V21H3V15Z" fill="white" />
                                    <path d="M15 15H17V17H15V15Z" fill="white" />
                                    <path d="M19 19H21V21H19V19Z" fill="white" />
                                    <path d="M15 19H17V21H15V19Z" fill="white" />
                                    <path d="M19 15H21V17H19V15Z" fill="white" />
                                </svg>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>QR-код</span>
                        </div>

                        <div
                            className="toggle-button"
                            onClick={() => setActiveTab('barcode')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                opacity: activeTab === 'barcode' ? 1 : 0.4,
                                WebkitTapHighlightColor: 'transparent',
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: '#E5E5E5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H6V20H4V4Z" fill="black" />
                                    <path d="M8 4H9V20H8V4Z" fill="black" />
                                    <path d="M11 4H13V20H11V4Z" fill="black" />
                                    <path d="M15 4H16V20H15V4Z" fill="black" />
                                    <path d="M18 4H20V20H18V4Z" fill="black" />
                                </svg>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>Штрихкод</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
