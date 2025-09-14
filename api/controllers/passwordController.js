import { Password } from "../models/Password.js";

// let userId = "688ccb234f718181b5299261";


// addpassword
export const addPassword = async (req, res) => {
  let userId = req.user;
  //   const userId = "688ccb234f718181b5299261";

  const { siteName, siteUrl, password } = req.body;

  try {
    let savedPassword = await Password.findOne({ userId });

    if (!savedPassword) {
      savedPassword = new Password({ userId, userData: [] });
    }

    savedPassword.userData.push({ siteName, siteUrl, password });

    await savedPassword.save();

    return res.status(201).json({
      message: "Added successfully",
      savedPassword,
      success: true,
    });
  } catch (error) {
    console.error("Add password error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// get password
export const getPassword = async (req, res) => {
  let userId = req.user;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Invalid user", success: false });
    }

    const savedPassword = await Password.findOne({ userId });

    res.status(200).json({
      message: `Saved passwords of ${userId} retrieved successfully`,
      savedPassword,
      success: true,
    });
  } catch (error) {
    console.error("Get password error:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// delete password
export const deletePassword = async (req, res) => {
  let userId = req.user;
  const { userDataId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "Invalid user", success: false });
    }

    let savedPassword = await Password.findOne({ userId });

    if (!savedPassword) {
      return res
        .status(404)
        .json({ message: "No passwords found", success: false });
    }

    // Filter out the entry to delete
    savedPassword.userData = savedPassword.userData.filter(
      (data) => data._id.toString() !== userDataId
    );

    await savedPassword.save();

    return res.status(200).json({
      message: "Password deleted successfully",
      success: true,
      
    });
  } catch (error) {
    console.error("Delete password error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
