import {
  Table,
  Button,
  Select,
  Popconfirm,
  Form,
  Spin,
  Typography,
  Input,
  Row,
  Col,
  DatePicker
} from 'antd';
import React, { useState, useEffect } from 'react';
import _ from 'lodash'
//list api
import {
  getAllOrderAPI,
  updateStatusOrderAPI,
  destroyOrderAPI
} from '../../api/order'
import ModalDetailOrder from './DetailOrder';
// import ModalUploadExcel from './UploadExcel';
// import ModalUpdateSaleByLinkProduct from './UpdateSaleByLinkProduct';
import BaseLayout from '../../components/BaseLayout';
import { errorNotify, successNotify } from '../../utils/notificationCommon';
import moment from 'moment';
import ModalCreateProduct from './CreateOrder'
// import ModalUpdateProduct from './UpdateOrder'
import './index.scss';
let HomePage = (props) => {
  let [ordersSource, setOrdersSource] = useState([]);
  let [orderDetail, setOrderDetail] = useState([]);
  let [totalOrdersSource, setTotalOrdersSource] = useState([]);
  let [isVisibleDetail, setVisibleDetail] = useState(false);
  let [isVisibleCreate, setVisibleCreate] = useState(false);
  let [isVisibleUpdate, setVisibleUpdate] = useState(false);
  let [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let [conditionSearch, setConditionSearch] = useState({
    current: 1,
    pageSize: 5,
  });
  const [form] = Form.useForm();
  //hiển thị toàn bộ account
  useEffect(() => {
    let _getAllUsers = async () => {
      try {
        setLoading(true);
        let res = await getAllOrderAPI();
        if (res.status === 200) {
          let handleDataRes = res.data.data.orders.length
            ? res.data.data.orders.map((accountItem, index) => {
              accountItem.key = index + 1;
              return accountItem;
            })
            : [];
          setOrdersSource(handleDataRes);
          setTotalOrdersSource(res.data.data.totalCount);
        }
      } catch (error) {
        errorNotify(error, '', 2);
      } finally {
        setLoading(false);
      }
    };
    _getAllUsers();
  }, [
    isUpdateSuccess
  ]);


  // //xóa mail theo id
  let handleDeleteProduct = async (idProduct) => {
    try {
      setLoading(true);
      let res = await destroyOrderAPI(idProduct);
      if (res.status) {
        successNotify(res.data.message);
        setIsUpdateSuccess(prevState => !prevState);
      }
    } catch (error) {
      errorNotify(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchInput = _.throttle(async (e) => {
    try {
      setLoading(true);
      const res = await getAllOrderAPI({ pid: e.target.value })
      if (res.status === 200) {
        let handleDataRes = res.data.data.orders.length
          ? res.data.data.orders.map((accountItem, index) => {
            accountItem.key = index + 1;
            return accountItem;
          })
          : [];
        setOrdersSource(handleDataRes);
        setTotalOrdersSource(res.data.data.totalCount);
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  }, 3000)
  function copyTextToClipBoard(text, typeCopy) {
    typeCopy = typeCopy.toUpperCase() || '';
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    successNotify('Copy ' + typeCopy + ' thành công ', 1);
    return text;
  }
  const columnsAdmin = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (record) => {
        return (
          <Typography.Paragraph eclipse="true">
            <span
              className="text-copy"
              onClick={() => {
                copyTextToClipBoard(record, 'tên');
              }}
            >
              {record}
            </span>
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Mã order',
      dataIndex: 'oid',
      key: 'oid',
      render: (record) => {
        return (
          <Typography.Paragraph eclipse="true">
            <span
              className="text-copy"
              onClick={() => {
                copyTextToClipBoard(record, 'mã order');
              }}
            >
              {record}
            </span>
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (record) => {
        return (
          <Typography.Paragraph>
            {record}
          </Typography.Paragraph>
        )
      },
    },
    {
      title: 'Người đặt',
      dataIndex: 'idUser',
      key: 'idUser',
      render: (record) => {
        return (
          <Typography.Paragraph>
            {record?.email}
          </Typography.Paragraph>
        )
      },
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'idProduct',
      key: 'idProduct',
      render: (record) => {
        return (
          <Typography.Paragraph>
            {record?.pid}
          </Typography.Paragraph>
        )
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        return (
          <Select defaultValue={status} value={status} style={{ width: "150px" }} onChange={async (newStatus) => {
            try {
              setLoading(true);
              let res = await updateStatusOrderAPI(record._id, { status: newStatus });
              if (res.status) {
                successNotify(res.data.message);
                setIsUpdateSuccess(prevState => !prevState);
              }
            } catch (error) {
              errorNotify(error);
            } finally {
              setLoading(false);
            }
          }}>
            <Select.Option value="PENDING">CHƯA GIAO</Select.Option>
            <Select.Option value="DOING">ĐANG GIAO</Select.Option>
            <Select.Option value="DONE">ĐÃ GIAO</Select.Option>
          </Select>
        )
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record) => {
        return <Typography.Paragraph>{moment(record).format('DD/MM | HH:mm a')}</Typography.Paragraph>;
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (record) => {
        return <Typography.Paragraph>{moment(record).format('DD/MM | HH:mm a')}</Typography.Paragraph>;
      },
    },
    {
      title: 'Hành động',
      render: (note, record) => {
        return (
          <div style={{ width: '100%', textAlign: 'center', marginBottom: '13px' }}>
            {/* <Button style={{ marginRight: '10px' }} onClick={() => { setVisibleUpdate(true); setOrderDetail(record) }}>Cập nhật</Button> */}
            <Button style={{ margin: '0 10px' }} onClick={() => { setVisibleDetail(true); setOrderDetail(record) }}>Xem chi tiết</Button>
            {/* <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => {
                handleDeleteProduct(record._id);
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button
                style={{ marginLeft: '15px', marginTop: '5px' }}
                // danger
                type="primary"
              >
                Xóa
              </Button>
            </Popconfirm> */}

          </div>
        );
      },
    },
  ];
  const handleTableChange = async (condition) => {
    delete condition['total'];
    delete condition['showSizeChanger'];
    setConditionSearch(Object.assign({}, conditionSearch, condition));
    try {
      setLoading(true);
      let res = await getAllOrderAPI(Object.assign({}, conditionSearch, condition));
      if (res.status === 200) {
        const pageNow = (+condition.current - 1) * (+condition.pageSize)
        let handleDataRes = res.data.data.orders.length
          ? res.data.data.orders.map((accountItem, index) => {
            accountItem.key = pageNow + index + 1;
            return accountItem;
          })
          : [];
        setOrdersSource(handleDataRes);
        setTotalOrdersSource(res.data.data.totalCount);
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (value) => {
    try {
      setLoading(true);
      if(value.date){
        const start = new Date(moment(value.date[0]._d).valueOf()).setHours(0, 0, 0)
        value.start = new Date(start).getTime()
        const end = new Date(moment(value.date[1]._d).valueOf()).setHours(23, 59, 59)
        value.end = new Date(end).getTime()
      }
      setConditionSearch(Object.assign({}, value));
      let res = await getAllOrderAPI(Object.assign({}, value));
      if (res.status === 200) {
        let handleDataRes = res.data.data.orders.length
          ? res.data.data.orders.map((accountItem, index) => {
            accountItem.key = index + 1;
            return accountItem;
          })
          : [];
        setOrdersSource(handleDataRes);
        setTotalOrdersSource(res.data.data.totalCount);
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {
        <Spin spinning={loading}>
          <BaseLayout>
            <ModalDetailOrder
              visible={isVisibleDetail}
              setVisible={setVisibleDetail}
              orderDetail={orderDetail}
            />
            <ModalCreateProduct
              visible={isVisibleCreate}
              setVisible={setVisibleCreate}
              setIsUpdateSuccess={setIsUpdateSuccess}
            />
            {/* <ModalUpdateProduct 
              visible={isVisibleUpdate}
              setVisible={setVisibleUpdate}
              setIsUpdateSuccess={setIsUpdateSuccess}
              orderDetail={orderDetail}
            /> */}
            <div id="order-page" className="home-page">
              <div
                style={{
                  width: '100%',
                  marginBottom: '30px',
                  textAlign: 'right',
                }}
              >

                <Button style={{
                  backgroundColor: "#39AEA9",
                  marginLeft: "30px",
                  color: 'white'
                }}
                  onClick={() => {
                    setVisibleCreate(true)
                  }}
                >Tạo mới</Button>
              </div>
              <div
                style={{
                  width: '100%',
                  marginBottom: '30px',
                }}
              >

                <Form form={form} onFinish={onFinish}>
                  <Row >
                    <Col span="5">
                      <Form.Item name="oid">
                        <Input
                          size="middle"
                          style={{
                            width: '100%'
                          }}
                          placeholder="Tìm kiếm theo mã order"
                          onChange={handleSearchInput}
                        />
                      </Form.Item>
                    </Col>
                    <Col span="5" style={{ marginLeft: '10px' }}>
                      <Form.Item name="status">
                        <Select style={{ width: "250px" }} placeholder="Chọn trạng thái">
                          <Select.Option value="PENDING">CHƯA GIAO</Select.Option>
                          <Select.Option value="DOING">ĐANG GIAO</Select.Option>
                          <Select.Option value="DONE">ĐÃ GIAO</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span="5" style={{ marginLeft: '10px' }}>
                      <Form.Item name="date">
                        <DatePicker.RangePicker format="DD/MM/YYYY"/>
                      </Form.Item>
                    </Col>
                    <Col span="5" style={{ marginLeft: '10px' }}>
                      <Form.Item >
                        <Button type="primary" htmlType="submit">
                          Tìm kiếm
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>

                </Form>
              </div>
              <Table
                dataSource={ordersSource}
                columns={columnsAdmin}
                id="account-table"
                style={{ width: '100%', height: '100%' }}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  total: totalOrdersSource,
                }}
                onChange={(condition) => {
                  handleTableChange(condition);
                }}
              />
            </div>
          </BaseLayout>
        </Spin>
      }
    </>
  );
};


export default React.memo(HomePage);
