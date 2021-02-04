import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { AutoComplete } from 'antd';
import { searchOption } from '../api/history'
import { workType, customer, solutions, workFlag, workContent } from '../searchOptions.js'

const SearchArea = () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const formatting = customer.map(cus => {
            const customervalue = cus.customer_nm
            cus.value = customervalue
            return cus
        })
        // console.log(formatting)
        // setOptions(formatting)
    })


    const onSearch = (searchText) => {
        console.log('onSearch', searchText)
    };

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    return (
        <div>
            <Row>
                <Col>
                    <AutoComplete
                        options={options}
                        style={{
                            width: 200,
                        }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        placeholder="input here"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default SearchArea;