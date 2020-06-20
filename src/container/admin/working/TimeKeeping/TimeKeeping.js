import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Col, Row, DatePicker, Input, Avatar, Dropdown, Menu,
} from 'antd';
import {
  FilterTwoTone, ReloadOutlined, LoadingOutlined, DownloadOutlined, SearchOutlined, PlusOutlined, EllipsisOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getFilterObject, getAvatarTextFromName } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getArrayDatesOfWeek, getArrayDatesOfMonth, getDateFormatForTimeKeeping } from '../../../../util/date';
import { Select } from 'antd';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import * as departmentAction from '../../../../action/departmentAction';
import * as timeKeepingAction from '../../../../action/timeKeepingAction';
import DoTimeKeepingModal from '../../../../component/modal/DoTimeKeepingModal/DoTimeKeepingModal';
import TimeKeepingDot from '../../../../component/common/TimeKeepingDot/TimeKeepingDot';
import { timeKeepingColors } from '../../../../constant/colors';

class TimeKeeping extends Component {

  constructor(props) {
    super(props);
    const currentDate = moment();
    const days = getArrayDatesOfWeek(currentDate);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      selectedRowKeys: [],
      columns: this.getColumns(days, {}, {}),
      displayFilter: true,
      days,
      type: 'week',
      pickerFormat: 'Tuần w-YYYY',
      doTimeKeeping: {
        visible: false,
        personnel: null,
        day: null,
      },
    };
  }

  componentDidMount() {
    this.props.findManyDepartments();

    this.props.findTimeKeeping({
      dates: this.state.days.map(date => moment(date).format('YYYY-MM-DD')) + ''
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleted, ids, timeKeepingView } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
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

    if (timeKeepingView && timeKeepingView !== prevProps.timeKeepingView) {
      // const pagination = { ...this.state.pagination, total: totalElements };

      this.setState({
        data: timeKeepingView,
        // pagination,
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
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

  menu = (
    <Menu id='timekeeping-options'>
      <Menu.Item className='menu-item'>
        Tạo yêu cầu nghỉ phép
      </Menu.Item>
      <Menu.Item className='menu-item'>
        <span style={{ color: '#e15258' }}>Xóa</span>
      </Menu.Item>
    </Menu>
  );

  // filteredInfo, sortedInfo from state
  getColumns = (days) => {

    let firstColumn = {
      title: () => {
        return (<Input placeholder='Tìm kiếm' className='input-search-personnel' prefix={<SearchOutlined />} />);
      },
      width: 200,
      key: 'blank',
      dataIndex: ['personnel', 'fullName'],
      render: (fullName, record) => {
        const color = '#cccccc';
        const backgroundColor = '#e6f7fe';
        const avatar = record?.personnel?.avatar;
        const avatarComp = avatar ?
          (<Avatar size={30} src={avatar} />) :
          (<Avatar style={{ color, backgroundColor }} size={30}>{getAvatarTextFromName(fullName)}</Avatar>);

        return (
          <div>
            {avatarComp}
            <span style={{ marginLeft: 6 }}>{fullName}</span>
          </div>
        )
      },
    };

    const columns = days.map((day, index) => {
      return {
        title: () => {
          if (days.length === 7) {
            return (<div>{getDateFormatForTimeKeeping(day, 'week')}</div>);
          }
          if (days.length > 7) {
            const tmp = getDateFormatForTimeKeeping(day, 'month').split(' ');
            const dayOfWeek = tmp[0];
            const dayOfMonth = tmp[1];

            return (
              <div>
                <div>{dayOfWeek}</div>
                <div>{dayOfMonth}</div>
              </div>
            );
          }
          return null;
        },
        dataIndex: 'id',
        key: index,
        render: (text, record, index) => (
          <div className='timekeeping-day'>
            <div className='content'>
              <div className='keeping-status'></div>
            </div>
            <div className='overlay'>
              <Button onClick={() => this.showTimeKeepingModal(record, day)} icon={<PlusOutlined />} />
              <Dropdown trigger='click' overlay={this.menu} placement='topLeft'>
                <Button icon={<EllipsisOutlined />} />
              </Dropdown>
            </div>
          </div>
        ),
      }
    })

    return [firstColumn].concat(columns);
  };

  onDatePickerChange = (date) => {
    const { type } = this.state;
    if (type === 'week') {
      this.props.findManyPersonnel();

      const days = getArrayDatesOfWeek(date);
      this.setState({ days, columns: this.getColumns(days) });
    }

    if (type === 'month') {
      this.props.findManyPersonnel();

      const days = getArrayDatesOfMonth(date);
      this.setState({ days, columns: this.getColumns(days) });
    }
  }

  onChangeType = (value) => {
    this.setState({ type: value });

    if (value === 'week') {
      this.props.findManyPersonnel();

      const days = getArrayDatesOfWeek(moment());

      this.setState({ days, pickerFormat: 'Tuần w-YYYY', columns: this.getColumns(days) });
    }

    if (value === 'month') {
      this.props.findManyPersonnel();

      this.setState({
        displayFilter: false,
      });

      const days = getArrayDatesOfMonth(moment());
      this.setState({ days, pickerFormat: 'TM-YYYY', columns: this.getColumns(days) });
    }
  }

  onToggleDisplayFilter = () => {
    const { displayFilter } = this.state;

    this.setState({ displayFilter: !displayFilter });
  }

  showTimeKeepingModal = (record, day) => {
    this.setState({
      doTimeKeeping: {
        visible: true,
        personnel: record,
        day,
      },
    });
  }

  refreshData = () => {
    this.props.findManyPersonnel();
  }

  onCancelDoTimeKeepingModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        day: null,
      },
    });
  }

  onOkDoTimeKeepingModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        day: null,
      },
    });
  }

  render() {
    const { data, selectedRowKeys, displayFilter, doTimeKeeping, days } = this.state;
    const { visible, personnel, day } = doTimeKeeping;
    const { isLoading, departments = [] } = this.props;

    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo, type, pickerFormat, columns } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const departmentOptions = departments.map(({ id, name }) => ({ label: name, value: id }));

    // columns with filteredInfo and sortedInfo
    columns = this.getColumns(days, filteredInfo, sortedInfo);

    return (
      <>
        <Helmet>
          <title>Bảng chấm công</title>
        </Helmet>
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
              <Select defaultValue='week' style={{ top: -2, width: 150 }} onChange={this.onChangeType}>
                <Select.Option value='week'>Theo tuần</Select.Option>
                <Select.Option value='month'>Theo tháng</Select.Option>
              </Select>
            </Col>
            <Col md={{ span: 12 }}
              className='actions-right'
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
              <Button style={{ marginRight: '2px', fontSize: 13, top: -1 }} type='default' icon={<DownloadOutlined />}>
                Excel
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
            <Select
              className='timekeeping-select-department'
              placeholder='Phòng ban'
              style={{
                top: -1,
                width: '100%',
                marginBottom: 4,
              }}
              options={departmentOptions}
              showSearch
              optionFilterProp='children'
              filterOption={(input, option) => {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            >
            </Select>
            <Button
              onClick={this.clearFiltersAndSorters}
              disabled={
                checkIsEmptyObj(filteredInfo || checkIsEmptyObj(sortedInfo))
                || checkIsEmptyObj(filteredInfo) || !sortedInfo.order
              }
            >
              Bỏ lọc
            </Button>
            <Button
              type='primary'
              className='btn-apply'
            >
              Áp dụng
            </Button>
            <div className='note'>
              {
                Object.keys(timeKeepingColors).map(key => (
                  <div className='note-item'>
                    <TimeKeepingDot dotColor={timeKeepingColors[key]} /><span>{key}</span>
                  </div>
                ))
              }
            </div>
          </div>
          <Table
            className={`TimeKeepingTable TimeKeepingTable-${type}`}
            style={{ fontSize: '13px', width: '100%' }}
            locale={{
              emptyText: (
                <div style={{ padding: '40px 0' }}>
                  {isLoading === true ? 'Đang tải dữ liệu' : 'Không tìm thấy dữ liệu'}
                </div>
              ),
            }}
            bordered
            components={this.components}
            onRow={this.onRow}
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={false}
            loading={{
              spinning: isLoading,
              indicator: (<LoadingOutlined />),
            }}
            onChange={this.handleTableChange}
            scroll={{ x: 'max-content' }}
          />
        </div>
        <DoTimeKeepingModal
          visible={visible}
          personnel={personnel}
          day={day}
          onCancel={this.onCancelDoTimeKeepingModal}
          onOk={this.onOkDoTimeKeepingModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ timeKeeping, department }) => {
  const { timeKeepingList } = timeKeeping;
  const { departmentList, } = department;

  return {
    ...timeKeepingList,
    departments: departmentList.dataList.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyDepartments: () => dispatch(departmentAction.findManyDepartments()),
    findTimeKeeping: (params) => dispatch(timeKeepingAction.findTimeKeeping(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeKeeping);
