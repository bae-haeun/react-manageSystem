import React, { useEffect, useState } from "react";
import { Tabs, Card, List, Row, Col, Input, Button } from "antd";
import { getSolution } from "../../api/setting";
import NoticeDialog from "../noticeDialog";

const Solution = () => {
  //솔루션
  const [solution, setSolution] = useState([]);

  useEffect(async () => {
    const {
      data: { solutions },
    } = await getSolution();

    setSolution(solutions);
  }, []);

  const createSolution = async (value) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card style={{ width: "60%", height: "100%" }} title="솔루션 목록">
        <List
          header={
            <div>
              <Row style={{ padding: "5px" }}>
                <Col style={{ width: "70%" }}>
                  <Input
                    type="text"
                    placeholder="솔루션"
                    // value={inputCustomer}
                    // onChange={onInputchange}
                  />
                </Col>
                <Col style={{ width: "30%" }}>
                  <Button
                    type="default"
                    style={{ marginLeft: "30px" }}
                    onClick={createSolution}
                  >
                    솔루션 추가
                  </Button>
                </Col>
              </Row>
            </div>
          }
          style={{ width: "100%", height: "500px", overflow: "auto" }}
          bordered
          dataSource={solution}
          renderItem={(item) => (
            <List.Item
              key={item.solution_id}
              // onClick={() => {
              //   showCustomerPop(item);
              // }}
            >
              {item.solution_nm}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Solution;
