import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    catch(err){
        console.log(err);
    }

}

const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log(error);
    }
}

export {hashPassword, comparePassword};