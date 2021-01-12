
export default {
    namespace: "shoppingBox",
    state: {
        boxData: [],
        count: 0,
        amount: 0
    },
    effects: {
        *boxAdd({ payload: { data, size } }, { put }) {
            // console.log(data.title + "-2-" + size)
            yield put({
                type: 'boxData',
                payload: {
                    data,
                    size
                }
            })
        },
        *boxDelete({ payload: { data } }, { put }) {
            yield put({
                type: 'delete',
                payload: {
                    data
                }
            })
        },
        *boxChange({ payload: { data, num } }, { put }) {
            yield put({
                type: 'change',
                payload: {
                    data,
                    num
                }
            })
        },
        *setStorage({ payload }, { put }) {
            yield put({
                type: 'storageData',
                data: {
                    boxData: JSON.parse(window.localStorage.getItem("boxData")),
                    count: window.localStorage.getItem("count"),
                    amount: window.localStorage.getItem("amount"),
                }
            })
        },
        *buyAll({ payload }, { put }) {
            yield put({
                type: 'clear'
            })
        }

    },
    reducers: {
        boxData(state, payload) {
            const { boxData } = state
            const { data, size } = payload.payload
            // console.log(data.title + "-3-" + size)
            let key = 0
            let count = 0
            boxData.forEach(item => {
                // console.log(item)
                if (item.title === data.title && item.size === size) {
                    item.number++
                } else {
                    key++
                }
                count += item.number
            })
            // console.log("boxDataL:", boxData.length, "keyL:", key)
            if (boxData.length === key) {
                boxData.push({
                    ...data,
                    size: size,
                    number: 1
                })
                count++
            }
            let amount = 0
            boxData.forEach(item => {
                amount += item.price * item.number
            });
            // redux 更新了state后，组件没有更新，没有重新渲染的问题原因是 state是引用，直接修改state的时候store内部的state同样也就变了，redux认为dispatch前后的state没有改变，就不会render，所以如果要取这整个对象进行一些修改，可以使用Object.assign或者直接简单粗暴地拷贝一份
            let myBoxData = JSON.parse(JSON.stringify(boxData))
            // console.log(myBoxData, "-4-boxData")

            const storage = window.localStorage
            storage.setItem("boxData", JSON.stringify(boxData))
            storage.setItem("count", count)
            storage.setItem("amount", amount)
            // console.log("myBoxData:", myBoxData)
            // console.log("storageBoxData:", JSON.parse(storage.getItem("boxData")))
            return {
                ...state,
                boxData: myBoxData,
                count,
                amount
            }
        },
        delete(state, payload) {
            const { boxData } = state
            const { data } = payload.payload
            // console.log("data:", data)
            boxData.forEach(item => {
                if (item.title === data.title && item.size === data.size) {
                    boxData.splice(boxData.findIndex(item => item.title === data.title && item.size === data.size), 1)
                }
            })
            let count = 0
            boxData.forEach(item => {
                count += item.number
            })
            let myBoxData = JSON.parse(JSON.stringify(boxData))
            let amount = 0
            boxData.forEach(item => {
                amount += item.price * item.number
            });
            const storage = window.localStorage
            storage.setItem("boxData", JSON.stringify(boxData))
            storage.setItem("count", count)
            storage.setItem("amount", amount)
            return {
                ...state,
                boxData: myBoxData,
                count,
                amount
            }
        },
        change(state, payload) {
            const { boxData } = state
            const { data, num } = payload.payload
            // console.log('data', data, 'num:', num)
            boxData.forEach(item => {
                if (item.title === data.title && item.size === data.size) {
                    item.number += num
                    if (item.number === 0) {
                        boxData.splice(boxData.findIndex(item => item.title === data.title && item.size === data.size), 1)
                    }
                }
            })
            let count = 0
            boxData.forEach(item => {
                count += item.number
            })
            let myBoxData = JSON.parse(JSON.stringify(boxData))
            let amount = 0
            boxData.forEach(item => {
                amount += item.price * item.number
            });
            const storage = window.localStorage
            storage.setItem("boxData", JSON.stringify(boxData))
            storage.setItem("count", count)
            storage.setItem("amount", amount)
            return {
                ...state,
                boxData: myBoxData,
                count,
                amount
            }
        },
        storageData(state, { data }) {
            // console.log("data:", data)
            // console.log("boxData:", data.boxData)
            let myBoxData = JSON.parse(JSON.stringify(data.boxData))
            // localStorage.clear()
            return {
                ...state,
                boxData: myBoxData,
                count: data.count,
                amount: data.amount
            }
        },
        clear(state) {
            localStorage.clear()
            return {
                ...state,
                boxData: [],
                count: 0,
                amount: 0
            }
        }

    }

}