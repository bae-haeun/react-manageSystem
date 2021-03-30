import React, { useEffect, useState } from "react";
import { Tabs, Card, List, Row, Col, Input, Button } from "antd";
import {
  getSolution,
  addSolution,
  updateSolution,
  deleteSolution,
} from "../../api/setting";
import NoticeDialog from "../noticeDialog";
import SolutionDialog from "./solutionDialog";

const Solution = () => {
  //조회한 솔루션 리스트
  const [solutions, setSolutions] = useState([]);

  //추가할 솔루션 이름
  const [inputSolution, setInputSolution] = useState("");

  //notice popup
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeOpen, setnoticeOpen] = useState(false);

  const [solutionOpen, setSolutionOpen] = useState(false);

  useEffect(() => {
    fetchSolution();
  }, []);

  const fetchSolution = async () => {
    try {
      const {
        data: { solutions },
      } = await getSolution();

      setSolutions(solutions);
    } catch (error) {
      console.log(error);
    }
  };

  const createSolution = async () => {
    try {
      const result = await addSolution({ solution_nm: inputSolution });

      if (result.status === 200) {
        setInputSolution("");
        setnoticeOpen(true);

        setNoticeTitle("알림");
        setNoticeContent("솔루션이 등록되었습니다.");
        fetchSolution();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputchange = (event) => {
    setInputSolution(event.target.value);
  };

  const deleteSol = async (solutionId) => {
    try {
      const result = await deleteSolution(solutionId);

      if (result.status === 200) {
        setnoticeOpen(true);
        setNoticeTitle("알림");
        setNoticeContent("솔루션이 삭제되었습니다.");
        fetchSolution();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showUpdatePopUp = () => {
    setSolutionOpen(true);
  };

  return (
    <div>
      <NoticeDialog
        open={noticeOpen}
        setOpen={setnoticeOpen}
        title={noticeTitle}
        content={noticeContent}
      />
      <SolutionDialog
        open={solutionOpen}
        setOpen={setSolutionOpen}
      ></SolutionDialog>
      <Card style={{ width: "60%", height: "100%" }} title="솔루션 목록">
        <List
          header={
            <div>
              <Row style={{ padding: "5px" }}>
                <Col style={{ width: "70%" }}>
                  <Input
                    type="text"
                    placeholder="솔루션"
                    value={inputSolution}
                    onChange={onInputchange}
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
          dataSource={solutions}
          renderItem={(item) => (
            <List.Item
              key={item.solution_id}
              actions={[
                <div key="list-loadmore-edit" onClick={showUpdatePopUp}>
                  수정
                </div>,
                <div
                  key="list-loadmore-more"
                  onClick={() => deleteSol(item.solution_id)}
                >
                  삭제
                </div>,
              ]}
              // onClick={() ==> {
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
