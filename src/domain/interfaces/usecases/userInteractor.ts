import { User } from "../../entities/user";
import { SignupData } from "../../entities/SignupData";
import { GoogleAuthResponse } from "../../entities/googleauth";
import { Token } from "../../entities/tokens";

export interface UserInteractor {
    googleAuth(token: string, isSignup: boolean): Promise<GoogleAuthResponse>
    login(credentials: { username: string, password: string }): Promise<{ user: User | null, message: string, token: string | null, refreshToken: string | null }>;
    signup(userData: { username: string, name: string, password: string, email: string, image: string }): Promise<{ user: User | null, token: string | null }>;
    checkEmail(email: string): Promise<boolean>;
    sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }>
    resendMail(emailId: string): Promise<boolean>;
    verifyotp(otp: string): Promise<{ success: boolean, user?: User, token?: string }>
    getSearchData(filter: string): Promise<User[] | null>;
    getSearchUser(userId: string): Promise<{ user: User | null; followers: User[]; following: User[]; } | null>
    updateLocation(userId: string, latitude: number, longitude: number): Promise<boolean>
    getLocations(userId: string): Promise<User[] | null>
    getSuggestions(userId: string): Promise<User[] | null>
    getTokens(refreshToken:string):Promise<Token>
    forgotPass(email:string):Promise<boolean>
    resetPassword(token:string,newpassword:string):Promise<boolean>
}
