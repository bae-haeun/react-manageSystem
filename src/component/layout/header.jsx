import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { PageHeader, Button } from 'antd';
import {
    LogoutOutlined
} from '@ant-design/icons';
import { logout } from '../../api/user'
import { useHistory } from "react-router-dom"

const Header = ({ collapsed, setCollasped }) => {

    const history = useHistory();
    //???????
    const handleMenu = () => {
        setCollasped(!collapsed)
    }

    const trylogout = async () => {

        try {
            const { status } = await logout()
            console.log(status)

            if (status === 200) {
                alert('로그아웃 되었습니다')
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <PageHeader
            className="site-page-header"
            onBack={(event) => handleMenu}
            style={{
                padding: 10,
                paddingTop: 0
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <img src={'/images/logo.png'} className='trigger' style={{ width: 120, height: 50 }}
                />
                <Button
                    style={{ background: 'none', border: 'none', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    icon={<LogoutOutlined />}></Button>
            </div>
        </PageHeader>
    );
};

export default Header;