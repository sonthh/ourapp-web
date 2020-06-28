import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Col, Row, DatePicker, message
} from 'antd';
import {
  FilterTwoTone, ReloadOutlined, LoadingOutlined, DownloadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getArrayDatesOfWeek, getArrayDatesOfMonth } from '../../../../util/date';
import { Select } from 'antd';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import * as departmentAction from '../../../../action/departmentAction';
import * as timeKeepingAction from '../../../../action/timeKeepingAction';
import DoTimeKeepingModal from '../../../../component/modal/DoTimeKeepingModal/DoTimeKeepingModal';
import FileSaver from 'file-saver';
import ExcelProgressModal from '../../../../component/modal/ExcelProgressModal/ExcelProgressModal';
import CreateRequestModal from '../../../../component/modal/CreateRequestModal/CreateRequestModal';

class SalaryList extends Component {

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
      type: 'month',
      pickerFormat: 'M-YYYY',
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

  getColumns = (sortedInfo, isColumnsFixed = false) => ([
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'STT',
      width: 80,
      minWidth: 80,
      render: (text, record, index) => {
        return <div>{index + 1}</div>
      }
    },
    {
      title: 'Tên nhân viên',
      dataIndex: ['personnel', 'fullName'],
      key: 'fullName',
      width: 100,
      minWidth: 100,
      // filteredValue: filteredInfo.fullName || null,
      // ...getColumnSearchProps(this, 'fullName', 'họ tên'),
    },
    {
      title: 'Chức vụ',
      dataIndex: ['personnel', 'position'],
      key: 'position',
      width: 100,
      minWidth: 100,
      // filteredValue: filteredInfo.fullName || null,
      // ...getColumnSearchProps(this, 'fullName', 'họ tên'),
    },
    {
      title: 'Số ngày làm',
      dataIndex: 'timeOn',
      key: 'timeOn',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Số ngày nghỉ',
      dataIndex: 'timeOff',
      key: 'timeOff',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Tổng phụ cấp',
      dataIndex: 'amount',
      key: 'total',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Tổng tiền phạt',
      dataIndex: 'fare',
      key: 'fare',
      width: 100,
      minWidth: 100,
      // fixed: isColumnsFixed ? 'left' : null,
      // ...getColumnSearchProps(this, 'nguoiyeucau'),
    },
    {
      title: 'Tổng tạm ứng',
      dataIndex: 'totalAdvance',
      key: 'totalAdvance',
      width: 150,
      minWidth: 150,
    },
    {
      title: 'Tổng lương lãnh',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      width: 150,
      minWidth: 150,
    },
  ]);

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
    const { data, doTimeKeeping, dates, displayExcelDownload, visibleCreateRequest } = this.state;
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
          <title>Tiền lương</title>
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
                  width: '15%',
                  top: -1,
                  marginRight: 2,
                }}
                defaultValue={moment()}
                format={pickerFormat}
                onChange={this.onDatePickerChange}
                picker={type} />

              <Select
                value={filteredInfo.departmentId}
                placeholder='Phòng ban'
                style={{
                  top: -1,
                  width: '20%',
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
            </Col>
            <Col md={{ span: 12 }}
              className='actions-right'
            >
              <Button
                style={{ marginRight: '2px', fontSize: 13, top: -1 }}
                type='primary' icon={<DownloadOutlined />}
                onClick={this.onExportExcel}
              >
                Excel
              </Button>
            </Col>
          </Row>
        </div>
        <div className='filter-table-wrapper'>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalaryList);
