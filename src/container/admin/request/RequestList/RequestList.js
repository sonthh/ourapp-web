import React, { Component } from 'react';
import { Row, Col, Button, Select, Tabs, Table, Badge, DatePicker } from "antd";
import './index.scss';
import { FilterTwoTone, ReloadOutlined, DollarOutlined, FieldTimeOutlined, UnorderedListOutlined, PlusCircleTwoTone, DownloadOutlined } from '@ant-design/icons'
import { IoIosAirplane } from "react-icons/io";
import { Link } from 'react-router-dom';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import { getColumnSearchProps } from '../../../../util/table'

const { Option } = Select;

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class RequestList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnFixed') === 'true' || false;
    this.state = {
      filteredInfo: null,
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

  onChange = activeKey => {
    this.setState({ activeKey })
  };

  callback = key => {
    console.log(key);
  }

  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = false) => ([
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 75,
      minWidth: 75,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Loại',
      dataIndex: 'loai',
      key: 'loai',
      width: 100,
      minWidth: 100,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'Nguoi yeu cau',
      key: 'nguoiyeucau',
      width: 100,
      minWidth: 100,
      fixed: isColumnsFixed ? 'left' : null,
      filteredValue: null,
      ...getColumnSearchProps(this, 'nguoiyeucau'),
    },
    {
      title: 'Thông tin yêu cầu',
      dataIndex: 'thongtinyeucau',
      key: 'thongtinyeucau',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Lí do',
      dataIndex: 'lido',
      key: 'lido',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
    },
    {
      title: 'Người nhận',
      dataIndex: 'nguoinhan',
      key: 'nguoinhan',
      width: 100,
      minWidth: 100,
      fixed: isColumnsFixed ? 'left' : null,
      ...getColumnSearchProps(this, 'nguoiyeucau'),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'ngaygui',
      key: 'ngaygui',
      width: 150,
      minWidth: 150,
      fixed: isColumnsFixed ? 'left' : null,
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
  render() {
    const { isColumnsFixed } = this.state;
    // const { isLoading } = this.props;

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

    return (
      <>
        <div>
          <Row justify='space-between'>
            <Col span={24} md={{ span: 12 }}>
              <Button
                style={{ marginRight: '2px' }}
                icon={<FilterTwoTone />}>
              </Button>
              <Button
                style={{ marginRight: '2px' }}
                icon={<ReloadOutlined />}>
              </Button>
              <Select
                defaultValue="-1"
                onChange={null}
                style={{ width: 160, top: -2 }}
              >
                <Option value="0"><DollarOutlined className='icon-option' />Tạm ứng lương</Option>
                <Option value="1"><FieldTimeOutlined className='icon-option' />Làm thêm giờ</Option>
                <Option value="2"><IoIosAirplane className='icon-option' />Nghỉ phép </Option>
                <Option value="-1"><UnorderedListOutlined className='icon-option' />Tất cả</Option>
              </Select>
            </Col>
            <Col
              md={{ span: 12 }}
              className='actions-right'
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {/* {'hasSelected' ? `Selected ${'selectedRowKeys.length'} items` : ''} */}
              </span>
              <Link to={'/admin/personnel/request/create'}>
                <Button style={{ marginRight: '2px' }}
                  type='default'
                  icon={<PlusCircleTwoTone />}>
                  Tạo mới
                </Button>
              </Link>
              <Button style={{ marginRight: '2px' }} type='default' icon={<DownloadOutlined />}>
                Xuất excel
              </Button>
            </Col>
          </Row>
        </div>
        <div className='card-container'>
          <Tabs onChange={this.callback} type="card"
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
                  <Badge count={5} className='count-icon' style={{ backgroundColor: '#ffbf00' }} />
                </>
              }
              key="1"
            >
              <div className='table-wrapper'>
                <Table
                  style={{ fontSize: '13px' }}
                  bordered={true}
                  components={this.components}
                  onRow={this.onRow}
                  columns={columns}
                  rowKey={record => record.id}
                  onChange={this.handleTableChange}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>Chấp thuận</span>
                  <Badge count={5} className='count-icon' style={{ backgroundColor: '#00a854' }} />
                </>
              }
              key="2"
            >
              <div className='table-wrapper'>
                <Table
                  style={{ fontSize: '13px' }}
                  bordered={true}
                  components={this.components}
                  onRow={this.onRow}
                  columns={columns}
                  rowKey={record => record.id}
                  onChange={this.handleTableChange}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>Từ chối </span>
                  <Badge count={5} className='count-icon' style={{ backgroundColor: '#f04134' }} />
                </>
              }
              key="3"
            >
              <div className='table-wrapper'>
                <Table
                  style={{ fontSize: '13px' }}
                  bordered={true}
                  components={this.components}
                  onRow={this.onRow}
                  columns={columns}
                  rowKey={record => record.id}
                  onChange={this.handleTableChange}
                  scroll={{ x: 'max-content' }}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </>
    );
  }


}

export default RequestList;