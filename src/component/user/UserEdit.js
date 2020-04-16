import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../action/userAction'

class UserEdit extends Component {

  formRef = React.createRef();

  state = {
    visible: false,
    item: {},
  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isShowModal !== undefined && this.props.isShowModal !== prevProps.isShowModal) {
      this.setState({
        visible: this.props.isShowModal,
      });
    }

    if (this.props.item !== prevProps.item) {
      const { item } = this.props;
      this.setState({
        item,
      });
      console.log(item.roles);
      const roleIds = item.roles.map(role => role.id);

      this.formRef.current.setFieldsValue({
        ...item,
        roleIds,
      });
    }
  }

  handleOk = e => {
    this.props.toggleModalUserForm();
  };

  handleCancel = e => {
    this.props.toggleModalUserForm();
  };

  onSubmitForm = (values) => {
    console.log(values);
    this.props.createOne(values)
  }

  render() {
    const { item } = this.state;
    const title = item.id ? 'Edit user' : 'Add user';

    const roleOptions = [
      { label: 'Admmin', value: 1 },
      { label: 'Basic', value: 2 },
      { label: 'Manager', value: 3 },
    ];

    return (
      <Modal
        title={title}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{ form: 'userForm', key: 'submit', htmlType: 'submit' }}
      >
        <Form
          ref={this.formRef}
          autoComplete='off'
          labelCol={{ xs: 8 }}
          wrapperCol={{ xs: 16 }}
          id='userForm'
          onFinish={this.onSubmitForm}
        >
          <Form.Item
            name="username"
            label="Username"
          >
            <Input value={item.username} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="roleIds"
            label="Roles"
          >
            <Checkbox.Group options={roleOptions} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
          >
            <Select placeholder="User status">
              <Select.Option value='ACTIVE'>Active</Select.Option>
              <Select.Option value='INACTIVE'>Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { isShowModal, item } = state.user.userItem;
  return {
    isShowModal,
    item,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalUserForm: () => {
      dispatch(userAction.toggleModalUserForm());
    },
    createOne: (userRequest) => {
      dispatch(userAction.createOneUser(userRequest));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
