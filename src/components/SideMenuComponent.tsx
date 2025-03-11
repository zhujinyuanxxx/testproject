import styles from "./scss/SideMenuComponent.module.scss";
import menuButtonComponentStyles from "./scss/menuButtonComponent.module.scss";
interface SideMenuItem {
    title: string;
    path: string;
    icon?: JSX.Element;
}

interface SideMenuBarProps {
    items: SideMenuItem[];
    onClick: (item: SideMenuItem) => void;
    width?: string;
}

const SideMenuComponent: React.FC<SideMenuBarProps> = ({ items, onClick, width }) => {
    return (
        <nav className={styles.MenuComponent} style={{ width: width ? width : '20vw', height: '80vh', left: 0, top: 0, overflowY: 'auto',overflowX:'hidden' }}>
            {items.map((item, index) => (
                <div key={index} onClick={() => onClick(item)} className={styles.MenuItem}>
                    <div className={styles.MenuItemContent}>
                        {item.icon && <span className={styles.MenuItemIcon}>{item.icon}</span>}
                        <span className={styles.MenuItemTitle}>{item.title}</span>
                    </div>
                </div>
            ))}
        </nav>
    );
};

export default SideMenuComponent;
