const models=require('../models');
const Account=models.Account;
const loginPage=(req,res)=>{
    return res.render('login',{csrfToken:req.csrfToken()});
};
const signupPage=(req,res)=>{
    return res.render('signup',{csrfToken:req.csrfToken()});
};
const logout=(req,res)=>{
    req.session.destroy();
    res.redirect('/');
};
const login=(req,res)=>{
    const username=`${req.body.username}`;
    const pass=`${req.body.pass}`;
    if(!username||!pass){
        return res.status(400).json({error:'Requires all fields.'});
    }
    return Account.authenticate(username,pass,(err,account)=>{
        if(err||!account){
            return res.status(401).json({error:'Wrong username or password.'});
        }
        req.session.account=Account.toAPI(account);
        return res.json({redirect:'/maker'});
    });
};
const signup=async (req,res)=>{
    const username=`${req.body.username}`;
    const pass=`${req.body.pass}`;
    const pass2=`${req.body.pass2}`;
    if(!username||!pass||!pass2){
        return res.status(400).json({error:'Requires all fields.'});
    }
    if(pass!==pass2){
        return res.status(400).json({error:'Passwords must match.'});
    }
    try{
        const hash=await Account.generateHash(pass);
        const newAccount=new Account({username,password:hash});
        await newAccount.save();
        req.session.account=Account.toAPI(newAccount);
        return res.json({redirect:'/maker'});
    } catch(err){
        if(err.code===11000){
            return res.status(400).json({error:'Somebody else has that username.'});
        }
        return res.status(400).json({error:'An error occurred.'});
    }
};
module.exports={
    loginPage,
    signupPage,
    login,
    logout,
    signup,
};