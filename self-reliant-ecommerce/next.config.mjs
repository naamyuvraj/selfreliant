/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Optional: keep if you prefer no image optimization
    domains: ['eakwwkbrclbbmvaqltox.supabase.co'], // <-- 👈 add your Supabase domain here
  },
}

export default nextConfig
