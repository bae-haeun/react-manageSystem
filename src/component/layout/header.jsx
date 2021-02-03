import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { PageHeader } from 'antd';

const header = ({ collapsed, setCollasped }) => {
    //???????
    const handleMenu = () => {
        setCollasped(!collapsed)
    }

    return (
        <PageHeader
            className="site-page-header"
            onBack={(event) => handleMenu
            }
            title="타임게이트 업무내역관리"
            subTitle=""
        />
    );
};

export default header;