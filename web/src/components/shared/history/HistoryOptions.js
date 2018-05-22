import React, { Component } from 'react';

import { red500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'
import DatePicker from 'material-ui/DatePicker'

import { FILTER_SORT_ORDER_OPTIONS, FILTER_LIMIT_OPTIONS } from '../../../constants'

const styles = {
    order: {
        width: 150,
        marginRight: 5,
    },
    limit: {
        width: 75,
        marginRight: 5,
    },
    routine: {
        width: 300,
        marginRight: 5,
    },
    routineClearIcon: {
        width: 18,
        height: 18,
        color: red500,
        cursor: 'pointer',
        marginBottom: 15,
        marginRight: 10,
    },
    dateWrapper: {
        marginBottom: -15,
        display: 'inline-block',
    },
    date: {
        display: 'inline-block',
        position: 'relative',
        top: -15,
    },
    dateField: {
        width: 100,
        marginRight: 5,
        cursor: 'pointer',
    },
}

class HistoryOptions extends Component {
    handleChange = (filter, event, index, value) => {
        if (!this.props.disabled) {
            this.props.onChange({ ...this.props.filters, [filter]: value });
        }
    }

    handleRoutineFilterClearClick = () => {
        let filters = { ...this.props.filters };
        delete filters.routineId;

        this.props.onChange(filters);
    }

    render() {
        return (
            <div>
                <div style={styles.dateWrapper}>
                    <DatePicker 
                        floatingLabelText="From"
                        hintText="From" 
                        firstDayOfWeek={0}
                        defaultDate={new Date(this.props.filters.fromDate)}
                        maxDate={new Date(this.props.filters.toDate)}
                        disabled={this.props.disabled}
                        style={styles.date}
                        textFieldStyle={styles.dateField}
                        onChange={(a, date) => this.handleChange('fromDate', undefined, undefined, date.getTime())}
                    />
                    <DatePicker 
                        floatingLabelText="To"
                        hintText="To" 
                        firstDayOfWeek={0}
                        defaultDate={new Date(this.props.filters.toDate)}
                        minDate={new Date(this.props.filters.fromDate)}
                        disabled={this.props.disabled}
                        style={styles.date}
                        textFieldStyle={styles.dateField}
                        onChange={(a, date) => this.handleChange('toDate', undefined, undefined, date.getTime())}
                    />
                </div>
                <SelectField 
                    floatingLabelText={'Filter By'}
                    style={styles.routine} 
                    value={this.props.filters.routineId} 
                    onChange={(event, index, value) => this.handleChange('routineId', event, index, value)}
                    disabled={this.props.disabled}
                >
                    {this.props.routines.map((r, index) => 
                        <MenuItem 
                            key={index} 
                            value={r.id} 
                            primaryText={r.name} 
                        />                    
                    )}
                </SelectField>
                {this.props.filters.routineId !== undefined ? 
                    <NavigationCancel style={styles.routineClearIcon} onClick={this.handleRoutineFilterClearClick}/>
                : '' }
                <SelectField 
                    floatingLabelText="Sort By"
                    style={styles.order} 
                    value={FILTER_SORT_ORDER_OPTIONS.find(o => o.value.toLowerCase() === this.props.filters.order.toLowerCase()).value} 
                    onChange={(event, index, value) => this.handleChange('order', event, index, value)}
                    disabled={this.props.disabled}
                >
                    {FILTER_SORT_ORDER_OPTIONS.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o.value} 
                            primaryText={o.caption} 
                        />                    
                    )}
                </SelectField>
                <SelectField 
                    floatingLabelText="Per Page"
                    style={styles.limit} 
                    value={this.props.filters.limit} 
                    onChange={(event, index, value) => this.handleChange('limit', event, index, value)}
                    disabled={this.props.disabled}
                >
                    {FILTER_LIMIT_OPTIONS.map((o, index) => 
                        <MenuItem 
                            key={index} 
                            value={o.value} 
                            primaryText={o.caption} 
                        />                    
                    )}
                </SelectField>
            </div>
        )
    }
}

export default HistoryOptions