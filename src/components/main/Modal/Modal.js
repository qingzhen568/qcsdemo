import React,{Component} from 'react'
import { Modal} from 'antd';
import './Modal.scss'

export default class MyModal extends Component {
  state = { visible: true }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div id="Modal">
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <img src="https://image.watsons.com.cn//upload/6db00343.png" alt="隐私政策更新" />
        </Modal>
      </div>
    );
  }
}
