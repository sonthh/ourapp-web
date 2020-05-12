import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Tooltip, Checkbox
} from 'antd';
import {
  ClearOutlined, SortAscendingOutlined, FilterOutlined,
  EditTwoTone, CheckSquareOutlined, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import * as branchAction from '../../../../action/branchAction';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import { Link } from 'react-router-dom';

class BranchList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} branches`,
        showQuickJumper: true,
      },
      selectedRowKeys: [],
      columns: this.getColumns({}, {}),
      isColumnsFixed,
    };
  }

  componentDidMount() {
    this.props.findManyBranches({});
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeletedManyUser, isDeletedOneUser, deletedIds, deletedId, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Notification',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeletedOneUser !== undefined && isDeletedOneUser === true
      && deletedId !== prevProps.deletedId) {

      const description = `Deleted successfully`;
      notification.success({
        message: 'SUCCESS',
        description,
        duration: 2.5,
      });
    }

    if (isDeletedManyUser !== undefined && isDeletedManyUser === true
      && deletedIds !== prevProps.deletedIds) {

      const { deletedIds } = this.props;
      const description = `Deleted ${deletedIds.length} user${deletedIds.length > 1 ? 's' : ''} successfully`;

      notification.success({
        message: 'SUCCESS',
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

    this.fetchBranches(pagination, filters, sorter);
  };

  fetchBranches = (pagination, filters, sorter) => {
    filters = getFilterObject(
      ['location', 'description', 'createdBy', 'lastModifiedBy'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current: currentPage, pageSize: limit } = pagination;

    this.props.findManyBranches({
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
    this.fetchBranches(pagination, null, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchBranches(pagination, filteredInfo, null);
  };

  refreshData = () => {
    const { pagination, filteredInfo, sortedInfo } = this.state;
    this.fetchBranches(pagination, filteredInfo, sortedInfo)
  };

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchBranches(pagination, null, null);
  };

  clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  // filteredInfo, sortedInfo from state
  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = false) => ([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      minWidth: 200,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 200,
      minWidth: 200,
      filteredValue: filteredInfo.username || null,
      ...getColumnSearchProps(this, 'location'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      minWidth: 200,
      filteredValue: filteredInfo.fullName || null,
      ...getColumnSearchProps(this, 'description'),
      render: description => description || 'No',
    },
    {
      title: 'Created date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      width: 140,
      minWidth: 140,
      render: createdDate => getDateFormat(createdDate) || 'No',
    },
    {
      title: 'Create by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 190,
      minWidth: 190,
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
      width: 160,
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
      width: 190,
      minWidth: 190,
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
      minWidth: 100,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <Link to={{ pathname: `/admin/branch/manage/${id}/edit`, state: { background: this.props.location } }} >
          <Button
            type='default'
            icon={<EditTwoTone />}
            size='small'
          />
        </Link>
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

  onRow = (record, rowIndex) => ({
    onDoubleClick: event => {
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

  render() {
    const { data, pagination, selectedRowKeys, isColumnsFixed } = this.state;
    const { isLoading: isLoadingTable, location } = this.props;

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
        <div style={{ marginBottom: 16 }}>
          <Tooltip placement='topLeft' title='Clear sorters'>
            <Button
              type='dashed'
              onClick={this.clearSorters}
              icon={<ClearOutlined />}
              disabled={checkIsEmptyObj(sortedInfo) || !sortedInfo.order}
            >
              <SortAscendingOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement='topLeft' title='Clear filters'>
            <Button
              type='dashed'
              onClick={this.clearFilters}
              icon={<ClearOutlined />}
              disabled={checkIsEmptyObj(filteredInfo)}
            >
              <FilterOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement='topLeft' title='Clear sorters and filters'>
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
          <Tooltip placement='topLeft' title='Clear selected'>
            <Button
              type='dashed'
              onClick={this.clearSelected}
              icon={<ClearOutlined />}
              disabled={selectedRowKeys.length === 0}
            >
              <CheckSquareOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement='topLeft' title='Fixed columns'>
            <Button type='dashed' onClick={this.onClickToggleFixed}>
              <Checkbox
                checked={isColumnsFixed}
                defaultChecked={isColumnsFixed}
                onChange={this.onChangeColumnsFixed}
              />
            </Button>
          </Tooltip>
          <Tooltip placement='topLeft' title='Refresh'>
            <Button
              type='dashed'
              onClick={this.refreshData}>
              <ReloadOutlined />
            </Button>
          </Tooltip>
          <Link to={{ pathname: '/admin/branch/manage/add', state: { background: location } }} >
            <Button type='default' icon={<PlusCircleTwoTone />}>
              Add
          </Button>
          </Link>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          style={{ fontSize: '13px' }}
          bordered
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
      </>
    );
  }
}

const mapStateToProps = ({ branch }) => {
  const { branchList } = branch;

  return {
    ...branchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyBranches: (params = {}) => dispatch(branchAction.findManyBranches(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchList);
