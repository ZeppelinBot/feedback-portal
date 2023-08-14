/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  experimental: {
    serverActions: true,

    // Fix Webpack errors and warnings from Knex:
    //
    // Error: "Module not found" (e.g. better-sqlite3)
    // - Webpack tries to bundle database drivers we're not using (or haven't even installed) since Knex has conditional imports for them
    //
    // Warning: "Critical dependency: the request of a dependency is an expression"
    // - Knex has dynamic imports that Webpack is not a fan of
    //
    // Including Knex below fixes these errors by excluding Knex from the Webpack bundle entirely, and having it be imported with a regular Node.js import instead.
    //
    // Thanks to @Rolfchen for suggesting this at https://github.com/knex/knex/issues/1128#issuecomment-1574760051
    serverComponentsExternalPackages: ["knex"],
  },
};

export default nextConfig;
