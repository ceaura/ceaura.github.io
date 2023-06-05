// @ts-check

/**
 * @type {import("next").NextConfig}
 */
const path = require( "path" );
const basePath = new URL( process.env.NEXT_PUBLIC_URL ?? "" ).pathname;
const withPWA = require( "next-pwa" )( {
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	fallbacks: {
		// Source : https://github.com/shadowwalker/next-pwa/issues/400
		document: path.join( basePath, "_offline" ),
		image: "",
		font: "",
		audio: "",
		video: ""
	}
} );

module.exports = withPWA( {
	basePath: basePath === "/" ? "" : ( basePath.endsWith( "/" ) ? basePath.slice( 0, -1 ) : basePath ),
	poweredByHeader: false,
	reactStrictMode: true,
	async redirects()
	{
		return [
			{
				// Redirection vers le dépôt GitHub.
				source: "/source",
				permanent: true,
				destination: "https://github.com/FlorianLeChat/Portfolio"
			}
		];
	}
} );