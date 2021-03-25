import React from "react";
import { Card, Col, Layout, Form, Input, Button, Divider } from "antd";
import { login } from "../api/user";
import {
  BrowserRouter,
  Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const history = useHistory();

  const [loginForm] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);

    try {
      const { data, status } = await login(values);
      console.log(status);

      switch (status) {
        case 200:
          console.log(data);
          history.push("/");
          break;
        case 402:
          alert("잘못된 이메일입니다");
          break;
        case 403:
          alert("잘못된 비밀번호입니다");
          break;
        default:
          alert("Invalid Error accured");
          window.location.reload();
      }
    } catch (error) {
      // console.log("00000000")
      console.log(error.response);

      if (error.response.status === 402) {
        alert("잘못된 이메일입니다");
      } else if (error.response.status === 403) {
        alert("잘못된 비밀번호입니다");
      } else {
        console.error(error);
      }
      window.location.reload();
    }
  };
  const onFinishFailed = () => {};
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Col>
        {/* <img src="/images/logo.png" style={{ heigjt: '100px' }} /> */}
        <Card
          style={{ width: 500 }}
          cover={
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img alt="example" src="/images/logo.png" sizes />
            </div>
          }
        >
          <Form
            form={loginForm}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Card type="inner" title="업무수행내역 관리">
              <Form.Item
                label="이메일"
                name="email"
                rules={[{ required: true, message: "이메일을 입력하세요" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
              >
                <Input.Password />
              </Form.Item>
            </Card>
            {/* <Form.Item > */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ margin: "20px" }}
                type="primary"
                htmlType="submit"
              >
                로그인
              </Button>
            </div>
          </Form>
          {/* </Form.Item> */}
        </Card>
      </Col>
    </Layout>
  );
};

export default Login;
