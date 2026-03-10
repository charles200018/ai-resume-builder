import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000"],
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // Prevent clickjacking
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    // Prevent MIME sniffing
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    // Control referrer information
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    // XSS Protection
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    // DNS Prefetch Control
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "off",
                    },
                    // Download options for IE
                    {
                        key: "X-Download-Options",
                        value: "noopen",
                    },
                    // Permitted cross-domain policies
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none",
                    },
                    // HTTP Strict Transport Security (1 year + preload)
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; preload",
                    },
                    // Content Security Policy
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com data:",
                            "img-src 'self' data: https: blob:",
                            "connect-src 'self' https://*.supabase.co https://openrouter.ai https://accounts.google.com",
                            "frame-src 'self' https://accounts.google.com",
                            "frame-ancestors 'none'",
                            "form-action 'self'",
                            "base-uri 'self'",
                            "object-src 'none'",
                        ].join("; "),
                    },
                    // Permissions Policy (disable unnecessary browser features)
                    {
                        key: "Permissions-Policy",
                        value: [
                            "accelerometer=()",
                            "autoplay=()",
                            "camera=()",
                            "geolocation=()",
                            "gyroscope=()",
                            "magnetometer=()",
                            "microphone=()",
                            "payment=()",
                            "usb=()",
                        ].join(", "),
                    },
                    // Cross-Origin policies
                    {
                        key: "Cross-Origin-Opener-Policy", 
                        value: "same-origin-allow-popups",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
