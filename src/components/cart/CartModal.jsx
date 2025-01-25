import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import Counter from '../common/Counter/Counter';

export default function CartModal({ modal, modaltoggle }) {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/1080?text=image+not+found';
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    return (
        <Modal isOpen={modal} toggle={modaltoggle} size="md" centered>
            <ModalHeader toggle={modaltoggle}>ORDER</ModalHeader>
            <ModalBody>
                {cartItems.length === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between align-content-center mb-3">
                            <div className="d-flex justify-content-start align-items-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded order-image"
                                    onError={handleImageError}
                                />
                                <div className="ms-3 d-flex flex-column">
                                    <span className="fw-bold order-name">{item.title}</span>
                                    <small>Delivery 24th July</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <Counter itemId={item.id} />
                                <span className="ms-2 order-value">USD {item.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                )}
                <hr />
                {cartItems.length > 0 && (
                    <>
                        <div className='d-flex justify-content-between mt-2'>
                            <span>Subtotal</span>
                            <span>USD {subtotal.toFixed(2)}</span>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <span>Shipping</span>
                            <span>USD {shipping.toFixed(2)}</span>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <span>Total</span>
                            <span>USD {total.toFixed(2)}</span>
                        </div>
                        <div>
                            <button className="btn btn-dark mt-3 w-100">CHECKOUT</button>
                        </div>
                    </>
                )}
            </ModalBody>
        </Modal>
    );
}