import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token?.profile,
  },
});

export const config = { matcher: ["/profile/:path*"] };
