import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/signature.css';

export default function SignatureView() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const { saveSignature } = useAuth();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setHasDrawn(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');
        saveSignature(imageData);
    };

    return (
        <div className="signature-view">
            <div className="signature-container">
                <div className="signature-content">
                    <h1 className="signature-title">Створіть свій підпис</h1>

                    <div className="canvas-wrapper">
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={200}
                            className="signature-canvas"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                    </div>

                    <div className="signature-buttons">
                        <button
                            className="btn-secondary"
                            onClick={clearCanvas}
                        >
                            Спробувати ще раз
                        </button>

                        <button
                            className="btn-primary"
                            onClick={handleSave}
                            disabled={!hasDrawn}
                        >
                            Продовжити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
