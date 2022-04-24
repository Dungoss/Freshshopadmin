import React from 'react';
import { Modal, Select, Button, Input, Typography, Form } from 'antd';
import { createNewAccountAdminAPI } from '../../../api/user'
import { errorNotify, successNotify } from '../../../utils/notificationCommon';

const DetailUserComponent = ({ visible, setVisible, setIsUpdateSuccess }) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };

  const onFinish = async (newProduct) => {
    try {
      let res = await createNewAccountAdminAPI(newProduct);
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
        <Form 
            form={form} 
            name="control-hooks"
            onFinish={onFinish}
            initialValues={{
              role: "USER"
            }}
          >
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập Email: </Typography.Paragraph>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              }, {
                type: "email",
                message: 'Email không đúng định dạng vui lòng nhập lại',
              }
            ]}
          >
            <Input placeholder="Nhập email"/>
          </Form.Item>
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập tên: </Typography.Paragraph>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên',
              }
            ]}
          >
            <Input placeholder="Nhập tên"/>
          </Form.Item>
          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập mật khẩu: </Typography.Paragraph>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password autoComplete="on" placeholder="Nhập mật khẩu"/>
          </Form.Item>

          <Typography.Paragraph><span style={{ color: 'red' }}>*</span>Nhập quyền hạn: </Typography.Paragraph>
          <Form.Item name="role" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
              <Select>
                <Select.Option value="ADMIN">ADMIN</Select.Option>
                <Select.Option value="DOING">USER</Select.Option>
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
      </Modal>
    </>
  );
};

export default React.memo(DetailUserComponent)