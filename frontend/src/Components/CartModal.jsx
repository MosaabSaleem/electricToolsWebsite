import React from 'react';
import { Modal } from '@mui/material';
import '../Styles/Cart.css';

const CartModal = ({open, handleClose}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className='cartBody'>
        <h1>Cart</h1>
      </div>
    </Modal>
  );
};

export default CartModal;
