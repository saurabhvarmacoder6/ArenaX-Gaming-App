const emailTemplate = (otp) => {
    return `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#0f172a;color:white">

            <h2>ArenaX Verification Code</h2>

            <p>Your verification code is:</p>

            <h1 style="
                background:#0ea5e9;
                display:inline-block;
                padding:12px 24px;
                border-radius:10px;
                letter-spacing:4px;
            ">
                ${otp}
            </h1>

            <p style="margin-top:20px">
                This code will expire in 5 minutes.
            </p>

            <hr/>

            <small>
                If you didn't request this, please ignore this email.
            </small>

        </div>
    `;
};

export default emailTemplate;