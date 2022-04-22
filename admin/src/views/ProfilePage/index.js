import React, { useState, useEffect } from 'react';
import { Tag, Row, Col } from 'antd';
import "./index.scss"
import BaseLayout from '../../components/BaseLayout';

import moment from 'moment';
const DetailUserComponent = ({ visible, account, setVisible }) => {
  const [accountInfoData] = useState(localStorage.getObject("user"))

  return (
    <BaseLayout>
      <div id="profile-account">
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Name:
          </Col>
          <Col span={16} className="col-content">
            <span
              className="text-copy"
              onClick={() => {
                // copyTextToClipBoard(accountInfoData?.mail, "MAIL")
              }}>{accountInfoData?.name}</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Email:
          </Col>
          <Col span={16} className="col-content">
            <span
              className="text-copy"
              onClick={() => {
                // copyTextToClipBoard(accountInfoData?.mail, "MAIL")
              }}>{accountInfoData?.email}</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Role:
          </Col>
          <Col span={16} className="col-content">
            <span
              className="text-copy"
              onClick={() => {
                // copyTextToClipBoard(accountInfoData?.mail, "MAIL")
              }}>{accountInfoData?.role}</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Trạng thái:
          </Col>
          <Col span={16} className="col-content">
            <span
              className="text-copy"
              onClick={() => {
                // copyTextToClipBoard(accountInfoData?.mail, "MAIL")
              }}>{accountInfoData?.status === "ACTIVE" ? (<Tag color="green">{accountInfoData?.status}</Tag>) : <Tag color="RED">{accountInfoData?.status}</Tag>}</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Thời gian tạo
          </Col>
          <Col span={16} className="col-content">
            {moment(accountInfoData?.createdAt).format("DD/MM | HH:mm")}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} style={{ textAlign: "right" }} className="col-title">
            Thời gian cập nhật
          </Col>
          <Col span={16} className="col-content">
            {moment(accountInfoData?.updatedAt).format("DD/MM | HH:mm")}
          </Col>
        </Row>
      </div>

    </BaseLayout>
  );
};

export default React.memo(DetailUserComponent)