import { DefaultSession } from "next-auth";
declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
        role: UserRole
    }
}

// declare module 'next-auth' {
//     interface Session {
//         user: User & {
//   id: UserId
//   role: UserRole
//         }
//     }
// }

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}


// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id: string;
//       role: UserRole;
//     } & DefaultSession["user"];
//   }
// }

