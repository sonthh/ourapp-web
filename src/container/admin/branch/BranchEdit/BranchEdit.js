import React, { Component } from 'react';
import './index.scss';
import {
  Modal, Form, Input, Spin, Button, notification,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as branchAction from '../../../../action/branchAction';
import { getErrorMessage } from '../../../../util/get';

const { TextArea } = Input;

class BranchEdit extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleModal: false,
      item: {},
    };
  }

  componentDidMount() {
    this.setState({
      visibleModal: true,
    });

    const { id } = this.props.match.params;
    if (id) {
      this.props.findOneBranch(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, item, success } = this.props;

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

      this.formRef.current.setFieldsValue({
        ...item,
      });
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
      this.props.updateOneBranch({ ...values, id });
    }
  };


  render() {
    const { visibleModal } = this.state;
    const { isUpdatingBranch, isLoading } = this.props;

    const footer = [
      <Button key='back' onClick={this.handleCancelModal}>
        Cancel
      </Button>,
      <Button
        key='submit' type='primary'
        loading={isUpdatingBranch}
        disabled={isLoading} onClick={this.handleOkModal}
        form='branchUpdatingForm' htmlType='submit'
      >
        Edit
      </Button >,
    ]
    return (
      <Modal
        title='Update Branch'
        visible={visibleModal}
        footer={footer}
        onCancel={this.handleCancelModal}
        onOk={this.onSubmitForm}
        className={'BranchEditContainer'}
      >
        <Spin
          spinning={isLoading}
          indicator={<LoadingOutlined />}
        >
          <Form
            initialValues={{ status: 'ACTIVE' }}
            ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 6 }}
            wrapperCol={{ xs: 18 }}
            id='branchUpdatingForm'
            onFinish={this.onSubmitForm}
          >

            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, whitespace: true, min: 6 }]}
              validateFirst={true}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='location'
              label='Location'
              rules={[{ required: true, whitespace: true, min: 6 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='description'
              label='Description'
              rules={[{ whitespace: true, min: 6 }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal >
    );
  }
}

const mapStateToProps = ({ branch }) => {
  const { branchItem } = branch;
  return {
    ...branchItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOneBranch: (branchRequest) => dispatch(branchAction.updateOneBranch(branchRequest)),
    findOneBranch: (id) => dispatch(branchAction.findOneBranch(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchEdit);
