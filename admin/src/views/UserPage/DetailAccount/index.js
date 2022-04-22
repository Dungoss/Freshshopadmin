import React, { useState, useEffect } from 'react';
import { Modal, Tag, Button, Row, Col, Select, Form, Space } from 'antd';
import "./index.scss"
import moment from 'moment';
const DetailUserComponent = ({ visible, account, setVisible }) => {
    const [accountInfoData, setAccountInfoData] = useState({})

    useEffect(() => {
        setAccountInfoData(account)
    }, [account])
    const handleCancel = () => {
        setVisible(prevState => !prevState)
    };


    return (
        <>
            <Modal title="chi tiết tài khoản" width={1000} visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
                <div id="detail-account">
                    <Button onClick={handleCancel}>
                        Quay lại
                    </Button>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            name:
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
                            email:
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
                            role:
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
                                }}>{accountInfoData?.status  === "ACTIVE" ? (<Tag color="green">{accountInfoData?.status}</Tag>) : <Tag color="RED">{accountInfoData?.status}</Tag>}</span>
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

            </Modal>
        </>
    );
};

export default React.memo(DetailUserComponent)