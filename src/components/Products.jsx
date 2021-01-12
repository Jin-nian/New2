import React from 'react';
import { Card, Button, Popover, List, Row, Col } from 'antd';
import { connect } from 'dva';

@connect(({ products, shoppingBox }) => ({
    productsData: products.productsData,
    count: products.count
}))

class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            key: 0
        }
    }
    async componentWillMount() {
        const { dispatch } = this.props
        await dispatch({
            type: 'products/GetData'
        })
        if (window.localStorage.boxData) {
            console.log(window.localStorage)
            dispatch({
                type: 'shoppingBox/setStorage'
            })
        }
    }
    boxAdd = async (data, size) => {
        const { dispatch } = this.props
        // console.log(data.title + "-1-" + size)
        await dispatch({
            type: 'shoppingBox/boxAdd',
            payload: {
                data,
                size
            }
        })
    }
    render() {
        const { productsData, count } = this.props
        const GoodsList = (productsData || []).map((item, key) => (
            <Col xs={24} sm={12} md={8} lg={6} style={{ margin: '0 auto' }} key={key}>
                <Card style={{ width: '90%', margin: '0 auto', marginTop: 20, textAlign: "center" }}>
                    <img src={`./img/${item.sku}_1.jpg`} style={{ width: '80%' }} alt={"h"} />
                    <h3 style={{ fontSize: 10 }}>{item.title}</h3>
                    <hr />
                    <h3 style={{ fontSize: 15 }}>{item.currencyFormat + item.price.toFixed(2)}</h3>
                    <Popover
                        content={
                            <List
                                size="small"
                                dataSource={item.availableSizes}
                                renderItem={size => <List.Item><Button block onClick={() => this.boxAdd(item, size)}>{size}</Button></List.Item>}
                            />
                        }
                        title="请选择需要的尺码"
                        trigger="click">
                        <Button style={{ backgroundColor: 'black', color: "#fff", fontSize: 10 }} size="large" block>添加到购物车</Button>
                    </Popover>
                </Card>
            </Col>
        ))
        return (
            <div>
                <h3>{count}件商品</h3>
                <Row>{GoodsList}</Row>
            </div >
        )
    }
}
export default Products