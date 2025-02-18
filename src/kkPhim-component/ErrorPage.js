import React from 'react';

function ErrorPage() {
  return (
    <div className='bg-dark pb-3'>
      <div className="container text-center text-light" style={{ paddingTop: '128px', paddingBottom:'100px' }}>
        <h1>Something went wrong.</h1>
        <p>We're sorry, but something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}

export default ErrorPage;