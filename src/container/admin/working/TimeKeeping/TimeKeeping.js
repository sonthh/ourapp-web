import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Popconfirm, Typography, Checkbox, Space, Breadcrumb, Divider, Col, Row, DatePicker, Input,
} from 'antd';
import {
  DeleteOutlined, DeleteTwoTone, MailTwoTone, FilterTwoTone, UsergroupAddOutlined, UnorderedListOutlined,
  EditTwoTone, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined, UserDeleteOutlined, DownloadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat, getArrayDatesOfWeek, getArrayDatesOfMonth, getDateFormatForTimeKeeping } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import GenderTag from '../../../../component/common/GenderTag';
import StatusTag from '../../../../component/common/StatusTag';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import MyAvatar from '../../../../component/common/MyAvatar';
import * as personnelAction from '../../../../action/personnelAction';
import { Link, NavLink } from 'react-router-dom';
import { Select } from 'antd';
import moment from 'moment';

const { Option } = Select;
const Paragraph = Typography.Paragraph;
const { Title, Text } = Typography
class TimeKeeping extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;
    const currentDate = moment();
    const days = getArrayDatesOfWeek(currentDate);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} personnel`,
        showQuickJumper: true,
      },
      selectedRowKeys: [],
      columns: this.getColumns(days, {}, {}),
      isColumnsFixed,
      displayFilter: false,
      days,
      type: 'week',
      pickerFormat: 'Tuần w-YYYY',
    };
  }

  componentDidMount() {
    // this.props.findManyPersonnel({});
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleted, ids, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Notification',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeleted !== undefined && isDeleted === true && ids !== prevProps.ids) {
      const { ids } = this.props;
      const description = `Deleted ${ids.length} user${ids.length > 1 ? 's' : ''}`;

      notification.success({
        message: 'SUCCESS',
        description,
        duration: 2.5,
      });

      this.setState({ selectedRowKeys: [] });
    }

    if (dataList && dataList !== prevProps.dataList) {
      const { content, totalElements } = dataList;
      const pagination = { ...this.state.pagination, total: totalElements };

      this.setState({
        data: content,
        pagination,
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log(filters, sorter);

    const { current } = pagination;

    this.setState({
      pagination: { ...this.state.pagination, current },
      filteredInfo: filters,
      sortedInfo: sorter,
    });

    this.fetchPersonnel(pagination, filters, sorter);
  };

  fetchPersonnel = (pagination, filters, sorter) => {

    filters = getFilterObject(
      ['gender', 'username', 'createdBy', 'lastModifiedBy', 'address', 'status',
        'email', 'identification', 'phoneNumber', 'fullName', 'position', 'degree', 'department', 'branch'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current, pageSize } = pagination;

    this.props.findManyPersonnel({
      currentPage: current,
      limit: pageSize,
      sortBy,
      sortDirection,
      ...filters,
    });
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onDeleteMany = () => {
    // const { selectedRowKeys } = this.state;
    // this.props.deleteManyUsers(selectedRowKeys);
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
    const { pagination, sortedInfo } = this.state;
    this.fetchPersonnel(pagination, null, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchPersonnel(pagination, filteredInfo, null);
  };

  refreshData = () => {
    // const { pagination, filteredInfo, sortedInfo } = this.state;
    // this.fetchPersonnel(pagination, filteredInfo, sortedInfo)
  }

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchPersonnel(pagination, null, null);
  };

  clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  }

  // filteredInfo, sortedInfo from state
  getColumns = (days, filteredInfo, sortedInfo) => {
    let firstColumn = [
      {
        title: null,
        key: 'blank',
        render: (data, record) => (
          <div>Search</div>
        ),
      }
    ];

    const columns = days.map((day, index) => {
      return {
        title: days.length === 7 ? getDateFormatForTimeKeeping(day, 'week') : getDateFormatForTimeKeeping(day, 'month'),
        // dataIndex: '',
        key: index,
        // width: 160,
        // minWidth: 160,
        render: (data, record) => (
          <div>Hello</div>
        ),
      }
    })

    return [firstColumn, ...columns];
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  onChangeColumnsFixed = (e) => {
    const isColumnsFixed = e.target.checked;
    this.setState({
      isColumnsFixed,
    });

    localStorage.setItem('isColumnsFixed', isColumnsFixed);
  }

  onClickToggleFixed = () => {
    this.setState({
      isColumnsFixed: !this.state.isColumnsFixed,
    });
  }

  onRow = (record) => ({
    onDoubleClick: () => {
      let { selectedRowKeys } = this.state;
      const { id } = record;

      const index = selectedRowKeys.indexOf(id);

      if (index > -1) {
        selectedRowKeys.splice(index, 1);
        selectedRowKeys = [...selectedRowKeys];
      } else {
        selectedRowKeys = [...selectedRowKeys, id];
      }

      this.setState({ selectedRowKeys })
    },
  })

  onToggleDisplayFilter = () => {
    this.setState({
      displayFilter: !this.state.displayFilter,
    });
  }

  onDatePickerChange = (date, dateString) => {
    const { type } = this.state;
    if (type === 'week') {
      const days = getArrayDatesOfWeek(date);
      this.setState({ days });
    }

    if (type === 'month') {
      const days = getArrayDatesOfMonth(date);
      this.setState({ days });
    }
  }

  onChangeType = (value) => {
    this.setState({ type: value });

    if (value === 'week') {
      const days = getArrayDatesOfWeek(moment());
      this.setState({ days, pickerFormat: 'Tuần w-YYYY' });
    }

    if (value === 'month') {
      const days = getArrayDatesOfMonth(moment());
      this.setState({ days, pickerFormat: 'TM-YYYY' });
    }
  }

  render() {
    const { data, pagination, selectedRowKeys, displayFilter } = this.state;
    const { isLoading } = this.props;

    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo, days, type, pickerFormat } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    // columns with filteredInfo and sortedInfo
    const columns = this.getColumns(days, filteredInfo, sortedInfo);

    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Row justify='space-between'>
            <Col span={24} md={{ span: 12 }}>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.onToggleDisplayFilter}
                icon={<FilterTwoTone />}>
              </Button>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.refreshData}
                icon={<ReloadOutlined />}>
              </Button>
              <DatePicker
                style={{
                  width: 200,
                  top: -1,
                  marginRight: 2,
                }}
                defaultValue={moment()}
                format={pickerFormat}
                onChange={this.onDatePickerChange}
                picker={type} />
              <Select defaultValue='week' style={{ top: -1, width: 150 }} onChange={this.onChangeType}>
                <Select.Option value='week'>Theo tuần</Select.Option>
                <Select.Option value='month'>Theo tháng</Select.Option>
              </Select>
            </Col>
            <Col md={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
              <Button style={{ marginRight: '2px' }} type='default' icon={<DownloadOutlined />}>
                Xuất excel
              </Button>
            </Col>
          </Row>
        </div>
        <div className='filter-table-wrapper'>
          <div
            style={{
              width: 210,
              paddingTop: 1,
            }}
            className={`filter-wrapper ${displayFilter ? '' : 'd-none'}`} >
            <Select defaultValue='1'
              style={{
                top: -1,
                width: 200,
                marginBottom: 4,
              }}>
              <Select.Option value='1'>Phòng IT</Select.Option>
              <Select.Option value='2'>Phòng Nhân sự</Select.Option>
              <Select.Option value='3'>Phòng Kỹ thuật</Select.Option>
            </Select>
            <Button
              onClick={this.clearFiltersAndSorters}
              disabled={
                checkIsEmptyObj(filteredInfo || checkIsEmptyObj(sortedInfo))
                || checkIsEmptyObj(filteredInfo) || !sortedInfo.order
              }
            >
              Reset
            </Button>
            <Button
              type='primary'
              style={{
                textAlign: 'center !important'
              }}
            >
              Áp dụng
            </Button>
          </div>
          <Table
            className={`TimeKeepingTable TimeKeepingTable-${type}`}
            style={{ fontSize: '13px', width: '100%' }}
            bordered
            components={this.components}
            onRow={this.onRow}
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={{
              spinning: isLoading,
              indicator: (<LoadingOutlined />),
            }}
            onChange={this.handleTableChange}
          // scroll={{ x: 'max-content' }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ personnel }) => {
  const { personnelList } = personnel;
  return { ...personnelList };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeKeeping);
