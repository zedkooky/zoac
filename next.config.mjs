/** @type {import('next').NextConfig} */
// Static export: the site is uploaded to Verpex shared hosting over FTP (see .github/workflows/deploy-ftp.yml).
// Redirects, HTTPS and caching live in public/.htaccess; the enquiry form posts to public/enquiry.php.
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
