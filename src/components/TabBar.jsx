import { HomeIcon, DocumentsIcon, ServicesIcon, MenuIcon } from './TabIcons';

export default function TabBar({ currentTab, onTabChange }) {
    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Стрічка' },
        { id: 'documents', icon: DocumentsIcon, label: 'Документи' },
        { id: 'services', icon: ServicesIcon, label: 'Сервіси' },
        { id: 'menu', icon: MenuIcon, label: 'Меню' },
    ];

    return (
        <div className="tab-bar">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        className={`tab-item ${currentTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <Icon active={currentTab === tab.id} />
                        <span className="tab-label">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
