//import NextAuth from "next-auth";
import { verifyPassword } from "@/lib/auth";
import { db } from '@/lib/firebaseConfig';
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import { string } from "zod";

// type TProduct = {
//   product: {
//     name: string;
//     _id: string;
//     image: string;
//     category: string;
//   };
// };

type userData = {
  userData: { user:string;
     account:string;
     profile:string;
     email:string;
     credentials:string;
     }
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
       
      },
      async authorize(credentials: any, req): Promise<any> {
        const { email, password } = credentials;
       // console.log(" email, password",  email, password)
      //  const User = await db.select().from(user).where(sql`${user.email} = ${email}`);
      //  const current_user = User[0];
       console.log("-----------------inside NextAuth -----------------");

         const collectionRef = collection(db, 'user')
            const targetQuery = query(collectionRef, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(targetQuery)
           // if (!querySnapshot.empty) return  NextResponse.json({error: "User allready exists", status: 400})
            const current_user = querySnapshot.docs.map((doc) => doc.data())[0]
           const current_id = querySnapshot.docs.map((doc) => doc.id)[0]
          

          //  final userDocument = usersCollection.document();
          //  final documentID = userDocument.documentID;

        //console.log(current_user.id);
        if (!current_user) {
          throw new Error("No user found!");
          return null;
        }

        // const isVaildPass = await verifyPassword(
        //   password,
        //   current_user.password
        // );

        // if (!isVaildPass) {
        //   throw new Error("Wrong Credentials");
        //   return null;
        // }


        const user = {
          id: current_id,//current_user.id,
          name: current_user.username,
          role: current_user.role,
          email: current_user.email,
        };
//console.log("user in provider ---",user )
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
       return false;
        // Or you can return a URL to redirect to:
      //   return '/unauthorized'
      }
    },

    async redirect({ url, baseUrl }) {
   //   console.log("in redirect ---",url,"baseurl", baseUrl )
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, session }:any) {
    //  console.log("in jwt --------",user,"session--------", session,"token ----- ",token )
     // call stack 1
      // you can get user values from databas directly here
      if (user) {
       // User is available during sign-in
       // can take value from user to assing to token
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
          picture: user.image,
        };
      }
      return token;
    },
    async session({ session, token }:any) {
      // call stack 2
     //token pocess all values, assign value to session
     
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.picture;
     // console.log("in session --------", session, token )
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [

//   ],
// }
// export default NextAuth(authOptions)
