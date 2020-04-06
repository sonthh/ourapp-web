import React, { Component } from 'react';
import {
  Breadcrumb, Table, Tag, Input, Button, notification, Avatar, Popconfirm, message, Typography,
  Tooltip,
} from 'antd';
import * as productAction from '../../../action/productAction';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined, DeleteOutlined, ClearOutlined, SortAscendingOutlined, FilterOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { getFilterObject } from '../../../util/get';
import { checkIsEmptyObj } from '../../../util/check';

const { Paragraph } = Typography;

class ProductList extends Component {

  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: [],
    pagination: {},
    loading: true,
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.findManyProducts({});
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps && nextProps.error && nextProps.error !== this.props.error) {
      const { error } = nextProps;

      if (error) {
        notification.error({
          message: 'Notification',
          description: error.message,
          duration: 0,
        });
      }
    }

    if (nextProps && nextProps.isLoading !== this.props.isLoading) {
      const { isLoading } = nextProps;

      this.setState({
        loading: isLoading,
      })
    }

    if (nextProps && nextProps.dataList && nextProps.dataList !== this.props.dataList) {

      const { dataList } = nextProps;
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

    this.fetchProducts(pagination, filters, sorter);
  };

  fetchProducts = (pagination, filters, sorter) => {

    filters = getFilterObject(['status', 'name', 'price', 'createdBy'], filters);

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current, pageSize } = pagination;

    this.props.findManyProducts({
      currentPage: current,
      limit: pageSize,
      sortBy,
      sortDirection,
      ...filters,
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search by ${dataIndex}`}
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
    onFilter: (value, record) => {
      let cellValue = record[dataIndex];

      if (dataIndex === 'createdBy') {
        cellValue = cellValue['username'];
      }

      const filter = cellValue
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());

      return filter;
    },
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
    message.success(`Deleted ${selectedRowKeys.length} items`);
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
    const { pagination, sortedInfo } = this.state;
    this.fetchProducts(pagination, null, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchProducts(pagination, filteredInfo, null);
  };

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchProducts(pagination, null, null);
  };

  getColumns = (filteredInfo, sortedInfo) => {    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
        filteredValue: filteredInfo.name || null,
        ...this.getColumnSearchProps('name'),
        render: name => (
          <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ' }}>{name}</Paragraph>
        )
      },
      {
        title: 'Price',
        dataIndex: 'price',
        sorter: true,
        width: '20%',
        key: 'price',
        filteredValue: filteredInfo.price || null,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        ...this.getColumnSearchProps('price'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: '20%',
        filteredValue: filteredInfo.status || null,
        filters: [
          {
            text: <Tag color='red'>OUT OF STOCK</Tag>,
            value: 'OUT_OF_STOCK',
          },
          {
            text: <Tag color='green'>AVAILABLE</Tag>,
            value: 'AVAILABLE',
          },
        ],
        filterMultiple: false,
        render: status => {
          let color = 'green';
          let value = ''
          switch (status) {
            case 'OUT_OF_STOCK':
              color = 'red';
              value = 'OUT OF STOCK'
              break;
            case 'AVAILABLE':
              color = 'green';
              value = 'AVAILABLE'
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
        title: 'Create by',
        dataIndex: 'createdBy',
        width: '20%',
        filteredValue: filteredInfo.createdBy || null,
        ...this.getColumnSearchProps('createdBy'),
        render: createdBy => (
          <>
            <Avatar src={createdBy.avatar} />
            <span style={{ paddingLeft: '10px' }}>{createdBy.username}</span>
          </>
        ),
      },
      {
        title: 'Action',
        width: '20%',
        dataIndex: 'id',
        render: () => (
          <Button
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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
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
          <Popconfirm
            placement='bottomLeft'
            title={`Are you sure delete ${selectedRowKeys.length} selected products?`}
            onConfirm={this.onDeleteMany}
          >
            <Button type="danger" icon={<DeleteOutlined />} disabled={!hasSelected} loading={false}>
              Delete
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
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
  const { dataList, isLoading, error } = state.product.productList;

  return {
    dataList,
    isLoading,
    error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findManyProducts: (params = {}) => {
      dispatch(productAction.findManyProducts(params));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
