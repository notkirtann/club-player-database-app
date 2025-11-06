const maintainece = (req,res,next)=>{
  res.status(503).send('<h1>On a maintainece mode</h1>')
}
export default maintainece