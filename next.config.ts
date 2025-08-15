// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Добавьте эту настройку, чтобы разрешить
  // доступ к ресурсам с других IP в локальной сети
  rewrites: async () => [
    {
      source: '/_next/image',
      destination: '/_next/image',
      has: [{
        type: 'host',
        value: '192.168.100.57',
      }],
    },
  ],
};

module.exports = nextConfig;