import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import Randomstring from "randomstring";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// Checks the availability of an email address proactively before user registration.
export const checkEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists) {
      return next(CreateSuccess(200, "Email Taken"));
    } else {
      return next(CreateSuccess(200, "Email Available"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Handles user registration based on roles (merchant, officer, user).
export const register = async (req, res, next) => {
  const form = new IncomingForm();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const uploadDir = path.join(__dirname, "..", "merchant_uploads");

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(CreateError(500, "File upload failed", err));
    }

    try {
      const emailExists = await UserModel.findOne({ email: fields.email });
      if (emailExists) {
        return next(CreateError(400, "Email already exists"));
      }
      const getFieldValue = (fieldValue) =>
        Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;

      let hashedPassword = null;
      const salt = await bcrypt.genSalt(10);
      if (getFieldValue(fields.password) != null) {
        hashedPassword = await bcrypt.hash(
          getFieldValue(fields.password),
          salt
        );
      } else {
        hashedPassword = await bcrypt.hash(Randomstring.generate(9), salt);
      }

      const roleType = getFieldValue(fields.roles);
      let newUser;

      if (roleType == "merchant") {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const { name, email, phoneNo, description } = fields;

        const validatePDF = (filesArray) => {
          if (
            !filesArray ||
            !filesArray.length ||
            !filesArray[0].originalFilename
          ) {
            return false;
          }
          const fileExtension = path
            .extname(filesArray[0].originalFilename)
            .toLowerCase();
          return fileExtension === ".pdf";
        };

        if (!validatePDF(files.license) || !validatePDF(files.reviews)) {
          return next(CreateError(400, "License and Reviews must be PDF files"));
        }

        const moveAndRenameFile = (source, originalName, targetDir) => {
          const fileExtension = path.extname(originalName);
          const uniquePrefix = uuidv4();
          const newFileName = uniquePrefix + fileExtension;
          const targetPath = path.join(targetDir, newFileName);

          fs.copyFileSync(source, targetPath);
          fs.unlinkSync(source);

          return newFileName;
        };

        try {
          const licenseNewFileName = moveAndRenameFile(
            files.license[0].filepath,
            files.license[0].originalFilename,
            uploadDir
          );
          const reviewsNewFileName = moveAndRenameFile(
            files.reviews[0].filepath,
            files.reviews[0].originalFilename,
            uploadDir
          );

          const licensePath = licenseNewFileName;
          const reviewsPath = reviewsNewFileName;
          newUser = new UserModel({
            name: getFieldValue(name),
            email: getFieldValue(email),
            password: hashedPassword,
            roles: "merchant",
            phoneNo: getFieldValue(phoneNo),
            description: getFieldValue(description),
            licensePath: licensePath,
            reviewsPath: reviewsPath,
            accountStatus: "pending",
            licenseDescription: getFieldValue(fields.licenseDescription),
            reviewsDescription: getFieldValue(fields.reviewsDescription),
          });
        } catch (error) {
          return next(CreateError(500, "Error moving files", error));
        }
      } else if (roleType === "officer" || roleType === "user") {
        newUser = new UserModel({
          name: getFieldValue(fields.name),
          email: getFieldValue(fields.email),
          password: hashedPassword,
          roles: roleType,
          phoneNo: getFieldValue(fields.phoneNo),
          address: getFieldValue(fields.address),
          accountStatus: "approved",
        });
        try {
        } catch (error) {
          return next(CreateError(500, "Error sending email", error));
        }
      } else {
        return next(CreateError(400, "Invalid Role!"));
      }

      await newUser.save();
      return next(
        CreateSuccess(
          200,
          `${
            roleType.charAt(0).toUpperCase() + roleType.slice(1)
          } registered successfully!`
        )
      );
    } catch (error) {
      return next(CreateError(500, "Error registering user", error));
    }
  });
};

// Handles user login and returns a JWT token.
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return next(CreateError(400, "Email is not found"));
    }

    if (user.accountStatus == "pending" || user.accountStatus == "rejected") {
      return next(CreateError(401, "Account is not approved yet"));
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return next(CreateError(402, "Invalid password"));
    }

    let tokenExpiration = "5h";

    const token = jwt.sign(
      {
        id: user._id,
        roles: user.roles,
        name: user.name,
        email: user.email,
        hasResetPassword: user.hasResetPassword,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: tokenExpiration,
      }
    );

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      message: "Logged in successfully!",
      token: token,
      status: 200,
    });
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Changes the password for merchants (first-time login).
export const changePassword = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return next(CreateError(404, "User Not Found"));
    }

    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!validPassword) {
      return next(CreateError(400, "Invalid Current Password"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedNewPassword;
    user.hasResetPassword = true;
    await user.save();
    return next(CreateSuccess(200, "Password Changed Successfully"));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};




// Handles user logout.
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    return next(CreateError(500, error));
  }
};

// Retrieves all merchants from the database without any filter.
export const getMerchants = async (req, res, next) => {
  try {
    const merchants = await UserModel.find(
      { roles: "merchant" },
      "-password"
    ).select("name email phoneNo description accountStatus");

    res.status(200).json({ merchants });
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Retrieves a merchant's data by their ID.
export const getMerchantById = async (req, res, next) => {
  try {
    const merchant = await UserModel.findById(req.params.id).select("-password");
    res.status(200).json({ merchant });
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Accepts a merchant based on their ID.
export const acceptMerchant = async (req, res, next) => {
  try {
    const merchantId = req.query.id;
    const merchant = await UserModel.findById(merchantId);
    //set the default password to 12345678
    const merchantNewTempPassword = '12345678';
    const salt = await bcrypt.genSalt(10);
    const merchantHashedPw = await bcrypt.hash(
      merchantNewTempPassword,
      salt
    );

    if (!merchant) {
      return next(CreateError(404, "Merchant not found"));
    }

    merchant.password = merchantHashedPw;
    merchant.accountStatus = "approved";
    await merchant.save();

    try {
    } catch (error) {
      return next(CreateError(500, "Error Sending Email", error));
    }

    return next(CreateSuccess(200, "Merchant Accepted Successfully"));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Rejects a merchant based on their ID.
export const rejectMerchant = async (req, res, next) => {
  try {
    const merchantId = req.query.id;
    const merchant = await UserModel.findById(merchantId);

    if (!merchant) {
      return next(CreateError(404, "Merchant not found"));
    }

    merchant.accountStatus = "rejected";

    try {
      await merchant.save();
    } catch (error) {
      return next(CreateError(500, "Error Saving Merchant", error));
    }

    try {
    } catch (error) {
      return next(CreateError(500, "Error Sending Email", error));
    }

    return next(CreateSuccess(200, "Merchant Rejected Successfully"));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
};

// Retrieves the number of registered merchants.
export const getNumberOfMerchants = async (req, res, next) => {
  try {
    const merchants = await UserModel.find({
      roles: "merchant",
      accountStatus: "approved"
    });
    const numberOfMerchants = merchants.length;
    return next(CreateSuccess(200, "Number of Merchants", numberOfMerchants));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
}

// Retrieves the number of registered users.
export const getNumberOfUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ roles: "user" });
    const numberOfUsers = users.length;
    return next(CreateSuccess(200, "Number of Users", numberOfUsers));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error", error));
  }
}
