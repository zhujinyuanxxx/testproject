import React from "react";
import {Dropdown, MenuProps} from "antd";
import sg from "../photograph/mobileMenu.png";
import styles from '../scss/Home/tt.module.scss'
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";

//手机导航栏
const MobileNavigatorComponent: React.FC = () => {

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Test', '/home/Test', <PieChartOutlined/>),
        getItem('Test2', '/home/Test2', <DesktopOutlined />),
        getItem('TableTest', '/home/TableTest', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Zhu', '/home/User/Zhu'),
            getItem('Bill', '/home/User/Bill'),
            getItem('Download', '/home/User/Download'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />,
            [getItem('Team 1', '6'),
                getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];


    return (
        <div className={styles.mobileNavigator}>
            <Dropdown menu={{ items }} trigger={['click']} className={styles.mobileNavigatorDropdown}>
                <a
                    // onClick={(e) => e.preventDefault()}
                    className={styles.mobileNavigatorDropdownA}
                >
                    <img src={sg} className={styles.mobileNavigatorImg}/>
                </a>
            </Dropdown>
        </div>
    )

};

export default MobileNavigatorComponent;