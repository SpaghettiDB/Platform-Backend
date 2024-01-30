export const loginController  = (req,res) => {
    const ref_email = "1234@gmail.com"
    const ref_pass = "1234";
    let {email, pass } = req.body;
    if (email === ref_email && pass == ref_pass)
    {
        res.send('true\n');
    }
    else{
        res.send('entre valid email and password\n')
    }
}
