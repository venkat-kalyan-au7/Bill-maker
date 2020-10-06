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
      <Link to="/addcustomer">NewCustomer</Link>
    </Menu.Item>

    <Menu.Item key="bill">
      <Link to="/bill">NewBill</Link>
    </Menu.Item>
    <Menu.Item key="refund">
      <Link to="/refund">Refund</Link>
    </Menu.Item>

    <Menu.Item key="transaction">
      <Link to="/transaction">Transaction</Link>
    </Menu.Item>

   

   

  </Menu>
  )
}

export default LeftMenu