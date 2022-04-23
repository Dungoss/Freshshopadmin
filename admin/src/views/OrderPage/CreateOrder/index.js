import React, { useState, useEffect } from 'react';
import { Modal, InputNumber, Button, Input, Typography, Form, Select, Spin } from 'antd';
import { getProductByPIDAPI } from '../../../api/product'
import { createOrderAPI } from '../../../api/order'
import { getUserByEmailAPI } from '../../../api/user'
import moment from 'moment';
import { errorNotify, successNotify } from '../../../utils/notificationCommon';
import _ from 'lodash';
const DetailUserComponent = ({ visible, setVisible, setIsUpdateSuccess }) => {
  const [productSelect, setProductSelect] = useState({})
  const [userSelect, setUserSelect] = useState({})
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const handleCancel = () => {
    setVisible(false)
  };

  const onFinish = async (newOrder) => {
    try {
      let res = await createOrderAPI( newOrder);
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
  const handleCheckProduct = _.throttle(async (e) => {
    try {
      if(e.target.value){
        const res = await getProductByPIDAPI( e.target.value)
        if (res.status === 200) {
          setProductSelect(res.data.data.product)
        }
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  }, 3000)

  const handleCheckUser= _.throttle(async (e) => {
    try {
      if(e.target.value){
        const res = await getUserByEmailAPI( e.target.value)
        if (res.status === 200) {
          setUserSelect(res.data.data.user)
        }
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  }, 3000)
  return (
    <>
      <Modal title="Tạo mới" visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
        <Spin spinning={loading}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            initialValues={{
              status: 'PENDING'
            }}
          >
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập tiêu đề: </Typography.Paragraph>
            <Form.Item name="title" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Input placeholder="Nhập tiêu đề" />
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập mô tả: </Typography.Paragraph>
            <Form.Item name="description" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Input placeholder="Nhập mô tả" />
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập mã sản phẩm: </Typography.Paragraph>
            <Form.Item name="pid" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Input placeholder="Nhập mã sản phẩm" onChange={handleCheckProduct} />
            </Form.Item>

            {
              productSelect?._id ? <Typography.Paragraph>Số lượng sản phẩm còn: <b>{productSelect.quantity}</b>, giá hiện tại là: <b>{productSelect.price} đ</b></Typography.Paragraph> : null
            }

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập email người dùng: </Typography.Paragraph>
            <Form.Item name="user" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Input placeholder="Nhập email người dùng" onChange={handleCheckUser} />
            </Form.Item>

            {
              userSelect?._id ? <Typography.Paragraph><b>Người dùng tồn tại</b></Typography.Paragraph> : <Typography.Paragraph><b>Người dùng không tồn tại</b></Typography.Paragraph>
            }

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập giá: </Typography.Paragraph>
            <Form.Item name="price" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <InputNumber placeholder="Nhập giá" style={{ width: "100%" }} min="0" />
            </Form.Item>

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập số lượng: </Typography.Paragraph>
            <Form.Item name="quantity" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <InputNumber placeholder="Nhập số lượng" style={{ width: "100%" }} min="0"  max={productSelect.quantity || 0}/>
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Chọn trạng thái: </Typography.Paragraph>
            <Form.Item name="status" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Select>
                <Select.Option value="PENDING">CHƯA GIAO</Select.Option>
                <Select.Option value="DOING">ĐANG GIAO</Select.Option>
                <Select.Option value="DONE">ĐÃ GIAO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ width: "100%", textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
              <Button type="link" htmlType="button">
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Spin>

      </Modal>
    </>
  );
};

export default React.memo(DetailUserComponent)