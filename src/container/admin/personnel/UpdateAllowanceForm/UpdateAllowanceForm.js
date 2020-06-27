import { Button, Form, Row, Col, Input, Divider, notification, Popconfirm, InputNumber } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage, getRequestArrayFromFormValues } from '../../../../util/get';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

class UpdateAllowanceForm extends Component {

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

      const { allowances = [] } = item;

      if (allowances.length === 0) {
        forms = [this.renderOneAllowance({}, 0)];
        this.setState({ forms });
        return;
      }

      let updateForm = {};
      forms = [];
      allowances.forEach((each, index) => {

        if (!each) {
          return;
        }

        forms = [...forms, this.renderOneAllowance(each, index)];

        const name = `allowances[${index}].`;
        for (const key in each) {
          let value = each[key];

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
        message: 'Thành công',
        description: success,
        duration: 2.5,
      });
    }
  }

  onSubmitAllowanceForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }
    const { id: personnelId } = item;

    const { forms } = this.state;
    const length = forms.length;
    const arrRequest = getRequestArrayFromFormValues(values, length, 'allowances');

    arrRequest.forEach(each => {
      if (!each) return;

      const { id: allowanceId } = each;

      if (allowanceId) {
        this.props.updateAllowance(personnelId, allowanceId, each);
      }

      if (!allowanceId) {
        this.props.addAllowance(personnelId, each);
      }
    });
  }

  onDeleteAllowance = (allowanceId, index) => {
    const { item } = this.props;
    if (!item || !item.id) return;

    if (allowanceId) {
      this.props.deleteAllowance(item.id, allowanceId);
    }

    let { forms } = this.state;
    forms = [...forms];
    forms.splice(index, 1);
    this.setState({ forms });
  }

  renderOneAllowance = (allowance, index) => {
    const name = `allowances[${index}].`;
    return (
      <>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}name`} label='Tên trợ cấp' >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item name={`${name}amount`} label='Số tiền'>
            <InputNumber style={{ width: '100%' }} min={0} step={100} />
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
            onConfirm={() => this.onDeleteAllowance(allowance.id, index)}
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

    forms = [...forms, this.renderOneAllowance({}, forms.length)];

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
        id='UpdateAllowance'
        onFinish={this.onSubmitAllowanceForm}
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
    addAllowance: (personnelId, allowanceReq) => dispatch(personnelAction.addAllowance(personnelId, allowanceReq)),
    updateAllowance: (personnelId, allowanceId, allowanceReq) => {
      dispatch(personnelAction.updateAllowance(personnelId, allowanceId, allowanceReq))
    },
    deleteAllowance: (personnelId, allowanceId) => dispatch(personnelAction.deleteAllowance(personnelId, allowanceId)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAllowanceForm);
