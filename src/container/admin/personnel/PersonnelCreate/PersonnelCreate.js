import { Button, Form, Modal, notification, Select, Spin, Tabs, Row, Col, Upload, Avatar, Input, DatePicker, Checkbox, Divider } from 'antd';
import './index.scss';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaBirthdayCake } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";

const { TabPane } = Tabs;

const { Option } = Select;


const { Title } = Typography;

class PersonnelCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayIDForm: false,
      displayPassportForm: false,
      displayBankForm: false,
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onChangeDisplayIDForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayIDForm: checked })
  };

  onChangeDisplayPassportForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayPassportForm: checked })
  };

  onChangeDisplayBankForm = (e) => {
    const checked = e.target.checked;
    this.setState({ displayBankForm: checked })
  };


  render() {
    const { displayIDForm, displayPassportForm, displayBankForm } = this.state;

    return (
      <>
        <Row style={{ padding: '0 35px' }} className="personnel-header">
          <Col span={24} lg={{ span: 6 }}>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {'' ?
                (
                  <Spin
                    spinning={true}
                    indicator={<LoadingOutlined />}
                    size='large'>
                    <Avatar shape='circle' size={160} src={''} />
                  </Spin>
                )
                : (
                  <div>
                    <PlusOutlined />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
            </Upload>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-left'>
            <Title className='fullname' level={3}>Trần Hữu Hồng Sơn</Title>
            <div>
              <PhoneTwoTone /> <span>0327053245</span>
            </div>
            <div>
              <MailTwoTone /> <span>tranhuuhongson@gmail.com</span>
            </div>
          </Col>
          <Col span={24} lg={{ span: 9 }} className='personnel-info-right'>
            <div>
              <FaBirthdayCake className='custom-icon' /> <span>20/10/1998</span>
            </div>
            <div>
              <GiPositionMarker className='custom-icon' /> <span>Quang Nam</span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Tabs defaultActiveKey="1" className='personnel-tabs'>
            <TabPane tab="Hồ sơ" key="1">

              <Tabs tabPosition='left' className='personnel-files-tabs'>
                <TabPane tab="Thông tin cơ bản" key="ttcb">
                  <Form
                    layout='vertical'
                    defaultValue={{}}
                    // ref={this.formRef}
                    autoComplete='off'
                    labelCol={{ xs: 6 }}
                    wrapperCol={{ xs: 18 }}
                    id='basicInfoForm'
                    onFinish={this.onSubmitBasicInfoForm}
                  >
                    <Row>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Tên nhân viên">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Số điện thoại">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Email">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Ngày sinh">
                          <DatePicker />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Giới tính" >
                          <Select defaultValue='MALE'>
                            <Select.Option value='MALE'>Nam</Select.Option>
                            <Select.Option value='FEMALE'>Nữ</Select.Option>
                            <Select.Option value='OTHER'>Khác</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 24 }}>
                        <Form.Item label="Chứng minh / Hộ chiếu" >
                          <Checkbox onChange={this.onChangeDisplayIDForm}>Chứng minh thư</Checkbox>
                          <Checkbox onChange={this.onChangeDisplayPassportForm}>Hộ chiếu</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col
                        className={`${(!displayIDForm && !displayPassportForm) ? 'd-none' : ''}`}
                        span={24} md={{ span: 24 }}
                        style={{
                          border: '1px solid #dee2e6',
                          padding: '24px',
                        }}>
                        <Row className={`${!displayIDForm ? 'd-none' : ''}`}>
                          <Col md={{ span: 8 }}>
                            <Form.Item label="Số CMND">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 8 }}>
                            <Form.Item label="Ngày cấp">
                              <DatePicker />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 8 }}>
                            <Form.Item label="Nơi cấp">
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row className={`${!displayPassportForm ? 'd-none' : ''}`}>
                          <Col md={{ span: 6 }}>
                            <Form.Item label="Số hộ chiếu">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 6 }}>
                            <Form.Item label="Ngày cấp">
                              <DatePicker />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 6 }}>
                            <Form.Item label="Ngày hết hạn">
                              <DatePicker />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 6 }}>
                            <Form.Item label="Nơi cấp">
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Phòng ban" >
                          <Select>
                            <Select.Option value='MALE'>Kế hoạch</Select.Option>
                            <Select.Option value='FEMALE'>Maketing</Select.Option>
                            <Select.Option value='OTHER'>Kỹ thuật</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 12 }}>
                        <Form.Item label="Vị trí" >
                          <Select>
                            <Select.Option value='MALE'>Dev</Select.Option>
                            <Select.Option value='FEMALE'>Fresher</Select.Option>
                            <Select.Option value='OTHER'>Intern</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} md={{ span: 24 }}>
                        <Checkbox onChange={this.onChangeDisplayBankForm}>Thông tin ngân hàng</Checkbox>
                      </Col>
                      <Col
                        className={`${!displayBankForm ? 'd-none' : ''}`}
                        span={24} md={{ span: 24 }}
                        style={{
                          marginTop: '12px',
                          border: '1px solid #dee2e6',
                          padding: '24px',
                        }}>
                        <Row>
                          <Col md={{ span: 12 }}>
                            <Form.Item label="Chủ tài khoản">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 12 }}>
                            <Form.Item label="Số tài khoản">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 12 }}>
                            <Form.Item label="Tên ngân hàng">
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col md={{ span: 12 }}>
                            <Form.Item label="Chi nhánh">
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Divider />
                      <Button type='primary'>Update</Button>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tab="Thời gian làm việc" key="ttlv">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Trình độ chuyên môn" key="tdcm">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Chứng chỉ chuyên nghành" key="cccn">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Lịch sử công tác" key="lsct">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Thông tin liên hệ" key="ttlh">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Tình trạng sức khỏe" key="ttsk">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Thông tin khác" key="ttk">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>

            </TabPane>
            <TabPane tab="Hợp đồng" key="2">
              Hợp đồng
            </TabPane>
            <TabPane tab="Lương - phụ cấp" key="3">
              Lượng và phụ cấp
             </TabPane>
          </Tabs>
        </Row>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelCreate);
