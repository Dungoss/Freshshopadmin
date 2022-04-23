import React, { useState, useEffect } from 'react';
import { Modal, Space, Button, Row, Col, Image, } from 'antd';
import "./index.scss"
import moment from 'moment';
const DetailUserComponent = ({ visible, orderDetail, setVisible }) => {
    const [productData, setProductInfoData] = useState({})

    useEffect(() => {
        setProductInfoData(orderDetail)
    }, [orderDetail])
    const handleCancel = () => {
        setVisible(prevState => !prevState)
    };
    const checkStatus = (status) => {
        if(status === "PENDING") {
            return "CHƯA GIAO"
        }
        if(status === "DOING") {
            return "ĐANG GIAO"
        }
        if(status === "DONE") {
            return "ĐÃ GIAO"
        }
        return "KHÔNG CÓ TRẠNG THÁI"
    }

    return (
        <>
            <Modal title="chi tiết" width={1000} visible={visible} onCancel={handleCancel} footer={null} getContainer={false} id="modal-detail-account">
                <div id="detail-account">
                    <Button onClick={handleCancel}>
                        Quay lại
                    </Button>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Tiêu đề:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.title}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Mô tả:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.description}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Mã order:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.oid}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Mã sản phẩm:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.idProduct?.pid}</span>
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
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{checkStatus(productData?.status)}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Người dùng:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.idUser?.email}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Giá:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.price}</span>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Số lượng:
                        </Col>
                        <Col span={16} className="col-content">
                            <span
                                className="text-copy"
                                onClick={() => {
                                    // copyTextToClipBoard(productData?.mail, "MAIL")
                                }}>{productData?.quantity}</span>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Thời gian tạo
                        </Col>
                        <Col span={16} className="col-content">
                            {moment(productData?.createdAt).format("DD/MM | HH:mm")}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8} style={{ textAlign: "right" }} className="col-title">
                            Thời gian cập nhật
                        </Col>
                        <Col span={16} className="col-content">
                            {moment(productData?.updatedAt).format("DD/MM | HH:mm")}
                        </Col>
                    </Row>
                </div>

            </Modal>
        </>
    );
};

export default React.memo(DetailUserComponent)