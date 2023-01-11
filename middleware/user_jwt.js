const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({
            msg:"no token, authorization denied"
        });
    }
    try {
        await jwt.verify(token, process.env.jwtUserSecret,(err, decoded)=>{
            if(err){
                res.status(401).json({
                    msg:'token not valid'
                });
            }else{
                req.user=decoded.user;
                next();
            }
        });
        
    } catch (error) {
        console.log("something want error"+error);
        res.status(500).json({
            msg:'server error'
        })
    }
}