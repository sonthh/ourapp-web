import { Button, Form, Row, Col, Input, DatePicker, Divider, notification, Select, Typography } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import SelectPersonnelModal from '../../../../component/modal/SelectPersonnelModal/SelectPersonnelModal';
import * as requestAction from '../../../../action/requestAction';
import { getErrorMessage } from '../../../../util/get';
import { Link } from 'react-router-dom';
import { UnorderedListOutlined } from '@ant-design/icons'
import SelectUserModal from '../../../../component/modal/SelectUserlModal/SelectUserModal';

const { Title } = Typography;
class OnLeaveCreate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleSelectPersonnel: false,
      visibleSelectUser: false,
      personnel: null,
      user: null,
    }
  }

  onChange = activeKey => {
    this.setState({ activeKey })
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;

    if (item && item !== prevProps.item) {
      // this.formRef.current.setFieldsValue(item);
    }

    if (error && error !== prevProps.error) {
      notification.error({
        message: 'Có lỗi',
        description: getErrorMessage(error) || 'Something went wrong',
        duration: 2.5,
      });
    }

    if (success !== undefined && success !== prevProps.success) {
      notification.success({
        message: 'Thành công',
        description: success,
        duration: 2.5,
      });

      this.props.history.push(`/admin/personnel/request`);
    }
  }

  onCloseSelectPersonnelModal = () => {
    this.setState({ visibleSelectPersonnel: false });
  }

  onCloseSelectUserModal = () => {
    this.setState({ visibleSelectUser: false });
  }

  onClickOpenSelectPersonnelForm = () => {
    this.setState({ visibleSelectPersonnel: true });
  }

  onClickOpenSelectUserForm = () => {
    this.setState({ visibleSelectUser: true });
  }

  onOkSelectPersonnelModal = () => {
    this.setState({ visibleSelectPersonnel: false });
  }

  onOkSelectUserModal = () => {
    this.setState({ visibleSelectUser: false });
  }

  onSelectPersonnel = (personnel) => {
    const { fullName: fullNamePersonnel } = personnel;
    this.formRef.current.setFieldsValue({ fullNamePersonnel });

    this.setState({ visibleSelectPersonnel: false, personnel });
  }

  onSelectUser = (user) => {
    const { fullName: fullNameUser } = user;
    this.formRef.current.setFieldsValue({ fullNameUser });

    this.setState({ visibleSelectUser: false, user });
  }

  onCreateOnLeave = (values) => {
    const { personnel, user } = this.state;

    let requestPayload = { ...values, personnelId: personnel.id, type: 'OnLeave', receiverId: user.id };

    this.props.createOneRequest(requestPayload);
  }

  statusList = [
    'Chờ phê duyệt',
    'Châp thuận',
    'Từ chối',
  ];

  render() {
    const { visibleSelectPersonnel, visibleSelectUser } = this.state;
    const { isCreating } = this.props;

    return (
      <>
        <div className='card-container'>
          <Row justify='space-between' className='child-card-container wrapper-title'>
            <Col span={24} md={{ span: 24 }}>
              <Button
                type='primary'
                style={{ marginRight: '25px', float: "right" }}
                icon={<UnorderedListOutlined />}>
                <Link to={'/admin/personnel/request'}>
                  <span style={{ color: '#ffffff', marginLeft: '5px' }}>Danh sách</span>
                </Link>
              </Button>
            </Col>
          </Row>
        </div>
        <div className='card-container'>
          <Row className={'ContractCreate'} style={{ marginBottom: '30px', padding: '24px' }}>
            <Form
              layout='vertical'
              defaultValue={{}}
              ref={this.formRef}
              autoComplete='off'
              labelCol={{ xs: 24 }}
              wrapperCol={{ xs: 24 }}
              id='ContractCreateForm'
              onFinish={this.onCreateOnLeave}
              style={{ width: '100%' }}
            >
              <Row>
                <Col span={24} md={{ span: 24 }} className='wrapper-title'>
                  <Title className='form-title advance-form' level={4}>THÔNG TIN NGHỈ PHÉP</Title>
                  <Divider className='divider-advance' />
                </Col>
                <Col span={24} md={{ span: 24 }}>
                  <Form.Item
                    name='info'
                    label='Tiêu đề'
                    rules={[{ required: true, message: 'Vui lòng thông tin' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item
                    name='fullNamePersonnel'
                    label='Nhân viên'
                    rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
                  >
                    <Input className={'select-personnel'} onClick={this.onClickOpenSelectPersonnelForm} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 6 }}>
                  <Form.Item
                    name='startDate'
                    label='Ngày bắt đầu'
                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu nghỉ' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 6 }}>
                  <Form.Item
                    name='endDate'
                    label='Ngày kết thúc'
                    rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc nghỉ' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item
                    name='fullNameUser'
                    label='Người kiếm duyệt'
                    rules={[{ required: true, message: 'Vui lòng chọn người kiếm duyệt' }]}
                  >
                    <Input className={'select-personnel'} onClick={this.onClickOpenSelectUserForm} />
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
                      style={{ width: '100%', top: -2 }}
                      options={this.statusList.map(each => ({ value: each, label: each }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 24 }}>
                  <Form.Item name='reason' wrapperCol={{ span: 24 }} label='Lí Do'>
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Divider />
                <Col span={24}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Button style={{ marginRight: 20 }} onClick={() => this.props.history.goBack()}>Hủy</Button>
                  <Button style={{ fontSize: 13 }} loading={isCreating} type='primary' htmlType='submit'>Thêm mới</Button>
                </Col>

              </Row>
            </Form>
            <SelectPersonnelModal
              visible={visibleSelectPersonnel}
              onClose={this.onCloseSelectPersonnelModal}
              onOk={this.onOkSelectPersonnelModal}
              onSelectPersonnel={this.onSelectPersonnel}
            />
            <SelectUserModal
              visible={visibleSelectUser}
              onClose={this.onCloseSelectUserModal}
              onOk={this.onOkSelectUserModal}
              onSelectUser={this.onSelectUser}
            />
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ request }) => {
  const { requestItem } = request;

  return {
    ...requestItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOneRequest: (requestPayload) => dispatch(requestAction.createOneRequest(requestPayload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OnLeaveCreate);
