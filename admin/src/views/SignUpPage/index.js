import React from 'react';
import { Form, Input, Button, message } from 'antd';
import "./index.scss"
import { signup } from "../../api/auth"
import { errorNotify, successNotify } from '../../utils/notificationCommon';
import {
  useHistory,
  Link
} from 'react-router-dom';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  let history = useHistory();
  const onFinish = async formData => {
    try {
      var response = await signup(formData);
      if (response.status === 200) {
        successNotify(response.data.message, 2)
        history.push('/dang-nhap');
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  };

  return (
    <div className="login-page">
      <div className='login-form'>
        <div className="title-login">
          ĐĂNG KÝ
        </div>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password autoComplete="on" />
          </Form.Item>
          <Link to="/dang-nhap">Chuyển sang trang đăng nhập</Link>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login