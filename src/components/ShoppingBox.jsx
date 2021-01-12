import React from 'react';
import { Statistic, Button, List, message } from 'antd';
import { connect } from 'dva';
import { PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

@connect(({ shoppingBox }) => ({
    boxData: shoppingBox.boxData,
    amount: shoppingBox.amount
}))

class ShoppingBox extends React.Component {
    boxDelete = async (data) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'shoppingBox/boxDelete',
            payload: {
                data
            }
        })
    }
    boxChange = async (data, num) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'shoppingBox/boxChange',
            payload: {
                data,
                num
            }
        })
    }
    buyAll = async () => {
        const { dispatch } = this.props
        await dispatch({
            type: 'shoppingBox/buyAll'
        })
    }
    render() {
        const key = 'updatable'
        const openMessage = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                this.buyAll()
                message.success({ content: '支付成功!', key, duration: 2 });
            }, 1000);
        }
        const { boxData, amount } = this.props
        // console.log('boxData:', boxData)
        const GoodList = (
            <List
                itemLayout="horizontal"
                dataSource={boxData}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button.Group size="small">
                                <Button onClick={() => this.boxChange(item, 1)} icon={<PlusCircleOutlined />} style={{ border: 'none' }} />
                                <Button onClick={() => this.boxChange(item, -1)} icon={<MinusCircleOutlined />} style={{ border: 'none' }} />
                            </Button.Group>,
                            <Button onClick={() => this.boxDelete(item)} icon={<CloseCircleOutlined />} style={{ border: 'none' }} />
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<img src={`./img/${item.sku}_2.jpg`} alt="1" style={{ width: 50 }} />}
                            title={item.title}
                            description={item.size + " | $" + item.price}
                        />
                        <div>x {item.number}</div>
                    </List.Item>
                )}
            />)
        return (
            <div>
                {GoodList}
                <h1 style={{ textAlign: 'center' }}>
                    <Statistic title="总价" value={amount} precision={2} />
                    <Button onClick={openMessage} style={{ marginTop: 16 }} type="primary">支付</Button>
                </h1>
            </div>
        )
    }
}
export default ShoppingBox