//
// Permet de contrôler le défilement des photos de la galerie des projets.
//
const arrows = document.querySelectorAll( "article div.images" );

for ( const arrow of arrows.values() )
{
	// Afin de revenir à une image précédente.
	arrow.firstElementChild.addEventListener( "click", ( event ) =>
	{
		// On récupère toutes les images de la section où s'est produit le clic.
		const images = document.querySelectorAll( `article#${ event.path[ 2 ].id } div.images div` );
		const length = images.length - 1;
		let indice = 0;

		for ( const image of images.values() )
		{
			// On détermine si le conteneur est actuellement caché ou non.
			const hidden = window.getComputedStyle( image ).display == "none" || image.style.display == "none";

			if ( !hidden )
			{
				// Si l'image n'est pas caché, on casse la boucle et on fait
				//	en sorte de cacher l'image actuelle pour afficher celle
				//	qui l'a précède dans l'arborescence du document.
				const previous = images[ indice - 1 ] || images[ length ];

				previous.style.display = "inline-block";
				image.style.display = "none";

				return;
			}

			indice++;
		}
	} );

	// Afin de passer à une image suivante.
	arrow.lastElementChild.addEventListener( "click", ( event ) =>
	{
		// On récupère toutes les images de la section où s'est produit le clic.
		const images = document.querySelectorAll( `article#${ event.path[ 2 ].id } div.images div` );
		let indice = 0;

		for ( const image of images.values() )
		{
			// On détermine si le conteneur est actuellement caché ou non.
			const hidden = window.getComputedStyle( image ).display == "none" || image.style.display == "none";

			if ( !hidden )
			{
				// Si l'image n'est pas caché, on casse la boucle et on fait
				//	en sorte de cacher l'image actuelle pour afficher celle
				//	qui l'a suit dans l'arborescence du document.
				const next = images[ indice + 1 ] || images[ 0 ];

				image.style.display = "none";
				next.style.display = "inline-block";

				return;
			}

			indice++;
		}
	} );
}

//
// Permet de contrôler la position horizontale et verticale
// 	des images de sélection des images.
//	Note : ceci est un correctif temporaire le temps de trouver
//		la solution en CSS de manière plus propre.
//
function updatePosition( _event )
{
	// On vérifie la longueur de la zone d'affiche.
	if ( window.innerWidth > 1280 )
	{
		// Si l'écran est assez grand, on met à jour la position
		//	des deux images.
		for ( const arrow of arrows.values() )
		{
			// Récupération des deux éléments.
			const left = arrow.firstElementChild;
			const right = arrow.lastElementChild;

			// Récupération des dimensions du conteneur et de l'image
			//	pour calculer le décalage à appliquer.
			const imageHeight = left.offsetHeight;
			const containerHeight = arrow.offsetHeight;

			const offset = ( containerHeight / 2 ) - ( imageHeight / 2 );

			// Application des décalages aux images.
			left.style.position = "relative";
			left.style.top = `${ offset }px`;

			right.style.position = "relative";
			right.style.top = `${ offset }px`;
		}
	}
	else
	{
		// Dans le cas contraire, on supprime nos correctifs
		//	et on laisse le CSS gérer de son côté.
		for ( const arrow of arrows.values() )
		{
			arrow.firstElementChild.removeAttribute( "style" );
			arrow.lastElementChild.removeAttribute( "style" );
		}
	}
}

updatePosition(); // Mise à jour au démarrage.

window.addEventListener( "resize", updatePosition ); // Événément à chaque redimensionnement.