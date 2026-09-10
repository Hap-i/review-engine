import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Everything under /portal and /admin is a dynamic segment, which the
     * client router cache does not retain by default (dynamic defaults to 0s).
     * That made every tab click re-fetch the whole page from the server. Keep
     * entries for a short window so flipping between tabs is instant; mutations
     * still call revalidatePath, which invalidates these entries immediately.
     */
    staleTimes: {
      dynamic: 30,
    },
  },
}

export default nextConfig
