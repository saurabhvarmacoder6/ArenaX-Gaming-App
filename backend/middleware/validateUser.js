export default function validateUser(req, res, next) {
    const { name, email, gameName, uid, password } = req.body;
    if (!name || !email || !gameName || !uid || !password) {
        return res.status(400).json({
            success: false,
            msg: "All Field Required"
        })
    }

    if (name.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Min Name Length 3"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            msg: "Email Not Valid"
        })
    }

    if (gameName.length > 12) {
        return res.status(400).json({
            success: false,
            msg: "Max gameName Length 12"
        })
    }

     if (uid.length > 16) {
        return res.status(400).json({
            success: false,
            msg: "Max uid Length 16"
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            msg: "Min Password Length 6"
        })
    }
    next()
}