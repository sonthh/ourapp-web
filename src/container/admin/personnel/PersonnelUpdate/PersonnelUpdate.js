import { Spin, Tabs, Row, Col, Upload, Avatar, Menu } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import UpdateBasicInfoForm from '../UpdateBasicInfoForm/UpdateBasicInfoForm';
import UpdateWorkingTimeForm from '../UpdateWorkingTimeForm/UpdateWorkingTimeForm';
import UpdateQualificationForm from '../UpdateQualificationForm/UpdateQualificationForm';
import * as personnelAction from '../../../../action/personnelAction';
import { getDateFormat } from '../../../../util/date';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
const { Title } = Typography;

class PersonnelUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      birthDay: '',
      address: '',
      key: '#basic-info',
    }
  }

  componentDidMount() {
    const key = window.location.hash;
    if (key && key !== '') {
      this.setState({ key });
    }

    const { id } = this.props.match.params;
    if (id) {
      this.props.findOnePersonnel(id);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    const { item } = this.props;

    if (item !== prevProps.item) {
      const { fullName, phoneNumber, email, birthDay, address } = item;
      this.setState({
        fullName, phoneNumber, email, birthDay: getDateFormat(birthDay), address,
      });
    }
  }

  onBasinInfoChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  onClickMenu = ({ item, key, keyPath, domEvent }) => {
    this.setState({ key });
  }

  renderTabContent = (key) => {
    switch (key) {
      case '#basic-info':
        return (<UpdateBasicInfoForm personnelId={this.props.match.params.id} onFieldsChange={this.onBasinInfoChange} />);
      case '#working-time':
        return (<UpdateWorkingTimeForm personnelId={this.props.match.params.id} />);
      case '#qualification':
        return (<UpdateQualificationForm personnelId={this.props.match.params.id} />);
      default:
        return null;
    }
  }

  render() {
    const { isLoading } = this.props;
    const { fullName, phoneNumber, email, birthDay, address = 'Địa chỉ', key } = this.state;

    return (
      <>
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
                    selectedKeys={[key]}
                    mode='inline'
                    theme='light'
                  >
                    <Menu.Item
                      key='#basic-info'
                      onClick={this.onClickMenu}
                    >
                      <NavLink to={{ hash: '#basic-info' }}>Thông tin cơ bản</NavLink>
                    </Menu.Item>
                    <Menu.Item
                      key='#working-time'
                      onClick={this.onClickMenu}
                    >
                      <NavLink to={{ hash: '#working-time' }}>Thời gian làm việc</NavLink>
                    </Menu.Item>
                    <Menu.Item
                      key='#qualification'
                      onClick={this.onClickMenu}
                    >
                      <NavLink to={{ hash: '#qualification' }}>Trình độ chuyên môn</NavLink>
                    </Menu.Item>
                  </Menu>
                </Col>
                <Col span={24} lg={{ span: 20 }}
                  className={'tabContent'}
                >
                  <Spin
                    spinning={isLoading}
                    indicator={<LoadingOutlined />}
                  >
                    {this.renderTabContent(key)}
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelUpdate);
