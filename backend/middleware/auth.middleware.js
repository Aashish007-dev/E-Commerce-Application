import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).json({success: false, message: "Unauthorized"});
    }
}

export default authUser;