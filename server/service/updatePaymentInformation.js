import OrderModel from "../models/Order.js"
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
    key_id: 'rzp_test_VafOX3peFBEo80',
    key_secret: 'dvnSvVhwKgUOLWJL5MbLkEO7',
  });

const updatePaymentInformation = async (reqData) =>{
    const paymentId = reqData.razorpayPaymentId ;
    const OrderId = reqData.orderId;
    
    try {
        const order = await OrderModel.findById(OrderId);
        const payment = await razorpay.payments.fetch(paymentId);
        if(payment.status == 'captured'){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.Status = "Completed";
            order.orderSatus = "Placed"
          const final =  await order.save();
        const resData = {message: "Your Order is placed " , success:true}
        return resData
        }
    } catch (error) {
        throw new Error(error.message);

    }
}

export default updatePaymentInformation;