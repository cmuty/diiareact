import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { motion } from 'framer-motion';
import PassportCard from './PassportCard';
import IDCard from './IDCard';
import TaxCard from './TaxCard';
import BirthCertificateCard from './BirthCertificateCard';

const documents = [
    { id: 'id', component: IDCard, name: 'єДокумент' },
    { id: 'tax', component: TaxCard, name: 'Податкова' },
    { id: 'passport', component: PassportCard, name: 'Паспорт' },
    { id: 'birth', component: BirthCertificateCard, name: 'Свідоцтво' },
];

export default function DocumentCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);

    const handleMenuTap = () => {
        setShowMenu(true);
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollPos = containerRef.current.scrollLeft;
            setScrollLeft(scrollPos);

            const cardWidth = 350; // 340 + 10 gap
            const newIndex = Math.round(scrollPos / cardWidth);
            setCurrentIndex(newIndex);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Вычисляем scale, opacity и translateX в реальном времени
    const getCardStyle = (index) => {
        const cardWidth = 350; // 340px width + 10px gap
        const cardCenter = index * cardWidth;

        // scrollLeft = смещение. При scrollLeft=0 активна 0-я карта.
        const diff = cardCenter - scrollLeft;
        const distance = Math.abs(diff);
        const maxDistance = cardWidth;

        // Улучшенный scale - меньше уменьшение для лучшей видимости
        const scale = Math.max(0.90, 1 - (distance / maxDistance) * 0.10);

        // Улучшенная opacity - соседние карты более видимы
        const opacity = Math.max(0.75, 1 - (distance / maxDistance) * 0.25);

        // Уменьшенный parallax эффект для лучшей видимости следующей карты
        const maxTranslate = 16; // Было 24, стало 16
        const progress = Math.min(1, distance / maxDistance);
        // Если карточка справа (diff > 0), двигаем влево (-), и наоборот
        const translateX = diff > 0 ? - (maxTranslate * progress) : (maxTranslate * progress);

        return { scale, opacity, translateX };
    };

    return (
        <div
            className="documents-view"
            style={{
                marginTop: '-20px',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    gap: '10px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    width: '100%',
                    padding: '0 calc((100vw - 340px) / 2)',
                    scrollPadding: '0 calc((100vw - 340px) / 2)',
                }}
                className="carousel-container"
            >
                {documents.map((doc, index) => {
                    const { scale, opacity, translateX } = getCardStyle(index);

                    return (
                        <div
                            key={doc.id}
                            style={{
                                minWidth: '340px',
                                maxWidth: '340px',
                                scrollSnapAlign: 'center',
                                scrollSnapStop: 'always',
                                transform: `scale(${scale}) translateX(${translateX}px)`,
                                opacity: opacity,
                                transition: 'transform 0.05s linear, opacity 0.05s linear',
                                zIndex: index === currentIndex ? 10 : 1, // Активная карточка поверх остальных
                            }}
                        >
                            {React.createElement(doc.component, { onMenuTap: handleMenuTap })}
                        </div>
                    );
                })}
            </div>

            {/* Индикаторы под карточками */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '24px',
                    justifyContent: 'center',
                }}
                className="carousel-indicators"
            >
                {documents.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>

            {/* Модальное меню */}
            {showMenu && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowMenu(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1000,
                        }}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: '#ffffff',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                            padding: '24px',
                            zIndex: 1001,
                            paddingBottom: '40px',
                        }}
                    >
                        <div style={{ width: '40px', height: '4px', background: '#e0e0e0', borderRadius: '2px', margin: '0 auto 20px' }} />

                        <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', textAlign: 'center', color: '#000' }}>
                            Меню документа
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button style={{
                                padding: '16px',
                                borderRadius: '12px',
                                background: '#f5f5f5',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#000',
                                cursor: 'pointer'
                            }}>
                                <span>👁️</span>
                                Показати повну інформацію
                            </button>
                            <button style={{
                                padding: '16px',
                                borderRadius: '12px',
                                background: '#f5f5f5',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#000',
                                cursor: 'pointer'
                            }}>
                                <span>🔄</span>
                                Оновити документ
                            </button>
                        </div>
                        <button
                            onClick={() => setShowMenu(false)}
                            style={{
                                marginTop: '24px',
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                background: '#000',
                                color: '#fff',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Закрити
                        </button>
                    </motion.div>
                </>
            )}
        </div>
    );
}
