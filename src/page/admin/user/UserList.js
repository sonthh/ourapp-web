import React, { Component } from 'react';
import {
  Table, Button, notification, Popconfirm, message, Tooltip, Typography, Checkbox,
} from 'antd';
import {
  ClearOutlined, SortAscendingOutlined, FilterOutlined, DeleteTwoTone,
  InfoCircleOutlined, CheckSquareOutlined, ReloadOutlined, PlusCircleTwoTone,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import * as userAction from '../../../action/userAction';
import { getFilterObject } from '../../../util/get';
import { checkIsEmptyObj } from '../../../util/check';
import { getDateFormat } from '../../../util/date';
import AvatarAndTitle from '../../../component/common/AvatarAndTitle';
import UserEdit from '../../../component/user/UserEdit';
import GenderTag from '../../../component/common/GenderTag';
import StatusTag from '../../../component/common/StatusTag';
import { getColumnSearchProps } from '../../../util/table';
import { ResizeableTitle } from '../../../component/common/ResizeableTitle';
import MyAvatar from '../../../component/common/MyAvatar';

const Paragraph = Typography.Paragraph;

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        showQuickJumper: true,
      },
      isLoadingTable: true,
      selectedRowKeys: [],
      columns: this.getColumns({}, {}),
      isColumnsFixed: true,
    };
  }

  componentDidMount() {
    this.props.findManyUsers({});
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isLoading, isDeleted, ids, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Notification',
          description: error.message,
          duration: 0,
        });
      }
    }

    if (isLoading !== undefined && isLoading !== prevProps.isLoading) {
      this.setState({
        isLoadingTable: isLoading,
      })
    }

    if (isDeleted !== undefined && isDeleted === true && ids !== prevProps.ids) {
      message.success(`Deleted ${this.props.ids.length} items`);
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
      ['gender', 'username', 'createdBy', 'lastModifiedBy', 'address', 'status', 'email'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current, pageSize } = pagination;

    this.props.findManyUsers({
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
    const { selectedRowKeys } = this.state;
    this.props.deleteManyUsers(selectedRowKeys);
  }

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
  }

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
  }

  toggleModalUserForm = () => {
    this.props.toggleModalUserForm();
  }

  onEditUser = (id) => {
    this.props.toggleModalUserForm();
    this.props.findOneUser(id);
  }

  // filteredInfo, sortedInfo from state
  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = true) => ([
    {
      title: 'Avatar',
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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      filteredValue: filteredInfo.username || null,
      ...getColumnSearchProps(this, 'username'),
      render: (username) => (
        <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ', rows: 1 }}>{username}</Paragraph>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 200,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      filteredValue: filteredInfo.address || null,
      ...getColumnSearchProps(this, 'address'),
      render: address => address || 'No',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthDay',
      key: 'birthDay',
      width: 200,
      render: birthDay => getDateFormat(birthDay) || 'No',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      filteredValue: filteredInfo.email || null,
      ...getColumnSearchProps(this, 'email'),
      render: email => email || 'No',
    },
    {
      title: 'Created date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      width: 200,
      minWidth: 160,
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      render: createdDate => getDateFormat(createdDate) || 'No',
    },
    {
      title: 'Create by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      filteredValue: filteredInfo.createdBy || null,
      ...getColumnSearchProps(this, 'createdBy', 'created by'),
      render: createdBy => (
        <AvatarAndTitle
          src={createdBy ? createdBy.avatar : null}
          title={createdBy ? createdBy.username : null}
        />
      ),
    },
    {
      title: 'Last modified date',
      dataIndex: 'lastModifiedDate',
      width: 200,
      minWidth: 160,
      sorter: true,
      key: 'lastModifiedDate',
      sortOrder: sortedInfo.columnKey === 'lastModifiedDate' && sortedInfo.order,
      render: lastModifiedDate => getDateFormat(lastModifiedDate),
    },
    {
      title: 'Last modifed by',
      dataIndex: 'lastModifiedBy',
      key: 'lastModifiedBy',
      width: 200,
      filteredValue: filteredInfo.lastModifiedBy || null,
      ...getColumnSearchProps(this, 'lastModifiedBy', 'last modified by'),
      render: lastModifiedBy => (
        <AvatarAndTitle
          src={lastModifiedBy ? lastModifiedBy.avatar : null}
          title={lastModifiedBy ? lastModifiedBy.username : null}
        />
      ),
    },
    {
      title: 'Operations',
      key: 'operation',
      width: 100,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <Button
          onClick={() => this.onEditUser(id)}
          type='default'
          icon={<InfoCircleOutlined />}
          size='small'>Details
          </Button>
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
    this.setState({
      isColumnsFixed: e.target.checked,
    });
  }

  render() {
    document.title = 'Users';

    const { data, pagination, isLoadingTable, selectedRowKeys, isColumnsFixed } = this.state;

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
        <div style={{ marginBottom: 16 }}>
          <Tooltip placement="topLeft" title='Clear sorters'>
            <Button
              type='dashed'
              onClick={this.clearSorters}
              icon={<ClearOutlined />}
              disabled={checkIsEmptyObj(sortedInfo) || !sortedInfo.order}
            >
              <SortAscendingOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Clear filters'>
            <Button
              type='dashed'
              onClick={this.clearFilters}
              icon={<ClearOutlined />}
              disabled={checkIsEmptyObj(filteredInfo)}
            >
              <FilterOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Clear sorters and filters'>
            <Button
              type='dashed'
              onClick={this.clearFiltersAndSorters}
              icon={<ClearOutlined />}
              disabled={
                checkIsEmptyObj(filteredInfo || checkIsEmptyObj(sortedInfo))
                || checkIsEmptyObj(filteredInfo) || !sortedInfo.order
              }
            >
              <FilterOutlined /> {'&'} <SortAscendingOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Clear selected'>
            <Button
              type='dashed'
              onClick={this.clearSelected}
              icon={<ClearOutlined />}
              disabled={selectedRowKeys.length === 0}
            >
              <CheckSquareOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Fixed columns'>
            <Button type='dashed'>
              <Checkbox
                defaultChecked={this.state.isColumnsFixed}
                onChange={this.onChangeColumnsFixed}
              />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Refresh'>
            <Button
              type='dashed'
              onClick={this.refreshData}
              icon={<ReloadOutlined />}
            />
          </Tooltip>
          <Button onClick={this.toggleModalUserForm} type='default' icon={<PlusCircleTwoTone />}>
            Add
          </Button>
          <UserEdit />

          <Popconfirm
            placement='bottomLeft'
            title={`Are you sure delete ${selectedRowKeys.length} selected items?`}
            onConfirm={this.onDeleteMany}
            disabled={!hasSelected}
          >
            <Button type="danger" icon={<DeleteTwoTone />} disabled={!hasSelected} loading={this.props.isLoadingDelete}>
              Delete
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          style={{ fontSize: '13px' }}
          bordered
          rowSelection={rowSelection}
          components={this.components}
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={pagination}
          loading={isLoadingTable}
          onChange={this.handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.user.userList;
}

const mapDispatchToProps = (dispatch) => {
  return {
    findManyUsers: (params = {}) => {
      dispatch(userAction.findManyUsers(params));
    },
    deleteManyUsers: (ids) => {
      dispatch(userAction.delteManyUsers(ids));
    },
    toggleModalUserForm: () => {
      dispatch(userAction.toggleModalUserForm());
    },
    findOneUser: (id) => {
      dispatch(userAction.findOneUser(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
