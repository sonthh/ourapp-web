import { Button, Form, Select, Row, Col, Input, DatePicker, Divider, notification } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import SelectPersonnelModal from '../../../../component/modal/SelectPersonnelModal/SelectPersonnelModal';
import * as contractAction from '../../../../action/contractAction';
import { getErrorMessage } from '../../../../util/get';

class ContractCreate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleSelectPersonnel: false,
      personnel: null,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, success, item } = this.props;

    if (item && item !== prevProps.item) {
      // this.formRef.current.setFieldsValue(item);
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

  onCloseSelectPersonnelModal = () => {
    this.setState({ visibleSelectPersonnel: false });
  }

  onClickOpenSelectForm = () => {
    this.setState({ visibleSelectPersonnel: true });
  }

  onOkSelectPersonnelModal = () => {
    this.setState({ visibleSelectPersonnel: false });
  }

  onSelectPersonnel = (personnel) => {
    const { fullName } = personnel;
    this.formRef.current.setFieldsValue({ fullName });

    this.setState({ visibleSelectPersonnel: false, personnel });
  }

  onCreateContract = (values) => {
    const { personnel } = this.state;
    if (!personnel) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng chọn nhân sự',
        duration: 2.5,
      });

      return;
    }

    let request = { ...values, signerId: personnel.id, personnelId: personnel.id };

    this.props.createOneContract(request);
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
  ]

  render() {
    const { visibleSelectPersonnel } = this.state;
    const { isCreating } = this.props;

    return (
      <>
        <Row className={'ContractCreate'} style={{ marginBottom: '30px', padding: '24px' }}>
          <Form
            layout='vertical'
            defaultValue={{}}
            ref={this.formRef}
            autoComplete='off'
            labelCol={{ xs: 24 }}
            wrapperCol={{ xs: 24 }}
            id='ContractCreateForm'
            onFinish={this.onCreateContract}
          >
            <Row>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name='fullName' label='Họ và tên'>
                  <Input className={'select-personnel'} onClick={this.onClickOpenSelectForm} />
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
                  <DatePicker style={{ width: '80%' }} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 6 }}>
                <Form.Item name='expiredDate' label='Ngày hết hạn'>
                  <DatePicker style={{ width: '80%' }} />
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
                  <DatePicker style={{ width: '80%' }} />
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
                <Button style={{ fontSize: 13 }} loading={isCreating} type='primary' htmlType='submit'>Thêm mới</Button>
              </Col>

            </Row>
          </Form>
          <SelectPersonnelModal
            visible={visibleSelectPersonnel}
            onClose={this.onCloseSelectPersonnelModal}
            onOk={this.onOkSelectPersonnelModal}
            onSelectPersonnel={this.onSelectPersonnel}
          />
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
    createOneContract: (contractRequest) => dispatch(contractAction.createOneContract(contractRequest)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractCreate);
