import { Button, Form, Select, Row, Col, Input, DatePicker, Checkbox, Divider, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

class UpdateWorkingTimeForm extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      displayStopWorkForm: false,
    }
  }

  componentDidMount() {
    const { personnelId } = this.props;
    this.props.findOnePersonnel(personnelId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { departments, error, success, item } = this.props;

    if (item !== prevProps.item) {
      const { workingTime } = item;
      if (!workingTime) {
        return;
      }

      let { startWorkDate, stopWorkDate, signContractDate, isStopWork } = workingTime;

      this.setState({ displayStopWorkForm: isStopWork });

      let updateForm = { ...workingTime };

      if (stopWorkDate) {
        stopWorkDate = moment(stopWorkDate);
        updateForm = { ...updateForm, stopWorkDate };
      }

      if (startWorkDate) {
        startWorkDate = moment(startWorkDate);
        updateForm = { ...updateForm, startWorkDate };
      }

      if (signContractDate) {
        signContractDate = moment(signContractDate);
        updateForm = { ...updateForm, signContractDate };
      }

      this.formRef.current.setFieldsValue(updateForm);
    }

    if (departments !== prevProps.departments) {
      this.setState({ departments });
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

  onChangeDisplayStopWorkForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayStopWorkForm: checked })
  };

  onSubmitWorkingTimeForm = (values) => {
    const { item } = this.props;
    if (!item || !item.id) {
      return;
    }

    let workingTimeRequest = { ...values };
    const { workingTime, id } = item;
    const { displayStopWorkForm } = this.state;

    if (displayStopWorkForm !== undefined) {
      workingTimeRequest = {
        ...workingTimeRequest,
        isStopWork: displayStopWorkForm,
      }

      if (displayStopWorkForm === false) {
        workingTimeRequest = {
          ...workingTimeRequest,
        }
      }
    }

    console.log(workingTimeRequest);


    if (!workingTime) {
      this.props.addWorkingTime(id, workingTimeRequest);
    }

    if (workingTime) {
      this.props.updateWorkingTime(id, workingTimeRequest);
    }
  }

  render() {
    const { displayStopWorkForm } = this.state;
    const { isUpdating } = this.props;

    return (
      <Form
        layout='vertical'
        initialValues={{ workType: 'Fulltime' }}
        ref={this.formRef}
        autoComplete='off'
        labelCol={{ xs: 24 }}
        wrapperCol={{ xs: 24 }}
        id='UpdateWorkingTimeForm'
        onFinish={this.onSubmitWorkingTimeForm}
      >
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='startWorkDate' label='Ngày vào làm'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='signContractDate' label='Ngày ký hợp đồng'>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='workType' label='Hình thức làm việc' >
              <Select>
                <Select.Option value='Fulltime'>Fulltime</Select.Option>
                <Select.Option value='Parttime'>Parttime</Select.Option>
                <Select.Option value='Thời vụ'>Thời vụ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Form.Item name='note' label='Ghi chú'>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Checkbox checked={displayStopWorkForm} onChange={this.onChangeDisplayStopWorkForm}>Nghỉ việc</Checkbox>
          </Col>
          <Col
            className={`${!displayStopWorkForm ? 'd-none' : ''}`}
            span={24} md={{ span: 24 }}
            style={{
              marginTop: '12px',
              border: '1px solid #dee2e6',
              padding: '24px',
            }}>
            <Row>
              <Col md={{ span: 12 }}>
                <Form.Item name='reasonStopWork' label='Lý do nghỉ việc'>
                  <Input />
                </Form.Item>
              </Col>
              <Col md={{ span: 12 }}>
                <Form.Item name='stopWorkDate' label='Ngày nghỉ việc'>
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
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
    addWorkingTime: (personnelId, workingTimeRequest) => dispatch(personnelAction.addWorkingTime(personnelId, workingTimeRequest)),
    updateWorkingTime: (personnelId, workingTimeRequest) => dispatch(personnelAction.updateWorkingTime(personnelId, workingTimeRequest)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWorkingTimeForm);
