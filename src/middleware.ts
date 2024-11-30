import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/auth(.*)"]);

export default clerkMiddleware(async (auth, req, res) => {
  if (!isProtectedRoute(req)) {
    await auth.protect();

    // Get the token
    const { getToken } = await auth();
    const token = await getToken();

    // Add the Authorization header to the request
    if (token) {
      req.headers.set("Authorization", `Bearer ${token}`);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
