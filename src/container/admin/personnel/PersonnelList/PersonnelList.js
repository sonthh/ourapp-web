import React, { Component } from 'react';
import './index.scss';
import {
  Table, Button, notification, Popconfirm, Typography, Checkbox, Breadcrumb, Divider, Col, Row, Dropdown, Menu,
} from 'antd';
import {
  DeleteOutlined, DeleteTwoTone, FilterTwoTone, UsergroupAddOutlined,
  EditTwoTone, ReloadOutlined, PlusCircleTwoTone, LoadingOutlined, UserDeleteOutlined, DownloadOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { getFilterObject } from '../../../../util/get';
import { checkIsEmptyObj } from '../../../../util/check';
import { getDateFormat } from '../../../../util/date';
import AvatarAndTitle from '../../../../component/common/AvatarAndTitle';
import GenderTag from '../../../../component/common/GenderTag';
import { getColumnSearchProps } from '../../../../util/table';
import { ResizeableTitle } from '../../../../component/common/ResizeableTitle';
import MyAvatar from '../../../../component/common/MyAvatar';
import * as personnelAction from '../../../../action/personnelAction';
import * as departmentAction from '../../../../action/departmentAction';
import { Link, NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { Helmet } from 'react-helmet';
import axios from '../../../../service/apiConfig';
import FileSaver from 'file-saver';

const { Option } = Select;
const { Paragraph } = Typography;

class PersonnelList extends Component {

  constructor(props) {
    super(props);

    const isColumnsFixed = localStorage.getItem('isColumnsFixed') === 'true' || false;

    this.state = {
      filteredInfo: {
        isStopWork: false,
        departmentId: null,
      },
      sortedInfo: {},
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
    this.props.findManyPersonnel({});
    this.props.findManyDepartments({});
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

    this.fetchPersonnel(pagination, filteredInfo, sortedInfo);
  };

  fetchPersonnel = (pagination, filters, sorter) => {

    filters = getFilterObject(
      ['gender', 'createdBy', 'lastModifiedBy', 'email', 'phoneNumber', 'fullName', 'position', 'department'],
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
    this.fetchPersonnel(pagination, filteredInfo, sortedInfo);
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
      dataIndex: 'avatar',
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
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      minWidth: 200,
      filteredValue: filteredInfo.fullName || null,
      ...getColumnSearchProps(this, 'fullName', 'họ tên'),
      render: fullName => fullName || 'No',
    },
    {
      title: 'Chức danh',
      dataIndex: 'position',
      key: 'position',
      width: 140,
      minWidth: 140,
      filteredValue: filteredInfo.position || null,
      ...getColumnSearchProps(this, 'position', 'chức danh'),
      render: position => position || 'No',
    },
    {
      title: 'Phòng ban',
      dataIndex: ['department', 'name'],
      key: 'department',
      width: 240,
      minWidth: 240,
      filteredValue: filteredInfo.department || null,
      render: department => department || 'No',
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
      title: 'Gender',
      dataIndex: 'gender',
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
      title: 'Số ĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
      minWidth: 150,
      filteredValue: filteredInfo.phoneNumber || null,
      ...getColumnSearchProps(this, 'phoneNumber', 'số ĐT'),
      render: phoneNumber => phoneNumber || 'No',
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
      width: 120,
      minWidth: 120,
      dataIndex: 'id',
      fixed: isColumnsFixed ? 'right' : null,
      render: (id) => (
        <>
          <Link to={`/admin/personnel/${id}/update`} >
            <Button
              style={{ marginRight: 4 }}
              type='default'
              icon={<EditTwoTone />}
              size='small'
            />
          </Link>
          <Popconfirm
            icon={<DeleteOutlined />}
            placement='bottomRight'
            title={`Bạn có muốn xóa nhân viên này`}
            onConfirm={() => this.handleDeleteOnePersonnel(id)}
          >
            <Button
              loading={this.props.isDeletingOnePersonnel && this.props.isDeletingOnePersonnelId === id}
              type='default'
              icon={<DeleteTwoTone />}
              size='small'
            />
          </Popconfirm>
        </>
      ),
    },
  ]);

  handleDeleteOnePersonnel = (id) => {
    this.props.deleteOnePersonnel(id);
  }

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

  exportExcel = () => {
    axios.get(`http://0.0.0.0:8080/api/v1/personnel/export/list`, {
      responseType: 'blob',
    })
      .then((response) => {
        console.log(response);
        const blob = new Blob([response.data]);
        FileSaver.saveAs(blob, 'abc.xlsx');
      });
  }

  exportExcelMenu = (
    <Menu>
      <Menu.Item onClick={this.exportExcel}>
        <span style={{ color: '#1890ff' }}><DownloadOutlined />Nhân viên được chọn</span>
      </Menu.Item>
      <Menu.Item>
        <span style={{ color: '#1890ff' }}><DownloadOutlined />Bộ lọc</span>
      </Menu.Item>
    </Menu>
  );

  ongChangeWorkStatus = (isStopWork) => {
    let { filteredInfo } = this.state;
    const { pagination, sortedInfo } = this.state;


    filteredInfo = {
      ...filteredInfo,
      isStopWork,
    }

    this.setState({ filteredInfo });

    this.fetchPersonnel(pagination, filteredInfo, sortedInfo);
  }

  ongChangeDepartment = (departmentId) => {
    let { filteredInfo } = this.state;
    const { pagination, sortedInfo } = this.state;


    filteredInfo = {
      ...filteredInfo,
      departmentId,
    }

    this.setState({ filteredInfo });

    this.fetchPersonnel(pagination, filteredInfo, sortedInfo);
  }

  render() {
    const { data, pagination, selectedRowKeys, isColumnsFixed, displayFilter } = this.state;
    const { isLoading, departments = [] } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    let { isStopWork = false, departmentId = null } = filteredInfo;

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
          <title>Nhân viên</title>
        </Helmet>
        <Breadcrumb className={'MyBreadCrumb'} separator={<Divider type='vertical' />}>
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
                value={isStopWork}
                onChange={this.ongChangeWorkStatus}
                style={{ width: 160, top: '-1px', marginRight: '2px' }}
              >
                <Option value={false}><UsergroupAddOutlined className='icon-option' />Đang làm việc</Option>
                <Option value={true}><UserDeleteOutlined className='icon-option' />Nghỉ việc</Option>
              </Select>
              <Select
                value={departmentId}
                onChange={this.ongChangeDepartment}
                style={{ width: 200, top: '-1px' }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={null}>Tất cả</Option>
                {
                  departments.map(({ id, name }) => (
                    <Option value={id}>{name}</Option>
                  ))
                }
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
                  Tạo mới NV
                </Button>
              </Link>
              <Dropdown overlay={this.exportExcelMenu} placement='bottomLeft'>
                <Button style={{ marginRight: '2px' }} type='default' icon={<DownloadOutlined />}>
                  Xuất excel
                </Button>
              </Dropdown>
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
            locale={{
              emptyText: (
                <div style={{ padding: '20px 0' }}>
                  Không có dữ liệu
                </div>
              )
            }}
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

const mapStateToProps = ({ personnel, department }) => {
  const { personnelList } = personnel;
  const { departmentList, } = department;

  return {
    ...personnelList,
    departments: departmentList.dataList.content,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findManyPersonnel: (params = {}) => dispatch(personnelAction.findManyPersonnel(params)),
    deleteOnePersonnel: (id) => dispatch(personnelAction.delteOnePersonnel(id)),
    findManyDepartments: () => dispatch(departmentAction.findManyDepartments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelList);
