import CreatePayment from "../service/CreatePayment.js";

const CreatePaymentLink =  async (req,res)=>{
    console.log(req.params.id)
    try {
        const PaymenLinkGenerate = await CreatePayment(req.params.id)
        return res.status(200).send(PaymenLinkGenerate);
    } catch (error) {
        return res.status(500).send("failed bro")
    }
}

export default CreatePaymentLink;