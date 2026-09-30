const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    // Fotos tiradas no celular passam fácil de 1MB (padrão do Next), o que
    // derrubava o envio de depoimentos e Histórias reais com erro de servidor.
    serverActions: {
      bodySizeLimit: "25mb",
    },
    // Rotas /admin passam pelo middleware, que corta o corpo em 10MB por padrão.
    proxyClientMaxBodySize: "25mb",
  },
};

module.exports = nextConfig;
