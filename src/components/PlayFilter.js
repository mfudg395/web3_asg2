import React, { useState } from 'react';
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
                    <Input name="title-filter" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Before">
                    <Input name="before-year-filter" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="After">
                    <Input name="after-year-filter" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Genre">
                    <Select name="genre-filter" defaultValue="" onChange={(value) => {
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
        </div>
    )
}
export default PlayFilter;