import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button, notification,
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../action/userAction'
import * as roleAction from '../../action/roleAction'

class UserEdit extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
      isLoading: false,
      isLoadingCreatingUser: false,
      item: {},
      roleList: [],
    };
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState) {
    const { isShowModal, isLoading, isLoadingCreatingUser, error, item, roles, success } = this.props;

    if (isShowModal !== undefined && isShowModal !== prevProps.isShowModal) {
      this.setState({
        visible: isShowModal,
      });
    }

    if (isLoading !== undefined && isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading,
      });
    }

    if (success !== undefined && success !== prevProps.success) {
      this.formRef.current.setFieldsValue({
        username: '',
        password: '',
        roleIds: [],
        status: '',
      });
      notification.success({
        message: 'Notification',
        description: 'Created a user.',
        duration: 2.5,
      });
    }

    if (isLoadingCreatingUser !== undefined && isLoadingCreatingUser !== prevProps.isLoadingCreatingUser) {
      this.setState({
        isLoadingCreatingUser,
      });
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'Notification',
        description: 'Something went wrong',
        duration: 2.5,
      });
    }

    if (item !== prevProps.item) {
      this.setState({
        item,
      });

      if (!item.id && this.formRef && this.formRef.current) {
        this.formRef.current.setFieldsValue({
          username: '',
          password: '',
          roleIds: [],
          status: '',
        });
      }

      // edit form
      if (item.id) {
        const roleIds = item.roles.map(role => role.id);

        this.formRef.current.setFieldsValue({
          ...item,
          roleIds,
        });
      }
    }

    // roles list: display on modal
    if (roles !== prevProps.roles) {
      this.setState({ roleList: roles })
    }
  }

  handleOk = e => {
    // this.props.toggleModalUserForm();
  };

  handleCancel = e => {
    this.props.toggleModalUserForm();
  };

  onSubmitForm = (values) => {
    console.log(values);
    this.props.createOne(values)
  }

  onFieldChange = (changedFields, allFields) => {
    const formValues = {};
    allFields.forEach(item => {
      formValues[item.name[0]] = item.value;
    });
    this.formRef.current.setFieldsValue({ ...formValues });
  }

  render() {
    const { item, roleList } = this.state;
    const title = item.id ? 'Edit user' : 'Add user';

    const roleOptions = roleList.map(role => ({ label: role.name, value: role.id }));

    const footer = [
      <Button key='back' onClick={this.handleCancel}>
        Cancel
      </Button>,
      <Button
        key='submit' type='primary'
        loading={this.state.isLoadingCreatingUser === true}
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
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 8 }}
            wrapperCol={{ xs: 16 }}
            id='userForm'
            onFinish={this.onSubmitForm}
            onFieldsChange={this.onFieldChange}
          >
            <Form.Item
              name='username'
              label='Username'
            >
              <Input value={item.username} />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
            >
              <Input type='password' />
            </Form.Item>
            <Form.Item
              name='roleIds'
              label='Roles'
            >
              <Checkbox.Group options={roleOptions} />
            </Form.Item>

            <Form.Item
              name='status'
              label='Status'
            >
              <Select placeholder='User status'>
                <Select.Option value='ACTIVE'>Active</Select.Option>
                <Select.Option value='INACTIVE'>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Spin>
      </Modal >

    );
  }
}

const mapStateToProps = state => {
  const { isShowModal, item, isLoading, error, isLoadingCreatingUser, success } = state.user.userItem;
  const { roles } = state.role;

  return {
    isShowModal,
    item,
    isLoading,
    isLoadingCreatingUser,
    success,
    error,
    roles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalUserForm: () => {
      dispatch(userAction.toggleModalUserForm());
    },
    createOne: (userRequest) => {
      dispatch(userAction.createOneUser(userRequest));
    },
    findManyRoles: () => {
      dispatch(roleAction.findManyRoles());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
