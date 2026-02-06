import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import MarqueeText from './MarqueeText';
import { useAuth } from '../contexts/AuthContext';

export default function TaxCard({ onMenuTap }) {
    const { userData } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);
    const [timeLeft, setTimeLeft] = useState(179); // 2:59 active
    const [activeTab, setActiveTab] = useState('qr'); // 'qr' or 'barcode'
    const [dynamicCode, setDynamicCode] = useState(''); // Regenerated on flip
    const [barcodeValue, setBarcodeValue] = useState('3389 4298 10214'); // Default dynamic barcode

    const user = userData || {
        lastName: 'Зарва',
        firstName: 'Богдан',
        patronymic: 'Олегович',
        birthDate: '07.01.2010',
        taxId: '4018401651',
    };

    // Generate new code and reset timer on flip
    useEffect(() => {
        if (isFlipped) {
            setDynamicCode(`${user.taxId}-${Date.now()}-${'x'.repeat(150)}`); // High density QR

            // Generate random 13-digit number for barcode (e.g. 3389 4298 10214)
            const randomBarcode = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
            setBarcodeValue(randomBarcode);

            setTimeLeft(179);
        }
    }, [isFlipped, user.taxId]);

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
                    WebkitTapHighlightColor: 'transparent', // Remove blue highlight
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
                    <div style={{ padding: '22px 16px 0', position: 'relative', zIndex: 2 }}>
                        {/* Заголовок */}
                        <div style={{ marginBottom: '16px' }}>
                            <div className="card-title">Картка платника</div>
                            <div className="card-title">податків</div>
                        </div>

                        {/* Подзаголовок РНОКПП */}
                        <div style={{
                            fontSize: '17px',
                            fontWeight: '500',
                            color: '#000000',
                            marginBottom: '16px',
                            fontFamily: 'inherit'
                        }}>
                            РНОКПП
                        </div>

                        {/* ФИО столбиком */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
                            <div className="card-name" style={{ fontSize: '18px', fontWeight: '400' }}>{user.lastName}</div>
                            <div className="card-name" style={{ fontSize: '18px', fontWeight: '400' }}>{user.firstName}</div>
                            <div className="card-name" style={{ fontSize: '18px', fontWeight: '400' }}>{user.patronymic}</div>
                        </div>

                        {/* Дата народження */}
                        <div style={{ marginBottom: '4px' }}>
                            <div className="card-label" style={{ marginBottom: '4px', color: '#000000' }}>Дата народження:</div>
                            <div className="card-data" style={{ fontSize: '15px', fontWeight: '400', color: '#000000' }}>{user.birthDate}</div>
                        </div>

                        <div style={{ minHeight: '80px' }} />
                    </div>

                    <MarqueeText />

                    {/* Нижняя часть с номером и меню */}
                    <div style={{ padding: '30px 16px 24px', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '34px', fontWeight: '400', letterSpacing: '0.5px', fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                {user.taxId}
                            </div>
                            {/* Иконка копирования */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
                                <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <button className="menu-button" onClick={(e) => { e.stopPropagation(); onMenuTap(); }}>
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
                    userSelect: 'none', // Prevent selection
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
                                    width={2.3} // Wider bars
                                    height={90} // Taller barcode
                                    displayValue={false}
                                    background="transparent"
                                />
                                <div style={{
                                    marginTop: '15px',
                                    fontSize: '24px', // Larger numbers
                                    fontWeight: '500',
                                    letterSpacing: '4px', // Wider spacing
                                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, monospace'
                                }}>
                                    {/* Format: 3389 4298 10214 */}
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
