import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button, notification, Radio, DatePicker,
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../action/userAction'
import * as roleAction from '../../action/roleAction'
import moment from 'moment';
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

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState) {
    const { isShowModal, isLoading, isLoadingCreatingUser, error, item, roles, success, isLoadingUpdatingUser } = this.props;

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
        username: null,
        password: null,
        roleIds: [],
        status: null,
      });
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
          username: null,
          password: null,
          roleIds: [],
          status: null,
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

  handleOk = e => {
    // this.props.toggleModalUserForm();
  };

  handleCancel = e => {
    this.props.toggleModalUserForm();
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
      formValues[item.name[0]] = item.value;
    });
    this.formRef.current.setFieldsValue({ ...formValues });
  }

  render() {
    const { item, roleList, isLoadingCreatingUser, isLoadingUpdatingUser } = this.state;
    const title = item.id ? 'Edit user' : 'Add user';

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
              rules={[{ required: true, whitespace: true, min: 6 }]}
              validateFirst={true}
            >
              <Input value={item.username} disabled={item.id} />
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

            <Form.Item
              name='gender'
              label='Gender'
            >
              <Radio.Group>
                <Radio.Button value="MALE">Male</Radio.Button>
                <Radio.Button value="FEMALE">Female</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name='birthDay'
              label='Birth day'
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal >

    );
  }
}

const mapStateToProps = state => {
  const {
    isShowModal, item, isLoading, error, isLoadingCreatingUser,
    isLoadingUpdatingUser, success
  } = state.user.userItem;
  const { roles } = state.role;

  return {
    isShowModal,
    item,
    isLoading,
    isLoadingCreatingUser,
    isLoadingUpdatingUser,
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
    createOneUser: (userRequest) => {
      dispatch(userAction.createOneUser(userRequest));
    },
    updateOneUser: (userRequest) => {
      dispatch(userAction.updateOneUser(userRequest));
    },
    findManyRoles: () => {
      dispatch(roleAction.findManyRoles());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
