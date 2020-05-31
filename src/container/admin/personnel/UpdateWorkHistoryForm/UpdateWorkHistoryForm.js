import { Button, Form, Row, Col, Input, DatePicker, Divider, notification, Popconfirm, Checkbox } from 'antd';
import './index.scss';
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage, getRequestArrayFromFormValues } from '../../../../util/get';
import moment from 'moment';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const WorkHistory = ({ workHistory, index, deleteWorkHistory }) => {
  const name = `workHistories[${index}].`;
  const { endDate } = workHistory;
  const initEndDateCurrrent = workHistory !== null && workHistory.hasOwnProperty('endDate')
    && (endDate === undefined || endDate === null)

  const [endDateCurrrent, setEndDateCurrent] = useState(initEndDateCurrrent);

  const onChangeCheckBoxCurrent = (e) => {
    const { checked } = e.target;
    setEndDateCurrent(checked);
  }

  const onDeleteWorkHistory = (workHistoryId, index) => {
    deleteWorkHistory(workHistoryId, index);
  }

  return (
    <>
      <Col span={24} md={{ span: 8 }}>
        <Form.Item name={`${name}workAt`} label='Nới làm việc'>
          <Input />
        </Form.Item>
      </Col>
      <Col span={24} md={{ span: 8 }}>
        <Form.Item name={`${name}role`} label='Chức danh'>
          <Input />
        </Form.Item>
      </Col>
      <Col span={24} md={{ span: 8 }}>
        <Form.Item name={`${name}workTime`} label='Thời gian làm việc'>
          <Input />
        </Form.Item>
      </Col>
      <Col md={{ span: 8 }}>
        <Form.Item name={`${name}startDate`} label='Ngày bắt đầu'>
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
      </Col>
      <Col
        span={24}
        md={{ span: 8 }}
        className={`${endDateCurrrent === true ? 'd-none' : ''}`}
      >
        <Form.Item name={`${name}endDate`} label='Ngày kết thúc'>
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
      </Col>
      <Col span={24} md={{ span: 8 }}>
        <Form.Item name={`${name}endDateCurrent`} label='Đến hiện tại'>
          <Checkbox checked={endDateCurrrent} onChange={onChangeCheckBoxCurrent} />
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
          onConfirm={() => onDeleteWorkHistory(workHistory.id, index)}
        >
          <Button icon={<DeleteOutlined />} style={{ fontSize: 13 }} size='small' type='danger'></Button>
        </Popconfirm>
      </Col>
      <Divider />
    </>
  );
}

class UpdateWorkHistoryForm extends Component {

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
      const { workHistories = [] } = item;

      if (workHistories.length === 0) {
        forms = [<WorkHistory deleteWorkHistory={this.onDeleteWorkHistory} key={0} workHistory={{}} index={0} />];
        this.setState({ forms });
        return;
      }

      let updateForm = {};
      forms = [];
      workHistories.forEach((each, index) => {
        if (!each) {
          return;
        }

        forms = [...forms, <WorkHistory deleteWorkHistory={this.onDeleteWorkHistory} key={index} workHistory={each} index={index} />];

        const name = `workHistories[${index}].`;
        for (const key in each) {
          let value = each[key];

          if (value && (key === 'startDate' || key === 'endDate')) {
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

  onSubmitWorkHistoryForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }
    const { id: personnelId } = item;

    const { forms } = this.state;
    const length = forms.length;
    const arrRequest = getRequestArrayFromFormValues(values, length, 'workHistories');

    arrRequest.forEach(each => {
      if (!each) return;
      const { id: certificationId, endDateCurrent } = each;

      if (endDateCurrent === true) {
        each = {
          ...each,
          endDate: null,
        }
      }

      if (certificationId) {
        this.props.updateWorkHistory(personnelId, certificationId, each);
      }

      if (!certificationId) {
        this.props.addWorkHistory(personnelId, each);
      }
    });
  }

  onDeleteWorkHistory = (workHistoryId, index) => {
    const { item } = this.props;
    if (!item || !item.id) return;

    if (workHistoryId) {
      this.props.deleteWorkHistory(item.id, workHistoryId);
    }

    let { forms } = this.state;
    forms = [...forms];
    forms.splice(index, 1);
    this.setState({ forms });
  }

  onAddNewForm = () => {
    let { forms } = this.state;
    forms = [...forms, <WorkHistory deleteWorkHistory={this.onDeleteWorkHistory} key={forms.length} workHistory={{}} index={forms.length} />];
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
        onFinish={this.onSubmitWorkHistoryForm}
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
    addWorkHistory: (personnelId, workHistoryRequest) => dispatch(personnelAction.addWorkHistory(personnelId, workHistoryRequest)),
    updateWorkHistory: (personnelId, workHistoryId, workHistoryRequest) => {
      dispatch(personnelAction.updateWorkHistory(personnelId, workHistoryId, workHistoryRequest))
    },
    deleteWorkHistory: (personnelId, workHistoryId) => dispatch(personnelAction.deleteWorkHistory(personnelId, workHistoryId)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWorkHistoryForm);
