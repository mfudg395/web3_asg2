import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';

const PlayFilter = (props) => {

    const [filterTitle, updateFilterTitle] = useState("");
    const [filterBeforeYear, updateFilterBeforeYear] = useState("");
    const [filterAfterYear, updateFilterAfterYear] = useState("");
    const [filterGenre, updateFilterGenre] = useState("");

    /**
     * Called when the Filter button is clicked. Before the playResults array
     * is filtered, the years are checked to ensure that they are numbers.
     */
    const processFilter = () => {
        if ((filterBeforeYear !== "" && isNaN(filterBeforeYear)) ||
            (filterAfterYear !== "" && isNaN(filterAfterYear))) {
            alert("Please put a valid year for the year filters.");
            return;
        }
        props.filterPlays(filterTitle, filterBeforeYear, filterAfterYear, filterGenre);
    }

    /**
     * all plays in the PlayList. Because of how filterPlays behaves, a blank
     * string is essentially a "no filter" option for each field, which is why
     * that's the only thing we have to pass to reset the plays.
     */
    const clearFilter = () => {
        props.filterPlays("", "", "", "");
    }

    /**
     * This method is called each time a field in the Filters menu changes. It
     * updates the appropriate state value based on the field that was edited.
     */
    const handleChange = (e) => {
        if (e.currentTarget.name === "title-filter")
            updateFilterTitle(e.currentTarget.value);
        else if (e.currentTarget.name === "before-year-filter")
            updateFilterBeforeYear(e.currentTarget.value);
        else if (e.currentTarget.name === "after-year-filter")
            updateFilterAfterYear(e.currentTarget.value);
    }

    return (
        <div className="filter">
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item label="Title">
                    <Input name="title-filter" onChange={handleChange} class="filter-input" />
                </Form.Item>
                <Form.Item label="Before">
                    <Input name="before-year-filter" onChange={handleChange} className="filter-input" />
                </Form.Item>
                <Form.Item label="After">
                    <Input name="after-year-filter" onChange={handleChange} className="filter-input" />
                </Form.Item>
                <Form.Item label="Genre">
                    <Select name="genre-filter" defaultValue="" className="filter-input" onChange={(value) => {
                        updateFilterGenre(value);
                    }}>
                        <Select.Option value=""></Select.Option>
                        <Select.Option value="comedy">Comedy</Select.Option>
                        <Select.Option value="tragedy">Tragedy</Select.Option>
                        <Select.Option value="history">History</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" class="filter-button" onClick={processFilter}>Filter</Button><Button class="clear-filter-button" onClick={clearFilter}>Clear</Button>
                </Form.Item>
            </Form>




            {/* <h2>Filters</h2>
            <br/>
            <label htmlFor="title-filter" className="filter-label">Title:</label>
            {/* <input type="text" name="title-filter" className="filter-input" onChange={handleChange}></input> */}
            {/* <Input name="title-filter" size="small" onChange={handleChange}/> */}

            {/* <label htmlFor="before-year-filter" className="filter-label">Before year:</label> */}
            {/* <input type="text" name="before-year-filter" className="filter-input" onChange={handleChange}></input> */}
            {/* <Input name="before-year-filter" size="small" onChange={handleChange}/> */}

            {/* <label htmlFor="after-year-filter" className="filter-label">After year:</label> */}
            {/* <input type="text" name="after-year-filter" className="filter-input" onChange={handleChange}></input> */}
            {/* <Input name="after-year-filter" size="small" onChange={handleChange}/> */}

            {/* <label htmlFor="genre-filter" className="filter-label">Genre:</label> */}
            {/* <select name="genre-filter" defaultValue="none" className="filter-input" onChange={handleChange}>
                <option value=""></option>
                <option value="comedy">Comedy</option>
                <option value="tragedy">Tragedy</option>
                <option value="history">History</option>
            </select> */}
            {/**The only way to access the Select value with ant-design is to pass it into the onChange event,
             * which is why it has a different onChange implementation than the other inputs.
             */}
            {/* <Select name="genre-filter" defaultValue="" onChange={(value) => { */}
            {/* updateFilterGenre(value); */}
            {/* }}> */}
            {/* <Option value=""></Option>
                <Option value="comedy">Comedy</Option>
                <Option value="tragedy">Tragedy</Option> */}
            {/* <Option value="history">History</Option>
            </Select> */}

            {/* <button className="filter-button" onClick={processFilter}>Filter</button>
            <button className="clear-filter-button" onClick={clearFilter}>Clear</button> */}
            {/* <Space align="end">
                <Button type="primary" size="large" className="filter-button" onClick={processFilter}>Filter</Button>
                <Button type="primary" size="large" className="clear-filter-button" onClick={clearFilter}>Clear</Button>
            </Space> */}
        </div>
    )
}
export default PlayFilter;