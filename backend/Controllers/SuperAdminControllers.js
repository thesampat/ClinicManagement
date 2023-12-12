const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SuperAdmin } = require("../Models/SuperAdminModel");
require("dotenv").config();

const superAdminRegister = async (req, res) => {

  const { name, email, superAdminId, password } = req.body;

  const Role = "SuperAdmin";
  if (!name || !email || !password) {
    return res.status(422).json({ error: "please add all fields !" });
  }

  try {
    const auth_superadmin = await SuperAdmin.findOne({ email });

    if (auth_superadmin) {
      return res.status(403).send({ msg: "Super admin are already exists!" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          return res.status(501).send(err);
        }

        try {
          const new_superadmin = new SuperAdmin({
            name,
            email,
            password: hash,
            role: Role,
            superAdminId,
          });

          await setPermissionRoles(name, Role)
          await new_superadmin.save();
          return res.status(201).send({ msg: "Signup Successfully" });
        } catch (error) {
          return res.status(403).send(error);
        }
      });
    }
  } catch (error) {
    return res.status(500).send(err);
  }
};

const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide email and password." });
  }

  try {
    const superadmin = await SuperAdmin.findOne({ email: email });

    if (!superadmin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    bcrypt.compare(password, superadmin.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Server error." });
      }

      if (result) {
        const token = jwt.sign(
          { superAdminId: superadmin._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          message: "Super Admin Login successful!",
          token,
          data: {
            _id: superadmin._id,
            name: superadmin.name,
            email: superadmin.email,
            role: superadmin.role,
          },
        });
      } else {
        return res.status(401).json({ error: "Invalid credentials." });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = { superAdminRegister, superAdminLogin };
