<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/user.php");

	$authentificator = new Portfolio\Controllers\UserAuthentification();
	$authentificator->connector = $connector;	// Liaison avec la base de données.

	// On définit la page actuelle.
	$file = "admin";

	// On vérifie si l'utilisateur est connecté.
	if (!$authentificator->isConnected())
	{
		http_response_code(401);
		header("Location: login.php");
	}
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/views/1_head.php");
	?>

	<body>
		<!-- Avertissement page sans JavaScript -->
		<noscript>Votre navigateur ne supporte pas ou refuse de charger le JavaScript.</noscript>

		<!-- En-tête de la page -->
		<header>
			<!-- Titre de la catégorie -->
			<h1>Administration</h1>

			<!-- Description succincte -->
			<h2>Gestion du contenu dynamique de la base de données</h2>

			<!-- Information de connexion -->
			<p>Connecté en tant que « leptitkiller »</p>
		</header>

		<main>
			<section>

			</section>
		</main>
	</body>
</html>