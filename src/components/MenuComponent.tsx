import styles from "./scss/MenuComponent.module.scss";

interface MenuItem {
    title: string;
    path: string;
    icon?: JSX.Element;
}

interface MenuBarProps {
    items: MenuItem[];
    onClick: (item: MenuItem) => void;
    width?: string;
}

const MenuComponent: React.FC<MenuBarProps> = ({ items, onClick ,width}) => {
    return (
        <nav className={styles.MenuComponent} style={{width: width?width:0}}>

                {items.map((item, index) => (
                    <div key={index} onClick={() => onClick(item)}>
                        <div>
                            {item.icon && <span>{item.icon}</span>}
                            {item.title}
                        </div>
                    </div>
                ))}

        </nav>
    );
};

export default MenuComponent;
