import UserModel from "../models/userModel.js";

const UpdateProfileController = async (req, res) => {
    console.log("evrythingh", req.body);
    try {
        const { username, fullname, phone, email, website, image } = req.body;

        console.log(phone, email, website, image)
        // Find the user by username
        const existingUser = await UserModel.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            // Update the user's profile using _id
            const updatedUser = await UserModel.findByIdAndUpdate(
                existingUser._id,
                { username, fullname, phone: parseInt(phone), email, website, image },
                { new: true } // to get the updated document
            );
            console.log(updatedUser);
            res.json({ message: "Your profile has been updated", user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error has occurred" });
    }
};

export default UpdateProfileController;
