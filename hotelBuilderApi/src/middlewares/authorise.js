const { userService } = require('../controllers/user.login')

const authorize = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userService.getOne({_id: id})

        if(!user){
            return res.status(403).send({
                message: 'You must be signed in to view this page',
                status: 'failed'
            })
        } else {
            if(user.role === 'admin') {
                console.log('Admin access granted to:', user);
                
                  next()
            } else {
                return res.status(403).send({
                    message: 'You are not authorised to view this page',
                    status: 'failed'
                })
            }
        }
    } catch (err) {
        return res.status(404).send({
            message: err,
            status: 'failed'
        })
    }  
}

module.exports = authorize;