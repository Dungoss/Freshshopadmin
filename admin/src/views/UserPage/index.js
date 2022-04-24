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
  getAllUsersAPI,
  updateStatusUserAPI,
  destroyUserAPI
} from '../../api/user';
import ModalDetailAccount from './DetailAccount';
import ModalCreateAccount from './CreateUser';
// import ModalUploadExcel from './UploadExcel';
// import ModalUpdateSaleByLinkProduct from './UpdateSaleByLinkProduct';
import BaseLayout from '../../components/BaseLayout';
import { errorNotify, successNotify } from '../../utils/notificationCommon';
import moment from 'moment';
import './index.scss';
let HomePage = (props) => {
  let [usersSource, setUsersSource] = useState([]);
  let [userDetail, setUserDetail] = useState([]);
  let [totalUsersSource, setTotalUsersSource] = useState([]);
  let [isVisibleDetail, setVisibleDetail] = useState(0);
  let [isVisibleCreate, setVisibleCreate] = useState(false);
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
        let res = await getAllUsersAPI();
        if (res.status === 200) {
          let handleDataRes = res.data.data.users.length
            ? res.data.data.users.map((accountItem, index) => {
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
  let handleDeleteMail = async (idAccount) => {
    try {
      setLoading(true);
      let res = await destroyUserAPI(idAccount);
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

   //thay đổi trạng thái của người dùng
   let handleChangeStatusUser = async (id, status) => {
    try {
      let res = await updateStatusUserAPI(id, { status: status });
      if (res.status === 200) {
        successNotify("Cập nhật trạng thái người dùng thành công");
        setIsUpdateSuccess(prevState => !prevState)
      }
    } catch (error) {
      errorNotify(error)
    }
  }
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
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (record) => {
        return (
          <Typography.Paragraph eclipse="true">
            <span
              className="text-copy"
              onClick={() => {
                copyTextToClipBoard(record, 'name');
              }}
            >
              {record}
            </span>
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: (record) => {
        return (
          <Typography.Paragraph eclipse="true">
            <span
              className="text-copy"
              onClick={() => {
                copyTextToClipBoard(record, 'email');
              }}
            >
              {record}
            </span>
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        return (
          <Typography.Paragraph>
            {
              record === "ACTIVE" ? (<Tag color="green">{record}</Tag>) : <Tag color="RED">{record}</Tag>
            }
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
        let checkStatusOfUser = (status) => {
          if (status === "ACTIVE") {
            return <Button style={{ backgroundColor: "red", color: "white" }} onClick={() => {
              handleChangeStatusUser(record._id, "BLOCK")
            }}> Block </Button>
          } else {
            return <Button style={{ backgroundColor: "yellow" }} onClick={() => {
              handleChangeStatusUser(record._id, "ACTIVE")
            }}> Active </Button>
          }
        }
        return (
          <div style={{ width: '100%', textAlign: 'center', marginBottom: '13px' }}>
            {checkStatusOfUser(record.status)}
            <Button style={{ margin: '0 10px' }} onClick={() => { setVisibleDetail(true); setUserDetail(record) }}>Xem chi tiết</Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => {
                handleDeleteMail(record._id);
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
      let res = await getAllUsersAPI(Object.assign({}, conditionSearch, condition));
      if (res.status === 200) {
        const pageNow = (+condition.current - 1) * (+condition.pageSize)
        let handleDataRes = res.data.data.users.length
          ? res.data.data.users.map((accountItem, index) => {
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
             <ModalDetailAccount
              visible={isVisibleDetail}
              setVisible={setVisibleDetail}
              account={userDetail}
            />
             <ModalCreateAccount
              visible={isVisibleCreate}
              setVisible={setVisibleCreate}
              setIsUpdateSuccess={setIsUpdateSuccess}
            />
            <div id="home-page" className="home-page">
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
                    // setIsVisibleSearchAdvanced(true)
                    setVisibleCreate(true)
                  }}
                >Thêm user</Button>
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
