import React, { useState } from "react";
import { Modal, Button, Input, Row, Col } from "antd";
import { Table } from "antd";
// import NoticeDialog from "./noticeDialog";
import {
  updateCustomer,
  getCustomerDept,
  updateCustomerDept,
} from "../api/setting";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SELECTION_NONE } from "antd/lib/table/hooks/useSelection";

const columns = [
  {
    title: "고객사 부서명",
    dataIndex: "customer_dept_nm",
    key: "customer_dept_id",
    // width: "70%",
  },
  //   {
  //     title: "",
  //     dataIndex: "",
  //     key: "x",
  //     width: "30%",
  //     render: () => (
  //       <div>
  //         <Button>
  //           <DeleteOutlined />
  //         </Button>
  //         <Button>
  //           <EditOutlined />
  //         </Button>
  //       </div>
  //     ),
  //   },
];

// const onRow = (record, rowIndex) => {
//   return {
//     onClick: (event) => {
//       // record: row의 data
//       // rowIndex: row의 index
//       // event: event prototype
//       console.log(record, rowIndex, event);
//     },
//   };
// };

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

  const [new_customer_dept_nm, setNewCusDeptNm] = useState("");
  //   const new_customer_dept_nm = ""

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

  const test = (event) => {
    // console.log(event);
    setNewCusDeptNm(event.target.value);
  };

  //고객사 부서 이름 수정
  const save = async (record) => {
    try {
      const { status, message } = await updateCustomerDept(
        { customer_dept_nm: new_customer_dept_nm },
        `${customer.customer_id}/${record.customer_dept_id}`
      );

      console.log(status, message);
    } catch (error) {
      console.error(error);
    }
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
        // onRow={onRow}
        rowKey={(record) => {
          return record.customer_dept_id;
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <Row>
                <Col style={{ width: "75%" }}>
                  <Input
                    type="text"
                    // value={new_customer_dept_nm}
                    defaultValue={record.customer_dept_nm}
                    style={{ width: 300, marginLeft: 20, marginRight: 20 }}
                    allowClear
                    onChange={test}
                  />
                </Col>
                <Col style={{ width: "25%" }}>
                  <Button onClick={save}>수정</Button>
                  <Button>삭제</Button>
                </Col>
              </Row>
              {/* {record.customer_nm} */}
            </p>
          ),
          //   expandRowByClick: true,
        }}
      ></Table>
    </Modal>
  );
};

export default CustomerDialog;
