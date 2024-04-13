import argon2 from 'argon2';

const hashingPassword = async (password: string) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (e) {
        console.error("Error hashing password:", e)
    }
}

const verifyPassword = async (hash: string, password: string) => {
    try {
        const isValid = await argon2.verify(hash, password);

        if (isValid) {
            console.log("Password is valid.");
        } else {
            console.log("Invalid password.0");
        }
    } catch (e) {
        console.error("error verifying password:", e)
    }
}

export { verifyPassword, hashingPassword }