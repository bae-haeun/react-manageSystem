import React, { useState } from "react";
import { Layout, Menu, Button, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Header from "./header";
import Table from "../table";
import "./menubar.css";
import {
  Link,
  Route,
  BrowserRouter,
  Switch,
  useHistory,
} from "react-router-dom";
import Customer from "../setting/customer";
import Solution from "../setting/solution";

const { Sider, Content } = Layout;

export default function Menubar() {
  const history = useHistory();

  const [collapsed, setCollapsed] = useState(true);
  // const { Sider, Content } = Layout;
  // const state = {
  //     collapsed: false,
  // };

  const toggle = () => {
    // this.setState({
    //     collapsed: !state.collapsed,
    // });
    console.log("menu oprn");
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter>
      <Layout
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<MenuUnfoldOutlined />}>
              <Link to="/">main</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/setting/customer">customer</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/setting/solution">solution</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{
                        padding: 0, display: 'flex',
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <img src={'/images/logo.png'} className='trigger'
                            onClick={toggle} />
                        <Button onClick={trylogout} type="ghost" style={{ border: 'none', width: 80, height: 80 }} icon={<LogoutOutlined />}></Button>
                    </Header> */}
          <Header></Header>
          <Content
            className="site-layout-background"
            style={{
              padding: "24px 16px",
            }}
          >
            <Switch>
              <Route exact path="/">
                <Table></Table>
              </Route>
              <Route exact path="/setting/customer">
                <Customer></Customer>
              </Route>
              <Route exact path="/setting/solution">
                <Solution></Solution>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

// export default menubar;
