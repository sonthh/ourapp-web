import React, { Component } from "react"
import './index.scss'
import { Button } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

class TableRowPopup extends Component {

  onApprove = () => {
    this.props.onApprove();
  }

  onReject = () => {
    this.props.onReject();
  }

  render = () => {
    const { visible, x, y } = this.props;

    if (!visible) return null;

    return (
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <li>
          <Button onClick={this.onApprove} icon={<CheckOutlined />} type='primary'>Chấp thuận</Button>
        </li>
        <li>
          <Button onClick={this.onReject} icon={<CloseOutlined />} type='danger'>Từ chối&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
        </li>
      </ul>
    );
  }
}

export default TableRowPopup