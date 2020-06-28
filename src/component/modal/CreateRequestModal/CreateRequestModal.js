import React, { Component } from 'react';
import './index.scss';
import { Modal, Button, notification, message, Row, Col, Form, Input, DatePicker, Select } from 'antd';
import * as timeKeepingAction from '../../../action/timeKeepingAction';
import { connect } from 'react-redux';
import { getDateFormatForTitle } from '../../../util/date';
import { getErrorMessage } from '../../../util/get';
import TextArea from 'antd/lib/input/TextArea';
import SelectUserModal from '../SelectUserlModal/SelectUserModal';

class CreateRequestModal extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleSelectUser: false,
    };
    this.messageLoadingKey = '1111111';
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, isUpdating, isCreating } = this.props;

    if (error && error !== prevProps.error) {
      if (error) {
        notification.error({
          message: 'Lỗi',
          description: getErrorMessage(error) || 'Something went wrong',
          duration: 2.5,
        });
      }
    }

    if (isUpdating !== undefined && isUpdating !== prevProps.isUpdating) {
      if (isUpdating) {
        message.loading({ content: 'Đang chấm...', key: this.messageLoadingKey });
      }
      if (!isUpdating) {
        message.success({ content: 'Chấm xong', key: this.messageLoadingKey, duration: 0.4 });
      }
    }

    if (isCreating !== undefined && isCreating !== prevProps.isCreating) {
      if (isCreating) {
        message.loading({ content: 'Đang chấm...', key: this.messageLoadingKey });
      }
      if (!isCreating) {
        message.success({ content: 'Chấm xong', key: this.messageLoadingKey, duration: 0.4 });
      }
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onOk = () => {
    // this.props.onOk();
  }

  onCloseSelectUserModal = () => {
    this.setState({ visibleSelectUser: false });
  }

  onClickOpenSelectUserForm = () => {
    this.setState({ visibleSelectUser: true });
  }

  onOkSelectUserModal = () => {
    this.setState({ visibleSelectUser: false });
  }

  onSelectUser = (user) => {
    const { fullName } = user;
    this.formRef.current.setFieldsValue({ fullName });

    this.setState({ visibleSelectUser: false, user });
  }

  footer = (
    <div className='modal-footer-wrapper'>
      <Button
        size='small'
        onClick={this.onCancel}
      >
        Đóng
      </Button>
      <Button
        size='small'
        type='primary'
        onClick={this.onOk}
        form='CreateRequestModalForm'
        htmlType='submit'
      >
        OK
      </Button >
    </div>
  );

  statusList = [
    'Chờ phê duyệt',
    'Chấp thuận',
    'Không chấp thuận',
  ];

  render() {
    const { visible, record, date } = this.props;
    const { visibleSelectUser } = this.state;

    let title = '';
    if (record && record.personnel) {
      title = `Tạo yêu cầu nghỉ phép cho ${record.personnel.fullName} vào ${getDateFormatForTitle(date)}`;
    }

    return (
      <>
        <Modal
          className={'CreateRequestModal'}
          title={title}
          visible={visible}
          footer={this.footer}
          onCancel={this.onCancel}
        >
          <Form
            layout='vertical'
            initialValues={{}}
            ref={this.formRef}
            autoComplete='off'
            id='CreateRequestModalForm'
            onFinish={this.onSubmitForm}
          >
            <Row>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  name='decidedDate'
                  label='Ngày quyệt định'
                  rules={[{ required: true, message: 'Vui lòng chọn ngày quyết định' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  name='amount'
                  label='Số tiền'
                  rules={[{ required: true, message: 'Vui lòng nhập số  tiền' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  name='status'
                  label='Tình trạng phê duyệt'
                  rules={[{ required: true, message: 'Vui lòng chọn tình trạng phê duyệt' }]}
                >
                  <Select
                    placeholder='Tình trạng phê duyệt'
                    onChange={null}
                    options={this.statusList.map(each => ({ value: each, label: each }))}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 24 }}>
                <Form.Item
                  name='fullName'
                  label='Người phê duyệt'
                  rules={[{ required: true, message: 'Vui lòng chọn người phê duyệt' }]}
                >
                  <Input className={'select-personnel'} onClick={this.onClickOpenSelectUserForm} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 24 }}>
                <Form.Item name='reason' wrapperCol={{ span: 24 }} label='Lí do'>
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <SelectUserModal
          visible={visibleSelectUser}
          onClose={this.onCloseSelectUserModal}
          onOk={this.onOkSelectUserModal}
          onSelectUser={this.onSelectUser}
        />
      </>
    );
  }
}

const mapStateToProps = ({ timeKeeping }) => {
  const { timeKeepingItem } = timeKeeping;

  return {
    ...timeKeepingItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTimeKeeping: (indexRecord, indexDate, personnelId, timeKeepingRequest) => dispatch(timeKeepingAction.createTimeKeeping(indexRecord, indexDate, personnelId, timeKeepingRequest)),
    updateTimeKeeping: (indexRecord, indexDate, personnelId, timeKeepingId, timeKeepingRequest) => dispatch(timeKeepingAction.updateTimeKeeping(indexRecord, indexDate, personnelId, timeKeepingId, timeKeepingRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestModal);