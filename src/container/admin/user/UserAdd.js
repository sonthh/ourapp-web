import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button, notification, Radio, DatePicker, Tabs
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../../action/userAction'
import * as roleAction from '../../../action/roleAction'
import moment from 'moment';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { getErrorMessage } from '../../../util/get';
import { setAll } from '../../../util/object';

const { TabPane } = Tabs;
const dateFormat = 'MMMM DD YYYY';

class UserAdd extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleModal: false,
      isLoading: false,
      isCreatingUser: false,
      roleList: [],
    };
  }

  componentDidMount() {
    this.setState({
      visibleModal: true,
    });
    this.props.findManyRoles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, isCreatingUser, error, item, roles, success } = this.props;

    if (isLoading !== undefined && isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading,
      });
    }

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'SUCCESSS',
        description: success,
        duration: 2.5,
      });
    }

    if (isCreatingUser !== undefined
      && isCreatingUser !== prevProps.isCreatingUser) {
      this.setState({
        isCreatingUser,
      });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'ERROR',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    // add new user successfully
    if (item !== prevProps.item) {
      if (item.id && this.formRef && this.formRef.current) {
        const resetFormFields = setAll(item, null);

        this.formRef.current.setFieldsValue({
          ...resetFormFields,
          status: 'ACTIVE',
          password: null,
          roleIds: [],
        });
      }
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
    this.props.createOneUser(values);
  };

  disabledDate = (current) => {
    return moment().isBefore(current);
  };

  render() {
    const { roleList, isCreatingUser, visibleModal } = this.state;
    const roleOptions = roleList.map(role => ({ label: role.name, value: role.id }));

    const footer = [
      <Button key='back' onClick={this.handleCancelModal}>
        Cancel
      </Button>,
      <Button
        key='submit' type='primary'
        loading={isCreatingUser}
        disabled={this.state.isLoading} onClick={this.handleOkModal}
        form='userCreatingForm' htmlType='submit'
      >
        OK
      </Button >,
    ];

    return (
      <Modal
        title='Add a new user'
        visible={visibleModal}
        footer={footer}
        onCancel={this.handleCancelModal}
        onOk={this.onSubmitForm}
        bodyStyle={{ padding: '0px' }}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            initialValues={{ status: 'ACTIVE' }}
            ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 6 }}
            wrapperCol={{ xs: 18 }}
            id='userCreatingForm'
            onFinish={this.onSubmitForm}
          >
            <Tabs type='card'>
              <TabPane className={'tab-pane'} tab='Account' key='1'>
                <Form.Item
                  name='username'
                  label='Username'
                  rules={[{ required: true, whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='password'
                  label='Password'
                  rules={[{ required: true, whitespace: true, min: 6 }]}
                >
                  <Input type='password' />
                </Form.Item>

                <Form.Item
                  name='roleIds'
                  label='Roles'
                  rules={[{ required: true, message: 'please select at least a role' }]}
                >
                  <Checkbox.Group options={roleOptions} />
                </Form.Item>

                <Form.Item
                  name='status'
                  label='Status'
                  rules={[{ required: true }]}
                >
                  <Select placeholder='User status'>
                    <Select.Option value='ACTIVE'>Active</Select.Option>
                    <Select.Option value='INACTIVE'>Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </TabPane>
              <TabPane className={'tab-pane'} tab='Info' key='2'>
                <Form.Item
                  name='fullName'
                  label='Full name'
                  rules={[{ whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='address'
                  label='Address'
                  rules={[{ whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='phoneNumber'
                  label='Phone number'
                  rules={[{ whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='identification'
                  label='Identification'
                  rules={[{ whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='email'
                  label='Email'
                  rules={[{ whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='gender'
                  label='Gender'
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
                  name='birthDay'
                  label='Birth day'
                >
                  <DatePicker format={dateFormat} disabledDate={this.disabledDate} />
                </Form.Item>
              </TabPane>
            </Tabs>
          </Form>
        </Spin>
      </Modal >
    );
  }
}

const mapStateToProps = state => {
  const { userItem } = state.user;
  const { roles } = state.role;

  return {
    ...userItem,
    roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOneUser: (userRequest) => {
      dispatch(userAction.createOneUser(userRequest));
    },
    findManyRoles: () => {
      dispatch(roleAction.findManyRoles());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
