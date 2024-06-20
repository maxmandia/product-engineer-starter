/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    async redirects() {
        return [
            {
                source: "/dashboard/v6/prior-auth/upload/:path*",
                destination: "/dashboard/interqual-prior-auth/:path*",
                permanent: false
            }
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

module.exports = nextConfig;
