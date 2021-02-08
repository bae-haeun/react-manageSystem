import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { AutoComplete, Input } from 'antd';
import { searchOption } from '../api/history'
import { workType, customer, solutions, workFlag, workContent } from '../searchOptions.js'
import { Form, Button, Checkbox } from 'antd';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const SearchArea = ({ searchOpen, setSearchOpen }) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    const [workType, setWorkType] = useState([])
    const [workContent, setWorkContent] = useState([])
    const [workFlag, setWorkFlag] = useState([])
    const [customer, setCustomer] = useState([])
    const [solution, setSolution] = useState([])

    const [customerValue, setCustomerValue] = useState('')
    const [defaultCustomList] = useState([...customer])


    // const testOptions = async () => {
    //     try {
    //         const { data: { workType, workContent, workFlag, customer, solution } } = await searchOption()
    //         setWorkType(workType)
    //         setWorkContent(workContent)
    //         setWorkFlag(workFlag)
    //         setCustomer(customer)
    //         setSolution(solution)
    //     } catch (error) {
    //         console.error(error)
    //     }

    // }


    //searchOption get
    useEffect(() => {

        const testOptions = async () => {
            try {
                const { data: { customer, solution } } = await searchOption()
                // setWorkType(workType)
                // setWorkContent(workContent)
                // setWorkFlag(workFlag)
                setCustomer(customer)
                setSolution(solution)

                return Promise.resolve(customer)

            } catch (error) {
                console.error(error)
                return Promise.resolve(false)
            }
        }

        testOptions().then((res) => {

            const formatting = res.map(cus => {
                const value = cus.customer_id
                const label = cus.customer_nm
                // cus.value = value
                // cus.label = label
                cus.value = label;
                cus.key = value;
                return cus
            })
            setCustomer(formatting)

        }

        )




    }, [])



    const onSearch = (searchText) => {
        console.log('onSearch', searchText)


        // let filtered = defaultCustomList.filter(
        //     obj =>
        //         obj.value
        //             .toString()
        //             .includes(searchText)
        // );
        // console.log(filtered)
        // setCustomer(filtered)
    };

    const onSelect = (data, option) => {
        console.log(data);

        setCustomerValue(option.customer_id)
        // console.log('onSelect option', customerValue);
    };

    const onFinish = (values) => {
        // 입력받은 데이터 확인
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            hidden={searchOpen}
            name="searchForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row style={{ padding: '5px' }}>
                <Col span={6} >
                    <Form.Item
                        label="고객사"
                        name="customer"
                    // style={{ margin: '20px' }}
                    >
                        <AutoComplete
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            options={customer}
                        >
                            {/* <Input.Search size="large"></Input.Search> */}
                        </AutoComplete>

                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="날짜"
                        name="work_date"
                    // style={{ margin: '20px' }}

                    >
                        <RangePicker />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="엔지니어"
                        name="user_nm"
                    // style={{ margin: '20px' }}

                    >
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="input here"
                        /></Form.Item>
                </Col>

                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button form="searchForm" htmlType="submit" type="primary" >검색</Button>
                </Col>
            </Row>

            <Row style={{ padding: '10px' }}>
                <Col span={6}>
                    <Form.Item
                        label="업무구분"
                        name="work_type"
                    // style={{ margin: '20px' }}
                    >
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="input here"
                        /></Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="업무형태"
                        name="work_flag"
                    // style={{ margin: '20px' }}

                    >
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="input here"
                        /></Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="업무내용"
                        name="work_content"
                    // style={{ margin: '20px' }}

                    >
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="input here"
                        /></Form.Item>
                </Col>

                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button type="default" >조건 초기화</Button>
                </Col>
            </Row>
        </Form >
    );
};

export default SearchArea;