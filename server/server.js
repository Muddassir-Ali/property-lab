import multer from "multer";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  }
});

app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. Please login first."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again."
    });
  }
}

app.get("/", (req, res) => {
  res.send("Property Lab API is running!");
});
app.post("/api/register", async (req, res) => {
  try {
    const { full_name, cnic, email, phone, password } = req.body;

    if (!full_name || !cnic || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields."
      });
    }

    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
      return res.status(400).json({
        message: "Please enter a valid CNIC."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users
      (full_name, cnic, email, phone, password_hash)
      VALUES (?, ?, ?, ?, ?)`,
      [full_name.trim(), cnic, email.trim().toLowerCase(), phone.trim(), passwordHash]
    );

    res.status(201).json({
      message: "Registration successful!"
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "This CNIC or email is already registered."
      });
    }

    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, cnic, password } = req.body;

    if (!email || !cnic || !password) {
      return res.status(400).json({
        message: "Please enter your email, CNIC and password."
      });
    }

    const [users] = await db.execute(
      `SELECT id, full_name, email, cnic, password_hash
       FROM users
       WHERE email = ? AND cnic = ?
       LIMIT 1`,
      [email.trim().toLowerCase(), cnic.trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email, CNIC or password."
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email, CNIC or password."
      });
    }

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

res.status(200).json({
  message: "Login successful!",
  token: token,
  user: {
    id: user.id,
    full_name: user.full_name,
    email: user.email
  }
});

  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Login failed. Please try again."
    });
  }
});
app.get("/api/me", verifyToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      `SELECT id, full_name, email
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.status(200).json({
      message: "Authentication successful!",
      user: users[0]
    });

  } catch (error) {
    console.error("Authentication error:", error.message);

    res.status(500).json({
      message: "Could not verify user."
    });
  }
});

const PORT = process.env.PORT || 5000;

app.get("/api/properties", async (req, res) => {
  try {
    const [properties] = await db.execute(
      "SELECT * FROM properties ORDER BY created_at DESC"
    );

    res.json(properties);
  } catch (error) {
    console.error("Properties fetch error:", error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});


app.post(
  "/api/seller-properties",
  upload.array("property_photos", ),
  async (req, res) => {
  try {
    const {
      full_name, cnic, phone, city,
      property_location, property_type,
      expected_price, property_details
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO seller_properties
      (full_name, cnic, phone, city, property_location,
       property_type, expected_price, property_details)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name, cnic, phone, city,
        property_location, property_type,
        expected_price, property_details
      ]
    );

    // Email notification
    try {
      const safe = (value) =>
        String(value || "").replace(/[&<>"']/g, (char) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        })[char]);

      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
body: JSON.stringify({
  from: "Property Lab <onboarding@resend.dev>",
  to: ["adnantipu53@gmail.com"],
  subject: "Property Lab - New Seller Submission",

  html: `
    <h2>New Property Submission</h2>
    <p><b>Submission ID:</b> ${result.insertId}</p>
    <p><b>Name:</b> ${safe(full_name)}</p>
    <p><b>Phone:</b> ${safe(phone)}</p>
    <p><b>City:</b> ${safe(city)}</p>
    <p><b>Location:</b> ${safe(property_location)}</p>
    <p><b>Property Type:</b> ${safe(property_type)}</p>
    <p><b>Expected Price:</b> ${safe(expected_price)}</p>
    <p><b>Details:</b> ${safe(property_details)}</p>
  `,

  attachments: (req.files || []).map((file) => ({
    filename: file.originalname,
    content: file.buffer.toString("base64")
  }))
})
        }
      );

      const emailData = await emailResponse.json();

      if (!emailResponse.ok) {
        console.error("Resend error:", emailData);
      } else {
        console.log("Seller notification sent:", emailData);
      }

    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    res.status(201).json({
      message: "Property submitted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Submission failed"
    });
  }
});


app.get("/api/admin/seller-properties", verifyToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT email FROM users WHERE id = ? LIMIT 1",
      [req.user.userId]
    );

    if (
      users.length === 0 ||
     !["adnantipu53@gmail.com"].includes(
     users[0].email.toLowerCase()
      )
    ) {
      return res.status(403).json({
        message: "Admin access denied."
      });
    }

    const [properties] = await db.execute(
      `SELECT id, full_name, phone, city, property_location,
       property_type, expected_price, property_details,
       status, created_at
       FROM seller_properties
       ORDER BY created_at DESC`
    );

    res.json(properties);

  } catch (error) {
    console.error("Admin seller properties error:", error);

    res.status(500).json({
      message: "Failed to fetch seller properties."
    });
  }
});

app.patch("/api/admin/seller-properties/:id/status", verifyToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT email FROM users WHERE id = ? LIMIT 1",
      [req.user.userId]
    );

    const allowedAdmins = [
      "adnantipu53@gmail.com"
    ];

    if (
      users.length === 0 ||
      !allowedAdmins.includes(users[0].email.toLowerCase())
    ) {
      return res.status(403).json({
        message: "Admin access denied."
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Contacted",
      "Approved",
      "Rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status."
      });
    }

    const propertyId = Number(req.params.id);

    if (!Number.isInteger(propertyId) || propertyId < 1) {
      return res.status(400).json({
        message: "Invalid property ID."
      });
    }

    const [result] = await db.execute(
      "UPDATE seller_properties SET status = ? WHERE id = ?",
      [status, propertyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Submission not found."
      });
    }

    res.json({
      message: "Status updated successfully."
    });

  } catch (error) {
    console.error("Status update error:", error);

    res.status(500).json({
      message: "Failed to update status."
    });
  }
});


app.listen(PORT, () => {
  console.log(`Property Lab server running on port ${PORT}`);
});