import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Col, Row, DatePicker, Input, Avatar, Dropdown, Menu, message,
} from 'antd';
import {
  FilterTwoTone, ReloadOutlined, LoadingOutlined, DownloadOutlined, SearchOutlined, PlusOutlined, EllipsisOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAvatarTextFromName } from '../../../../util/get';
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
import FileSaver from 'file-saver';
import ExcelProgressModal from '../../../../component/modal/ExcelProgressModal/ExcelProgressModal';
import CreateRequestModal from '../../../../component/modal/CreateRequestModal/CreateRequestModal';

class TimeKeeping extends Component {

  constructor(props) {
    super(props);

    const currentDate = moment();
    const dates = getArrayDatesOfWeek(currentDate);

    this.messageLoadingKey = '111111111111';

    this.state = {
      filteredInfo: {
        departmentId: null,
        fullName: null,
      },
      sortedInfo: null,
      data: [],
      columns: this.getColumns(dates, {}, {}),
      displayFilter: true,
      dates,
      type: 'week',
      pickerFormat: 'Tuần w-YYYY',
      doTimeKeeping: {
        visible: false,
        record: null,
        date: null,
      },
      displayExcelDownload: false,
      visibleCreateRequest: false,
    };
  }

  componentDidMount() {
    this.props.findManyDepartments();

    let { dates, filteredInfo } = this.state;
    this.fetchTimeKeeping(filteredInfo, dates);
  }

  fetchTimeKeeping = (filteredInfo, dates) => {
    this.props.findTimeKeeping({
      dates: dates.map(date => moment(date).format('YYYY-MM-DD')) + '',
      ...filteredInfo,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleting, timeKeepingView } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeleting !== undefined && isDeleting !== prevProps.isDeleting) {
      if (isDeleting) {
        message.loading({ content: 'Đang xóa...', key: this.messageLoadingKey });
      }
      if (!isDeleting) {
        message.success({ content: 'Xóa xong', key: this.messageLoadingKey, duration: 0.4 });
      }
    }

    if (timeKeepingView && timeKeepingView !== prevProps.timeKeepingView) {
      this.setState({
        data: timeKeepingView,
      });
    }
  }

  onDeleteTimeKeeping = (indexRecord, indexDate, record) => {
    if (!record || !record.personnel || !record.timeKeepingList || !record.timeKeepingList[indexDate])
      return;

    this.props.deleteTimeKeeping(indexRecord, indexDate, record.personnel.id, record.timeKeepingList[indexDate].id);
  }

  getColumns = (dates) => {

    let firstColumn = {
      title: () => {
        return (<Input.Search onSearch={this.onSearchByFullName} placeholder='Tìm kiếm' className='input-search-personnel' prefix={<SearchOutlined />} />);
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

    const columns = dates.map((date, indexDate) => {
      return {
        title: () => {
          if (dates.length === 7) {
            return (<div>{getDateFormatForTimeKeeping(date, 'week')}</div>);
          }
          if (dates.length > 7) {
            const tmp = getDateFormatForTimeKeeping(date, 'month').split(' ');
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
        key: 'date',
        render: (text, record, indexRecord) => {
          const timeKeeping = record.timeKeepingList[indexDate];
          let status = timeKeeping?.status;

          if (status === 'Nghỉ phép' && timeKeeping && timeKeeping.request) {
            if (timeKeeping.request.status === 'Chấp thuận') {
              status = 'Nghỉ phép';
            } else {
              status = 'Chờ chấp nhận nghỉ phép';
            }
          }

          if (!status) {
            const check = moment() > moment(date);
            status = check === true ? 'Không chấm công' : 'Chưa đến ca';
          }

          const menu = (
            <Menu id='timekeeping-options'>
              <Menu.Item
                disabled={timeKeeping && timeKeeping.request !== null}
                className='menu-item'
                onClick={() => this.showCreateRequestModal(indexRecord, indexDate, record, date)}
              >
                Tạo yêu cầu nghỉ phép
              </Menu.Item>
              <Menu.Item
                disabled={timeKeeping === null}
                className='menu-item'
                onClick={() => this.onDeleteTimeKeeping(indexRecord, indexDate, record)}
              >
                <span style={{ color: '#e15258' }}>Xóa</span>
              </Menu.Item>
            </Menu>
          );

          return (
            <div className='timekeeping-day'>
              <div className='content'>
                <TimeKeepingDot dotColor={timeKeepingColors[status]} />
              </div>
              <div className='overlay'>
                <Button
                  onClick={() => this.showTimeKeepingModal(indexRecord, indexDate, record, date)}
                  icon={<PlusOutlined />}
                />
                <Dropdown trigger='click' overlay={menu} placement='topLeft'>
                  <Button icon={<EllipsisOutlined />} />
                </Dropdown>
              </div>
            </div>
          )
        },
      }
    })

    return [firstColumn].concat(columns);
  };

  onDatePickerChange = (date, dateString) => {
    const { type } = this.state;

    if (type === 'week') {
      const dates = getArrayDatesOfWeek(date);
      let { filteredInfo } = this.state;

      this.setState({ dates, columns: this.getColumns(dates) });

      this.fetchTimeKeeping(filteredInfo, dates);
    }

    if (type === 'month') {
      const dates = getArrayDatesOfMonth(date);
      const { filteredInfo } = this.state;

      this.setState({ dates, columns: this.getColumns(dates) });
      this.fetchTimeKeeping(filteredInfo, dates);
    }
  }

  onChangeType = (type) => {
    this.setState({ type });

    if (type === 'week') {
      const dates = getArrayDatesOfWeek(moment());
      let { filteredInfo } = this.state;

      this.setState({ dates, pickerFormat: 'Tuần w-YYYY', columns: this.getColumns(dates), displayFilter: true });
      this.fetchTimeKeeping(filteredInfo, dates);
    }

    if (type === 'month') {
      const dates = getArrayDatesOfMonth(moment());
      const { filteredInfo } = this.state;

      this.setState({ dates, pickerFormat: 'TM-YYYY', columns: this.getColumns(dates), displayFilter: false });
      this.fetchTimeKeeping(filteredInfo, dates);
    }
  }

  onChangeDepartment = (departmentId) => {
    let { dates, filteredInfo } = this.state;
    filteredInfo = { ...filteredInfo, departmentId };

    this.setState({ filteredInfo });

    this.fetchTimeKeeping(filteredInfo, dates);
  }

  onSearchByFullName = (fullName) => {
    if (fullName.trim() === '') {
      fullName = null;
    }

    let { dates, filteredInfo } = this.state;
    filteredInfo = { ...filteredInfo, fullName };

    this.setState({ filteredInfo });

    this.fetchTimeKeeping(filteredInfo, dates);
  }

  onToggleDisplayFilter = () => {
    const { displayFilter } = this.state;

    this.setState({ displayFilter: !displayFilter });
  }

  showTimeKeepingModal = (indexRecord, indexDate, record, date) => {
    this.setState({
      doTimeKeeping: {
        indexRecord,
        indexDate,
        visible: true,
        record,
        date,
      },
    });
  }

  showCreateRequestModal = (indexRecord, indexDate, record, date) => {
    this.setState({
      doTimeKeeping: {
        indexRecord,
        indexDate,
        record,
        date,
      },
      visibleCreateRequest: true,
    });
  }

  refreshData = () => {
    const { filteredInfo, dates } = this.state;

    this.fetchTimeKeeping(filteredInfo, dates);
  }

  onCancelDoTimeKeepingModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        date: null,
      },
    });
  }

  onCancelCreateRequestModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        date: null,
      },
      visibleCreateRequest: false,
    });
  }

  onOkCreateRequestModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        date: null,
      },
      visibleCreateRequest: false,
    });
  }

  onOkDoTimeKeepingModal = () => {
    this.setState({
      doTimeKeeping: {
        visible: false,
        personnel: null,
        date: null,
      },
    });
  }

  onExportExcel = () => {
    let { filteredInfo, dates } = this.state;
    this.props.exportExcel({
      dates: dates.map(date => moment(date).format('YYYY-MM-DD')) + '',
      ...filteredInfo,
    });

    this.setState({ displayExcelDownload: true });
  }

  saveExcelToClient = () => {
    const { fileData } = this.props;

    if (!fileData) return;

    const blob = new Blob([fileData]);
    FileSaver.saveAs(blob, 'BangChamCong.xlsx');
  }

  closeExcelDownload = () => {
    this.setState({ displayExcelDownload: false });
  }

  render() {
    const { data, displayFilter, doTimeKeeping, dates, displayExcelDownload, visibleCreateRequest } = this.state;
    const { visible, record, date, indexRecord, indexDate } = doTimeKeeping;
    const { isLoading, departments = [], isExporting } = this.props;

    let { sortedInfo, filteredInfo, type, pickerFormat, columns } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const departmentOptions = [{ label: 'Tất cả phòng', value: null }]
      .concat(departments.map(({ id, name }) => ({ label: name, value: id })));

    columns = this.getColumns(dates, filteredInfo, sortedInfo);

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
              <Button
                style={{ marginRight: '2px', fontSize: 13, top: -1 }}
                type='default' icon={<DownloadOutlined />}
                onClick={this.onExportExcel}
              >
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
              value={filteredInfo.departmentId}
              className='timekeeping-select-department'
              placeholder='Phòng ban'
              style={{
                top: -1,
                width: '100%',
                marginBottom: 4,
              }}
              onChange={this.onChangeDepartment}
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
                  <div className='note-item' key={key}>
                    <TimeKeepingDot style={{ marginRight: '6px' }} dotColor={timeKeepingColors[key]} /><span>{key}</span>
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
          record={record}
          date={date}
          indexRecord={indexRecord}
          indexDate={indexDate}
          onCancel={this.onCancelDoTimeKeepingModal}
          onOk={this.onOkDoTimeKeepingModal}
        />
        <ExcelProgressModal
          title='Bạn đang xuất dữ liệu chấm công'
          visible={displayExcelDownload}
          onClose={this.closeExcelDownload}
          onOk={this.saveExcelToClient}
          isExporting={isExporting}
        />
        <CreateRequestModal
          visible={visibleCreateRequest}
          record={record}
          date={date}
          indexRecord={indexRecord}
          indexDate={indexDate}
          onCancel={this.onCancelCreateRequestModal}
          onOk={this.onOkCreateRequestModal}
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
    deleteTimeKeeping: (indexRecord, indexDate, personnelId, timeKeepingId) => dispatch(timeKeepingAction.deleteTimeKeeping(indexRecord, indexDate, personnelId, timeKeepingId)),
    exportExcel: (params) => dispatch(timeKeepingAction.exportExcel(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeKeeping);
