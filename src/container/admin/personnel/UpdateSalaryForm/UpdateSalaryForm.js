import { Button, Form, Row, Col, Divider, notification, Typography, Select, InputNumber } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';

const { Title } = Typography;

class UpdateSalaryForm extends Component {

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
      const { salary } = item;
      if (!salary) {
        return;
      }

      this.setState({ isCreateForm: false });

      let updateForm = { ...salary };

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

    let salaryReq = { ...values };

    const { salary, id } = item;
    const { isCreateForm } = this.state;

    if (!salary && isCreateForm === true) {
      this.props.addSalary(id, salaryReq);
      this.setState({ isCreateForm: false });
    }

    if (salary || isCreateForm === false) {
      this.props.updateSalary(id, salaryReq);
    }
  }


  payTypes = [
    'Trả theo tháng',
    'Trả theo ngày công',
  ];

  render() {
    const { isUpdating } = this.props;

    return (
      <Form
        layout='vertical'
        initialValues={{}}
        ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 24 }}
        wrapperCol={{ xs: 24 }}
        id='UpdateSalaryForm'
        onFinish={this.onSubmitForm}
      >
        <Row>
          <Col span={24} md={{ span: 24 }}>
            <Title className='form-title' level={4}>Liên hệ chung</Title>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='payType' label='Hình thức trả' >
              <Select options={this.payTypes.map(each => ({ value: each, label: each }))} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='baseSalary' label='Lương cơ bản'>
              <InputNumber style={{ width: '50%' }} min={0} step={100} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='coefficient' label='Hệ số lương'>
              <InputNumber style={{ width: '50%' }} min={1} max={6} step={0.1} />
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
    addSalary: (personnelId, salaryReq) => dispatch(personnelAction.addSalary(personnelId, salaryReq)),
    updateSalary: (personnelId, salaryReq) => dispatch(personnelAction.updateSalary(personnelId, salaryReq)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSalaryForm);
