import React from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import { DownOutlined } from '@ant-design/icons';

@connect(({ products }) => ({
    productsData: products.productsData,
    screenSize: products.screenSize
}))

class Screen extends React.Component {
    setScreenSize = async (size) => {
        // console.log(size)
        const { dispatch } = this.props
        await dispatch({
            type: 'products/setScreenSize',
            size
        })
    }
    setScreenSort = async (sort) => {
        // console.log(sort)
        const { dispatch } = this.props
        await dispatch({
            type: 'products/setScreenSort',
            sort
        })
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.setScreenSize("所有尺寸")}>
                    <a>所有尺寸</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSize("S")}>
                    <a>S</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSize("M")}>
                    <a>M</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSize("L")}>
                    <a>L</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSize("XL")}>
                    <a>XL</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSize("XXL")}>
                    <a>XXL</a>
                </Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu>
                <Menu.Item onClick={() => this.setScreenSort("综合排序")}>
                    <a>综合排序</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSort("价格升序")}>
                    <a>价格升序</a>
                </Menu.Item>
                <Menu.Item onClick={() => this.setScreenSort("价格降序")}>
                    <a>价格降序</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Dropdown overlay={menu}>
                    <a><DownOutlined />尺寸选择</a>
                </Dropdown>{'\u00A0'}{'\u00A0'}{'\u00A0'}
                <Dropdown overlay={menu2}>
                    <a><DownOutlined />价格排序</a>
                </Dropdown>
            </div>
        )
    }
}
export default Screen;