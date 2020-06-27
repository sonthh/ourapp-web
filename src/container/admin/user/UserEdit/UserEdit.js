import React, { Component } from 'react';
import './index.scss';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button, notification, Radio, DatePicker, Tabs
} from 'antd';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as userAction from '../../../../action/userAction';
import * as roleAction from '../../../../action/roleAction';
import moment from 'moment';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { getErrorMessage } from '../../../../util/get';
import { Helmet } from 'react-helmet';

const { TabPane } = Tabs;
const dateFormat = 'DD/MM/YYYY';

class UserEdit extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleModal: false,
      item: {},
      roleList: [],
    };
  }

  componentDidMount() {
    this.setState({
      visibleModal: true,
    });

    const { id } = this.props.match.params;
    this.props.findManyRoles();
    if (id) {
      this.props.findOneUser(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, item, roles, success } = this.props;

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'Thành công',
        description: success,
        duration: 2.5,
      });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'Lỗi',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    if (item !== prevProps.item) {
      this.setState({
        item,
      });

      const roleIds = item.roles.map(role => role.id);

      let { birthDay } = item;
      if (birthDay) {
        birthDay = moment(item.birthDay);
      }

      this.formRef.current.setFieldsValue({
        ...item,
        roleIds,
        birthDay,
      });
    }

    if (roles !== prevProps.roles) {
      this.setState({ roleList: roles });
    }
  }

  handleOkModal = e => { };

  handleCancelModal = e => {
    e.stopPropagation();
    this.props.history.goBack();

    this.setState({
      visibleModal: false,
    })
  };

  onSubmitForm = (values) => {
    const { id } = this.state.item;
    if (id) {
      this.props.updateOneUser({ ...values, id });
    }
  };

  disabledDate = (current) => {
    return moment().isBefore(current);
  };

  render() {
    const { item, roleList, visibleModal } = this.state;
    const { isUpdatingUser, isLoading } = this.props;
    const roleOptions = roleList.map(role => ({ label: role.name, value: role.id }));

    const footer = (
      <div className='modal-footer-wrapper'>
        <Button key='back' size='small' onClick={this.handleCancelModal}>
          Hủy
        </Button>
        <Button
          icon={<EditOutlined />}
          size='small'
          key='submit' type='primary'
          loading={isUpdatingUser}
          disabled={isLoading} onClick={this.handleOkModal}
          form='userUpdatingForm' htmlType='submit'
        >
          Sửa
        </Button >
      </div>
    );

    return (
      <>
        <Helmet>
          <title>Sửa người dùng</title>
        </Helmet>
        <Modal
          title='Sửa người dùng'
          visible={visibleModal}
          footer={footer}
          onCancel={this.handleCancelModal}
          onOk={this.onSubmitForm}
          bodyStyle={{ padding: '0px' }}
          className={'ModalFormContainer'}
        >
          <Spin
            spinning={isLoading}
            indicator={<LoadingOutlined />}
          >
            <Form
              ref={this.formRef}
              autoComplete='off'
              labelCol={{ xs: 6 }}
              wrapperCol={{ xs: 18 }}
              id='userUpdatingForm'
              onFinish={this.onSubmitForm}
            >
              <Tabs type='card'>
                <TabPane className={'tab-pane'} tab='Tài khoản' key='1'>
                  <Form.Item
                    colon={false}
                    name='username'
                    label='Tên người dùng'
                    rules={[{ required: true, whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input disabled={item.id} />
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    name='password'
                    label='Mật khẩu'
                    rules={[{ whitespace: true, min: 6 }]}
                  >
                    <Input type='password' />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='roleIds'
                    label='Nhóm quyền'
                    rules={[{ required: true, message: 'Chọn 1 nhóm quyền' }]}
                  >
                    <Checkbox.Group options={roleOptions} />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='status'
                    label='Trạng thái'
                    rules={[{ required: true }]}
                  >
                    <Select placeholder='Trạng thái'>
                      <Select.Option value='ACTIVE'>Kích hoạt</Select.Option>
                      <Select.Option value='INACTIVE'>Bị chặn</Select.Option>
                    </Select>
                  </Form.Item>
                </TabPane>
                <TabPane className={'tab-pane'} tab='Thông tin' key='2'>
                  <Form.Item
                    colon={false}
                    name='fullName'
                    label='Họ tên'
                    rules={[{ whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='address'
                    label='Địa chỉ'
                    rules={[{ whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='phoneNumber'
                    label='SĐT'
                    rules={[{ whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='identification'
                    label='CMND'
                    rules={[{ whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='email'
                    label='Email'
                    rules={[{ whitespace: true, min: 6 }]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='gender'
                    label='Giới tính'
                  >
                    <Radio.Group>
                      <Radio.Button value='MALE'>
                        <FcBusinessman />
                      </Radio.Button>
                      <Radio.Button value='FEMALE'>
                        <FcBusinesswoman />
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    colon={false}
                    name='birthDay'
                    label='Sinh nhật'
                  >
                    <DatePicker format={dateFormat} disabledDate={this.disabledDate} />
                  </Form.Item>
                </TabPane>
              </Tabs>
            </Form>
          </Spin>
        </Modal >
      </>
    );
  }
}

const mapStateToProps = ({ user, role }) => {
  const { userItem } = user;
  const { roles } = role;

  return {
    ...userItem,
    roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOneUser: (userRequest) => dispatch(userAction.updateOneUser(userRequest)),
    findManyRoles: () => dispatch(roleAction.findManyRoles()),
    findOneUser: (id) => dispatch(userAction.findOneUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
