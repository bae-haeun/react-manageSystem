import React, { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import { AutoComplete, Select } from "antd";
import { searchOption } from "../api/history";
import {
  workType,
  customer,
  solutions,
  workFlag,
  workContent,
} from "../searchOptions.js";
import { Form, Button, Checkbox } from "antd";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const SearchArea = ({ searchOpen, setSearchOpen, setSearchData }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  // const [workType, setWorkType] = useState([])
  // const [workContent, setWorkContent] = useState([])
  // const [workFlag, setWorkFlag] = useState([])
  const [customer, setCustomer] = useState([]);
  const [solution, setSolution] = useState([]);

  const [customerValue, setCustomerValue] = useState("");
  const [defaultCustomList] = useState([...customer]);

  const [searchForm] = Form.useForm();

  // const testOptions = async () => {
  //     try {
  //         const { data: { workType, workContent, workFlag, customer, solution } } = await searchOption()
  //         setWorkType(workType)
  //         setWorkContent(workContent)
  //         setWorkFlag(workFlag)
  //         setCustomer(customer)
  //         setSolution(solution)
  //     } catch (error) {
  //         console.error(error)
  //     }

  // }

  //searchOption get
  useEffect(() => {
    const testOptions = async () => {
      try {
        const { data } = await searchOption();
        // setWorkType(workType)
        // setWorkContent(workContent)
        // setWorkFlag(workFlag)
        // setCustomer(customer);
        // setSolution(solution);
        console.log(data);

        return Promise.resolve();
      } catch (error) {
        console.error(error);
        return Promise.resolve(false);
      }
    };

    // testOptions().then((res) => {
    //   const formatting = res.map((cus) => {
    //     const value = cus.customer_id;
    //     const label = cus.customer_nm;
    //     // cus.value = value
    //     // cus.label = label
    //     cus.value = label;
    //     cus.key = value;
    //     return cus;
    //   });
    //   setCustomer(formatting);
    // });
  }, []);

  const onSearch = (searchText) => {
    console.log("onSearch", searchText);

    // let filtered = defaultCustomList.filter(
    //     obj =>
    //         obj.value
    //             .toString()
    //             .includes(searchText)
    // );
    // console.log(filtered)
    // setCustomer(filtered)
  };

  const onSelect = (data, option) => {
    // console.log(data);

    setCustomerValue(option.customer_id);
    console.log("customerValue", customerValue);
  };

  const onFinish = (values) => {
    // 입력받은 데이터 확인
    values.customer_id = customerValue;
    console.log("s date:", values.work_date[0].format("YYYYMMDD"));
    const searchStartDate = values.work_date[0].format("YYYYMMDD");
    const searchEndDate = values.work_date[1].format("YYYYMMDD");

    setSearchData({
      ...values,
      page: 1,
      itemsPerPage: 10,
      searchStartDate: searchStartDate,
      searchEndDate: searchEndDate,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout={"inline"}
      hidden={searchOpen}
      name="searchForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row style={{ padding: "5px" }}>
        <Form.Item label="고객사" name="customer_id">
          <AutoComplete
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            options={customer}
          ></AutoComplete>
        </Form.Item>
        <Form.Item label="날짜" name="work_date">
          <RangePicker />
        </Form.Item>
        <Form.Item label="엔지니어" name="user_nm">
          <AutoComplete
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="input here"
          />
        </Form.Item>
        <Button form="searchForm" htmlType="submit" type="primary">
          검색
        </Button>
      </Row>

      <Row style={{ padding: "10px" }}>
        <Form.Item label="업무구분" name="work_type_id">
          <Select style={{ width: 200 }}>
            {workType.map((type) => {
              return <Option key={type.code_id}>{type.code_nm}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item label="업무형태" name="work_flag_id">
          <Select style={{ width: 200 }}>
            {workFlag.map((flag) => {
              return <Option key={flag.code_id}>{flag.code_nm}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item label="업무내용" name="work_content_id">
          <Select style={{ width: 200 }}>
            {workContent.map((content) => {
              return <Option key={content.code_id}>{content.code_nm}</Option>;
            })}
          </Select>
        </Form.Item>
        {/* </Col> */}

        {/* <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
        <Button type="default">조건 초기화</Button>
        {/* </Col> */}
      </Row>
    </Form>
  );
};

export default SearchArea;
