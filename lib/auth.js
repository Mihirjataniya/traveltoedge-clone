import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const adminUser = process.env.ADMIN_USER;
                const adminPass = process.env.ADMIN_PASS;

                if (
                    credentials.username === adminUser &&
                    credentials.password === adminPass
                ) {
                    return { id: "admin", name: "Admin" };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/alpha-admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}