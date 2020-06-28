import React, { Component } from 'react';
import { Row, Col, Button, Select, Tabs, Table, Badge, Menu, Dropdown, notification, Typography, Divider } from "antd";
import './index.scss';
import { ReloadOutlined, PlusCircleTwoTone, DownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import * as requestAction from '../../../../action/requestAction'
import { connect } from 'react-redux';
import { getDateFormat } from '../../../../util/date';
import { typeRequest } from '../../../../util/get';
import { Helmet } from 'react-helmet';
import TableRowPopup from '../../../../component/popup/TableRowPopup/TableRowPopup';
import SplitPane from 'react-split-pane';

const { Title } = Typography;

const { TabPane } = Tabs;

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
      popup: {
        visible: false,
        x: 0, y: 0,
        index: 0,
      },
      currentRequest: null,
    };
  }

  componentDidMount() {
    this.props.findManyRequests({ status: 'Chờ phê duyệt' });
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

  getColumns = () => ([
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'STT',
      width: 30,
      minWidth: 30,
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
      render: type => typeRequest[type] || '',
    },
    {
      title: 'Người yêu cầu',
      dataIndex: ['personnel', 'fullName'],
      key: 'fullName',
      width: 100,
      minWidth: 100,
    },
    {
      title: 'Thông tin yêu cầu',
      dataIndex: 'info',
      key: 'info',
      width: 150,
      minWidth: 150,
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason',
      width: 150,
      minWidth: 150,
    },
    {
      title: 'Người nhận',
      dataIndex: ['receiver', 'fullName'],
      key: 'receiver',
      width: 100,
      minWidth: 100,
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 100,
      minWidth: 100,
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
    'Chấp thuận',
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
    this.props.countRequests({ type: filteredInfo.type })
  }

  onRow = (record, index) => ({
    onContextMenu: event => {
      event.preventDefault();

      if (!this.state.popup.visible) {
        const that = this;
        document.addEventListener(`click`, function onClickOutside() {
          that.setState({ popup: { visible: false } })
          document.removeEventListener(`click`, onClickOutside)
        });
      }

      if (record.status !== 'Chờ phê duyệt') return;

      this.setState({
        popup: {
          index,
          record,
          visible: true,
          x: event.clientX,
          y: event.clientY
        }
      });
    },
    onClick: () => {
      this.setState({ currentRequest: record, clickedIndex: index });
    },
  });

  onApprove = () => {
    const { record } = this.state.popup;
    console.log(record);
    this.props.updateRequest(record.id, { status: 'Chấp thuận' })
  }

  onReject = () => {
    const { record } = this.state.popup;
    this.props.updateRequest(record.id, { status: 'Từ chối' })
  }

  deleteRequest = () => {
    const { currentRequest, clickedIndex } = this.state;
    if (!currentRequest) return;

    console.log(currentRequest, clickedIndex);
    this.props.deleteRequest(clickedIndex);
  }

  render() {
    const { isColumnsFixed, data, currentRequest } = this.state;
    const { isLoading, countRequest } = this.props;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columnsInfo = this.getColumns(filteredInfo, sortedInfo, isColumnsFixed);

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      filteredValue: columnsInfo[index].filteredValue,
      sortOrder: columnsInfo[index].sortOrder,
      onHeaderCell: column => ({
        width: column.width,
        minWidth: column.minWidth,
        onResize: this.handleResize(index),
      }),
    }))

    const requestTable = (
      <Table
        style={{ fontSize: '13px' }}
        locale={{
          emptyText: (
            <div style={{ padding: '20px 0' }}>
              {isLoading === true ? 'Đang tải dữ liệu' : 'Không có yêu cầu'}
            </div>
          ),
        }}
        bordered={true}
        components={this.components}
        onRow={this.onRow}
        columns={columns}
        dataSource={data}
        pagination={false}
        // pagination={pagination}
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
        <Helmet>
          <title>Yêu cầu</title>
        </Helmet>

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
                options={[
                  { label: 'Tất cả', value: null },
                  ...Object.keys(typeRequest).map(key => ({ value: key, label: typeRequest[key] }))
                ]}
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
        <SplitPane split="horizontal" minSize='95%' defaultSize='60%' allowResize={true}>

          <div className='card-container-main'>
            <Tabs onChange={this.onChangeTab} type="card" defaultActiveKey={filteredInfo.status}
            // tabBarExtraContent={
            //   <>
            //     <div className='extra-container'>
            //       <RangePicker />
            //     </div>
            //   </>
            // }
            >
              <TabPane
                tab={
                  <>
                    <span>Yêu cầu phê duyệt </span>
                    <Badge showZero={true} count={countRequest.waiting} className='count-icon' style={{ backgroundColor: '#ffbf00' }} />
                  </>
                }
                key={this.statusList[0]}
              >
              </TabPane>
              <TabPane
                tab={
                  <>
                    <span>Chấp thuận</span>
                    <Badge showZero={true} count={countRequest.approved} className='count-icon' style={{ backgroundColor: '#00a854' }} />
                  </>
                }
                key={this.statusList[1]}
              >
              </TabPane>
              <TabPane
                tab={
                  <>
                    <span>Từ chối </span>
                    <Badge showZero={true} count={countRequest.rejected} className='count-icon' style={{ backgroundColor: '#f04134' }} />
                  </>
                }
                key={this.statusList[2]}
              >

              </TabPane>

            </Tabs>
            <div className='table-wrapper'>
              {requestTable}
            </div>
          </div>
          <div className='card-container-main' style={{
            backgroundColor: '#fff',
            minHeight: '100px',
            marginTop: '0px',
            paddingTop: '5px'
          }}>
            <Row>
              <Col span={24} md={{ span: 24 }} className='wrapper-title'>
                <Title style={{ marginTop: 15 }} className='form-title advance-form' level={4}>THÔNG TIN YÊU CẦU</Title>
                <Divider className='divider-advance' />
              </Col>
              <Col span={18} md={{ span: 18 }} >
                <Row>

                  {currentRequest &&
                    <>
                      <Col className='text-bold' span={6} md={{ span: 6 }}>
                        <div>Thông tin yêu cầu</div>
                      </Col>
                      <Col span={6} md={{ span: 6 }}>
                        <div>{currentRequest.info}</div>
                      </Col>
                      <Col className='text-bold' span={6} md={{ span: 6 }}>
                        <div>Lý do</div>
                      </Col>
                      <Col span={6} md={{ span: 6 }}>
                        <div>{currentRequest.reason}</div>
                      </Col>
                      <Col className='text-bold' span={6} md={{ span: 6 }}>
                        <div>Người gởi yêu cầu</div>
                      </Col>
                      <Col span={6} md={{ span: 6 }}>
                        <div>{currentRequest?.personnel?.fullName}</div>
                      </Col>
                      <Col className='text-bold' span={6} md={{ span: 6 }}>
                        <div>Người xác nhận</div>
                      </Col>
                      <Col span={6} md={{ span: 6 }}>
                        <div>{currentRequest?.receiver?.fullName}</div>
                      </Col>

                      {
                        currentRequest.type === 'OnLeave' &&
                        <>
                          <Col className='text-bold' span={6} md={{ span: 6 }}>
                            <div>Thời gian nghỉ</div>
                          </Col>
                          <Col span={6} md={{ span: 6 }}>
                            <div>Từ {getDateFormat(currentRequest.startDate)} đến {getDateFormat(currentRequest.endDate)}</div>
                          </Col>
                        </>
                      }
                      {
                        currentRequest.type === 'Advance' &&
                        <>
                          <Col className='text-bold' span={6} md={{ span: 6 }}>
                            <div>Số tiền</div>
                          </Col>
                          <Col span={6} md={{ span: 6 }}>
                            <div>{currentRequest.amount}</div>
                          </Col>
                          <Col className='text-bold' span={6} md={{ span: 6 }}>
                            <div>Ngày quyết định</div>
                          </Col>
                          <Col span={6} md={{ span: 6 }}>
                            <div>{getDateFormat(currentRequest.decidedDate)}</div>
                          </Col>
                        </>
                      }
                    </>
                  }
                </Row>
              </Col>
              {/* <Col span={6} md={{ span: 6 }} >
                {
                  currentRequest && currentRequest?.status !== 'Chờ phê duyệt' &&
                  <Button onClick={this.deleteRequest} icon={<CloseOutlined />} type='danger'>Xóa</Button>
                }
              </Col> */}
            </Row>
          </div>
        </SplitPane>
        <TableRowPopup {...this.state.popup} onReject={this.onReject} onApprove={this.onApprove} />
      </>
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { requestList, requestItem } = request;
  return { ...requestList, ...requestItem };
}

const maDispatchToProps = (dispatch) => {
  return {
    findManyRequests: (params = {}) => {
      dispatch(requestAction.findManyRequests(params))
    },
    countRequests: (params = {}) => {
      dispatch(requestAction.countRequests(params))
    },
    updateRequest: (requestId, requestPayload) => {
      dispatch(requestAction.updateOneRequest(requestId, requestPayload))
    },
    deleteRequest: (requestId) => {
      dispatch(requestAction.deleteOneRequest(requestId))
    },
  }
}

export default connect(mapStateToProps, maDispatchToProps)(RequestList);