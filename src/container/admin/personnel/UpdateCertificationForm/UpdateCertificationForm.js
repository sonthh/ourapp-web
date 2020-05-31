import { Button, Form, Select, Row, Col, Input, DatePicker, Divider, notification, Popconfirm } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage, getRequestArrayFromFormValues } from '../../../../util/get';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

class UpdateCertificationForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      forms: [],
    }
  }

  componentDidMount() {
    const { personnelId } = this.props;
    this.props.findOnePersonnel(personnelId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;
    let { forms } = this.state;

    if (item !== prevProps.item) {
      const { certifications = [] } = item;

      if (certifications.length === 0) {
        forms = [this.renderOneCertification({}, 0)];
        this.setState({ forms });
        return;
      }

      let updateForm = {};
      forms = [];
      certifications.forEach((each, index) => {
        if (!each) {
          return;
        }

        forms = [...forms, this.renderOneCertification(each, index)];

        const name = `certifications[${index}].`;
        for (const key in each) {
          let value = each[key];

          if (key === 'issueDate' && value) {
            value = moment(value);
          }

          updateForm = {
            ...updateForm,
            [`${name}${key}`]: value,
          };
        }
      });

      this.setState({ forms });

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
        message: 'Thành công!',
        description: success,
        duration: 2.5,
      });
    }
  }

  onSubmitCertificationForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }
    const { id: personnelId } = item;

    const { forms } = this.state;
    const length = forms.length;
    const arrRequest = getRequestArrayFromFormValues(values, length, 'certifications');

    arrRequest.forEach(each => {
      if (!each) return;

      const { id: certificationId } = each;

      if (certificationId) {
        this.props.updateCertification(personnelId, certificationId, each);
      }

      if (!certificationId) {
        this.props.addCertification(personnelId, each);
      }
    });
  }

  onDeleteCertification = (certificationId, index) => {
    const { item } = this.props;
    if (!item || !item.id) return;

    if (certificationId) {
      this.props.deleteCertification(item.id, certificationId);
    }

    let { forms } = this.state;
    forms = [...forms];
    forms.splice(index, 1);
    this.setState({ forms });
  }

  renderOneCertification = (certification, index) => {
    const name = `certifications[${index}].`;
    return (
      <>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}name`} label='Tên chứng chỉ'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}type`} label='Loại chứng chỉ' >
            <Select>
              <Select.Option value='Chứng chỉ CNTT'>Chứng chỉ CNTT</Select.Option>
              <Select.Option value='Chứng chỉ ngoại ngữ'>Chứng chỉ ngoại ngữ</Select.Option>
              <Select.Option value='Chứng chỉ marketing'>Chứng chỉ marketing</Select.Option>
              <Select.Option value='Khác'>Khác</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={{ span: 12 }}>
          <Form.Item name={`${name}issueAt`} label='Nơi cấp'>
            <Input />
          </Form.Item>
        </Col>
        <Col md={{ span: 12 }}>
          <Form.Item name={`${name}issueDate`} label='Ngày cấp'>
            <DatePicker format='DD/MM/YYYY' />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 24 }}>
          <Form.Item name={`${name}note`} label='Ghi chú'>
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Form.Item name={`${name}id`} style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Popconfirm
            icon={<DeleteOutlined />}
            placement='bottomRight'
            title={`Bạn có muốn xóa?`}
            onConfirm={() => this.onDeleteCertification(certification.id, index)}
          >
            <Button icon={<DeleteOutlined />} style={{ fontSize: 13 }} size='small' type='danger'></Button>
          </Popconfirm>
        </Col>
        <Divider />
      </>
    )
  }

  onAddNewForm = () => {
    let { forms } = this.state;
    forms = [...forms, this.renderOneCertification({}, forms.length)];
    this.setState({ forms });
  }

  render() {
    const { isUpdating } = this.props;
    const { forms } = this.state;

    return (
      <Form
        layout='vertical'
        initialValues={{ workType: 'Fulltime' }}
        ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 24 }}
        wrapperCol={{ xs: 24 }}
        id='UpdateCertification'
        onFinish={this.onSubmitCertificationForm}
      >
        <Row>
          {forms}
          <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={this.onAddNewForm} style={{ width: 220, fontSize: 12 }} icon={<PlusOutlined />} type='dashed'>Thêm mới</Button>
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
    addCertification: (personnelId, certificationRequest) => dispatch(personnelAction.addCertification(personnelId, certificationRequest)),
    updateCertification: (personnelId, certificationId, certificationRequest) => {
      dispatch(personnelAction.updateCertification(personnelId, certificationId, certificationRequest))
    },
    deleteCertification: (personnelId, certificationId) => dispatch(personnelAction.deleteCertification(personnelId, certificationId)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCertificationForm);
