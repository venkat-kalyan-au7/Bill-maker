import React from 'react';
import { Menu } from 'antd';
import {Link} from "react-router-dom"

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <Link to="/">Home</Link>
    </Menu.Item>
    
    <Menu.Item key="customer">
      <Link to="/addcustomer">New Customer</Link>
    </Menu.Item>

    <Menu.Item key="customer">
      <Link to="/bill">New Bill</Link>
    </Menu.Item>

    <Menu.Item key="customer">
      <Link to="/transactions">All Transactions</Link>
    </Menu.Item>

    <Menu.Item key="customer">
      <Link to="/refund">Make Refund</Link>
    </Menu.Item>

  </Menu>
  )
}

export default LeftMenu