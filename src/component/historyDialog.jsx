import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Button, Checkbox } from "antd";
import { Select } from "antd";
import {
  workType,
  solutions,
  workFlag,
  workContent,
} from "../searchOptions.js";
import { Input, InputNumber } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";

import {
  createHistory,
  updateHistory,
  deleteHistory,
  searchOption,
} from "../api/history";

import NoticeDialog from "./noticeDialog";

const { Option } = Select;
const { TextArea } = Input;

const HistoryDialog = ({ open, setOpen, record, setRecord, flag, setFlag }) => {
  const [history, setHistroy] = useState([]);

  const [customer, setCustomer] = useState([]);
  const [solution, setSolution] = useState([]);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeOpen, setnoticeOpen] = useState(false);
  const [isDelete, setisDelete] = useState(false);

  //사용할 form  이름 설정
  const [dialogForm] = Form.useForm();

  // const id = dialogForm.getFieldValue("work_hist_id")
  // console.log("현재 record     ", record)
  //레코드 데이터 세팅 하기
  dialogForm.setFieldsValue({
    ...record,
    work_date: moment(record.work_date) || moment(),
  });

  // console.log("구분    ", flag)

  useEffect(() => {
    // console.log("dialog 용 데이터 가져오기")
    // console.log(dialogForm)
    // console.log("record data : ", dialogForm.getFieldsValue())
  }, [record]);

  useEffect(() => {
    const testOptions = async () => {
      try {
        const {
          data: { workType, workContent, workFlag },
        } = await searchOption();
        // console.log(customer);
        // console.log(solution);
        // setCustomer(customer);
        // setSolution(solution);

        console.log(workType);
        console.log(workContent);
        console.log(workFlag);

        return Promise.resolve();
      } catch (error) {
        console.error(error);
        return Promise.resolve(false);
      }
    };

    // testOptions().then((res) => {
    //   console.log("1111111");
    //   console.log(res);

    //   const formatting = res.map((cus) => {
    //     const value = cus.customer_id;
    //     const label = cus.customer_nm;
    //     cus.value = label;
    //     cus.key = value;
    //     return cus;
    //   });
    //   setCustomer(formatting);
    // });
  }, []);

  const handleClickOpen = () => {
    // console.log("handleClickOpen")
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    console.log("rocord when closing dialog", record);
    // dialogForm.setFieldsValue({ ...record, work_date: moment(record.work_date) })
  };

  const onFinish = async (values) => {
    const success = false;
    console.log("현재 팝업 상태 : ", flag);
    // 입력받은 데이터 확인
    values.work_date = values.work_date.format("YYYYMMDD");

    if (flag === "create") {
      console.log(values);

      try {
        const { data, status } = await createHistory(values);
        // console.log(data)
        console.log(status);

        setnoticeOpen(true);

        setNoticeTitle("알림");
        setNoticeContent("등록되었습니다.");
      } catch (err) {
        console.error(err);
        //오류팝업
        setNoticeTitle("오류");
        setNoticeContent("등록 실패.");
      }
    } else {
      const id = dialogForm.getFieldValue("work_hist_id");
      console.log(values);

      try {
        const { status } = await updateHistory(id, values);
        //status = 200 이면 성공
        // console.log(status)
        setnoticeOpen(true);

        setNoticeTitle("알림");
        setNoticeContent("수정되었습니다.");
      } catch (error) {
        console.error(error);
        //오류팝업
        setNoticeTitle("오류");
        setNoticeContent("등록 실패.");
      }
    }
    // console.log('지원일자:', (values.work_date).format('YYYYMMDD'));

    // console.log(dialogForm.getFieldValue("work_hist_id"))

    handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(value);
  };

  const handleDelete = async () => {
    try {
      const id = dialogForm.getFieldValue("work_hist_id");
      console.log(id);
      const { data, status } = await deleteHistory(id);

      if (status === 200) {
        console.log("삭제완료");
        setnoticeOpen(true);
        setNoticeTitle("알림");
        setNoticeContent("삭제되었습니다.");
      }
      handleClose();
    } catch (error) {
      console.error(error);
      //오류팝업
      setNoticeTitle("오류");
      setNoticeContent("에러 발생.");
    }
  };

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
        title={"업무내역" + (flag === "create" ? " 등록" : "")}
        onOk={handleClickOpen}
        onCancel={handleClose}
        footer={[
          <Button
            hidden={flag === "create"}
            key="delete"
            onClick={handleDelete}
          >
            삭제
          </Button>,
          <Button key="back" onClick={handleClose}>
            닫기
          </Button>,
          <Button key="submit" type="primary" form="form" htmlType="submit">
            저장
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={dialogForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          id="form"
        >
          <Row>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="업무구분"
                name="work_type_id"
                rules={[
                  {
                    required: true,
                    message: "업무구분",
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {workType.map((type) => {
                    return <Option key={type.code_id}>{type.code_nm}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="고객사"
                name="customer_id"
                rules={[
                  {
                    required: true,
                    message: "고객사",
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {/* {customer.map((cus) => {
                    return (
                      <Option key={cus.customer_id}>{cus.customer_nm}</Option>
                    );
                  })} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="업무내용"
                name="work_content_id"
                rules={[
                  {
                    required: true,
                    message: "업무내용",
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {workContent.map((content) => {
                    return (
                      <Option key={content.code_id}>{content.code_nm}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="업무형태"
                name="work_flag_id"
                rules={[
                  {
                    required: true,
                    message: "업무형태",
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {workFlag.map((flag) => {
                    return <Option key={flag.code_id}>{flag.code_nm}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="일자"
                name="work_date"
                rules={[
                  {
                    required: true,
                    message: "일자",
                  },
                ]}
              >
                <DatePicker onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="솔루션"
                name="solution_id"
                rules={[
                  {
                    required: true,
                    message: "솔루션",
                  },
                ]}
              >
                <Select onChange={handleChange}>
                  {solutions.map((sol) => {
                    return (
                      <Option key={sol.solution_id}>{sol.solution_nm}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="지원시간"
                name="work_time_min"
                rules={[
                  {
                    required: true,
                    message: "지원시간",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  initialValues={0}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col style={{ width: "50%" }}>
              <Form.Item
                label="이동시간"
                name="move_time_min"
                rules={[
                  {
                    required: true,
                    message: "이동시간",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  initialValues={0}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "100%" }}>
              <Form.Item
                label="상세"
                name="work_content_detail"
                rules={[
                  {
                    required: true,
                    message: "상세",
                  },
                ]}
              >
                <TextArea rows={4} width={420}></TextArea>
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default HistoryDialog;
