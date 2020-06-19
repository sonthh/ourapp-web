import React, { Component } from 'react';
import './index.scss';
import { Table, Modal, Button } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { DownloadOutlined } from '@ant-design/icons';

const type = 'DragableBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

export default class ExcelSettingModal extends Component {

  columnsDefine = [
    {
      key: 'Mã nhân viên',
      label: 'Mã nhân viên',
      checked: true,
    },
    {
      key: 'Họ tên',
      label: 'Họ và tên',
      checked: true,
    },
    {
      key: 'Phòng ban',
      label: 'Phòng ban',
      checked: true,
    },
    {
      key: 'Số điện thoại',
      label: 'Số điện thoại',
      checked: true,
    },
    {
      key: 'Giới tính',
      label: 'Giới tính',
      checked: true,
    },
    {
      key: 'Email',
      label: 'Email',
      checked: true,
    },
    {
      key: 'Chứng minh nhân dân',
      label: 'Chứng minh nhân nhân',
      checked: true,
    },
    {
      key: 'Vị trí',
      label: 'Vị trí',
      checked: true,
    },
    {
      key: 'Thời gian làm việc',
      label: 'Thời gian làm việc',
      checked: false,
    },
    {
      key: 'Thông tin ngân hàng',
      label: 'Ngân hàng',
      checked: false,
    },
  ];

  columns = [
    {
      dataIndex: 'label',
      key: 'key',
      width: 200,
    },
  ];

  componentDidMount() {
  }

  constructor(props) {
    super(props);

    const selectedRowKeys = this.getDeaultChecked();
    const data = this.getDeaultData();

    this.state = {
      selectedRowKeys,
      visibleModal: true,
      data,
    };
  }

  getDeaultChecked = () => {
    return this.columnsDefine.filter(({ checked }) => checked === true).map(({ key }) => key);
  }

  getDeaultData = () => {
    return this.columnsDefine.map(({ key, label }) => ({ key, label }));
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      }),
    );
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };


  handleCancelModal = () => {
    this.props.onClose();
  }

  handleSetDefault = () => {
    const selectedRowKeys = this.getDeaultChecked();
    const data = this.getDeaultData();
    this.setState({ selectedRowKeys, data });
  }

  handleOk = () => {
    const { selectedRowKeys } = this.state;

    // get from data to keep the order
    const { data } = this.state;
    let keys = data.map(({ key }) => key).filter(key => selectedRowKeys.includes(key));

    this.props.onOk(keys);
  }

  onRow = (record, index) => ({
    index,
    moveRow: this.moveRow,
    onClick: () => {
      let { selectedRowKeys } = this.state;
      const { key } = record;
      const index = selectedRowKeys.indexOf(key);

      if (index !== -1) {
        selectedRowKeys.splice(index, 1);
        selectedRowKeys = [...selectedRowKeys];

        this.setState({ selectedRowKeys })
      } else {
        selectedRowKeys = [...selectedRowKeys, key];
        this.setState({ selectedRowKeys });
      }
    },
  })

  render() {
    const { selectedRowKeys } = this.state;
    const { visible } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const footer = (
      <div className='modal-footer-wrapper'>
        <Button
          size='small'
          onClick={this.handleCancelModal}
        >
          Đóng
        </Button>
        <Button
          size='small'
          onClick={this.handleSetDefault}
        >
          Mặc định
        </Button >
        <Button
          icon={<DownloadOutlined />}
          size='small'
          type='primary'
          onClick={this.handleOk}
        >
          Xuất
        </Button >
      </div>
    );

    return (
      <Modal
        className='ExcelSettingModal'
        title={<div style={{ fontSize: 14 }}>Thiết lập</div>}
        visible={visible}
        footer={footer}
        closable={false}
        onCancel={this.handleCancelModal}
      >
        <DndProvider backend={HTML5Backend}>
          <Table
            size='small'
            className='ExcelSettingModal'
            columns={this.columns}
            rowSelection={rowSelection}
            pagination={false}
            dataSource={this.state.data}
            components={this.components}
            onRow={this.onRow}
          />
        </DndProvider>
      </Modal >
    );
  }
}