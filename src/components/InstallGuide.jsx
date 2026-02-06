import '../styles/installGuide.css';

export default function InstallGuide() {
    return (
        <div className="install-guide">
            {/* Banner */}
            <div className="install-banner">
                <div className="banner-icon">!</div>
                <div className="banner-text">
                    Всі актуальні новини — <span className="banner-link">в каналі</span>
                </div>
            </div>

            {/* Content */}
            <div className="guide-content">
                <h1 className="guide-title">Safari</h1>

                <div className="guide-steps">
                    <p className="guide-step">
                        1) Відкрийте посилання в Safari<br />
                        (а не в Telegram)
                    </p>

                    <p className="guide-step">
                        2) натисніть на кнопку поділитися<br />
                        і прогортайте вниз
                    </p>

                    <p className="guide-step">
                        3) натисніть на "На Початковий<br />
                        екран"
                    </p>
                </div>
            </div>
        </div>
    );
}
