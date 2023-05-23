exports.successTemplate=(res,pageName, title,message, session,data)=>{
    res.render(pageName, {title: title, messages:message, session:session,data:data})
}