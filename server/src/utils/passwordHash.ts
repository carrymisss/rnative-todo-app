import bcrypt from "bcrypt";

export default (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
                return reject(err);
            }
            
            resolve(hash);
        });
    });
};