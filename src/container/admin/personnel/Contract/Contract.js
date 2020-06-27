import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Checkbox, Breadcrumb, Divider, Col, Row,
} from 'antd';
import {
  FilterTwoTone, UsergroupAddOutlined, UnorderedListOutlined,
  EditTwoTone, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined, UserDeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import * as contractAction from '../../../../action/contractAction';
import { Link, NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { Helmet } from 'react-helmet';

class Contract extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;

    this.state = {
      filteredInfo: {
        contractType: this.contractTypes[0].value,
      },
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} hợp đồng`,
        showQuickJumper: true,
      },
      selectedRowKeys: [],
      columns: this.getColumns({}, {}),
      isColumnsFixed,
      displayFilter: false,
    };
  }

  componentDidMount() {
    const { filteredInfo } = this.state;
    this.props.findManyContracts(filteredInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleted, ids, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeleted !== undefined && isDeleted === true && ids !== prevProps.ids) {
      const { ids } = this.props;
      const description = `Đã xóa ${ids.length} hợp đồng`;

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

  handleTableChange = (pagination, filters, sorter) => {
    let { filteredInfo, sortedInfo } = this.state;
    const { current } = pagination;

    filteredInfo = {
      ...filteredInfo,
      ...filters,
    };

    sortedInfo = sorter;

    this.setState({
      pagination: { ...this.state.pagination, current },
      filteredInfo,
      sortedInfo,
    });

    this.fetchContracts(pagination, filteredInfo, sorter);
  };

  fetchContracts = (pagination, filters, sorter) => {

    filters = getFilterObject(
      ['createdBy', 'lastModifiedBy', 'fullName'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current, pageSize } = pagination;

    this.props.findManyContracts({
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

  clearFilters = () => {
    const filteredInfo = { contractType: this.contractTypes[0].value };
    this.setState({ filteredInfo });
    const { pagination, sortedInfo } = this.state;
    this.fetchContracts(pagination, filteredInfo, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchContracts(pagination, filteredInfo, null);
  };

  refreshData = () => {
    const { pagination, filteredInfo, sortedInfo } = this.state;
    this.fetchContracts(pagination, filteredInfo, sortedInfo)
  }

  clearFiltersAndSorters = () => {
    const filteredInfo = { contractType: this.contractTypes[0].value };
    this.setState({
      filteredInfo,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchContracts(pagination, filteredInfo, null);
  };

  clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  }

  // filteredInfo, sortedInfo from state
  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = false) => ([
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
      title: 'Họ và tên',
      dataIndex: ['personnel', 'fullName'],
      key: 'fullName',
      width: 200,
      minWidth: 200,
      filteredValue: filteredInfo.fullName || null,
      ...getColumnSearchProps(this, 'fullName', 'họ tên'),
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 120,
      minWidth: 120,
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'contractType',
      key: 'contractType',
      width: 200,
      minWidth: 200,
    },
    {
      title: 'Hiệu lực',
      dataIndex: 'validDate',
      key: 'validDate',
      width: 140,
      minWidth: 140,
      render: date => getDateFormat(date) || 'No',
    },
    {
      title: 'Hết hạn',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      width: 140,
      minWidth: 140,
      render: date => getDateFormat(date) || 'No',
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
      ...getColumnSearchProps(this, 'createdBy', 'tạo bởi'),
      render: createdBy => (
        <AvatarAndTitle
          src={createdBy ? createdBy.avatar : null}
          title={createdBy ? createdBy.username : null}
        />
      ),
    },
    {
      title: 'Lần cuối sửa',
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
      ...getColumnSearchProps(this, 'lastModifiedBy', 'sửa bởi'),
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
      width: 120,
      minWidth: 120,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <>
          <Link to={`/admin/personnel/contracts/${id}/update`} >
            <Button
              type='default'
              icon={<EditTwoTone />}
              size='small'
            >Sửa</Button>
          </Link>
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
  }

  onClickToggleFixed = () => {
    this.setState({
      isColumnsFixed: !this.state.isColumnsFixed,
    });
  }

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
  })

  onToggleDisplayFilter = () => {
    this.setState({
      displayFilter: !this.state.displayFilter,
    });
  }

  contractTypes = [
    { value: 'Hợp đồng chính thức', label: <><UsergroupAddOutlined className='icon-option' />Hợp đồng chính thức</> },
    { value: 'Hợp đồng thử việc', label: <><UserDeleteOutlined className='icon-option' />Hợp đồng thử việc</> },
    { value: 'Hợp đồng thời vụ', label: <><UnorderedListOutlined className='icon-option' />Hợp đồng thời vụ</> },
  ];

  ongChangeContractType = (contractType) => {
    let { filteredInfo } = this.state;
    const { pagination, sortedInfo } = this.state;


    filteredInfo = {
      ...filteredInfo,
      contractType,
    }

    this.setState({ filteredInfo });

    this.fetchContracts(pagination, filteredInfo, sortedInfo);
  }

  render() {
    const { data, pagination, selectedRowKeys, isColumnsFixed, displayFilter } = this.state;
    const { isLoading } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const { contractType } = filteredInfo;

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
        <Helmet>
          <title>Hợp đồng</title>
        </Helmet>
        <Breadcrumb className={'MyBreadCrumb'} separator={<Divider type="vertical" />}>
          <Breadcrumb.Item>
            <NavLink to={'/admin/personnel/employees'}>Nhân viên</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to={'/admin/personnel/contracts'}>Hợp đồng</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ marginBottom: 16 }}>
          <Row justify='space-between'>
            <Col span={24} md={{ span: 12 }}>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.onToggleDisplayFilter}
                icon={<FilterTwoTone />}>
              </Button>
              <Button
                style={{ marginRight: '2px' }}
                onClick={this.refreshData}
                icon={<ReloadOutlined />}>
              </Button>
              <Select
                value={contractType}
                onChange={this.ongChangeContractType}
                style={{ width: 200, top: -2 }}
                options={this.contractTypes.map(each => ({ value: each.value, label: each.label }))}
              />
            </Col>
            <Col md={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
              className='actions-right'
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
              <Link to={'/admin/personnel/contracts/create'} >
                <Button style={{ marginRight: '2px' }} type='default' icon={<PlusCircleTwoTone />}>
                  Tạo hợp đồng
                </Button>
              </Link>
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
              Bỏ chọn
            </Button>
            <Button onClick={this.onClickToggleFixed}>
              <Checkbox
                style={{ marginRight: '2px' }}
                checked={this.state.isColumnsFixed}
                defaultChecked={this.state.isColumnsFixed}
                onChange={this.onChangeColumnsFixed}
              />Hiện hành động
            </Button>
          </div>
          <Table
            className='ContractTable'
            style={{ fontSize: '13px', width: '100%' }}
            bordered
            rowSelection={rowSelection}
            components={this.components}
            onRow={this.onRow}
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={pagination}
            loading={{
              spinning: isLoading,
              indicator: (<LoadingOutlined />),
            }}
            onChange={this.handleTableChange}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ contract }) => {
  const { contractList } = contract;
  return { ...contractList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyContracts: (params = {}) => {
      dispatch(contractAction.findManyContracts(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
