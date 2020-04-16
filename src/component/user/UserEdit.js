import React, { Component } from 'react';
import {
  Modal, Form, Input, Checkbox, Select, Spin, Button,
} from 'antd';
import { connect } from 'react-redux';
import * as userAction from '../../action/userAction'

class UserEdit extends Component {

  formRef = React.createRef();

  state = {
    visible: false,
    isLoading: false,
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

    if (this.props.isLoading !== undefined && this.props.isLoading !== prevProps.isLoading) {
      this.setState({
        isLoading: this.props.isLoading,
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

    const footer = [
      <Button key="back" onClick={this.handleCancel}>
        Return
      </Button>,
      <Button
        key="submit" type="primary" disabled={this.state.isLoading} onClick={this.handleOk}
        form='userForm' htmlType='submit'
      >
        Submit
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
        </Spin>
      </Modal >

    );
  }
}

const mapStateToProps = state => {
  const { isShowModal, item, isLoading } = state.user.userItem;
  return {
    isShowModal,
    item,
    isLoading,
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
