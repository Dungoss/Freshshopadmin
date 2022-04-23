import {
  Table,
  Button,
  Tag,
  Popconfirm,
  Spin,
  Typography,
  Input
} from 'antd';
import React, { useState, useEffect } from 'react';
import _ from 'lodash'
//list api
import {
  getAllProductsAPI,
  destroyProductAPI
} from '../../api/product'
import ModalDetailProduct from './DetailProduct';
// import ModalUploadExcel from './UploadExcel';
// import ModalUpdateSaleByLinkProduct from './UpdateSaleByLinkProduct';
import BaseLayout from '../../components/BaseLayout';
import { errorNotify, successNotify } from '../../utils/notificationCommon';
import moment from 'moment';
import ModalCreateProduct from './CreateProduct'
import ModalUpdateProduct from './UpdateProduct'
import './index.scss';
let HomePage = (props) => {
  let [usersSource, setUsersSource] = useState([]);
  let [productDetail, setProductDetail] = useState([]);
  let [totalUsersSource, setTotalUsersSource] = useState([]);
  let [isVisibleDetail, setVisibleDetail] = useState(false);
  let [isVisibleCreate, setVisibleCreate] = useState(false);
  let [isVisibleUpdate, setVisibleUpdate] = useState(false);
  let [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let [conditionSearch, setConditionSearch] = useState({
    current: 1,
    pageSize: 5,
  });
  let userLocal = localStorage.getObject('user');
  //hiển thị toàn bộ account
  useEffect(() => {
    let _getAllUsers = async () => {
      try {
        setLoading(true);
        let res = await getAllProductsAPI();
        if (res.status === 200) {
          let handleDataRes = res.data.data.products.length
            ? res.data.data.products.map((accountItem, index) => {
              accountItem.key = index + 1;
              return accountItem;
            })
            : [];
          setUsersSource(handleDataRes);
          setTotalUsersSource(res.data.data.totalCount);
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
      let res = await destroyProductAPI(idProduct);
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
      const res = await getAllProductsAPI({ pid: e.target.value })
      if (res.status === 200) {
        let handleDataRes = res.data.data.products.length
          ? res.data.data.products.map((accountItem, index) => {
            accountItem.key = index + 1;
            return accountItem;
          })
          : [];
        setUsersSource(handleDataRes);
        setTotalUsersSource(res.data.data.totalCount);
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
      title: 'Tên sản phẩm',
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
      title: 'Mã sản phẩm',
      dataIndex: 'pid',
      key: 'pid',
      render: (record) => {
        return (
          <Typography.Paragraph eclipse="true">
            <span
              className="text-copy"
              onClick={() => {
                copyTextToClipBoard(record, 'mã sản phẩm');
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
      title: 'Ngày tạo',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
            <Button style={{ marginRight: '10px' }} onClick={() => { setVisibleUpdate(true); setProductDetail(record) }}>Cập nhật</Button>
            <Button style={{ margin: '0 10px' }} onClick={() => { setVisibleDetail(true); setProductDetail(record) }}>Xem chi tiết</Button>
            <Popconfirm
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
            </Popconfirm>

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
      let res = await getAllProductsAPI(Object.assign({}, conditionSearch, condition));
      if (res.status === 200) {
        const pageNow = (+condition.current - 1) * (+condition.pageSize)
        let handleDataRes = res.data.data.products.length
          ? res.data.data.products.map((accountItem, index) => {
            accountItem.key = pageNow + index + 1;
            return accountItem;
          })
          : [];
        setUsersSource(handleDataRes);
        setTotalUsersSource(res.data.data.totalCount);
      }
    } catch (error) {
      errorNotify(error, '', 2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        <Spin spinning={loading}>
          <BaseLayout>
            <ModalDetailProduct
              visible={isVisibleDetail}
              setVisible={setVisibleDetail}
              productDetail={productDetail}
            />
            <ModalCreateProduct 
              visible={isVisibleCreate}
              setVisible={setVisibleCreate}
              setIsUpdateSuccess={setIsUpdateSuccess}
            />
            <ModalUpdateProduct 
              visible={isVisibleUpdate}
              setVisible={setVisibleUpdate}
              setIsUpdateSuccess={setIsUpdateSuccess}
              productDetail={productDetail}
            />
            <div id="product-page" className="home-page">
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
                <Input
                  size="middle"
                  style={{
                    width: '300px'
                  }}
                  placeholder="Tìm kiếm sản phẩm theo mã sản phẩm"
                  onChange={handleSearchInput}
                />
              </div>
              <Table
                dataSource={usersSource}
                columns={columnsAdmin}
                id="account-table"
                style={{ width: '100%', height: '100%' }}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  total: totalUsersSource,
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
