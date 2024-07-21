/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: {
        output: {
            globalObject: 'self'
        }

    }

};

export default nextConfig;
