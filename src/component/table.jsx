import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from './historyDialog'
import { Typography } from 'antd';
import { Button } from 'antd';
import { Row, Col, Divider } from 'antd';

import { Table, Tag, Radio, Space, Pagination } from 'antd';

import axios from 'axios'
import {
    lookupHistory,
    createHistory,
    updateHistory,
    deleteHistory,
    searchOption,
} from '../api/history'
import SearchArea from './searchArea';


const headers = [
    {
        title: '엔지니어',
        sortable: false,
        value: 'user_nm',
        width: '10%',
        align: 'center',
        dataIndex: 'user_nm',
        key: 'user_nm',
    },
    {
        title: '고객사', value: 'customer_nm', sortable: false, width: '10%', align: 'center', dataIndex: 'customer_nm',
        key: 'customer_nm',
    },
    {
        title: '솔루션', value: 'solution_nm', sortable: false, width: '10%', align: 'center',
        dataIndex: 'solution_nm',
        key: 'solution_nm',
    },
    {
        title: '업무구분', value: 'work_type', sortable: false, width: '10%', align: 'center',
        dataIndex: 'work_type',
        key: 'work_type',
    },
    {
        title: '업무내용', value: 'work_content', sortable: false, width: '10%', align: 'center',
        dataIndex: 'work_content',
        key: 'work_content',
    },
    {
        title: '업무형태', value: 'work_flag', sortable: false, width: '10%', align: 'center',
        dataIndex: 'work_flag',
        key: 'work_flag',
    },
    {
        title: '지원시간(Min)',
        value: 'work_time_min',
        sortable: false,
        width: '10%',
        align: 'center',
        dataIndex: 'work_time_min',
        key: 'work_time_min',
    },
    {
        title: '이동시간(Min)',
        value: 'move_time_min',
        sortable: false,
        width: '10%',
        align: 'center',
        dataIndex: 'move_time_min',
        key: 'move_time_min',
    },
    {
        title: '지원일자', value: 'work_date', sortable: false, width: '10%', align: 'center',
        dataIndex: 'work_date',
        key: 'work_date',
    },
];


const rows = [
    {
        customer_id: "1093625a-469e-4723-9cfd-2831a7a38ecc",
        customer_nm: "배달의민족1",
        move_time_min: 22,
        solution_id: "fd0ebe2f-1fa1-413e-b71e-9014cc2be519",
        solution_nm: "RPA Portal",
        user_nm: "이름",
        work_content: "개발",
        work_content_detail: "zz!",
        work_content_id: "developmt",
        work_date: "20210211",
        work_flag: "내근",
        work_flag_id: "inner",
        work_hist_id: "51e93835-b057-43b7-a3c1-11f2e970fd8e",
        work_time_min: 11,
        work_type: "프로젝트",
        work_type_id: "project"
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    container: {
        maxHeight: 440,
    },
    grid: {
        width: 'fit-content',
        border: `1px solid `,

    }
}));

const searchData = {
    user_nm: null,
    customer_id: null,
    work_flag_id: null,
    work_content_id: null,
    work_type_id: null,
    searchStartDate: null,
    searchEndDate: null,
    page: 1,
    itemsPerPage: 10,
}


export default function StickyHeadTable() {

    const { Title } = Typography;

    //state 변수 open 선언, setOpen으로 세팅
    //내역 추가 팝업 오픈 여부
    const [open, setOpen] = useState(false)

    //검색 조건 부분 오픈 여부
    const [searchOpen, setSearchOpen] = useState(true)

    //현재 페이지에 노출될 데이터 10건
    const [data, setData] = useState([])

    //총 생성될 페이지수 
    const [total, setTotal] = useState(0)

    const [current, setCurrent] = useState(1)

    //pagination 될때마다 데이터 바꿔서 검색
    const [searchData, setSearchData] = useState({
        user_nm: null,
        customer_id: null,
        work_flag_id: null,
        work_content_id: null,
        work_type_id: null,
        searchStartDate: null,
        searchEndDate: null,
        page: 1,
        itemsPerPage: 10,
    })

    const [record, setRecord] = useState({})
    const [flag, setFlag] = useState('')

    useEffect(() => {
        // console.log("history 가져오기")

        try {
            // const { data, status } = lookupHistory(searchData)
            lookupHistory(searchData).then((res) => {
                const { history, total } = res.data

                setData(history)

                setTotal(total)

                // console.log("check data", history);

            })
        } catch (err) {
            console.error(err)
            // return Promise.reject(err)
        }

    }, [searchData, open])


    const onChange = (pageNumber) => {
        setSearchData({ page: pageNumber.current, itemsPerPage: 10 })
    }

    const openDialog = (flag, record) => {
        // console.log("open dialog")
        setFlag(flag)

        if (flag === 'update') {
            setRecord({ ...record })


        } else {
            setRecord({
                customer_id: "",
                customer_nm: "",
                move_time_min: 0,
                solution_id: "",
                solution_nm: "",
                user_nm: "",
                work_content: "",
                work_content_detail: "",
                work_content_id: "",
                // work_date: "",
                work_flag: "",
                work_flag_id: "",
                work_hist_id: "",
                work_time_min: 0,
                work_type: "",
                work_type_id: ""
            })
        }

        setOpen(true)

        // console.log(flag)
        console.log("record when opening dialog. ", record)

    }

    const openSearchArea = () => {

        setSearchOpen(!searchOpen)
        console.log(searchOpen)
    }

    return (
        <>
            <Row >
                <Col className="gutter-row" span={6}>
                    <Title level={2}>업무 수행 내역</Title>
                </Col>
                <Col className="gutter-row" span={12}>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Button type="primary" style={{ width: '100px', height: '30px', margin: '10px' }} onClick={() => openDialog('create', {})}>내역 추가</Button>
                    <Dialog open={open} setOpen={setOpen} record={record} setRecord={setRecord} flag={flag} setFlag={setFlag}>
                    </Dialog>

                    <Button type="default" style={{ width: '100px', height: '30px', margin: '10px' }} onClick={openSearchArea}>검색 조건</Button>


                </Col>
            </Row>
            <SearchArea searchOpen={searchOpen} setSearchOpen={setSearchOpen} ></SearchArea>

            <Divider orientation="left"></Divider>
            <Table
                columns={headers}
                dataSource={data}
                showHeader={true}
                pagination={{
                    total: total,
                    pageSize: 10,
                    hideOnSinglePage: false,

                }}
                onChange={onChange}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            // console.log(record);    //row data
                            openDialog('update', record)
                        }
                    }
                }}
            // onRow
            >
            </Table>


        </>

    );
}
