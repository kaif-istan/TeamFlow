## Where to Fetch User Session in a Next.js Navbar

### Public / Marketing Sites
- Fetch session **on the client** (use `useSession()`).
- Keeps `/about`, `/pricing`, etc. **static and fast**.
- Avoids forcing all routes into SSR.

### Private / Dashboard Apps
- Fetch session **on the server** (use `getServerSession()`).
- More secure, no UI flicker, no extra client request.
- All pages are already authenticated, so SSR is fine.

**Rule:**  
**Public site → client-side session**  
**Private dashboard → server-side session**
