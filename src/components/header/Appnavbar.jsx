import React, { useState } from 'react';
import { HiBars3CenterLeft, HiMiniUserCircle, HiMiniXMark, HiShoppingCart } from 'react-icons/hi2';
import { Collapse, Dropdown, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';
import CartModal from '../cart/CartModal';
export default function Appnavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggledropdown = () => setDropdownOpen((prevState) => !prevState);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const [modal, setModal] = useState(false);
    const modaltoggle = () => setModal(!modal);
    return (
        <Navbar expand="md" className='border-bottom border-2 p-3'>
            <NavbarBrand className='fw-medium fs-5'>Shopi</NavbarBrand>
            <div className='d-flex'>
                <Dropdown isOpen={dropdownOpen} toggle={toggledropdown}>
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="span"
                    >
                        <HiMiniUserCircle size={32} className='small-block me-2' />
                    </DropdownToggle>
                    <DropdownMenu className='p-3'>
                        <div className='mb-3'>
                            userintheapp@test.com
                        </div>
                        <div className='mb-3'>
                            My Orders
                        </div>
                        <div className='mb-3'>
                            My Account
                        </div>
                        <div className='mb-3'>
                            Cart
                        </div>
                    </DropdownMenu>
                </Dropdown>
                {!isOpen ? <HiBars3CenterLeft onClick={toggle} size={32} className='small-block' /> : <HiMiniXMark onClick={toggle} size={32} className='small-block' />}
            </div>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink className='active-nav-link text-decoration-underline'>All</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Clothes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Electronics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Furniture</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Toys</NavLink>
                    </NavItem>
                </Nav>
                <div className='nav-action'>
                    <NavbarText className='user-mail'>userintheapp@test.com</NavbarText>
                    <NavbarText>My Orders</NavbarText>
                    <NavbarText>My Account</NavbarText>
                    <NavbarText className='text-dark' onClick={modaltoggle}><HiShoppingCart size={24} /><span className='ms-2'>{totalQuantity}</span></NavbarText>
                </div>
            </Collapse>
            <CartModal modal={modal} modaltoggle={modaltoggle} />
        </Navbar>
    )
}
