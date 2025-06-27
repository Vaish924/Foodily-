const express=require("express");
const router=express.Router();

router.get('/',(req,res)=>{
    const locals={
        title:"NodeJs Blog",
        description:"simple blog with mern stack "
    }
    res.render("layouts/main",{locals});
});

module.exports=router;