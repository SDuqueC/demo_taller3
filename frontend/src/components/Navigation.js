import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import "../App.css";


const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
                <Navbar.Brand className="app-logo" href="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        width="40"
                        height="50"
                        className="d-inline-block align-center"
                        alt="React Bootstrap logo"
                    />{' '}
                    User Management System
                </Navbar.Brand>
            </Navbar>
            <div className='sidebar'>
                <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                        Navigation
                    </CDBSidebarHeader>
                    <CDBSidebarContent>
                        <CDBSidebarMenu>
                            <NavLink exact to="/users" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="list">Users List</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/manage_users" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user">Manage Users</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/products" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="list">Products List</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/manage_products" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table">Manage Products</CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="chart-bar">Products Dashboard</CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
        </div>
    );
};

export default Navigation;