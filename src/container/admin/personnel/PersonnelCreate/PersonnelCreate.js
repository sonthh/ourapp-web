import { Spin, Tabs, Row, Col, Upload, Avatar, Menu } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import BasicInfoForm from '../BasicInfoForm/BasicInfoForm';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;
class PersonnelCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: 'Tên nhân viên',
      phoneNumber: 'Số điện thoại',
      email: 'Email',
      birthDay: 'Ngày sinh',
      address: 'Địa chỉ',
      hash: '#basic-info',
    }
  }

  onChangeFields = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleCreateSucess = (item) => {
    if (item && item.id) {
      this.props.history.push(`/admin/personnel/${item.id}/update`);
    }
  }

  menu = [
    {
      hash: '#basic-info',
      title: 'Thông tin cơ bản',
      component: <BasicInfoForm handleCreateSucess={this.handleCreateSucess} onChangeFields={this.onChangeFields} />,
    },
    {
      hash: '#working-time',
      title: 'Thời gian làm việc',
      component: <div>Bạn cần tạo thông tin cơ bản của nhân viên trước.</div>
    },
    {
      hash: '#qualification',
      title: 'Trình độ chuyên môn',
      component: <div>Bạn cần tạo thông tin cơ bản của nhân viên trước.</div>
    },
    {
      hash: '#certification',
      title: 'Chứng chỉ chuyên ngành',
      component: <div>Bạn cần tạo thông tin cơ bản của nhân viên trước.</div>
    },
    {
      hash: '#work-history',
      title: 'Lịch sử làm việc',
      component: <div>Bạn cần tạo thông tin cơ bản của nhân viên trước.</div>
    },
    {
      hash: '#contact-info',
      title: 'Thông tin liên hệ',
      component: <div>Bạn cần tạo thông tin cơ bản của nhân viên trước.</div>
    },
  ]

  componentDidMount() {
    const hash = window.location.hash;
    if (hash && hash !== '') {
      this.setState({ hash });
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  onClickMenu = ({ item, key, keyPath, domEvent }) => {
    this.setState({ hash: key });
  }

  renderTabContent = (hash) => {
    const item = this.menu.find(each => each.hash === hash);

    if (item && item.component)
      return item.component;

    return null;
  }

  render() {
    const { fullName, phoneNumber, email, birthDay, address, hash } = this.state;

    return (
      <>
        <Helmet>
          <title>Nhân viên</title>
        </Helmet>
        <Row style={{ padding: '0 35px' }} className="personnel-header">
          <Col span={24} lg={{ span: 6 }}>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {'' ?
                (
                  <Spin
                    spinning={true}
                    indicator={<LoadingOutlined />}
                    size='large'>
                    <Avatar shape='circle' size={160} src={''} />
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
                    spinning={false}
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

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelCreate);
