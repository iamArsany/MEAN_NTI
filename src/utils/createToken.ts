import Jwt  from "jsonwebtoken";

export const createToken=(id:any,role:string)=>{Jwt.sign({ _id: id, role: role }, process.env.JWT_KEY!, { expiresIn: process.env.JWT_Expire })};

export const createResetToken=(id:any)=>{return Jwt.sign({ _id: id }, process.env.JWT_KEY!, { expiresIn: process.env.JWT_RESET_EXPIRE })}