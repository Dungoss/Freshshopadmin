import React from 'react';
import {notification} from 'antd';
export const errorNotify =  (err, message, duration = 3)=>{
  if( (err.response && err.response.status === 401) || (err.response && err.response.data && err.response.data.message === 'Invalid token') || (err.status === 401)){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    notification.error({
      duration: 3,
      message: "Không thành công",
      description: "Phiên làm việc đã hết vui lòng đăng nhập lại"
    })
    return window.location.href = "/dang-nhap"
  }
  notification.error({
    duration:duration,
    message: message || "Không thành công",
    description: err.data || (err?.response?.data?.message)  || "Không thể kết nối server"
  }) 
}



export const errorNotifyWithArrayDes =  (message, arrayDes = [], duration = 3)=>{
  notification.error({
    duration:duration,
    message: message || "Không thành công",
    description: <div>{arrayDes.map((info, index)=>{
      return <div key={'error' + index}>{info}</div>
    })}</div>
  }) 
}

export const successNotifyWithArrayDes =  (message, arrayDes = [], duration = 3)=>{
  notification.success({
    duration:duration,
    message: message || "Không thành công",
    description: <div>{arrayDes.map((info, index)=>{
      return <div key={'error' + index}>{info}</div>
    })}</div>
  }) 
}

export const successNotify =  (message, duration = 3)=>{
  notification.success({
    duration:duration,
    message: "thành công",
    description: message
  }) 
}