import { Button, Form, Select, Row, Col, Input, DatePicker, Divider, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import moment from 'moment';

class UpdateHealthyStatusForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const { personnelId } = this.props;
    this.props.findOnePersonnel(personnelId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;

    if (item !== prevProps.item) {

      const { healthyStatus } = item;
      if (!healthyStatus) {
        return;
      }

      let { lastCheckDate } = healthyStatus;

      let updateForm = { ...healthyStatus };

      if (lastCheckDate) {
        lastCheckDate = moment(lastCheckDate);
        updateForm = { ...updateForm, lastCheckDate };
      }

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


  onSubmitWorkingTimeForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }

    const { healthyStatus, id } = item;

    if (!healthyStatus) {
      this.props.addHealthyStatus(id, values);
    }

    if (healthyStatus) {
      this.props.updateHealthyStatus(id, values);
    }
  }

  healthyStatuses = [
    'Khỏe', 'Rất khỏe', 'Trung bình', 'Yếu', 'Rất yếu'
  ];

  bloodGroups = [
    'A', 'B', 'O', 'AB',
  ];

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
        id='UpdateHealthyStatusForm'
        onFinish={this.onSubmitWorkingTimeForm}
      >
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='height' label='Chiều cao'>
              <Input addonAfter='cm' />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='weight' label='Cân nặng'>
              <Input addonAfter='kg' />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='bloodGroup' label='Nhóm máu'>
              <Select>
                {this.bloodGroups.map(each => (
                  <Select.Option key={each} value={each}>{each}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='healthyStatus' label='Tình trạng sức khỏe'>
              <Select>
                {this.healthyStatuses.map(each => (
                  <Select.Option key={each} value={each}>{each}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='lastCheckDate' label='Ngày kiểm tra gần nhất'>
              <DatePicker style={{ width: '50%' }} format='DD/MM/YYYY' />
            </Form.Item>
          </Col>
          <Divider />
          <Col md={{ span: 24 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ fontSize: 13 }} loading={isUpdating} type='primary' htmlType='submit'>Cập nhật</Button>
          </Col>
        </Row>
      </Form>
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
    addHealthyStatus: (personnelId, healthyStatusRequest) => dispatch(personnelAction.addHealthyStatus(personnelId, healthyStatusRequest)),
    updateHealthyStatus: (personnelId, healthyStatusRequest) => dispatch(personnelAction.updateHealthyStatus(personnelId, healthyStatusRequest)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHealthyStatusForm);
