import { Spin, Tabs, Row, Col, Upload, Avatar, Menu, message, Button, notification, Table } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone, UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from 'react-icons/fa';
import { GiPositionMarker } from 'react-icons/gi';
import UpdateBasicInfoForm from '../UpdateBasicInfoForm/UpdateBasicInfoForm';
import UpdateWorkingTimeForm from '../UpdateWorkingTimeForm/UpdateWorkingTimeForm';
import UpdateQualificationForm from '../UpdateQualificationForm/UpdateQualificationForm';
import UpdateCertificationForm from '../UpdateCertificationForm/UpdateCertificationForm';
import UpdateWorkHistoryForm from '../UpdateWorkHistoryForm/UpdateWorkHistoryForm';
import UpdateContactInfoForm from '../UpdateContactInfoForm/UpdateContactInfoForm';
import UpdateHeathyStatusForm from '../UpdateHealthyStatusForm/UpdateHealthyStatusForm';
import UpdateAdditionalInfoForm from '../UpdateAdditionalInfoForm/UpdateAdditionalInfoForm';
import * as personnelAction from '../../../../action/personnelAction';
import * as contractAction from '../../../../action/contractAction';
import { getDateFormat } from '../../../../util/date';
import { NavLink, Link } from 'react-router-dom';
import { getBase64Url } from '../../../../util/file';
import UpdateSalaryForm from '../UpdateSalaryForm/UpdateSalaryForm';
import UpdateAllowanceForm from '../UpdateAllowanceForm/UpdateAllowanceForm';

const { TabPane } = Tabs;
const { Title } = Typography;

class PersonnelUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarFile: null,
      avatarUrl: null,
      displayUploadButton: false,
      fullName: 'Tên nhân viên',
      phoneNumber: 'Số điện thoại',
      email: 'Email',
      birthDay: 'Sinh nhật',
      address: 'Địa chỉ',
      hash: '#basic-info',
    }
  }

  componentDidMount() {
    const hash = window.location.hash;
    if (hash && hash !== '') {
      this.setState({ hash });
    }

    const { id } = this.props.match.params;
    if (id) {
      this.props.findOnePersonnel(id);
      this.props.findManyContracts({ personnelId: id });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { item, avatarUrl } = this.props;

    if (item !== prevProps.item) {
      let { fullName, phoneNumber, email, birthDay, contactInfo, avatar } = item;
      const address = (contactInfo && contactInfo.address) ? contactInfo.address : 'Địa chỉ';
      fullName = fullName || 'Tên nhân viên';
      phoneNumber = phoneNumber || 'Số điện thoại';
      email = email || 'Email';
      birthDay = birthDay ? getDateFormat(birthDay) : 'Sinh nhật'

      this.setState({
        fullName, phoneNumber, email, birthDay, address, avatarUrl: avatar,
      });
    }

    if (avatarUrl && avatarUrl !== prevProps.avatarUrl) {
      this.setState({ avatarUrl, avatarFile: null, displayUploadButton: false });

      notification.success({
        message: 'Thành công',
        description: 'Chỉnh sửa ảnh thành công',
        duration: 2.5,
      });
    }
  }

  onBasinInfoChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  onClickMenu = ({ item, key, keyPath, domEvent }) => {
    this.setState({ hash: key });
  }

  onChangeTab = (key) => {
    this.setState({ hash: key });
  }

  menu = [
    {
      hash: '#basic-info',
      title: 'Thông tin cơ bản',
      component: <UpdateBasicInfoForm personnelId={this.props.match.params.id} onFieldsChange={this.onBasinInfoChange} />,
    },
    {
      hash: '#working-time',
      title: 'Thời gian làm việc',
      component: <UpdateWorkingTimeForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#qualification',
      title: 'Trình độ chuyên môn',
      component: <UpdateQualificationForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#certification',
      title: 'Chứng chỉ chuyên ngành',
      component: <UpdateCertificationForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#work-history',
      title: 'Lịch sử làm việc',
      component: <UpdateWorkHistoryForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#salary',
      title: 'Lương',
      component: <UpdateSalaryForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#allowance',
      title: 'Trợ cấp',
      component: <UpdateAllowanceForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#healthy-status',
      title: 'Tình trạng sức khỏe',
      component: <UpdateHeathyStatusForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#contact-info',
      title: 'Thông tin liên hệ',
      component: <UpdateContactInfoForm personnelId={this.props.match.params.id} />,
    },
    {
      hash: '#other',
      title: 'Thông tin khác',
      component: <UpdateAdditionalInfoForm personnelId={this.props.match.params.id} />,
    },
  ];

  renderTabContent = (hash) => {
    const item = this.menu.find(each => each.hash === hash);

    if (item && item.component)
      return item.component;

    return null;
  }

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    getBase64Url(file).then(avatarUrl => this.setState({ avatarUrl, displayUploadButton: true }));

    this.setState({
      avatarFile: file,
    });

    return false;
  }

  onUploadAvatar = () => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }


    const { avatarFile } = this.state;

    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      const { id: personnelId } = item;
      this.props.updateAvatar(personnelId, formData);
    }
  }

  columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'STT',
      width: 75,
      minWidth: 75,
      render: (text, record, index) => {
        return <div>{index + 1}</div>
      }
    },
    {
      title: 'Họ và tên',
      dataIndex: ['personnel', 'fullName'],
      key: 'personnel.fullName',
      width: 75,
      minWidth: 75,
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      width: 75,
      minWidth: 75,
    },
    {
      title: 'Loại hợp đồng',
      dataIndex: 'contractType',
      key: 'contractType',
      width: 75,
      minWidth: 75,
    },
    {
      title: 'Hiệu lực',
      dataIndex: 'validDate',
      key: 'validDate',
      width: 75,
      minWidth: 75,
      render: date => getDateFormat(date) || 'No',
    },
    {
      title: 'Hết hạn',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      width: 75,
      minWidth: 75,
      render: date => getDateFormat(date) || 'No',
    },
    {
      title: 'Hành động',
      key: 'operation',
      width: 100,
      minWidth: 100,
      dataIndex: 'id',
      render: (id) => (
        <>
          <Link to={`/admin/personnel/contracts/${id}/update`} >
            <Button
              type='default'
              icon={<EyeOutlined />}
              size='small'
            >Xem
            </Button>
          </Link>
        </>
      ),
    },
  ];

  render() {
    const { isLoading, isUploadingAvatar } = this.props;
    const { fullName, phoneNumber, email, birthDay, address = 'Địa chỉ', hash, avatarUrl, displayUploadButton } = this.state;
    const isBasicInfoTab = !['#contract'].includes(hash);
    return (
      <>
        <Row style={{ padding: '0 35px' }} className='personnel-header'>
          <Col span={24} lg={{ span: 6 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              loading={isUploadingAvatar}
              onClick={this.onUploadAvatar}
              className={`${displayUploadButton === false ? 'd-none' : ''}`}
              icon={<UploadOutlined />}
              style={{ alignSelf: 'center' }}
              type='primary'
              size='small'
            />
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {avatarUrl ?
                (
                  <Spin
                    spinning={false}
                    indicator={<LoadingOutlined />}
                    size='large'>
                    <Avatar shape='circle' size={130} src={avatarUrl}></Avatar>
                  </Spin>
                )
                : (
                  <div>
                    <PlusOutlined />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
            </Upload>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-left'>
            <Title className='fullname' level={3}>{fullName}</Title>
            <div>
              <PhoneTwoTone /> <span>{phoneNumber}</span>
            </div>
            <div>
              <MailTwoTone /> <span>{email}</span>
            </div>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-right'>
            <div>
              <FaBirthdayCake className='custom-icon' /> <span>{birthDay}</span>
            </div>
            <div>
              <GiPositionMarker className='custom-icon' /> <span>{address}</span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>

          <Tabs className='personnel-tabs' onChange={this.onChangeTab}>
            <TabPane tab='Hồ sơ' key='#basic-info' />
            <TabPane tab='Hợp đồng' key='#contract' />
          </Tabs>
          {
            isBasicInfoTab ? (
              <Col span={24} lg={{ span: 4 }}>
                <Menu
                  className='basic-info-menu'
                  style={{ fontSize: 14 }}
                  selectedKeys={[hash]}
                  mode='inline'
                  theme='light'
                >
                  {
                    this.menu.map(each => (
                      <Menu.Item
                        key={each.hash}
                        onClick={this.onClickMenu}
                      >
                        <NavLink to={{ hash: each.hash }}>{each.title}</NavLink>
                      </Menu.Item>
                    ))
                  }
                </Menu>
              </Col>
            ) : null
          }
          <Col span={isBasicInfoTab ? 20 : 24}
            className={'tabContent'}
          >
            <Spin
              spinning={isLoading}
              indicator={<LoadingOutlined />}
            >
              {isBasicInfoTab ? this.renderTabContent(hash) :
                (<Table
                  style={{ fontSize: '13px', width: '100%' }}
                  bordered
                  locale={{
                    emptyText: (
                      <div style={{ padding: '20px 0' }}>
                        Chưa có hợp đồng nào.
                      </div>
                    ),
                  }}
                  pagination={false}
                  columns={this.columns}
                  rowKey={record => record.id}
                  dataSource={this.props.contracts}
                  loading={{
                    spinning: false,
                    indicator: <LoadingOutlined />,
                  }}
                  scroll={{ x: 'max-content' }}
                />)
              }
            </Spin>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ personnel, contract }) => {
  const { personnelItem } = personnel;
  const { contractList } = contract;

  return {
    ...personnelItem,
    contracts: contractList.dataList.content,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
    updateAvatar: (personnelId, formData) => dispatch(personnelAction.updateAvatar(personnelId, formData)),
    findManyContracts: (params) => dispatch(contractAction.findManyContracts(params)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelUpdate);
