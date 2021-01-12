import ShopData from '../services/ShopData'

export default {
    namespace: 'products',
    state: {
        productsData: [],
        productsDataAll: [],
        screenSize: '所有尺寸',
        screenSort: '综合排序',
        count: 0
    },
    effects: {
        *GetData({ paylaod }, { put, call }) {
            const res = yield call(ShopData.getProducts)
            // console.log(res)
            if (res) {
                yield put({
                    type: 'setProductsData',
                    data: res.data.products
                })
                yield put({
                    type: 'setProductsDataAll',
                    data: res.data.products
                })
                yield put({
                    type: 'setData',
                    data: ''
                })
            } else {
                alert("API Wrong!")
            }
        },
        *setScreenSize(size, { put }) {
            yield put({
                type: 'setData',
                data: size
            })
        },
        *setScreenSort(sort, { put }) {
            yield put({
                type: 'setData',
                data: sort
            })
        }
    },
    reducers: {
        setProductsData(state, paylaod) {
            return {
                ...state,
                productsData: paylaod.data
            }
        },
        setProductsDataAll(state, paylaod) {
            return {
                ...state,
                productsDataAll: paylaod.data
            }
        },
        setData(state, { data }) {
            const { screenSize, screenSort, productsDataAll } = state
            let size
            let sort
            if (data.size) {
                size = data.size
            } else {
                size = screenSize
            }
            if (data.sort) {
                sort = data.sort
            } else {
                sort = screenSort
            }
            // console.log("size:" + size + "   sort:" + sort)
            let arr = []
            if (size === "所有尺寸") {
                productsDataAll.forEach(item => {
                    // console.log(item)
                    arr.push(item)
                })
            } else {
                productsDataAll.forEach(item => {
                    // console.log("length:" + item.availableSizes.length)
                    // console.log(item)
                    let ava = item.availableSizes
                    for (let i = 0; i < ava.length; i++) {
                        if (ava[i] === size) {
                            arr.push(item)
                        }
                    }
                })
            }
            if (sort === "综合排序") {
                arr.sort((a, b) => (a['id'] - b['id']))
            } else if (sort === "价格升序") {
                arr.sort((a, b) => (a['price'] - b['price']))
            } else {
                arr.sort((a, b) => (b['price'] - a['price']))
            }
            let count = 0
            arr.forEach(item => { count++ })
            let myProductsData = JSON.parse(JSON.stringify(arr))
            return {
                ...state,
                screenSize: size,
                screenSort: sort,
                productsData: myProductsData,
                count
            }
        }
    }

}