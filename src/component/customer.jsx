import React, { useEffect, useState } from 'react';
import { Tabs, Card, List, Row, Col, Input, Button } from 'antd';
import {
    searchOption,
} from '../api/history'
import { addCustomer } from '../api/setting'
import NoticeDialog from './noticeDialog'
import CustomerDialog from './customerDialog'
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Customer = (props) => {
    const [customer, setCustomer] = useState([])
    const [inputCustomer, setInputCustomer] = useState('')

    const [customerId, setCustomerId] = useState('')

    const [noticeTitle, setNoticeTitle] = useState('')
    const [noticeContent, setNoticeContent] = useState('')
    const [noticeOpen, setnoticeOpen] = useState(false)

    const [customerOpen, setCustomerOpen] = useState(false)

    const [customerItem, setCustomerItem] = useState({})

    const input = ''

    const testOptions = async () => {
        try {
            const { data: { customer } } = await searchOption()
            setCustomer(customer)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {


        testOptions()


    }, [noticeOpen, customerOpen])

    // useEffect(() => {

    //     console.log(customerId)

    // }, [customerId])

    const createCustomer = async (value) => {
        // console.log(inputCustomer)

        try {
            await addCustomer({
                customer_nm: inputCustomer,
                // contact_user_nm: ,
            })
            setInputCustomer('')
            setnoticeOpen(true)

            setNoticeTitle('알림')
            setNoticeContent('고객사가 등록되었습니다.')

        } catch (error) {
            console.error(error)
        }

    }

    const onInputchange = (event) => {
        setInputCustomer(event.target.value)
    }

    const showCustomerPop = (item) => {
        // console.log(item)
        setCustomerOpen(true)
        setCustomerItem(item)
    }

    return (
        <>
            <NoticeDialog open={noticeOpen} setOpen={setnoticeOpen} title={noticeTitle} content={noticeContent} />
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="고객사입력" key="1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card
                        style={{ width: '60%', height: '100%', }}
                        title="고객사 목록"
                    >
                        <List

                            header={<div >
                                <Row style={{ padding: '5px' }}>
                                    <Col style={{ width: '70%' }}>
                                        <Input type="text" placeholder="고객사" value={inputCustomer}
                                            onChange={onInputchange} />
                                    </Col>
                                    <Col style={{ width: '30%' }}>
                                        <Button type="default" style={{ marginLeft: '30px' }} onClick={createCustomer}>고객사 추가</Button>
                                    </Col>
                                </Row>
                            </div>}
                            style={{ width: '100%', height: '500px', overflow: 'auto' }}
                            bordered
                            dataSource={customer}
                            renderItem={item => (
                                <List.Item key={item.customer_id} onClick={() => { showCustomerPop(item) }}>
                                    {/* <div  onClick={showCustomerPop}> */}

                                    {item.customer_nm}
                                    {/* </div> */}
                                    {/* <List.Item.Action
                                        actions={[{
                                            onClick: () => {
                                                console.log("click")
                                            }
                                        }]}
                                    /> */}
                                </List.Item>
                            )}
                        />
                        <CustomerDialog open={customerOpen} setOpen={setCustomerOpen} item={customerItem}></CustomerDialog>
                    </Card>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
            </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
            </TabPane>
            </Tabs >
        </>
    )
}

export default Customer;