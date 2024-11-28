const  errorhandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({

    });
};