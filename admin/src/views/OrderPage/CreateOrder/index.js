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
  const [userNeed, setUserNeed] = useState()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const handleCancel = () => {
    setVisible(false)
    setUserSelect({})
    setProductSelect({})
    setUserNeed("")
    form.resetFields()

  };

  const onFinish = async (newOrder) => {
    try {
      let res = await createOrderAPI(newOrder);
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
      if (e.target.value) {
        const res = await getProductByPIDAPI(e.target.value)
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

  const handleCheckUser = _.throttle(async (e) => {
    try {
      if (e.target.value) {
        const res = await getUserByEmailAPI(e.target.value)
        if (res.status === 200) {
          setUserSelect(res.data.data.user)
        }
        setUserNeed(e.target.value)
      } else {
        setUserNeed("")
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  }, 3000)
  return (
    <>
      <Modal title="T???o m???i" visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
        <Spin spinning={loading}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            initialValues={{
              status: 'PENDING'
            }}
          >
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p ti??u ?????: </Typography.Paragraph>
            <Form.Item name="title" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <Input placeholder="Nh???p ti??u ?????" />
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p m?? t???: </Typography.Paragraph>
            <Form.Item name="description" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <Input placeholder="Nh???p m?? t???" />
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p m?? s???n ph???m: </Typography.Paragraph>
            <Form.Item name="pid" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <Input placeholder="Nh???p m?? s???n ph???m" onChange={handleCheckProduct} />
            </Form.Item>

            {
              productSelect?._id ? <Typography.Paragraph>S??? l?????ng s???n ph???m c??n: <b>{productSelect.quantity}</b>, gi?? hi???n t???i l??: <b>{productSelect.price} ??</b></Typography.Paragraph> : null
            }

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p email ng?????i d??ng: </Typography.Paragraph>
            <Form.Item name="user" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <Input placeholder="Nh???p email ng?????i d??ng" onChange={handleCheckUser} />
            </Form.Item>

            {
              userNeed ? (
                userSelect?._id ? <Typography.Paragraph><b>Ng?????i d??ng t???n t???i</b></Typography.Paragraph> : <Typography.Paragraph><b>Ng?????i d??ng kh??ng t???n t???i</b></Typography.Paragraph>
              ) : null
            }

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p gi??: </Typography.Paragraph>
            <Form.Item name="price" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <InputNumber placeholder="Nh???p gi??" style={{ width: "100%" }} min="0" />
            </Form.Item>

            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nh???p s??? l?????ng: </Typography.Paragraph>
            <Form.Item name="quantity" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <InputNumber placeholder="Nh???p s??? l?????ng" style={{ width: "100%" }} min="0" max={productSelect?.quantity || 0} />
            </Form.Item>
            <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Ch???n tr???ng th??i: </Typography.Paragraph>
            <Form.Item name="status" rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin' }]}>
              <Select>
                <Select.Option value="PENDING">CH??A GIAO</Select.Option>
                <Select.Option value="DOING">??ANG GIAO</Select.Option>
                <Select.Option value="DONE">???? GIAO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ width: "100%", textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                T???o m???i
              </Button>
              <Button type="link" htmlType="button" onClick={handleCancel}>
                H???y
              </Button>
            </Form.Item>
          </Form>
        </Spin>

      </Modal>
    </>
  );
};

export default React.memo(DetailUserComponent)