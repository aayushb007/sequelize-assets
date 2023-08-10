const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure the path is correct based on your project structure
const Asset = require("../models/Asset");
// User login
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      "my-key",
      {
        expiresIn: "1h",
      }
    );
    return res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      "my-key",
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function changePassword(req, res) {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.userId; // Get user ID from JWT payload
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    // Verify the current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid current password",
      });
    }
    if (currentPassword === newPassword) {
      return res.status(401).json({
        error: "Do not Enter Similar Password again",
      });
    }
    // Validate and hash the new password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "New password and confirm password don't match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function resetPassword(req, res) {
  const { newPassword, confirmPassword } = req.body;
  const token = req.header('Authorization');
  try {
    const decoded = jwt.verify(token, "my-key");
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Validate and hash the new password
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password don't match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// async function initiatePasswordReset(req, res) {
//     const { email } = req.body;
  
//     try {
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Create a JWT token with a short expiration time for password reset
//       const token = jwt.sign({ userId: user.id }, 'your-reset-secret-key', { expiresIn: '1h' });
  
//       // Send the password reset link to the user's email
//       const resetLink = `https://your-app-url/reset-password/${token}`;
//       sendResetEmail(email, resetLink);
  
//       return res.json({ message: 'Password reset link sent to your email' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }
  
//   // Helper function to send password reset email
//   function sendResetEmail(email, resetLink) {
//     const transporter = nodemailer.createTransport({
//       // Configure your email service here (e.g., Gmail, SMTP)
//       service: 'gmail',
//       auth: {
//         user: 'your-email@example.com',
//         pass: 'your-email-password',
//       },
//     });
  
//     const mailOptions = {
//       from: 'your-email@example.com',
//       to: email,
//       subject: 'Password Reset',
//       text: `Click the following link to reset your password: ${resetLink}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   }
  

module.exports = {
  loginUser,
  registerUser,
  changePassword,
  resetPassword
};
