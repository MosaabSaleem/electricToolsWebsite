import React from 'react';
import '../Styles/Layout.css';

const Layout = ({children}) => {
  return (
    <>
      <div className='navBar'> 
        <div className='navPart'>
          <button>account</button>
          <p>logo</p>
          <button>Cart</button>
        </div>
        <div className='navPart'>
          <p>categories</p>
        </div>
      </div>
      <main>{children}</main>
    </>
  )
}

export default Layout;