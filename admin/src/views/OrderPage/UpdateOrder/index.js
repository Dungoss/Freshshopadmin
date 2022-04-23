import React, { useState, useEffect } from 'react';
import { Modal, InputNumber, Button, Input, Typography, Form, Image, Space, Row, Col } from 'antd';
import { updateProductAPI } from '../../../api/product'
import moment from 'moment';
import { errorNotify, successNotify } from '../../../utils/notificationCommon';

const DetailUserComponent = ({ visible, setVisible, setIsUpdateSuccess, orderDetail }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(orderDetail)
  }, [orderDetail, form])
  const handleCancel = () => {
    setVisible(false)
  };

  const onFinish = async (newProduct) => {
    try {
      let res = await updateProductAPI(orderDetail._id,newProduct);
      if (res.status) {
        successNotify(res.data.message);
        setVisible(false);
        setIsUpdateSuccess(prevState => !prevState);
        form.resetFields()
      }
    } catch (error) {
      errorNotify(error);
    }
  }

  return (
    <>
      <Modal title="Tạo mới" visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập tiêu đề: </Typography.Paragraph>
          <Form.Item name="title" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập mô tả: </Typography.Paragraph>
          <Form.Item name="description" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập giá: </Typography.Paragraph>
          <Form.Item name="price" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
            <InputNumber placeholder="Nhập giá" style={{ width: "100%" }} min="0" />
          </Form.Item>

          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập số lượng: </Typography.Paragraph>
          <Form.Item name="quantity" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
            <InputNumber placeholder="Nhập số lượng" style={{ width: "100%" }} min="0" />
          </Form.Item>
          <Form.Item style={{ width: "100%", textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button type="link" htmlType="button">
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(DetailUserComponent)