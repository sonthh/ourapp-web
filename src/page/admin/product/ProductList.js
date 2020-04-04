import React, { Component } from 'react';
import { Breadcrumb, Table, Tag, Input, Button, notification, Avatar, Popconfirm, message } from 'antd';
import * as productAction from '../../../action/productAction';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { getFilterObject } from '../../../util/get';
import * as config from '../../../constant/config';

class ProductList extends Component {

  state = {
    data: [],
    pagination: {},
    loading: true,
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

    const { current, pageSize } = pagination;

    this.setState({
      pagination: { ...this.state.pagination, current },
    });

    filters = getFilterObject(['status', 'name', 'price', 'createdBy'], filters);

    const offset = (current - 1) * pageSize;
    const sortDirection = (sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';

    this.props.findManyProducts({
      offset,
      limit: pageSize,
      sortBy: sorter.field,
      sortDirection,
      ...filters,
    });
  };

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

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      ...this.getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      width: '20%',
      ...this.getColumnSearchProps('price'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
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
      ...this.getColumnSearchProps('createdBy'),
      render: createdBy => (
        <>
          <Avatar src={`${config.FILE_URL}/${createdBy.avatar}`} />
          <span style={{ paddingLeft: '10px' }}>{createdBy.username}</span>
        </>
      ),
    },
    {
      title: 'Action',
      width: '20%',
      dataIndex: 'id',
      render: (text, record, index) => (
        <Popconfirm
          title="Are you sure delete this product?"
          onConfirm={() => this.confirmDelete(record, index)}
        >
          <Button
            type='primary'
            style={{ background: 'red', borderColor: 'red' }}
            icon={<DeleteOutlined />}
            size='small'>Delete
        </Button>
        </Popconfirm>
      ),
    },
  ];

  confirmDelete = (record, index) => {
    message.success(`Deleted ${record.name}`);
  }

  render() {
    const { data, pagination, loading } = this.state;

    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          title={() => 'List of products'}
          columns={this.columns}
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
