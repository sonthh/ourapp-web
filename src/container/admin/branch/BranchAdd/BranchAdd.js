import React, { Component } from 'react';
import './index.scss';
import {
  Modal, Form, Input, Spin, Button, notification,
} from 'antd';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import * as branchAction from '../../../../action/branchAction'
import { getErrorMessage } from '../../../../util/get';
import { setAll } from '../../../../util/object';
const { TextArea } = Input;

class BranchAdd extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleModal: false,
    };
  }

  componentDidMount() {
    this.setState({
      visibleModal: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, item, success } = this.props;

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'SUCCESSS',
        description: success,
        duration: 2.5,
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
        });
      }
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
    this.props.createOneBranch(values);
  };

  render() {
    const { visibleModal } = this.state;
    const { isLoading, isCreatingBranch } = this.props;

    const footer = [
      <Button key='back' onClick={this.handleCancelModal}>
        Cancel
      </Button>,
      <Button
        key='submit' type='primary'
        loading={isCreatingBranch}
        disabled={isLoading} onClick={this.handleOkModal}
        form='branchCreatingForm' htmlType='submit'
      >
        Add
      </Button >,
    ];

    return (
      <>
        <Helmet>
          <title>Add Branch</title>
        </Helmet>
        <Modal
          className={'BranchAddContainer'}
          title='Add a new branch'
          visible={visibleModal}
          footer={footer}
          onCancel={this.handleCancelModal}
          onOk={this.onSubmitForm}
        >
          <Spin spinning={isLoading}>
            <Form
              initialValues={{ status: 'ACTIVE' }}
              ref={this.formRef}
              autoComplete='off'
              labelCol={{ xs: 6 }}
              wrapperCol={{ xs: 18 }}
              id='branchCreatingForm'
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
      </>
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
    createOneBranch: (branchRequest) => dispatch(branchAction.createOneBranch(branchRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchAdd);
