import React from 'react';
import { Form, Input, Button, message } from 'antd';
import "./Login.scss"
import { login } from "../../api/auth"
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
      var response = await login(formData);
      if (response.status === 200) {
        if (response.data.data.token) {
          successNotify(response.data.message, 2)
          localStorage.setItem('accessToken', response.data.data.token)
          localStorage.setObject('user', response.data.data.user)
          history.push('/');
        }
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  };

  return (
    <div className="login-page">
      <div className='login-form'>
        <div className="title-login">
          ĐĂNG NHẬP
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
          <Link to="/dang-ky">Chuyển sang trang đăng ký</Link>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login