import dotenv from "dotenv";

dotenv.config();

import transporter from "./utils/sendEmail.js";

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "ArenaX Test Email",
    html: "<h2>SMTP Working Successfully 🎉</h2>",
});

console.log("Email Sent");