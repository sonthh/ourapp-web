import { Spin, Tabs, Row, Col, Upload, Avatar, Menu, message, Button, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone, UploadOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import UpdateBasicInfoForm from '../UpdateBasicInfoForm/UpdateBasicInfoForm';
import UpdateWorkingTimeForm from '../UpdateWorkingTimeForm/UpdateWorkingTimeForm';
import UpdateQualificationForm from '../UpdateQualificationForm/UpdateQualificationForm';
import UpdateCertificationForm from '../UpdateCertificationForm/UpdateCertificationForm';
import UpdateWorkHistoryForm from '../UpdateWorkHistoryForm/UpdateWorkHistoryForm';
import UpdateContactInfoForm from '../UpdateContactInfoForm/UpdateContactInfoForm';
import * as personnelAction from '../../../../action/personnelAction';
import { getDateFormat } from '../../../../util/date';
import { NavLink } from 'react-router-dom';
import { getBase64Url } from '../../../../util/file';

const { TabPane } = Tabs;
const { Title } = Typography;

class PersonnelUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarFile: null,
      avatarUrl: null,
      displayUploadButton: false,
      fullName: '',
      phoneNumber: '',
      email: '',
      birthDay: '',
      address: '',
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { item, avatarUrl } = this.props;

    if (item !== prevProps.item) {
      const { fullName, phoneNumber, email, birthDay, contactInfo, avatar } = item;
      const address = (contactInfo && contactInfo.address) ? contactInfo.address : 'Địa chỉ';

      this.setState({
        fullName, phoneNumber, email, birthDay: getDateFormat(birthDay), address, avatarUrl: avatar,
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
      hash: '#contact-info',
      title: 'Thông tin liên hệ',
      component: <UpdateContactInfoForm personnelId={this.props.match.params.id} />,
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

  render() {
    const { isLoading, isUploadingAvatar } = this.props;
    const { fullName, phoneNumber, email, birthDay, address = 'Địa chỉ', hash, avatarUrl, displayUploadButton } = this.state;

    return (
      <>
        <Row style={{ padding: '0 35px' }} className="personnel-header">
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
          <Tabs defaultActiveKey="1" className='personnel-tabs'>
            <TabPane tab="Hồ sơ" key="1">
              <Row>
                <Col span={24} lg={{ span: 4 }}>
                  <Menu
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
                <Col span={24} lg={{ span: 20 }}
                  className={'tabContent'}
                >
                  <Spin
                    spinning={isLoading}
                    indicator={<LoadingOutlined />}
                  >
                    {this.renderTabContent(hash)}
                  </Spin>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hợp đồng" key="2">
              Bạn cần tạo thông tin cơ bản của nhân viên trước.
            </TabPane>
            <TabPane tab="Lương - phụ cấp" key="3">
              Bạn cần tạo thông tin cơ bản của nhân viên trước.
            </TabPane>
          </Tabs>

        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ personnel }) => {
  const { personnelItem } = personnel;
  return {
    ...personnelItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
    updateAvatar: (personnelId, formData) => dispatch(personnelAction.updateAvatar(personnelId, formData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelUpdate);
