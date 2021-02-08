import React, { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'antd';
import { Form, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { workType, customer, solutions, workFlag, workContent } from '../searchOptions.js'
import { Input, InputNumber } from 'antd';

const { Option } = Select;

const HistoryDialog = ({ open, setOpen, record, setRecord, flag, setFlag }) => {

    // console.log(record)
    // console.log(flag)

    const [history, setHistroy] = useState([])

    useEffect((record, flag) => {
        //레코드 데이터 확인 및 수정데이터 세팅 하기
        setRecord(record)
        setFlag(flag)
        console.log("현재 record     ", record)
        console.log("구분    ", flag)

    }, [])

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
                <Button key="submit" type="primary" form='form' htmlType="submit">
                    저장
            </Button>,
            ]}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                id='form'
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
                            <Select onChange={handleChange}>
                                {workType.map((type, index) => {
                                    return <Option id={type.code_id} value={type.code_id} key={index}>{type.code_nm}</Option>
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
                        <Select onChange={handleChange}>
                            {customer.map((cus, index) => {
                                return <Option id={cus.customer_id} value={cus.customer_id} key={index}>{cus.customer_nm}</Option>
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
                            <InputNumber min={1} initialValues={0} onChange={handleChange} />
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