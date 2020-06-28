import React, { Component } from 'react';
import { Row, Col, Button, Select, Tabs, Table, Badge, DatePicker, Menu, Dropdown, notification } from "antd";
import './index.scss';
import { ReloadOutlined, PlusCircleTwoTone, DownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import * as requestAction from '../../../../action/requestAction'
import { connect } from 'react-redux';
import { getDateFormat } from '../../../../util/date';
import { typeRequest } from '../../../../util/get';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class RequestList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnFixed') === 'true' || false;
    this.state = {
      filteredInfo: {
        status: this.statusList[0],
        type: null,
      },
      sortedInfo: null,
      data: [],
      paganation: {
        showTotal: (total, range) => `${range[0] - range[1]} of ${total} request`,
        showQuickJumper: true,
      },
      columns: this.getColumns({}, {}),
      isColumnsFixed,
      displayFilter: false,

    };
  }

  componentDidMount() {
    this.props.findManyRequests({});
    this.props.countRequests({})
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleted, ids, dataList, isDeletedOnePersonnel, deletedId } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeletedOnePersonnel !== undefined && isDeletedOnePersonnel === true
      && deletedId !== prevProps.deletedId) {

      const description = `Xóa thành công`;
      notification.success({
        message: 'Thành công',
        description,
        duration: 2.5,
      });
    }

    if (isDeleted !== undefined && isDeleted === true && ids !== prevProps.ids) {
      const { ids } = this.props;
      const description = `Đã xóa ${ids.length} hồ sơ`;

      notification.success({
        message: 'Thành công',
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

  onChangeTab = status => {
    let { filteredInfo } = this.state;
    filteredInfo = {
      ...filteredInfo,
      status,
    }
    this.setState({
      filteredInfo
    });

    this.props.findManyRequests({ ...filteredInfo });
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
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      minWidth: 100,
      fixed: isColumnsFixed ? 'left' : null,
      render: type => typeRequest[type] || '',
    },
    {
      title: 'Người yêu cầu',
      dataIndex: ['personnel', 'fullName'],
      key: 'fullName',
      width: 100,
      minWidth: 100,
      // filteredValue: filteredInfo.fullName || null,
      // ...getColumnSearchProps(this, 'fullName', 'họ tên'),
    },
    {
      title: 'Thông tin yêu cầu',
      dataIndex: 'info',
      key: 'info',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Người nhận',
      dataIndex: ['receiver', 'fullName'],
      key: 'receiver',
      width: 100,
      minWidth: 100,
      // fixed: isColumnsFixed ? 'left' : null,
      // ...getColumnSearchProps(this, 'nguoiyeucau'),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 150,
      minWidth: 150,
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      fixed: isColumnsFixed ? 'left' : null,
      render: createdDate => getDateFormat(createdDate) || 'No',
    },
  ]);

  components = {
    header: {
      cell: ResizeableTitle,
    }
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  }

  onChangeColumnsFixed = (e) => {
    const isColumnFixed = e.target.checked;
    this.setState({
      isColumnFixed,
    });

    localStorage.setItem('isColumnFixed', isColumnFixed);
  };

  onClickToggleFixed = () => {
    this.setState({
      isColumnFixed: !this.state.isColumnsFixed,
    });
  }

  onToggleDisplayFilter = () => {
    this.setState({
      displayFilter: !this.state.displayFilter,
    });
  }

  listRequestMenu = (
    <Menu>
      <Menu.Item>
        <Link to={'/admin/personnel/request/advance/create'}>
          <span style={{ color: '#1890ff' }}><PlusCircleTwoTone className='plus-icon' />Tạm ứng lương</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={'/admin/personnel/request/on-leave/create'}>
          <span style={{ color: '#1890ff' }}><PlusCircleTwoTone className='plus-icon' />Nghỉ phép</span>
        </Link>
      </Menu.Item>
    </Menu>
  )

  statusList = [
    'Chờ phê duyệt',
    'Châp thuận',
    'Từ chối',
  ];

  onChangeReqType = (type) => {
    let { filteredInfo } = this.state;
    filteredInfo = {
      ...filteredInfo,
      type,
    }
    this.setState({
      filteredInfo
    });

    this.props.findManyRequests({ ...filteredInfo });
    this.props.countRequests({ type })
  }

  refreshData = () => {
    const { filteredInfo } = this.state;

    this.props.findManyRequests({ ...filteredInfo });
  }

  render() {
    const { isColumnsFixed, data, pagination } = this.state;
    const { isLoading, countRequest } = this.props;

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };

    // const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columnsInfo = this.getColumns(filteredInfo, sortedInfo, isColumnsFixed);

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      filteredValue: columnsInfo[index].filteredValue,
      sortOrder: columnsInfo[index].sortOrder,
      fixed: columnsInfo[index].fixed,
      onHeaderCell: column => ({
        width: column.width,
        minWidth: column.minWidth,
        onResize: this.handleResize(index),
      }),
    }))

    const listRequest = (
      <Table
        style={{ fontSize: '13px' }}
        locale={{
          emptyText: (
            <div style={{ padding: '20px 0' }}>
              {isLoading === true ? 'Đang tải dữ liệu' : 'Không tìm thấy dữ liệu'}
            </div>
          ),
        }}
        bordered={true}
        components={this.components}
        onRow={this.onRow}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={record => record.id}
        onChange={this.handleTableChange}
        scroll={{ x: 'max-content' }}
        loading={{
          spinning: isLoading,
          indicator: (<LoadingOutlined />),
        }}
      />
    )

    return (
      <>
        <div className='card-container-main'>
          <Row justify='space-between' className='child-card-container'>
            <Col span={24} md={{ span: 12 }}>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.refreshData}
                icon={<ReloadOutlined />}>
              </Button>
              <Select
                value={filteredInfo.type}
                onChange={this.onChangeReqType}
                style={{ width: 160, top: -2 }}
                options={[{ label: 'Tất cả', value: null }, ...Object.keys(typeRequest).map(key => ({ value: key, label: typeRequest[key] }))]}
              />
            </Col>
            <Col
              md={{ span: 12 }}
              className='actions-right'
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {/* {'hasSelected' ? `Selected ${'selectedRowKeys.length'} items` : ''} */}
              </span>
              <Dropdown overlay={this.listRequestMenu} placement='bottomLeft' trigger={['click']}>
                <Button style={{ marginRight: '2px' }} type='default' icon={<PlusCircleTwoTone className='plus-icon' />}>
                  Tạo mới
                </Button>
              </Dropdown>
              <Button style={{ marginRight: '2px' }} type='default' icon={<DownloadOutlined className='plus-icon' />}>
                Xuất excel
              </Button>
            </Col>
          </Row>
        </div>
        <div className='card-container-main'>
          <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={filteredInfo.status}
            tabBarExtraContent={
              <>
                <div className='extra-container'>
                  <RangePicker />
                </div>
              </>
            }
          >
            <TabPane
              tab={
                <>
                  <span>Yêu cầu phê duyệt </span>
                  <Badge count={countRequest.waiting} className='count-icon' style={{ backgroundColor: '#ffbf00' }} />
                </>
              }
              key={this.statusList[0]}
            >
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>Chấp thuận</span>
                  <Badge count={countRequest.approved} className='count-icon' style={{ backgroundColor: '#00a854' }} />
                </>
              }
              key={this.statusList[1]}
            >
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>Từ chối </span>
                  <Badge count={countRequest.rejected} className='count-icon' style={{ backgroundColor: '#f04134' }} />
                </>
              }
              key={this.statusList[2]}
            >

            </TabPane>

          </Tabs>
          <div className='table-wrapper'>
            {listRequest}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { requestList } = request;
  return { ...requestList };
}

const maDispatchToProps = (dispatch) => {
  return {
    findManyRequests: (params = {}) => {
      dispatch(requestAction.findManyRequests(params))
    },
    countRequests: (params = {}) => {
      dispatch(requestAction.countRequests(params))
    },
  }
}

export default connect(mapStateToProps, maDispatchToProps)(RequestList);