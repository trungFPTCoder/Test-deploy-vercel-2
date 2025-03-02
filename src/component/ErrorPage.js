import React from 'react';
import '../assest/ErrorPage.css';
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center">404</h1>
            </div>
            <div className="contant_box_404">
              <h2>OOP!, Có vẻ như trang bạn đang tìm kiếm không tồn tại</h2>
              <p>Tiếp tục trở lại trải nghiệm phim nhé!</p>
              <Link to={'/'} className="btn btn-dark">Trang chủ</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ErrorPage;