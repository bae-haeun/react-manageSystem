import React, { useState } from "react";
import { Modal, Button, Input, Row, Col } from "antd";
import { Table } from "antd";
// import NoticeDialog from "./noticeDialog";
import { updateCustomer, getCustomerDept } from "../api/setting";
import { useEffect } from "react";
import { ContactsOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "고객사 부서명",
    dataIndex: "customer_dept_nm",
    key: "customer_dept_id",
  },
];

const CustomerDialog = ({ open, setOpen, customer, setCustomer }) => {
  //   console.log(item);
  // const newCostomerName = ''
  const [newCostomerName, setNew] = useState("");
  const [customerDept, setcustomerDept] = useState([
    { customer_id: "", customer_nm: "", use_yn: "" },
  ]);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeOpen, setnoticeOpen] = useState(false);

  useEffect(() => {
    setCustomerInfo(customer);
  }, []);

  useEffect(() => {
    setCustomerInfo(customer);
    getCustomerDeptList(customer);

    console.log(customer);
  }, [open]);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const onInputchange = (event) => {
    setNew(event.target.value);
  };

  const update = async () => {
    try {
      await updateCustomer(customer.customer_id, {
        customer_nm: newCostomerName,
      });
      console.log(newCostomerName);
      // setNew('')
      // setnoticeOpen(true)
      // setNoticeTitle('알림')
      // setNoticeContent('고객사가 수정되었습니다.')
      handleClickOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const setCustomerInfo = async (customer) => {
    await setCustomer(customer);
  };

  const getCustomerDeptList = async (customer) => {
    const {
      data: { customerDeptList },
    } = await getCustomerDept({
      customer_id: customer.customer_id,
    });
    setcustomerDept(customerDeptList);
  };

  return (
    <Modal
      visible={open}
      title="고객사 상세 정보"
      onOk={handleClickOpen}
      onCancel={handleClickOpen}
      footer={[
        <Button key="submit" type="primary">
          삭제
        </Button>,
        <Button type="primary" onClick={handleClickOpen}>
          취소
        </Button>,
      ]}
    >
      <Row>
        <Col style={{ width: "80%" }}>
          <Input
            type="text"
            value={customer.customer_nm}
            onChange={onInputchange}
          />
          {/* {customer.customer_nm} */}
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
      <Table
        columns={columns}
        dataSource={customerDept}
        size="small"
        // scroll={{ y: 240 }}
        pagination={false}
        style={{ marginTop: "30px" }}
      ></Table>
    </Modal>
  );
};

export default CustomerDialog;
