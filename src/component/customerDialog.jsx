import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import NoticeDialog from './noticeDialog'
import { updateCustomer } from '../api/setting'

const CustomerDialog = ({ open, setOpen, item }) => {
    // console.log(item)
    // const newCostomerName = ''
    const [newCostomerName, setNew] = useState('')

    const [noticeTitle, setNoticeTitle] = useState('')
    const [noticeContent, setNoticeContent] = useState('')
    const [noticeOpen, setnoticeOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(!open)
    }

    const onInputchange = (event) => {
        setNew(event.target.value)
    }

    const update = async () => {

        try {
            await updateCustomer(item.customer_id, {
                customer_nm: newCostomerName,
            })
            console.log(newCostomerName)
            // setNew('')
            // setnoticeOpen(true)
            // setNoticeTitle('알림')
            // setNoticeContent('고객사가 수정되었습니다.')
            handleClickOpen()
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Modal
            visible={open}
            title="고객사 이름 수정"
            onOk={handleClickOpen}
            onCancel={handleClickOpen}
            footer={[
                <Button key="submit" type="primary" onClick={update}>
                    수정
            </Button>,
                //     <Button type="primary" onClick={handleClickOpen}>
                //         취소
                // </Button>,
            ]}
        >
            <Input type="text" defaultValue={item.customer_nm}
                onChange={onInputchange} />
        </Modal>
    );
};

export default CustomerDialog;