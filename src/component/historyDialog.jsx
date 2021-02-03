import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';
import { Form, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { workType, customer, solutions, workFlag, workContent } from '../searchOptions.js'
import { Input, InputNumber } from 'antd';

const { Option } = Select;


const HistoryDialog = ({ open, setOpen }) => {

    const [history, setHistroy] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const onFinish = (values) => {
        // 입력받은 데이터 확인
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {

        console.log(value)
    }

    return (
        <Modal
            visible={open}
            title="업무내역 등록"
            onOk={handleClickOpen}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    닫기
            </Button>,
                <Button key="submit" type="primary" onClick={onFinish} htmlType="submit">
                    저장
            </Button>,
            ]}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col style={{ width: '50%' }}>
                        <Form.Item
                            label="업무구분"
                            name="work_type_id"
                            rules={[
                                {
                                    required: true,
                                    message: '업무구분',
                                },
                            ]}

                        >
                            <Select defaultValue="업무구분" onChange={handleChange}>
                                {workType.map((type) => {
                                    return <Option value={type.code_id}>{type.code_nm}</Option>
                                })}

                            </Select>

                        </Form.Item>
                    </Col>
                    <Col style={{ width: '50%' }}><Form.Item
                        label="고객사"
                        name="customer"
                        rules={[
                            {
                                required: true,
                                message: '고객사',
                            },
                        ]}
                    >
                        <Select defaultValue="고객사" onChange={handleChange}>
                            {customer.map((cus) => {
                                return <Option value={cus.customer_id}>{cus.customer_nm}</Option>
                            })}

                        </Select>

                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '50%' }}>
                        <Form.Item
                            label="지원시간"
                            name="work_time"
                            rules={[
                                {
                                    required: true,
                                    message: '지원시간',
                                },
                            ]}
                        >
                            <InputNumber min={1} defaultValue={0} onChange={handleChange} />
                        </Form.Item>
                    </Col>
                    <Col style={{ width: '50%' }}></Col>
                </Row>

                {/* <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}


            </Form>

        </Modal>
    );
};

export default HistoryDialog;