/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@kinde/infrastructure$': require.resolve('./lib/kinde-mocks.ts'),
    };

    // Strip "use server" directive from kindeSrc files since they're not actual Server Actions
    config.module.rules.push({
      test: /\.tsx?$/,
      include: /kindeSrc/,
      use: [
        {
          loader: 'string-replace-loader',
          options: {
            search: /['"]use server['"];?\s*/g,
            replace: '',
            flags: 'g',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
