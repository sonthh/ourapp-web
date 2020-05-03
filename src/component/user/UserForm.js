import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button, notification, Radio, DatePicker, Tabs
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../action/userAction'
import * as roleAction from '../../action/roleAction'
import moment from 'moment';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { getErrorMessage } from '../../util/get';

const { TabPane } = Tabs;
const dateFormat = 'MMMM DD YYYY';

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
      isLoading: false,
      isLoadingCreatingUser: false,
      isLoadingUpdatingUser: false,
      item: {},
      roleList: [],
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    });
    this.props.findManyRoles();

    const { id } = this.props.match.params;
    if (id) {
      this.props.findOneUser(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, isLoadingCreatingUser, error, item, roles, success, isLoadingUpdatingUser } = this.props;

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

    if (isLoadingCreatingUser !== undefined
      && isLoadingCreatingUser !== prevProps.isLoadingCreatingUser) {
      this.setState({
        isLoadingCreatingUser,
      });
    }

    if (isLoadingUpdatingUser !== undefined
      && isLoadingUpdatingUser !== prevProps.isLoadingUpdatingUser) {
      this.setState({
        isLoadingUpdatingUser,
      });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'ERROR',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    if (item !== prevProps.item) {
      this.setState({
        item,
      });

      if (!item.id && this.formRef && this.formRef.current) {
        this.formRef.current.setFieldsValue({
          username: null,
          password: null,
          gender: null,
          roleIds: [],
          birthDay: null,
          fullName: null,
          address: null,
          phoneNumber: null,
          identification: null,
          email: null,
          status: 'ACTIVE',
        });
      }

      // edit form
      if (item.id) {
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
    }

    // roles list: display on modal
    if (roles !== prevProps.roles) {
      this.setState({ roleList: roles });
    }
  }

  handleOk = e => { };

  handleCancel = e => {
    e.stopPropagation();
    this.props.history.goBack();

    this.setState({
      visible: false,
    })
  };

  onSubmitForm = (values) => {
    const { id } = this.state.item;

    if (id) {
      this.props.updateOneUser({ ...values, id });
    }

    if (!id) {
      this.props.createOneUser(values);
    }
  }

  onFieldChange = (changedFields, allFields) => {
    const formValues = {};
    allFields.forEach(item => {
      let { value } = item;
      if (value === '') {
        value = null;
      }

      formValues[item.name[0]] = value;
    });
    this.formRef.current.setFieldsValue({ ...formValues });
  }

  disabledDate = (current) => {
    return moment().isBefore(current);
  }

  render() {
    const { item, roleList, isLoadingCreatingUser, isLoadingUpdatingUser } = this.state;
    const title = item.id ? `Edit user: ${item.username}` : 'Create new user';

    const roleOptions = roleList.map(role => ({ label: role.name, value: role.id }));
    const passwordValidate = item.id ?
      {
        rules: [{ whitespace: true, min: 6 }],
      } :
      {
        rules: [{ required: true, whitespace: true, min: 6 }],
      };

    const footer = [
      <Button key='back' onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button
        key='submit' type='primary'
        loading={isLoadingUpdatingUser || isLoadingCreatingUser}
        disabled={this.state.isLoading} onClick={this.handleOk}
        form='userForm' htmlType='submit'
      >
        OK
      </Button >,
    ]
    return (

      <Modal
        title={title}
        visible={this.state.visible}
        footer={footer}
        onCancel={this.handleCancel}
        onOk={this.onSubmitForm}
        bodyStyle={{ padding: '0px' }}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            defaultValue={{ status: 'ACTIVE' }}
            ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 6 }}
            wrapperCol={{ xs: 18 }}
            id='userForm'
            onFinish={this.onSubmitForm}
            onFieldsChange={this.onFieldChange}
          >
            <Tabs type='card'>
              <TabPane className={'tab-pane'} tab='Account' key='1'>
                <Form.Item
                  name='username'
                  label='Username'
                  rules={[{ required: true, whitespace: true, min: 6 }]}
                  validateFirst={true}
                >
                  <Input disabled={item.id} />
                </Form.Item>
                <Form.Item
                  name='password'
                  label='Password'
                  {...passwordValidate}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOneUser: (userRequest) => {
      dispatch(userAction.createOneUser(userRequest));
    },
    updateOneUser: (userRequest) => {
      dispatch(userAction.updateOneUser(userRequest));
    },
    findManyRoles: () => {
      dispatch(roleAction.findManyRoles());
    },
    findOneUser: (id) => {
      dispatch(userAction.findOneUser(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
