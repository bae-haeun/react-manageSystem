import React, { useState } from "react";
import { Modal, Button, Input, Row, Col } from "antd";

const SolutionDialog = ({ open, setOpen, solution }) => {
  console.log(solution);

  const [newSolutionNm, setNewSolutionNm] = useState("");

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const onInputchange = (event) => {
    setNewSolutionNm(event.target.value);
  };

  const update = () => {
    console.log(newSolutionNm);
  };

  return (
    <>
      <Modal
        visible={open}
        title="솔루션 정보"
        onOk={handleClickOpen}
        onCancel={handleClickOpen}
        // footer={[
        //   <Button key="submit" type="primary">
        //     수정
        //   </Button>,
        //   <Button type="primary" onClick={handleClickOpen}>
        //     취소
        //   </Button>,
        // ]}
      >
        <Row>
          <Col style={{ width: "80%" }}>
            <Input
              type="text"
              value={solution.solution_nm}
              onChange={onInputchange}
            />
          </Col>
          <Col style={{ width: "20%" }}>
            <Button
              type="primary"
              onClick={update}
              style={{ marginLeft: "30px" }}
            >
              수정
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SolutionDialog;
