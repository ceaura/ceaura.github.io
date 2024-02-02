//
// Composant du pied de page du site.
//
import { faPhp } from "@fortawesome/free-brands-svg-icons";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer()
{
	// Déclaration des variables d'état.
	const t = useTranslations( "landing" );

	// Affichage du rendu HTML du composant.
	return (
		<footer>
			<span>
				{/* Lien vers le dépôt GitHub du projet */}
				{t.rich( "footer_madeby", {
					a: ( chunks ) => (
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat"
							target="_blank"
						>
							{chunks}
						</a>
					)
				} )}

				{/* Date de création du site */}
				<small>&copy; {new Date().getFullYear()}</small>
			</span>

			{/* Avertissement de Google reCAPTCHA */}
			{process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true" && (
				<small>
					{t.rich( "footer_recaptcha", {
						a1: ( chunks ) => (
							<a
								rel="noopener noreferrer"
								href="https://policies.google.com/privacy"
								target="_blank"
							>
								{chunks}
							</a>
						),
						a2: ( chunks ) => (
							<a
								rel="noopener noreferrer"
								href="https://policies.google.com/terms"
								target="_blank"
							>
								{chunks}
							</a>
						)
					} )}
				</small>
			)}

			{/* Lien vers l'ancienne version du site */}
			<small>
				<FontAwesomeIcon icon={faPhp} />

				{t.rich( "footer_legacy", {
					a: ( chunks ) => (
						<a href="https://legacy.florian-dev.fr/portfolio/">
							{chunks}
						</a>
					)
				} )}
			</small>
		</footer>
	);
}