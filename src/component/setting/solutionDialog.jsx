import React from "react";
import { Modal, Button, Input, Row, Col } from "antd";

const SolutionDialog = ({ open, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal
        visible={open}
        title="솔루션 정보"
        onOk={handleClickOpen}
        // onCancel={handleClickOpen}
        // footer={[
        //   <Button key="submit" type="primary">
        //     수정
        //   </Button>,
        //   <Button type="primary" onClick={handleClickOpen}>
        //     취소
        //   </Button>,
        // ]}
      ></Modal>
    </>
  );
};

export default SolutionDialog;
