const usersSchema = require('../model/users');
const bcrypt = require('bcryptjs');

exports.regis = async(req, res) => {
    try {
        const { 
            Username, 
            Password
        } = req.body;
        
        let user = await usersSchema.findOne({Username}).exec();

        if(user) return res.send('Usename Invalid.');

        const salt = await bcrypt.genSalt(6);
        
        user = new usersSchema({
            'username': Username, 
            'password': salt,
            'role':'user',
            'approve':false 
        });
        user.password = await bcrypt.hash(Password, salt);

        user.save();
        res.send(user);
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on regis routes..');
    }
}

exports.login = async(req, res) => {
    try {
        const { Username, Password } = req.body;
        let user = await usersSchema.findOne({username:Username}).exec();

        if(user){
            const isMatch = await bcrypt.compare(Password, user.password);
            if(!isMatch){
                return res.status(400).send('password is not invalid!!')
            }

            let payLoad = {
                username:user.username,
                role:user.role,
                approve:user.approve
            }

            res.send(payLoad);
        }
        else{
            res.send('Username not found!!');
        }
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on login routes..');
    }
}