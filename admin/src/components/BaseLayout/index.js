import { Layout, Menu, Dropdown, notification } from 'antd';
import React, { useState } from 'react';
import './index.scss';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AccountBookOutlined,
  DownOutlined,
  HomeOutlined,
  BookOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {
  Link, withRouter
} from 'react-router-dom';
import "./Loading.css";
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
let BaseLayout = (props) => {
  let [collapsed, setCollapsed] = useState(true)
  const [activeKey] = useState(props.location.pathname.split('/')[1]);
  let userInfo = localStorage.getObject("user");
  let toggle = () => {
    setCollapsed(!collapsed)
  };
  let onCLickLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    notification.success({
      duration: 3,
      message: "Thành công",
      description: "Đăng xuất thành công"
    })
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile" target="" rel="noopener noreferrer">
          Trang cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="logout" target="" rel="noopener noreferrer" onClick={onCLickLogout}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/">
            <div className="logo" style={{ color: "white", fontSize: "40px", textAlign: "center" }}> <HomeOutlined /> </div>
          </Link>
          <Menu theme="dark" mode="inline" selectedKeys={activeKey}>

            <Menu.Item key="" icon={<AccountBookOutlined />}>
              <Link to="/">
                Trang chủ
              </Link>
            </Menu.Item>
            <Menu.Item key="user" icon={<PieChartOutlined />}>
              <Link to="/user">
                Thông tin người dùng
              </Link>
            </Menu.Item>
            <Menu.Item key="product" icon={<PieChartOutlined />}>
              <Link to="/product">
                Thông tin sản phẩm
              </Link>
            </Menu.Item>
            <Menu.Item key="order" icon={<PieChartOutlined />}>
              <Link to="/order">
                Thông tin sản phẩm
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, fontSize: "20px" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <span style={{ float: "right", marginRight: '20px' }}>
              <Dropdown trigger='click' overlay={menu}>
                <Link to="#" className="ant-dropdown-link" style={{ color: "black" }} onClick={e => e.preventDefault()}>
                  {userInfo.email} <DownOutlined style={{ fontSize: 13, marginTop: 10 }} />
                </Link>
              </Dropdown>
            </span>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {
              props.children
            }
          </Content>
        </Layout>
      </Layout>
    </>

  );
}
export default React.memo(withRouter(BaseLayout))