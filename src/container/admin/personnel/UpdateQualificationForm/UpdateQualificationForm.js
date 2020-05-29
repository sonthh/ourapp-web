import { Button, Form, Select, Row, Col, Input, DatePicker, Divider, notification, Popconfirm } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

class UpdateQualificationForm extends Component {

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
      const { qualifications = [] } = item;
      if (qualifications.length === 0) {
        forms = [this.renderOneQualification({}, 0)];
        this.setState({ forms });
        return;
      }

      let updateForm = {};
      forms = [];
      qualifications.forEach((each, index) => {
        if (!each) {
          return;
        }

        forms = [...forms, this.renderOneQualification(each, index)];

        const name = `qualifications[${index}].`;
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

  onSubmitWorkingTimeForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }
    const { id: personnelId } = item;

    const { forms } = this.state;
    const length = forms.length;
    const arrRequest = new Array(length);

    for (const key in values) {
      let value = values[key];
      for (let i = 0; i < length; i++) {
        if (key.startsWith(`qualifications[${i}].`)) {
          arrRequest[i] = {
            ...arrRequest[i],
            [key.split('.')[1]]: value,
          }
          break;
        }
      }
    }

    arrRequest.forEach(each => {
      if (!each) return;

      const { id: qualificationId } = each;

      if (qualificationId) {
        this.props.updateQualification(personnelId, qualificationId, each);
      }

      if (!qualificationId) {
        this.props.addQualification(personnelId, each);
      }
    });
  }

  onDeleteQualification = (qualificationId, index) => {
    const { item } = this.props;
    if (!item || !item.id) return;

    console.log(qualificationId, index);
    if (qualificationId) {
      this.props.deleteQualification(item.id, qualificationId);
    }

    let { forms } = this.state;
    forms = [...forms];
    forms.splice(index, 1);
    this.setState({ forms });
  }

  renderOneQualification = (qualification, index) => {
    const name = `qualifications[${index}].`;
    return (
      <>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}degree`} label='Trình độ'>
            <Select>
              <Select.Option value='Fulltime'>Thạc sĩ</Select.Option>
              <Select.Option value='Parttime'>Tiến sĩ</Select.Option>
              <Select.Option value='Kỹ sư'>Kỹ sư</Select.Option>
              <Select.Option value='Cử nhân'>Cử nhân</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}major`} label='Chuyên nghành' >
            <Select>
              <Select.Option value='CNTT'>CNTT</Select.Option>
              <Select.Option value='Điện tử viễn thông'>Điện tử viễn thông</Select.Option>
              <Select.Option value='Marketing'>Marketing</Select.Option>
              <Select.Option value='Kinh tế'>Kinh tế</Select.Option>
              <Select.Option value='Sư phạm'>Sư phạm</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={{ span: 12 }}>
          <Form.Item name={`${name}trainedAt`} label='Nơi đào tạo'>
            <Input />
          </Form.Item>
        </Col>
        <Col md={{ span: 12 }}>
          <Form.Item name={`${name}issueDate`} label='Ngày cấp'>
            <DatePicker />
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
            onConfirm={() => this.onDeleteQualification(qualification.id, index)}
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
    forms = [...forms, this.renderOneQualification({}, forms.length)];
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
        id='UpdateQualificaiton'
        onFinish={this.onSubmitWorkingTimeForm}
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
    addQualification: (personnelId, qualificationRequest) => dispatch(personnelAction.addQualification(personnelId, qualificationRequest)),
    updateQualification: (personnelId, qualificationId, workingTimeRequest) => {
      dispatch(personnelAction.updateQualification(personnelId, qualificationId, workingTimeRequest))
    },
    deleteQualification: (personnelId, qualificationId) => dispatch(personnelAction.deleteQualification(personnelId, qualificationId)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQualificationForm);
