import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Popconfirm, Typography, Checkbox, Space, Breadcrumb, Divider, Col, Row,
} from 'antd';
import {
  DeleteOutlined, DeleteTwoTone, MailTwoTone, FilterTwoTone, UsergroupAddOutlined, UnorderedListOutlined,
  EditTwoTone, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined, UserDeleteOutlined, DownloadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import GenderTag from '../../../../component/common/GenderTag';
import StatusTag from '../../../../component/common/StatusTag';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import MyAvatar from '../../../../component/common/MyAvatar';
import * as personnelAction from '../../../../action/personnelAction';
import { Link, NavLink } from 'react-router-dom';
import { Select } from 'antd';

const { Option } = Select;
const Paragraph = Typography.Paragraph;

class PersonnelList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      data: [],
      pagination: {
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} personnel`,
        showQuickJumper: true,
      },
      selectedRowKeys: [],
      columns: this.getColumns({}, {}),
      isColumnsFixed,
      displayFilter: false,
    };
  }

  componentDidMount() {
    this.props.findManyPersonnel({});
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isDeleted, ids, dataList } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Notification',
          description: 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isDeleted !== undefined && isDeleted === true && ids !== prevProps.ids) {
      const { ids } = this.props;
      const description = `Deleted ${ids.length} user${ids.length > 1 ? 's' : ''}`;

      notification.success({
        message: 'SUCCESS',
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
    console.log(filters, sorter);

    const { current } = pagination;

    this.setState({
      pagination: { ...this.state.pagination, current },
      filteredInfo: filters,
      sortedInfo: sorter,
    });

    this.fetchPersonnel(pagination, filters, sorter);
  };

  fetchPersonnel = (pagination, filters, sorter) => {

    filters = getFilterObject(
      ['gender', 'username', 'createdBy', 'lastModifiedBy', 'address', 'status',
        'email', 'identification', 'phoneNumber', 'fullName', 'position', 'degree', 'department', 'branch'],
      filters,
    );

    const sortDirection = (sorter && sorter.order && sorter.order === 'ascend') ? 'ASC' : 'DESC';
    const sortBy = (sorter && sorter.order && sorter.field) ? sorter.field : 'id';
    const { current, pageSize } = pagination;

    this.props.findManyPersonnel({
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
    // const { selectedRowKeys } = this.state;
    // this.props.deleteManyUsers(selectedRowKeys);
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
    const { pagination, sortedInfo } = this.state;
    this.fetchPersonnel(pagination, null, sortedInfo);
  };

  clearSorters = () => {
    this.setState({ sortedInfo: null });
    const { pagination, filteredInfo } = this.state;
    this.fetchPersonnel(pagination, filteredInfo, null);
  };

  refreshData = () => {
    const { pagination, filteredInfo, sortedInfo } = this.state;
    this.fetchPersonnel(pagination, filteredInfo, sortedInfo)
  }

  clearFiltersAndSorters = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });

    const { pagination } = this.state;
    this.fetchPersonnel(pagination, null, null);
  };

  clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  }

  // filteredInfo, sortedInfo from state
  getColumns = (filteredInfo, sortedInfo, isColumnsFixed = false) => ([
    {
      title: 'Ảnh',
      dataIndex: ['user', 'username'],
      key: 'avatar',
      width: 75,
      minWidth: 75,
      fixed: isColumnsFixed ? 'left' : null,
      render: (username, record) => (
        <MyAvatar src={record.avatar} title={username} />
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: ['user', 'fullName'],
      key: 'fullName',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.fullName || null,
      ...getColumnSearchProps(this, 'fullName'),
      render: fullName => fullName || 'No',
    },
    {
      title: 'Chức danh',
      dataIndex: 'position',
      key: 'position',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.position || null,
      ...getColumnSearchProps(this, 'position'),
      render: position => position || 'No',
    },
    {
      title: 'Phòng ban',
      dataIndex: ['department', 'name'],
      key: 'department',
      width: 240,
      minWidth: 240,
      filteredValue: filteredInfo.department || null,
      ...getColumnSearchProps(this, 'department'),
      render: department => department || 'No',
    },
    {
      title: 'Chi nhánh',
      dataIndex: ['department', 'branch', 'name'],
      key: 'branch',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.branch || null,
      ...getColumnSearchProps(this, 'branch'),
      render: branch => branch || 'No',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.degree || null,
      ...getColumnSearchProps(this, 'degree'),
      render: degree => degree || 'No',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      minWidth: 200,
      filteredValue: filteredInfo.description || null,
      ...getColumnSearchProps(this, 'description'),
      render: (description) => (
        description ?
          <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ', rows: 1 }}>{description}</Paragraph>
          : 'No'
      ),
    },
    {
      title: 'Sinh nhật',
      dataIndex: ['user', 'birthDay'],
      key: 'birthDay',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'birthDay' && sortedInfo.order,
      width: 140,
      minWidth: 140,
      render: birthDay => getDateFormat(birthDay) || 'No',
    },
    {
      title: 'Username',
      dataIndex: ['user', 'username'],
      key: 'username',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.username || null,
      ...getColumnSearchProps(this, 'username'),
      render: (username) => (
        <Paragraph style={{ marginBottom: 0 }} ellipsis={{ suffix: ' ', rows: 1 }}>{username}</Paragraph>
      ),
    },
    {
      title: 'Identification',
      dataIndex: ['user', 'identification'],
      key: 'identification',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.identification || null,
      ...getColumnSearchProps(this, 'identification'),
      render: identification => identification || 'No',
    },
    {
      title: 'Gender',
      dataIndex: ['user', 'gender'],
      key: 'gender',
      width: 95,
      minWidth: 95,
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
      dataIndex: ['user', 'status'],
      key: 'status',
      width: 95,
      minWidth: 95,
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
      dataIndex: ['user', 'address'],
      key: 'address',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.address || null,
      ...getColumnSearchProps(this, 'address'),
      render: address => address || 'No',
    },
    {
      title: 'Phone number',
      dataIndex: ['user', 'phoneNumber'],
      key: 'phoneNumber',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.phoneNumber || null,
      ...getColumnSearchProps(this, 'phoneNumber', 'Phone number'),
      render: phoneNumber => phoneNumber || 'No',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
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
      width: 120,
      minWidth: 120,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <Space key={id}>
          <Link to={{ pathname: `/admin/personnel/manage/${id}/edit`, state: { background: this.props.location } }} >
            <Button
              type='default'
              icon={<EditTwoTone />}
              size='small'
            />
          </Link>
          <Button
            type='default'
            icon={<DeleteTwoTone />}
            size='small'
          />
          <Button
            type='default'
            icon={<MailTwoTone />}
            size='small'
          />
        </Space>
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
                defaultValue="-1"
                onChange={null}
                style={{ width: 160, top: '-1px' }}
              >
                <Option value="1"><UsergroupAddOutlined className='icon-option' />Đang làm việc</Option>
                <Option value="0"><UserDeleteOutlined className='icon-option' />Nghỉ việc</Option>
                <Option value="-1"><UnorderedListOutlined className='icon-option' />Tất cả</Option>
              </Select>
            </Col>
            <Col md={{ span: 12 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <span style={{ marginRight: '8px', lineHeight: '30px' }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>
              <Link to={'/admin/personnel/create'} >
                <Button style={{ marginRight: '2px' }} type='default' icon={<PlusCircleTwoTone />}>
                  Tạo mới
                </Button>
              </Link>
              <Button style={{ marginRight: '2px' }} type='default' icon={<DownloadOutlined />}>
                Xuất excel
                </Button>
              <Popconfirm
                placement='bottomLeft'
                title={`Are you sure delete ${selectedRowKeys.length} selected items?`}
                onConfirm={this.onDeleteMany}
                disabled={!hasSelected}
              >
                <Button type='danger' icon={<DeleteOutlined />} disabled={!hasSelected} loading={this.props.isLoadingDelete}>
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
              Reset sắp xếp
              </Button>
            <Button
              onClick={this.clearFilters}
              disabled={checkIsEmptyObj(filteredInfo)}
            >
              Reset filter
              </Button>
            <Button
              onClick={this.clearFiltersAndSorters}
              disabled={
                checkIsEmptyObj(filteredInfo || checkIsEmptyObj(sortedInfo))
                || checkIsEmptyObj(filteredInfo) || !sortedInfo.order
              }
            >
              Reset filter và sắp xếp
            </Button>
            <Button
              onClick={this.clearSelected}
              disabled={selectedRowKeys.length === 0}
            >
              Bỏ chọn tất cả
            </Button>
            <Button onClick={this.onClickToggleFixed}>
              <Checkbox
                style={{ marginRight: '2px' }}
                checked={this.state.isColumnsFixed}
                defaultChecked={this.state.isColumnsFixed}
                onChange={this.onChangeColumnsFixed}
              />Fixed operations
            </Button>
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

const mapStateToProps = ({ personnel }) => {
  const { personnelList } = personnel;
  return { ...personnelList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyPersonnel: (params = {}) => {
      dispatch(personnelAction.findManyPersonnel(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelList);
