import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Col, Row, DatePicker
} from 'antd';
import {
  ReloadOutlined, LoadingOutlined, DownloadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getArrayDatesOfMonth } from '../../../../util/date';
import { Select } from 'antd';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import * as departmentAction from '../../../../action/departmentAction';
import * as personnelAction from '../../../../action/personnelAction';
import FileSaver from 'file-saver';
import ExcelProgressModal from '../../../../component/modal/ExcelProgressModal/ExcelProgressModal';

class SalaryList extends Component {

  constructor(props) {
    super(props);

    const currentDate = moment();
    const dates = getArrayDatesOfMonth(currentDate);

    this.state = {
      filteredInfo: {
        departmentId: null,
      },
      sortedInfo: null,
      data: [],
      columns: this.getColumns(dates, {}, {}),
      dates,
      pickerFormat: 'M-YYYY',
      displayExcelDownload: false,
    };
  }

  componentDidMount() {
    this.props.findManyDepartments();

    let { dates, filteredInfo } = this.state;

    this.fetchSalary(filteredInfo, dates);
  }

  fetchSalary = (filteredInfo, dates) => {
    this.props.findSalary({
      dates: dates.map(date => moment(date).format('YYYY-MM-DD')) + '',
      ...filteredInfo,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, salaryView } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (salaryView && salaryView !== prevProps.salaryView) {
      this.setState({
        data: salaryView,
      });
    }
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
    },
    {
      title: 'Chức vụ',
      dataIndex: ['personnel', 'position'],
      key: 'position',
      width: 100,
      minWidth: 100,
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
    const dates = getArrayDatesOfMonth(date);
    const { filteredInfo } = this.state;

    this.setState({ dates, columns: this.getColumns(dates) });
    this.fetchSalary(filteredInfo, dates);
  }

  onChangeDepartment = (departmentId) => {
    let { dates, filteredInfo } = this.state;
    filteredInfo = { ...filteredInfo, departmentId };

    this.setState({ filteredInfo });

    this.fetchSalary(filteredInfo, dates);
  }

  onSearchByFullName = (fullName) => {
    if (fullName.trim() === '') {
      fullName = null;
    }

    let { dates, filteredInfo } = this.state;
    filteredInfo = { ...filteredInfo, fullName };

    this.setState({ filteredInfo });

    this.fetchSalary(filteredInfo, dates);
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

    this.fetchSalary(filteredInfo, dates);
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
    const { data, dates, displayExcelDownload } = this.state;
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
                picker='month' />

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
        <ExcelProgressModal
          title='Bạn đang xuất dữ liệu chấm công'
          visible={displayExcelDownload}
          onClose={this.closeExcelDownload}
          onOk={this.saveExcelToClient}
          isExporting={isExporting}
        />
      </>
    );
  }
}

const mapStateToProps = ({ department, salary }) => {
  const { salaryList } = salary
  const { departmentList, } = department;

  return {
    ...salaryList,
    departments: departmentList.dataList.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyDepartments: () => dispatch(departmentAction.findManyDepartments()),
    findSalary: (params) => dispatch(personnelAction.findSalary(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryList);
