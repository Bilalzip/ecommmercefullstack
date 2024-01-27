import OrderModel from "../models/Order.js"
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: 'rzp_test_VafOX3peFBEo80',
    key_secret: 'dvnSvVhwKgUOLWJL5MbLkEO7',
  });
const CreatePayment = async (orderId)=>{
    const order = await OrderModel.findById(orderId);
    const amount = parseInt(order.amount);
    try {
        const paymentLinkRequest ={
            amount: amount*100,
            currency: "INR",
            customer: {
                name: order.firstName + " "+order.lastName,
                contact: "7618210921",
                email: order.email
            },
            notify:{
                sms:true, 
                email: true,
            },
            reminder_enable : true,
            callback_url : `https://remarkable-alpaca-eaae2e.netlify.app/payments/${orderId}`,
            callback_method : 'get'
        };
        try {
            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
            const paymentLinkId = paymentLink.id;
            const payment_link_url = paymentLink.short_url;
            const resdata = {
            paymentLinkId, payment_link_url
            }
            return resdata;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);           
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
export default CreatePayment;