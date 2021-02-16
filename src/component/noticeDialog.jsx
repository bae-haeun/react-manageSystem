import React from 'react';
import { Modal, Button, Space } from 'antd';

const noticeDialog = ({ open, setOpen, title, content }) => {

    // console.log(open)
    // console.log(title)
    // console.log(content)

    const handleClickOpen = () => {
        setOpen(!open)
    }

    const confirmDelete = () => {

    }
    return (
        <Modal
            visible={open}
            title={title}
            onOk={handleClickOpen}
            onCancel={handleClickOpen}
            footer={[
                <Button key="submit" type="primary" onClick={handleClickOpen}>
                    확인
            </Button>,
                //     <Button type="primary" onClick={handleClickOpen}>
                //         취소
                // </Button>,
            ]}
        >{content}</Modal>

    );
}

export default noticeDialog;