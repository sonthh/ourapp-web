import { Button, Form, Row, Col, Input, Divider, notification, Typography } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';

const { Title } = Typography;

class UpdateContactInfoForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isCreateForm: true,
    }
  }

  componentDidMount() {
    const { personnelId } = this.props;
    this.props.findOnePersonnel(personnelId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;

    if (item !== prevProps.item) {
      const { contactInfo } = item;
      if (!contactInfo) {
        return;
      }
      this.setState({ isCreateForm: false });

      let updateForm = { ...contactInfo };

      this.formRef.current.setFieldsValue(updateForm);
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
    }
  }

  onSubmitForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }

    let contactInfoRequest = { ...values };
    const { contactInfo, id } = item;
    const { isCreateForm } = this.state;

    if (!contactInfo && isCreateForm === true) {
      this.props.addContactInfo(id, contactInfoRequest);
      this.setState({ isCreateForm: false });
    }

    if (contactInfo || isCreateForm === false) {
      this.props.updateContactInfo(id, contactInfoRequest);
    }
  }

  render() {
    const { isUpdating } = this.props;

    return (
      <Form
        layout='vertical'
        initialValues={{ workType: 'Fulltime' }}
        ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 24 }}
        wrapperCol={{ xs: 24 }}
        id='UpdateContactInfoForm'
        onFinish={this.onSubmitForm}
      >
        <Row>
          <Col span={24} md={{ span: 24 }}>
            <Title level={4}>Liên hệ chung</Title>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Form.Item
              labelCol={{ md: 12 }}
              wrapperCol={{ md: 12 }}
              name='homeNumber'
              label='Số nhà riêng'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='skype' label='Skype'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='facebook' label='Facebook'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Title level={4}>Địa chỉ thương trú</Title>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='address' label='Địa chỉ thường trú'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='village' label='Phường (xã, thị trấn)'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='province' label='Tỉnh/Thành phố)'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='district' label='Quận/Huyện)'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Title level={4}>Liên hệ khẩn cấp</Title>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='urgentContact' label='Người liên hệ'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='relation' label='Quan hệ với nhân viên'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='urgentPhoneNumber' label='Số điện thoại liên hệ'>
              <Input />
            </Form.Item>
          </Col>
          <Divider />
          <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ fontSize: 13 }} loading={isUpdating} type='primary' htmlType='submit'>Cập nhật</Button>
          </Col>
        </Row>
      </Form >
    )
  }
}

const mapStateToProps = ({ personnel }) => {
  const { personnelItem } = personnel;
  return {
    ...personnelItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContactInfo: (personnelId, contactInfoRequest) => dispatch(personnelAction.addContactInfo(personnelId, contactInfoRequest)),
    updateContactInfo: (personnelId, contactInfoRequest) => dispatch(personnelAction.updateContactInfo(personnelId, contactInfoRequest)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactInfoForm);
