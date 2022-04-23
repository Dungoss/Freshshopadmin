import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

const UploadImage = (props) => {
  const [listImage, setListImage] = useState([]);
  const [loading, setLoading] = useState(false)
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
      Authorization: `Bearer ${accessToken}`,
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể upload file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File ảnh phải nhỏ hơn 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      let linkImage = info.file.response && info.file.response.url ? info.file.response.url : ""
      props.getLinkImage(linkImage)
      setLoading(false);
      setListImage(info.fileList);
      return;
    }

  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <Upload
        action={`${process.env.NODE_ENV !== "production"
          ? process.env.REACT_APP_BACKEND_DEV
          : process.env.REACT_APP_BACKEND_PROD
          }/products/upload-thumb`}
        headers={headers}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        name='file'
        onRemove={(file) => {
          let newListImage = listImage.filter((imageItem) => imageItem.uid !== file.uid)
          setListImage(newListImage);
          props.getLinkImage("")
        }}
        showUploadList={false}
        listType="picture"
      >
        {loading ? <LoadingOutlined /> : <Button
          style={{ marginTop: "5px" }}
          icon={<UploadOutlined />}
        ></Button>}
        <span style={{ marginLeft: "5px" }}>Chọn ảnh</span>
      </Upload>
    </div>
  );
};

export default UploadImage;
