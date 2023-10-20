//
// Composant de l'en-tête du site.
//

"use client";

import { faSun,
	faMoon,
	faBars,
	faTimes,
	faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import { useTheme } from "./theme-provider";

export default function Header()
{
	// Désactivation du composant sur les anciennes pages.
	if ( usePathname().startsWith( "/legacy" ) )
	{
		return null;
	}

	// Déclaration des variables d'état.
	const t = useTranslations( "global" );
	const { theme, setTheme } = useTheme();
	const [ mounted, setMounted ] = useState( false );
	const [ showMenu, setShowMenu ] = useState( false );

	// Affichage ou disparition du menu de navigation.
	//  Note : ce menu est seulement visible sur les écrans de petite taille.
	const toggleMenu = () => setShowMenu( !showMenu );

	// Mise à jour de l'état de montage du composant.
	//  Source : https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
	useEffect( () =>
	{
		setMounted( true );
	}, [] );

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a
				rel="noopener noreferrer"
				href="https://github.com/FlorianLeChat"
				target="_blank"
			>
				{t( "landing.developer_firstname" )[ 0 ]
					+ t( "landing.developer_surname" )[ 0 ]}
			</a>

			<nav>
				{/* Liens de navigation */}
				<ul className={showMenu ? "show" : ""}>
					<li>
						<a href="#projects">{t( "landing.header_projects" )}</a>
					</li>

					<li>
						<a href="#skills">{t( "landing.header_skills" )}</a>
					</li>

					<li>
						<a href="#contact">{t( "landing.header_contact" )}</a>
					</li>
				</ul>

				{/* Bouton de basculement en thème sombre/clair */}
				<button
					type="button"
					onClick={() => setTheme( theme === "light" ? "dark" : "light" )}
				>
					<FontAwesomeIcon
						icon={
							( mounted ? theme : "light" ) === "light"
								? faMoon
								: faSun
						}
					/>
				</button>

				{/* Préférences des cookies */}
				<button type="button" data-cc="show-preferencesModal">
					<FontAwesomeIcon icon={faCookieBite} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button type="button" onClick={toggleMenu}>
					<FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
				</button>
			</nav>
		</header>
	);
}