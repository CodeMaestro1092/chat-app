export type GenderT = "male" | "female" | "";

export interface SignUpInputsT {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: GenderT;
}

export type AuthContextT = {
    authUser: any;
    setAuthUser: React.Dispatch<string | null>;
};