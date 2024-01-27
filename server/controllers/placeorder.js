import mongoose from "mongoose";
import OrderModel from '../models/Order.js';
import UserModel from '../models/userModel.js';

export const placeorder = async (req, res) => {
  const {
    username,
    email,
    phone,
    firstName,
    lastName,
    country,
    address,
    city,
    region,
    postalCode,
    productsDetails,
  } = req.fields;
     let amount =0;
     const Parsing = JSON.parse(productsDetails);
     for (let parse of Parsing){
      amount = amount + parse.total;
     }
       
  try {
    // Check if required fields are present
    const requiredFields = [
      'email',
      'phone',
      'firstName',
      'lastName',
      'country',
      'address',
      'city',
      'region',
      'postalCode',
      'username',
      'productsDetails',
    ];

    for (const field of requiredFields) {
      if (!req.fields[field]) {
        res.status(400).json({ message: `${field} not found` });
        return;
      }
    }

    // Convert productsDetails from string to array of objects
    const parsedProductsDetails = JSON.parse(productsDetails);
    // Create a new OrderModel instance
    const newOrder = new OrderModel({
      email,
      phone,
      firstName,
      lastName,
      country,
      address,
      city,
      region,
      postalCode,
      username,
      productsDetails: parsedProductsDetails,
      amount
    });
    // Save the order to the database
    const savedOrder = await newOrder.save();
      

    console.log(savedOrder)

    // Set the order id in the respective user properties

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      res.json({
        error: 'User not found',
      });
      return; // Exit the function if the user is not found
    }

    // Update the user's orders array with the new order ID
    user.orders.push(savedOrder._id);

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      paymentid: savedOrder._id,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default placeorder;
