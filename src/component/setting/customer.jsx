import React, { useEffect, useState } from "react";
import { Tabs, Card, List, Row, Col, Input, Button } from "antd";
import { searchOption } from "../../api/history";
import { getCustomer } from "../../api/setting";
import { addCustomer } from "../../api/setting";
import NoticeDialog from "../noticeDialog";
import CustomerDialog from "./customerDialog";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Customer = (props) => {
  //고객사
  const [customer, setCustomer] = useState([]);
  const [inputCustomer, setInputCustomer] = useState("");

  //tab key
  const [activeKey, setActiveKey] = useState("");

  const [customerId, setCustomerId] = useState("");

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeOpen, setnoticeOpen] = useState(false);

  const [customerOpen, setCustomerOpen] = useState(false);

  const [customerItem, setCustomerItem] = useState({});

  const input = "";
  // console.log("##", customer);
  useEffect(() => {
    const testOptions = async () => {
      try {
        const {
          data: { result },
        } = await getCustomer();

        setCustomer(result);
        setActiveKey("customer");
        // console.log(customer);
      } catch (error) {
        console.error(error);
      }
    };
    testOptions();
  }, []);

  // console.log(activeKey);

  const createCustomer = async (value) => {
    // console.log(inputCustomer)

    try {
      await addCustomer({
        customer_nm: inputCustomer,
      });
      setInputCustomer("");
      setnoticeOpen(true);

      setNoticeTitle("알림");
      setNoticeContent("고객사가 등록되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const onInputchange = (event) => {
    setInputCustomer(event.target.value);
  };

  const showCustomerPop = (item) => {
    setCustomerOpen(true);
    setCustomerItem(item);
  };

  const handleActiveKey = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <NoticeDialog
        open={noticeOpen}
        setOpen={setnoticeOpen}
        title={noticeTitle}
        content={noticeContent}
      />
      {/* <Tabs activeKey={activeKey} centered onChange={handleActiveKey}>
        <TabPane
          tab="고객사"
          key="customer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
      <Card style={{ width: "60%", height: "100%" }} title="고객사 목록">
        <List
          header={
            <div>
              <Row style={{ padding: "5px" }}>
                <Col style={{ width: "70%" }}>
                  <Input
                    type="text"
                    placeholder="고객사"
                    value={inputCustomer}
                    onChange={onInputchange}
                  />
                </Col>
                <Col style={{ width: "30%" }}>
                  <Button
                    type="default"
                    style={{ marginLeft: "30px" }}
                    onClick={createCustomer}
                  >
                    고객사 추가
                  </Button>
                </Col>
              </Row>
            </div>
          }
          style={{ width: "100%", height: "500px", overflow: "auto" }}
          bordered
          dataSource={customer}
          renderItem={(item) => (
            <List.Item
              key={item.customer_id}
              onClick={() => {
                showCustomerPop(item);
              }}
            >
              {item.customer_nm}
            </List.Item>
          )}
        />
        <CustomerDialog
          open={customerOpen}
          setOpen={setCustomerOpen}
          customer={customerItem}
          setCustomer={setCustomerItem}
        ></CustomerDialog>
        {/* {customer} */}
      </Card>
      {/* </TabPane>
      </Tabs> */}
    </>
  );
};

export default Customer;
