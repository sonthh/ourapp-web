import React, { Component } from 'react';
import './index.scss';
import { Tabs, Row, Col, Input, Form, Upload, message, Button, Spin, notification, Avatar } from 'antd';
import responsive from '../../../constant/responsive'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64Url } from '../../../util/file';
import * as userAction from '../../../action/userAction'
import { connect } from 'react-redux';
import { saveAuthData, getCurrentUser } from '../../../util/auth';

const { TabPane } = Tabs;

class UserSetting extends Component {

  state = {
    position: 'left',
    avatarFile: null,
    avatarUrl: null,
  };
  formRef = React.createRef();

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    getBase64Url(file).then(avatarUrl => this.setState({ avatarUrl }));

    this.setState({
      avatarFile: file,
    });

    return false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();

    this.props.findUserMe();
  }

  componentDidUpdate(prevProps, prevState) {
    const { avatarUrl, userMe } = this.props;

    if (avatarUrl && avatarUrl !== prevProps.avatarUrl) {
      this.setState({ avatarUrl, avatarFile: null });

      notification.success({
        message: 'SUCCESSS',
        description: 'Updated avatar successfully',
        duration: 2.5,
      });

      const auth = getCurrentUser();

      if (auth) {
        saveAuthData({ ...auth, avatar: avatarUrl });
      }
    }

    if (userMe !== prevProps.userMe) {
      this.formRef.current.setFieldsValue({
        ...userMe
      });

      const { avatar: avatarUrl } = userMe;
      this.setState({ avatarUrl });
    }
  }

  resize = () => {
    const { innerWidth } = window;
    const isLargeScreen = innerWidth >= responsive.sm;
    const position = isLargeScreen ? 'left' : 'top';

    if (position !== this.state.position) {
      this.setState({ position });
    }
  };

  onSubmitBasicInfo = (values) => {
    const { avatarFile } = this.state;
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      this.props.updateMyAvatar(formData);
    }
  }

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className='ant-upload-text'>Upload</div>
      </div>
    );
    const { avatarUrl } = this.state;
    const { isUploadingAvatar, isLoading } = this.props;

    return (
      <>
        <Tabs className='UserSettingContainer' defaultActiveKey='1' tabPosition={this.state.position}>
          <TabPane tab='Basic Settings' key='1'>
            <Spin
              spinning={isLoading}
              indicator={<LoadingOutlined />}
            >
              <Row style={{ padding: '20px 35px' }}>
                <Col span={24} lg={{ span: 12, order: 2 }}>
                  <Upload
                    name='avatar'
                    listType='picture-card'
                    className='avatar-uploader'
                    showUploadList={false}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {avatarUrl ? (
                      <Spin
                        spinning={isUploadingAvatar !== undefined ? isUploadingAvatar : false}
                        indicator={<LoadingOutlined />}
                        size='large'>
                        <Avatar shape='circle' size={160} src={avatarUrl} />
                      </Spin>
                    )
                      : uploadButton}
                  </Upload>
                </Col>
                <Col span={24} lg={{ span: 12, order: 1 }}>
                  <Form
                    autoComplete='off'
                    ref={this.formRef}
                    onFinish={this.onSubmitBasicInfo}
                    initialValues={{}}
                    layout='vertical'
                  >
                    <Form.Item
                      name='username'
                      label='Tau chưa css xong'
                      validateFirst={true}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                      name='email'
                      label='Email'
                      validateFirst={true}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='phoneNumber'
                      label='Phone number'
                      validateFirst={true}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name='address'
                      label='Address'
                      validateFirst={true}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item >
                      <Button type='primary' htmlType='submit'>
                        Update
                    </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Spin>
          </TabPane>
          <TabPane tab='Account Binding' key='3'>
            <h1>SETTING</h1>
          </TabPane>
          <TabPane tab='Message Notification' key='4'>
            <h1>SONDEPTRAI</h1>
          </TabPane>
        </Tabs>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userItem } = user;

  return {
    ...userItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMyAvatar: formData => dispatch(userAction.updateMyAvatar(formData)),
    findUserMe: () => dispatch(userAction.findUserMe()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting);