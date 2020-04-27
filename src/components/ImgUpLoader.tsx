import React, { Component } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// 图片上传组件
export default class ImgUpLoader extends Component {
  render() {
    return (
      <Upload action="/api/upload" name="imgfile">
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
    );
  }
}
