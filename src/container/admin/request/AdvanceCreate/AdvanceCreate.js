import { Button, Form, Row, Col, Input, DatePicker, Divider, notification, Select } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import SelectPersonnelModal from '../../../../component/modal/SelectPersonnelModal/SelectPersonnelModal';
import * as contractAction from '../../../../action/contractAction';
import { getErrorMessage } from '../../../../util/get';

const { Option } = Select

class AdvanceCreate extends Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visibleSelectPersonnel: false,
      personnel: null,
    }
  }

  onChange = activeKey => {
    this.setState({ activeKey })
  };

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
  ];

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
            style={{ width:'100%'}}
          >
            <Row>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  name='staffName'
                  label='Nhân viên'
                  rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
                >
                  <Input className={'select-personnel'} onClick={this.onClickOpenSelectForm} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 6 }}>
                <Form.Item
                  name='startDate'
                  label='Ngày quyệt định'
                  rules={[{ required: true, message: 'Vui lòng chọn ngày quyệt định' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item name='amount' label='Số tiền'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  name='status'
                  label='Tình trạng phê duyệt'
                  rules={[{ required: true, message: 'Vui lòng chọn tình trạng phê duyệt' }]}
                >
                  <Select
                    placeholder='Tình trạng phê duyệt'
                    onChange={null}
                    style={{ width: '100%', top: -2 }}
                  >
                    <Option value="0">Chờ phê duyệt</Option>
                    <Option value="1">Chấp thuận</Option>
                    <Option value="2">Không chấp thuận </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 24 }}>
                <Form.Item name='reason' wrapperCol={{ span: 24 }} label='Lí Do'>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceCreate);
