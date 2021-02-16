import React from 'react';
import { Card, Col, Layout, Form, Input, Button, Divider } from 'antd'

const Login = (props) => {
    const onFinish = () => {

    }
    const onFinishFailed = () => {

    }
    return (
        <Layout style={{
            height: '100vh',
            width: '100vw',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <Col >
                {/* <img src="/images/logo.png" style={{ heigjt: '100px' }} /> */}
                <Card
                    style={{ width: 500 }}
                    cover={
                        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                alt="example"
                                src="/images/logo.png"
                                sizes
                            />
                        </div>}

                >
                    <Card type="inner" title="업무수행내역 관리" >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>



                        </Form>
                    </Card>
                    {/* <Form.Item > */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button style={{ margin: '20px' }} type="primary" htmlType="submit">
                            로그인
                                </Button>
                    </div>
                    {/* </Form.Item> */}

                </Card>
            </Col>
        </Layout>
    );
}

export default Login;