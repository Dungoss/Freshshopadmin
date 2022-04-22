import React from 'react'
import { Result, Button } from 'antd';
import {Link} from 'react-router-dom';
let NotFoundPage = () => {
    return(
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi trang web không tồn tại."
            extra={
                <Link to="/" >
                    <Button type="primary">Quay lại trang chủ</Button>
                </Link>
            }
        />
    )
}
export default NotFoundPage