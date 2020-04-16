import React, { Component } from 'react';
import {
  Table, Tag, Input, Button, notification, Popconfirm, message, Tooltip,
} from 'antd';
import {
  SearchOutlined, DeleteOutlined, ClearOutlined, SortAscendingOutlined, FilterOutlined,
  InfoCircleOutlined, CheckSquareOutlined, ReloadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import * as userAction from '../../../action/userAction';
import { getFilterObject } from '../../../util/get';
import { checkIsEmptyObj } from '../../../util/check';
import { getDateFormat } from '../../../util/date';
import AvatarAndTitle from '../../../component/common/AvatarAndTitle';
import UserEdit from '../../../component/user/UserEdit';

class UserList extends Component {

  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: [],
    pagination: {
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      showQuickJumper: true,
    },
    loading: true,
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.findManyUsers({});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error && this.props.error !== prevProps.error) {
      const { error } = this.props;
      if (error) {
        notification.error({
          message: 'Notification',
          description: error.message,
          duration: 0,
        });
      }
    }

    if (this.props.isLoading !== undefined && this.props.isLoading !== prevProps.isLoading) {
      const { isLoading } = this.props;
      this.setState({
        loading: isLoading,
      })
    }

    if (this.props.isDeleted !== undefined && this.props.isDeleted === true
      && this.props.ids !== prevProps.ids) {
      message.success(`Deleted ${this.props.ids.length} items`);
      this.setSttate({ selectedRowKeys: [] });
    }

    if (this.props.dataList && this.props.dataList !== prevProps.dataList) {
      const { dataList } = this.props;
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

  getColumnSearchProps = (dataIndex, title = null) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search by ${title ? title : dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (text),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  handleReset = clearFilters => {
    clearFilters();
  };

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

  // filteredInfo, sortedInfo // from state
  getColumns = (filteredInfo, sortedInfo) => {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        // fixed: 'left',
        filteredValue: filteredInfo.username || null,
        ...this.getColumnSearchProps('username'),
        render: (username, record) =>
          <AvatarAndTitle
            src={record.avatar}
            title={username}
          />,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        // width: '20%',
        filteredValue: filteredInfo.gender || null,
        filters: [
          {
            text: <Tag color='red'>Male</Tag>,
            value: 'MALE',
          },
          {
            text: <Tag color='green'>Female</Tag>,
            value: 'FEMALE',
          },
        ],
        filterMultiple: false,
        render: gender => {
          if (!gender) return 'No';
          let color = 'green';
          let value = ''
          switch (gender) {
            case 'MALE':
              color = 'red';
              value = 'Male'
              break;
            case 'FEMALE':
              color = 'green';
              value = 'Female'
              break;
            default:
              break;
          }
          return (
            <Tag color={color}>{value}</Tag>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        // width: '20%',
        filteredValue: filteredInfo.status || null,
        filters: [
          {
            text: <Tag color='red'>Inactive</Tag>,
            value: 'INACTIVE',
          },
          {
            text: <Tag color='green'>Active</Tag>,
            value: 'ACTIVE',
          },
        ],
        filterMultiple: false,
        render: gender => {
          let color = 'green';
          let value = ''
          switch (gender) {
            case 'INACTIVE':
              color = 'red';
              value = 'Inactive';
              break;
            case 'ACTIVE':
              color = 'green';
              value = 'Active'
              break;
            default:
              break;
          }
          return (
            <Tag color={color}>{value}</Tag>
          );
        },
      },
      {
        title: 'Address',
        dataIndex: 'address',
        // width: '20%',
        filteredValue: filteredInfo.address || null,
        ...this.getColumnSearchProps('address'),
        render: address => address || 'No',
      },
      {
        title: 'Birthday',
        dataIndex: 'birthDay',
        // width: '20%',
        render: birthDay => getDateFormat(birthDay) || 'No',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        filteredValue: filteredInfo.email || null,
        ...this.getColumnSearchProps('email'),
        render: email => email || 'No',
      },
      {
        title: 'Created date',
        dataIndex: 'createdDate',
        // width: '20%',
        sorter: true,
        render: createdDate => getDateFormat(createdDate) || 'No',
      },
      {
        title: 'Create by',
        dataIndex: 'createdBy',
        // width: '20%',
        filteredValue: filteredInfo.createdBy || null,
        ...this.getColumnSearchProps('createdBy', 'created by'),
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
        // width: '20%',
        sorter: true,
        render: lastModifiedDate => getDateFormat(lastModifiedDate),
      },
      {
        title: 'Last modifed by',
        dataIndex: 'lastModifiedBy',
        // width: '20%',
        filteredValue: filteredInfo.lastModifiedBy || null,
        ...this.getColumnSearchProps('lastModifiedBy', 'last modified by'),
        render: lastModifiedBy => (
          <AvatarAndTitle
            src={lastModifiedBy ? lastModifiedBy.avatar : null}
            title={lastModifiedBy ? lastModifiedBy.username : null}
          />
        ),
      },
      {
        title: 'Operations',
        // width: '20%',
        dataIndex: 'id',
        render: (id) => (
          <Button
            onClick={() => this.onEditUser(id)}
            type='default'
            // style={{ background: 'red', borderColor: 'red' }}
            icon={<InfoCircleOutlined />}
            size='small'>Details
          </Button>
        ),
      },
    ];

    return columns;
  }


  render() {
    document.title = 'Users';
    const { data, pagination, loading, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = this.getColumns(filteredInfo, sortedInfo);

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
          <Tooltip placement="topLeft" title='Refresh'>
            <Button
              type='dashed'
              onClick={this.refreshData}
              icon={<ReloadOutlined />}
            />
          </Tooltip>

          <Button onClick={this.toggleModalUserForm} type='default' icon={<DeleteOutlined />}>
            Add
          </Button>
          <UserEdit />

          <Popconfirm
            placement='bottomLeft'
            title={`Are you sure delete ${selectedRowKeys.length} selected items?`}
            onConfirm={this.onDeleteMany}
            disabled={!hasSelected}
          >
            <Button type="danger" icon={<DeleteOutlined />} disabled={!hasSelected} loading={this.props.isLoadingDelete}>
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
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dataList, isLoading, error, isLoadingDelete, isDeleted, ids } = state.user.userList;

  return {
    dataList,
    isLoading,
    error,
    isLoadingDelete,
    isDeleted,
    ids,
  }
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
