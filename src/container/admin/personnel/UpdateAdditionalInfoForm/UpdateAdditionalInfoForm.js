import { Button, Form, Row, Col, Input, Divider, notification, Radio } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personnelAction from '../../../../action/personnelAction';
import { getErrorMessage } from '../../../../util/get';
import TextArea from 'antd/lib/input/TextArea';

class UpdateAdditionalInfoForm extends Component {

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

      const { additionalInfo } = item;
      if (!additionalInfo) {
        return;
      }

      this.formRef.current.setFieldsValue(additionalInfo);
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

    const { additionalInfo, id } = item;
    
    if (!additionalInfo) {
      this.props.addAdditionalInfo(id, values);
    }

    if (additionalInfo) {
      this.props.updateAdditionalInfo(id, values);
    }
  }

  marriedOptions = [
    { label: 'Đã kết hôn', value: true },
    { label: 'Chưa kết hôn', value: false }
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
        id='UpdateAdditionalInfoForm'
        onFinish={this.onSubmitWorkingTimeForm}
      >
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='ethnic' label='Dân tộc'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='religion' label='Tôn giáo'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item name='married' label='Tình trạng hôn nhân'>
              <Radio.Group options={this.marriedOptions} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }}>
            <Form.Item name='note' label='Ghi chú'>
              <TextArea rows={4} />
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
    addAdditionalInfo: (personnelId, additionalInfoRequest) => dispatch(personnelAction.addAdditionalInfo(personnelId, additionalInfoRequest)),
    updateAdditionalInfo: (personnelId, additionalInfoRequest) => dispatch(personnelAction.updateAddtionalInfo(personnelId, additionalInfoRequest)),
    findOnePersonnel: (id) => dispatch(personnelAction.findOnePersonnel(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAdditionalInfoForm);
