import { useEffect, useState } from 'react';

export default function MarqueeText() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            setCurrentTime(`${hours}:${minutes} | ${day}.${month}.${year}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Обновляем каждую минуту

        return () => clearInterval(interval);
    }, []);

    const text = `• Документ оновлено о ${currentTime} `;

    return (
        <div className="marquee-container">
            <div className="marquee-text">
                {text}{text}{text}
            </div>
        </div>
    );
}
