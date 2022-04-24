import React, {useState} from 'react';
import { Modal, Select, Button, Input, Typography, Form } from 'antd';
import { updateUserAPI } from '../../../api/user'
import { errorNotify, successNotify } from '../../../utils/notificationCommon';
import _ from 'lodash'
const DetailUserComponent = ({ visible, setVisible, setAccountInfoData }) => {
  const [form] = Form.useForm();
  const [accountInfoData] = useState(localStorage.getObject("user"))

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };

  const onFinish = async (newProfile) => {
    try {
      newProfile = _.pickBy(newProfile)
      let res = await updateUserAPI(accountInfoData._id, newProfile);
      if (res.status) {
        successNotify(res.data.message);
        setVisible(false);
        localStorage.setObject('user', Object.assign(accountInfoData, newProfile))
        setAccountInfoData(Object.assign(accountInfoData, newProfile))
        form.resetFields()
      }
    } catch (error) {
      errorNotify(error);
    }
  }

  return (
    <>
      <Modal title="Cập nhật" visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
        <Form 
            form={form} 
            name="control-hooks"
            onFinish={onFinish}
            initialValues={{
              role: accountInfoData?.role,
              email: accountInfoData?.email,
              status: accountInfoData?.status,
              name: accountInfoData?.name
            }}
          >
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập Email: </Typography.Paragraph>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: 'Email không đúng định dạng vui lòng nhập lại',
              }
            ]}
          >
            <Input placeholder="Nhập email" disabled/>
          </Form.Item>
          <Typography.Paragraph>Nhập tên: </Typography.Paragraph>
          <Form.Item
            name="name"
          >
            <Input placeholder="Nhập tên"/>
          </Form.Item>
          <Typography.Paragraph>Nhập mật khẩu: </Typography.Paragraph>
          <Form.Item
            name="password"
          >
            <Input.Password autoComplete="on" placeholder="Nhập mật khẩu"/>
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