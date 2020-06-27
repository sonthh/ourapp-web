import { Button, Form, Select, Row, Col, Input, DatePicker, Divider, notification, Spin } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import * as contractAction from '../../../../action/contractAction';
import { getErrorMessage, getFormRequestForDateFields } from '../../../../util/get';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';

class ContractUpdate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleSelectPersonnel: false,
      personnel: null,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.findOneContract(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;

    if (item && item !== prevProps.item) {
      let { expiredDate, validDate, startWorkDate, personnel } = item;

      let updateForm = { ...item };

      updateForm = {
        ...updateForm,
        fullName: personnel?.fullName,
        expiredDate: moment(expiredDate),
        validDate: moment(validDate),
        startWorkDate: moment(startWorkDate),
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


  onUpdateContract = (values) => {
    const { id } = this.props.match.params;
    if (id) {
      const request = getFormRequestForDateFields(['expiredDate', 'validDate', 'startWorkDate'], values);
      this.props.updateOneContract(id, request);
    }
  }

  taxTypes = [
    'Không tính thuế',
    'Hợp đồng lao động dưới 3 tháng',
    'Hợp đồng lao động 3 tháng trở lên',
  ];

  contractTypes = [
    'Hợp đồng chính thức',
    'Hợp đồng thử việc',
    'Hợp đồng thời vụ',
  ];

  render() {
    const { isLoading, isUpdating } = this.props;

    return (
      <>
        <Row className={'ContractUpdate'} style={{ marginBottom: '30px', padding: '24px' }}>
          <Spin
            spinning={isLoading}
            indicator={<LoadingOutlined />}
          >
            <Form
              layout='vertical'
              defaultValue={{}}
              ref={this.formRef}
              autoComplete='off'
              labelCol={{ xs: 24 }}
              wrapperCol={{ xs: 24 }}
              id='ContractUpdatingForm'
              onFinish={this.onUpdateContract}
            >
              <Row>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='fullName' label='Họ và tên'>
                    <Input readOnly={true} onClick={this.onClickOpenSelectForm} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='contractNumber' label='Số hợp đồng'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='contractType' label='Loại hợp đồng' >
                    <Select options={this.contractTypes.map(each => ({ value: each, label: each }))} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='taxType' label='Loại thuế thu nhập cá nhân' >
                    <Select options={this.taxTypes.map(each => ({ value: each, label: each }))} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 6 }}>
                  <Form.Item name='validDate' label='Ngày ký'>
                    <DatePicker format='DD/MM/YYYY' style={{ width: '80%' }} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 6 }}>
                  <Form.Item name='expiredDate' label='Ngày hết hạn'>
                    <DatePicker format='DD/MM/YYYY' style={{ width: '80%' }} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='salary' label='Mức lương'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='probationTime' label='Thời gian thử việc'>
                    <Input placeholder='Đơn vị tháng' />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='workAt' label='Địa điểm làm việc'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Form.Item name='startWorkDate' label='Ngày bắt đầu làm'>
                    <DatePicker format='DD/MM/YYYY' style={{ width: '80%' }} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 24 }}>
                  <Form.Item name='note' wrapperCol={{ span: 24 }} label='Ghi chú'>
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
                  <Button style={{ fontSize: 13 }} loading={isUpdating} type='primary' htmlType='submit'>Cập nhật</Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ contract }) => {
  const { contractItem } = contract;

  return {
    ...contractItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOneContract: (id, contractRequest) => dispatch(contractAction.updateOneContract(id, contractRequest)),
    findOneContract: (id) => dispatch(contractAction.findOneContract(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractUpdate);
