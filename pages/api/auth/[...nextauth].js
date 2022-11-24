import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginConnector } from "../../../firebase/dbconnectors"

export const authOptions = {
  providers: [
    CredentialsProvider({
        id: 'login',
        name: 'admin-login-page',
        async authorize(credentials) {
            const {username, password} = credentials 

            let user, userId;
            //sanitize input
            
            //login
            userId = await loginConnector(username, password);
            user = {name: userId+" "+username};
            // If no error and we have user data, return it
            if (userId) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
    })
],
}

export default NextAuth(authOptions)