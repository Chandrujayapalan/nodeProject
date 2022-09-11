const Orders = require('../model/orderModel')
const Products = require('../model/productModel')
// const { send } = require("express/lib/response")

const updateOrder = async (req, res, next) => {

    try {
        let totalCost = 0
        let result = await Products.find({ _id: { $in: req.body.items } })
        result.map(a => {
            totalCost += a.productPrice
        })
        let userId = req.user.id
        let product = {
            items: req.body.items,
            total: totalCost
        }
        result = await Orders.findByIdAndUpdate({ _id: req.body.itemid }, { $set: product }, { new: true })
        console.log(userId)
        console.log(req.user)
        console.log(totalCost)
        console.log(result)
        res.json({
            status: 200,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const orderplace = async (req, res, next) => {

    try {
        let result = await Products.find({ _id: { $in: req.body.items } })
        let totalCost = 0
        result.map(a => {
            totalCost += a.productPrice
        })
        console.log(req.user)

        result = new Orders({
            items: req.body.items,
            userId: req.user.id,
            total: totalCost,
            date: req.body.date
        })
        console.log(result)
        await result.save()
        res.json({
            status: 200,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const deleteOrder = async (req, res, next) => {
    try {
        let userId = req.body.orderId

        if (await Orders.findByIdAndRemove(userId)) {
            res.json({
                status: 200,
                data: "deleted"
            })
        }
        else {
            res.json({
                status: 200,
                data: "no order"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const listorder = async (req, res, next) => {
    try {
        let { date } = req.body

        let order = await Orders.find({ $or: [{ userId: req.user.id }, { date: req.body.date }] }).populate('userId').populate("items")

        order = order.map(a => {
            // console.log(a.items)
            return {
                CustumerName: a.userId.name,
                ProductsDetails: a.items.map(b => {
                    return {
                        productName: b.productsName,
                        productPrice: b.productPrice
                    }
                }),
                Total: a.total
            }
        })

        return res.json({
            status: 200,
            data: order
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const listproduct = async (req, res, next) => {
    try {

        let order = await Orders.find()
        // .sort({userId:req.body.userId})
        // const counts = {}
        // order.forEach(x=> { 
        //     counts[x.items] = (counts[x.items] + 0)  
        // })
        // res.json({
        //     status: 200,
        //     data: { order , counts}
        // })
        //  order.forEach(x=> { 
        //     counts[x.items] = (counts[x] +0 )
        // })

        // console.log(counts)
        order = order.map(a => {
            return {
                CustumerName: a.userId,
                productName: a.items,
                numberOfProduct: a.items.length
            }
        })

        res.json({
            status: 200,
            data: order
        })

        // const data = Orders(order.items);
        // console.log(data)
        // const total = data.count();
        // console.log(total)
        // res.json({
        //     status: 200,
        //     data: { order, total }
        // })

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const date = async (req, res, next) => {
    try {

        // const order = await Orders.aggregate([
        //     { 

        //         $group: {

        //             _id: { date: "$date" },
        //             total: { $sum: order.items.length },
        //         }
        //     }
        // ])
        // let order = await Orders.find({ "$or": [{ userId: req.user.id }] })
        let order = await Orders.find()
            .sort({ date: -1 })
        order = order.map(a => {
            return {

                customerOrderedDate: a.date,
                totalProduct: a.items
            }
        })
        console.log(order)
        order = await Products.find({ Orders: order.items })
        order = order.map(a => {
            return {
                productsName: a.productsName,
            }
        })

        res.send(order)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
module.exports = { orderplace, updateOrder, deleteOrder, listorder, date, listproduct }