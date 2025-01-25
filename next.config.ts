import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        localPatterns: [
            {
                pathname: "/public/img/**",
                search: "img",
            },
        ],
    },
};

export default nextConfig;
