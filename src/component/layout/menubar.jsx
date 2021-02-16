import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
// import Header from './header'
import Table from '../table'
import './menubar.css'
import { Link, Route, BrowserRouter, Switch } from "react-router-dom"
import Customer from '../customer'

const { Header, Sider, Content } = Layout;

export default function Menubar() {

    const [collapsed, setCollapsed] = useState(true)
    // const { Sider, Content } = Layout;
    // const state = {
    //     collapsed: false,
    // };

    const toggle = () => {
        // this.setState({
        //     collapsed: !state.collapsed,
        // });
        console.log("menu oprn");
        setCollapsed(!collapsed)

    };

    return (
        // <Router>
        <BrowserRouter>

            <Layout style={{
                height: '100vh',
                width: '100vw'
            }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/">
                                main
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/customer">
                                customer
                    </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/login">
                                login
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })} */}
                        <img src={'/images/logo.png'} className='trigger'
                            onClick={toggle} />
                    </Header>
                    {/* <Header collapsed={collapsed} setCollapsed={setCollapsed}>
                </Header> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: '24px 16px',
                        }}
                    >

                        <Switch>
                            <Route exact path='/'>
                                <Table></Table>
                            </Route>
                            <Route exact path='/customer'>
                                <Customer></Customer>
                            </Route>


                        </Switch>


                    </Content>
                </Layout>
            </Layout>

        </BrowserRouter>
        // <Route exact path="/main" component={Table} />
        // <Route exact path="/customer" component={Customer} />
        // </Router>
    );
};

// export default menubar;