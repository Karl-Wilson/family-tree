import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginBuilder } from "../../../firebase/builder";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'login',
            name: 'admin-login-page',
            async authorize(credentials) {
                const {email, password} = credentials      
                let user, userId;
                //sanitize input
                
                //login
                userId = await loginBuilder(email, password);
                user = {name: userId};
                
                // If no error and we have user data, return it
                if (userId) {
                  return user
                }
                // Return null if user data could not be retrieved
                return null
              }
        })
    ]
})