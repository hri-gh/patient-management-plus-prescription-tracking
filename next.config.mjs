
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Disallow dynamic code evaluation for Edge Runtime compatibility
        config.node = {
            crypto: true,
            stream: true,
            buffer: true,
            http: 'empty',
            https: 'empty',
            os: true,
            tty: true,
            net: 'empty',
            dns: 'mock',
            child_process: 'empty',
            process: true,
        };

        return config;
    },
};

export default nextConfig;
