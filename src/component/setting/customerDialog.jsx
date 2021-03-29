import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Input, Row, Col } from "antd";
import { Table } from "antd";
// import NoticeDialog from "./noticeDialog";
import {
  updateCustomer,
  getCustomerDept,
  updateCustomerDept,
  deleteCustomerDept,
} from "../../api/setting";
import NoticeDialog from "../noticeDialog";

const columns = [
  {
    title: "고객사 부서명",
    dataIndex: "customer_dept_nm",
    key: "customer_dept_id",
  },
];

// };

const CustomerDialog = ({ open, setOpen, customer, setCustomer }) => {
  const [newCostomerName, setNew] = useState("");
  const [customerDept, setcustomerDept] = useState([
    { customer_id: "", customer_nm: "", use_yn: "" },
  ]);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeOpen, setnoticeOpen] = useState(false);

  const [newCustomerDeptNm, setNewCustomerDeptNm] = useState("");

  //   const new_customer_dept_nm = ""

  //   useEffect(() => {
  //     setCustomerInfo(customer);
  //   }, []);

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

  const handleNewDeptNm = (event) => {
    setNewCustomerDeptNm(event.target.value);
  };

  const deleteCustomerDept = useCallback(async (record) => {
    try {
      console.log(record);

      const { status, message } = await deleteCustomerDept(
        `${record.customer_id}/${record.customer_dept_id}`
      );

      console.log(status, message);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <NoticeDialog
        open={noticeOpen}
        setOpen={setnoticeOpen}
        title={noticeTitle}
        content={noticeContent}
      />
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
              <div style={{ margin: 0 }}>
                <Row>
                  <Col style={{ width: "75%" }}>
                    <Input
                      type="text"
                      // value={new_customer_dept_nm}
                      defaultValue={record.customer_dept_nm}
                      style={{ width: 300, marginLeft: 20, marginRight: 20 }}
                      allowClear
                      onChange={handleNewDeptNm}
                    />
                  </Col>
                  <Col style={{ width: "25%" }}>
                    <Button
                      onClick={async () => {
                        //고객사 부서 이름 수정

                        try {
                          const { status } = await updateCustomerDept(
                            { customer_dept_nm: newCustomerDeptNm },
                            `${customer.customer_id}/${record.customer_dept_id}`
                          );

                          //   console.log(status, message);
                          if (status === 200) {
                            setnoticeOpen(true);
                            setNoticeTitle("알림");
                            setNoticeContent("고객사부서가 수정되었습니다.");
                            getCustomerDeptList(customer);
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={async (record) => {
                        // deleteCustomerDept(record); //안돼는 이유 확인하기 ㅜ

                        try {
                          //   console.log(`${record.customer_id}/${record.customer_dept_id}`);
                          const { status, message } = await deleteCustomerDept(
                            `${record.customer_id}/${record.customer_dept_id}`
                          );
                          if (status === 200) {
                            setnoticeOpen(true);
                            setNoticeTitle("알림");
                            setNoticeContent("고객사부서가 삭제되었습니다.");
                            getCustomerDeptList(customer);
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      삭제
                    </Button>
                  </Col>
                </Row>
                {/* {record.customer_nm} */}
              </div>
            ),
            //   expandRowByClick: true,
          }}
        ></Table>
      </Modal>
    </>
  );
};

export default CustomerDialog;
