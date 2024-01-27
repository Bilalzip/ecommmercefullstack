import bcrypt from 'bcrypt'

const Hashpass = async (password)=>{
    const salt = 10;
    const Hashed = await bcrypt.hash(password,salt);
    return Hashed;
}

export default Hashpass;

 export const Comparepass = (Hashed, password)=> {
    return bcrypt.compare(Hashed,password);
}