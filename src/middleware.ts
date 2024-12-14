// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import routesObj from "./constants/ApiConstant";
import { NextResponse } from "next/server";
import { fetchServerSideData } from "./utils/fetchServerSideData ";

const isProtectedRoute = createRouteMatcher(["/auth(.*)", "/logout"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) {
    await auth.protect();
  } else {
    // Get the token
    const { getToken } = await auth();
    const token = await getToken();

    if (token) {
      try {
        // Clone the request to add the Authorization header
        new Request(req, {
          headers: {
            ...Object.fromEntries(req.headers),
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch server-side data
        const res = await fetchServerSideData(routesObj["view-user"], token);
        if (res.success) {
          const { workspace_url, created_by } = res.result || {};
          const hostUrl = req.headers.get("host");

          // Redirect if the workspace URL does not match the host
          if (workspace_url !== hostUrl) {
            const redirectUrl = workspace_url?.startsWith("http")
              ? workspace_url
              : `https://${workspace_url}`;
            return NextResponse.redirect(redirectUrl, 308); // 308 for permanent redirect
          }

          // Redirect to account if user is the creator
          if (created_by) {
            return NextResponse.redirect("/account");
          }
        }
      } catch (error) {
        console.error("=== Error in Middleware:", error);
        // Optionally, redirect to an error or login page
        return NextResponse.redirect("/error"); // Update the path as needed
      }
    }
  }

  // Default to allowing the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
