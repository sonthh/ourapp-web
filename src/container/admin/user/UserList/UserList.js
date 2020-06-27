import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Popconfirm, Typography, Checkbox, Row, Col,
} from 'antd';
import {
  DeleteOutlined, DeleteTwoTone, FilterTwoTone,
  EditTwoTone, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import * as userAction from '../../../../action/userAction';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import GenderTag from '../../../../component/common/GenderTag';
import StatusTag from '../../../../component/common/StatusTag';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import MyAvatar from '../../../../component/common/MyAvatar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Paragraph = Typography.Paragraph;
class UserList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `Từ ${range[0]}-${range[1]} / ${total} kết quả`,
        showQuickJumper: true,
      },
      selectedRowKeys: [],
      columns: this.getColumns({}, {}),
      isColumnsFixed,
      displayFilter: false,
    };
  }

  componentDidMount() {
    this.props.findManyUsers({});
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeletedManyUser, isDeletedOneUser, deletedIds, deletedId, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeletedOneUser !== undefined && isDeletedOneUser === true
      && deletedId !== prevProps.deletedId) {

      const description = `Xóa thành công`;
      notification.success({
        message: 'Thành công',
        description,
        duration: 2.5,
      });
    }

    if (isDeletedManyUser !== undefined && isDeletedManyUser === true
      && deletedIds !== prevProps.deletedIds) {

      const { deletedIds } = this.props;
      const description = `Đã xóa ${deletedIds.length} người dùng`;

      notification.success({
        message: 'Thành công',
        description,
        duration: 2.5,
      });

      this.setState({ selectedRowKeys: [] });
    }

    if (dataList && dataList !== prevProps.dataList) {
      const { content, totalElements: total } = dataList;
      const pagination = { ...this.state.pagination, total };

      this.setState({
        data: content,
        pagination,
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

    this.fetchUsers(pagination, filters, sorter);
  };

  fetchUsers = (pagination, filters, sorter) => {
    filters = getFilterObject(
      ['gender', 'username', 'createdBy', 'lastModifiedBy', 'address', 'status',
        'email', 'identification', 'phoneNumber', 'fullName'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current: currentPage, pageSize: limit } = pagination;

    this.props.findManyUsers({
      currentPage,
      limit,
      sortBy,
      sortDirection,
      ...filters,
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleDeleteOneUser = (id) => {
    this.props.deleteOneUser(id);
  };

  onDeleteMany = () => {
    const { selectedRowKeys: ids } = this.state;
    this.props.deleteManyUsers(ids);
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
    const { pagination, sortedInfo } = this.state;
    this.fetchUsers(pagination, null, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchUsers(pagination, filteredInfo, null);
  };

  refreshData = () => {
    const { pagination, filteredInfo, sortedInfo } = this.state;
    this.fetchUsers(pagination, filteredInfo, sortedInfo)
  };

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchUsers(pagination, null, null);
  };

  clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  // filteredInfo, sortedInfo from state
  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = false) => ([
    {
      title: 'Ảnh',
      dataIndex: 'username',
      key: 'avatar',
      width: 75,
      minWidth: 75,
      fixed: isColumnsFixed ? 'left' : null,
      render: (username, record) => (
        <MyAvatar src={record.avatar} title={username} />
      ),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.username || null,
      ...getColumnSearchProps(this, 'username', 'tên người dùng'),
      render: (username) => (
        <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ', rows: 1 }}>{username}</Paragraph>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.fullName || null,
      ...getColumnSearchProps(this, 'fullName', 'họ tên'),
      render: fullName => fullName || 'No',
    },
    {
      title: 'CMND',
      dataIndex: 'identification',
      key: 'identification',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.identification || null,
      ...getColumnSearchProps(this, 'identification', 'CMND'),
      render: identification => identification || 'No',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 130,
      minWidth: 130,
      filteredValue: filteredInfo.gender || null,
      filters: [
        {
          text: (<GenderTag gender='MALE' />),
          value: 'MALE',
        },
        {
          text: (<GenderTag gender='FEMALE' />),
          value: 'FEMALE',
        },
      ],
      filterMultiple: false,
      render: gender => (<GenderTag gender={gender} />),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      minWidth: 130,
      filteredValue: filteredInfo.status || null,
      filters: [
        {
          text: (<StatusTag status='INACTIVE' />),
          value: 'INACTIVE',
        },
        {
          text: (<StatusTag status='ACTIVE' />),
          value: 'ACTIVE',
        },
      ],
      filterMultiple: false,
      render: status => (<StatusTag status={status} />),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.address || null,
      ...getColumnSearchProps(this, 'address', 'địa chỉ'),
      render: address => address || 'No',
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.phoneNumber || null,
      ...getColumnSearchProps(this, 'phoneNumber', 'SĐT'),
      render: phoneNumber => phoneNumber || 'No',
    },
    {
      title: 'Sinh nhật',
      dataIndex: 'birthDay',
      key: 'birthDay',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'birthDay' && sortedInfo.order,
      width: 140,
      minWidth: 140,
      render: birthDay => getDateFormat(birthDay) || 'No',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 240,
      minWidth: 240,
      filteredValue: filteredInfo.email || null,
      ...getColumnSearchProps(this, 'email'),
      render: (email) => (
        <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ', rows: 1 }}>{email || 'No'}</Paragraph>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      width: 140,
      minWidth: 140,
      render: createdDate => getDateFormat(createdDate) || 'No',
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 190,
      minWidth: 190,
      filteredValue: filteredInfo.createdBy || null,
      ...getColumnSearchProps(this, 'createdBy', 'người tạo'),
      render: createdBy => (
        <AvatarAndTitle
          src={createdBy ? createdBy.avatar : null}
          title={createdBy ? createdBy.username : null}
        />
      ),
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'lastModifiedDate',
      width: 160,
      minWidth: 160,
      sorter: true,
      key: 'lastModifiedDate',
      sortOrder: sortedInfo.columnKey === 'lastModifiedDate' && sortedInfo.order,
      render: lastModifiedDate => getDateFormat(lastModifiedDate),
    },
    {
      title: 'Sửa bởi',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: 190,
      minWidth: 190,
      filteredValue: filteredInfo.lastModifiedBy || null,
      ...getColumnSearchProps(this, 'lastModifiedBy', 'người sửa'),
      render: lastModifiedBy => (
        <AvatarAndTitle
          src={lastModifiedBy ? lastModifiedBy.avatar : null}
          title={lastModifiedBy ? lastModifiedBy.username : null}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'operation',
      width: 100,
      minWidth: 100,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <>
          <Link to={{ pathname: `/admin/user/manage/${id}/edit`, state: { background: this.props.location } }} >
            <Button
              type='default'
              icon={<EditTwoTone />}
              size='small'
            />
          </Link>
          <Popconfirm
            icon={<DeleteOutlined />}
            placement='bottomRight'
            title={`Bạn có muốn xóa?`}
            onConfirm={() => this.handleDeleteOneUser(id)}
          >
            <Button
              loading={this.props.isDeletingOneUser && this.props.isDeletingOneUserId === id}
              type='default'
              icon={<DeleteTwoTone />}
              size='small'
            />
          </Popconfirm>
        </>
      ),
    },
  ]);

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
  };

  onClickToggleFixed = () => {
    this.setState({
      isColumnsFixed: !this.state.isColumnsFixed,
    });
  };

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
  });

  onToggleDisplayFilter = () => {
    this.setState({
      displayFilter: !this.state.displayFilter,
    });
  }

  render() {
    const { data, pagination, selectedRowKeys, isColumnsFixed, displayFilter } = this.state;
    const { isLoading: isLoadingTable, isDeletingManyUser, location } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    // columns with filteredInfo and sortedInfo
    const columnsInfo = this.getColumns(filteredInfo, sortedInfo, isColumnsFixed);

    // resize columns
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
    }));

    return (
      <>
        <Helmet>
          <title>Người dùng</title>
        </Helmet>
        <div style={{ marginBottom: 16 }}>
          <Row justify='space-between'>
            <Col span={24} md={{ span: 12 }}>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.onToggleDisplayFilter}
                icon={<FilterTwoTone />}
              />
              <Button
                icon={<ReloadOutlined />}
                onClick={this.refreshData}
              />
            </Col>
            <Col
              md={{ span: 12 }}
              className='actions-right'
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {hasSelected ? `Chọn ${selectedRowKeys.length} dòng` : ''}
              </span>
              <Link to={{ pathname: '/admin/user/manage/add', state: { background: location } }} >
                <Button style={{ marginRight: 2 }} type='default' icon={<PlusCircleTwoTone />}>
                  Tạo user
                 </Button>
              </Link>

              <Popconfirm
                icon={<DeleteOutlined />}
                placement='bottomLeft'
                title={`Bạn có muốn xóa ${selectedRowKeys.length} người dùng?`}
                onConfirm={this.onDeleteMany}
                disabled={!hasSelected}
              >
                <Button type='danger' icon={<DeleteOutlined />} disabled={!hasSelected} loading={isDeletingManyUser}>
                  Xóa
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </div>
        <div className='filter-table-wrapper'>
          <div className={`filter-wrapper ${displayFilter ? '' : 'd-none'}`} >
            <Button
              onClick={this.clearSorters}
              disabled={checkIsEmptyObj(sortedInfo) || !sortedInfo.order}
            >
              Bỏ sắp xếp
              </Button>
            <Button
              onClick={this.clearFilters}
              disabled={checkIsEmptyObj(filteredInfo)}
            >
              Bỏ lọc
              </Button>
            <Button
              onClick={this.clearFiltersAndSorters}
              disabled={
                checkIsEmptyObj(filteredInfo || checkIsEmptyObj(sortedInfo))
                || checkIsEmptyObj(filteredInfo) || !sortedInfo.order
              }
            >
              Bỏ lọc & sắp xếp
            </Button>
            <Button
              onClick={this.clearSelected}
              disabled={selectedRowKeys.length === 0}
            >
              Bỏ chọn tất cả
            </Button>
            <Button onClick={this.onClickToggleFixed}>
              <Checkbox
                style={{ marginRight: 4 }}
                checked={this.state.isColumnsFixed}
                defaultChecked={this.state.isColumnsFixed}
                onChange={this.onChangeColumnsFixed}
              />Hiện hành động
            </Button>
          </div>
          <Table
            style={{ fontSize: '13px', width: '100%' }}
            bordered
            locale={{
              emptyText: (
                <div style={{ padding: '20px 0' }}>
                  {isLoadingTable === true ? 'Đang tải dữ liệu' : 'Không tìm thấy dữ liệu'}
                </div>
              ),
            }}
            rowSelection={rowSelection}
            components={this.components}
            onRow={this.onRow}
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={{
              spinning: isLoadingTable,
              indicator: <LoadingOutlined />,
            }}
            onChange={this.handleTableChange}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userList } = user;

  return {
    ...userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyUsers: (params = {}) => dispatch(userAction.findManyUsers(params)),
    deleteManyUsers: (ids) => dispatch(userAction.delteManyUsers(ids)),
    deleteOneUser: (id) => dispatch(userAction.delteOneUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
