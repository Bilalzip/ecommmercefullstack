import updatePaymentInformation from "../service/updatePaymentInformation.js";

const updatePaymentInformations = async (req, res) => {
  try {
    // Extract the orderId and razorpayPaymentId from the query parameters
    const orderId = req.query.orderId;
    const razorpayPaymentId = req.query.razorpayPaymentId;

    const resData = {
        orderId: orderId, razorpayPaymentId: razorpayPaymentId
    }
    const paymentService = await updatePaymentInformation(resData);
    res.status(200).send({ message: "Payment Info has been changed" });
  } catch (error) {
    res.status(500).send("error");
  }
}

export default updatePaymentInformations;
