import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success: false, message: "Unauthorized"});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Unauthorized"});
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error authenticating admin", error});
    }
}

export default adminAuth;