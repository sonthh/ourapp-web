import { Button, Form, Modal, notification, Select, Spin, Tabs } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getErrorMessage } from '../../../util/get';
const { Option } = Select;

const { TabPane } = Tabs;

class PersonnelForm extends Component {

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
      modalTitle: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      visible: true,
      modalTitle: id ? 'Update personnel' : 'Add new a personnel',
    });

    // this.props.findManyRoles();

    // if (id) {
    //   this.props.findOneUser(id);
    // }
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
    // const { id } = this.state.item;

    // if (id) {
    //   this.props.updateOneUser({ ...values, id });
    // }

    // if (!id) {
    //   this.props.createOneUser(values);
    // }
  };

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
  };

  disabledDate = (current) => {
    return moment().isBefore(current);
  };

  render() {
    const { modalTitle, isLoadingCreatingUser, isLoadingUpdatingUser } = this.state;

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
        title={modalTitle}
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
              <TabPane className={'tab-pane'} tab='Choose user' key='1'>
                <Form.Item
                  name='status'
                  label='User'
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Form.Item>
              </TabPane>
              <TabPane className={'tab-pane'} tab='Info' key='2'>
                <Form.Item
                  name='position'
                  label='Postion'
                  rules={[{ required: true }]}
                  validateFirst={true}
                >
                  <Select
                    showSearch
                    placeholder="Select a position"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Manager</Option>
                    <Option value="lucy">Personnel</Option>
                    <Option value="tom">Officer</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name='department'
                  label='Department'
                  rules={[{ required: true }]}
                  validateFirst={true}
                >
                  <Select
                    showSearch
                    placeholder="Select a department"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">HR</Option>
                    <Option value="lucy">IT</Option>
                    <Option value="tom">Marketing</Option>
                  </Select>
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
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelForm);
