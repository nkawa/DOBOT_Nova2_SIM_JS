/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: {
        output: {
            globalObject: 'self'
        }

    }

};

export default nextConfig;
