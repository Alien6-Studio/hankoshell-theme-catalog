# Directions de design — v0.1

Comparateur local : <http://127.0.0.1:7425/design-proposals.html>.

Depuis la racine du dépôt, démarrer le serveur avec Node 22 :

```sh
npm run dev --prefix studio
```

La galerie du Theme Studio contient désormais **16 thèmes complets** : douze directions enrichies et quatre directions vitaminées (Zeste, Parade, Bloom, Rivage). Chaque thème comprend 18 écrans modifiables et huit langues. Huit thèmes possèdent leur propre univers photographique, dont Maison, Rituel, Comptoir et Mouvement. Le filtre **Vitaminés** sélectionne les quatre directions les plus colorées : <http://127.0.0.1:7425/?collection=vibrant>.

Le lien historique `design-proposals.html` ouvre cette même galerie. Il n’existe plus de comparateur ni de formulaires de démonstration séparés : vignettes, exploration et édition utilisent les mêmes documents et le même cadre de rendu. Le mode Tester utilise les parcours du Studio ; les exports raccordent les formulaires et actions à l’application hôte.

## Références examinées le 30 octobre 2026

Pages publiques ouvertes dans un navigateur isolé et examinées à 1440 px :

| Référence | Observation retenue |
| --- | --- |
| [Google Accounts](https://accounts.google.com/) | Une décision à chaque étape, un champ principal et une action immédiatement lisible. La variante accessible lors de l’étude était WebLiteSignIn. |
| [Apple](https://www.apple.com/) | Titres courts, hiérarchie forte, espace autour de l’action et navigation discrète. |
| [Stripe — connexion](https://dashboard.stripe.com/login) | Libellés explicites, récupération du mot de passe à proximité du champ, méthodes alternatives clairement regroupées. |
| [Linear](https://linear.app/) | Surfaces sombres, contrastes gradués, navigation compacte et cohérence des composants d’interface. |
| [Airbnb — connexion](https://www.airbnb.com/login) | Ton accueillant, formulaire concentré et entrée commune connexion / inscription. |
| [Spotify — connexion](https://accounts.spotify.com/en/login) | Typographie forte, composition concentrée, bouton principal très reconnaissable et méthodes alternatives secondaires. |
| [GOV.UK](https://www.gov.uk/) | Hiérarchie de service, titres explicites et repères visuels francs. |
| [The Guardian](https://www.theguardian.com/international) | Bandeau typographique, grille de journal et filets. |
| [Headspace](https://www.headspace.com/) | Ton attentionné, grandes surfaces arrondies et entrées par service. |
| [Vercel — connexion](https://vercel.com/login) | Formulaire concentré, sobriété monochrome et méthodes alternatives. |
| [Shopify](https://www.shopify.com/) | Promesse de marque directe et action principale immédiatement identifiable. |
| [Nike](https://www.nike.com/fr/) | Titres francs, rythme dynamique et actions courtes. |
| [Figma](https://www.figma.com/) | Composition asymétrique, couleurs affirmées et hiérarchie lisible. |

Ces références servent à étudier des principes d’interface. Elles ne constituent
pas un classement de fréquentation. Les propositions utilisent une marque
fictive commune, Aurora, pour faciliter la comparaison.

## Propositions

| Direction | Composition et caractère | Usage envisagé |
| --- | --- | --- |
| **Évidence** | Surfaces lumineuses, connexion progressive, navigation horizontale du compte. | Services grand public, institutions. |
| **Précision** | Espace produit sombre, filets fins, formulaire concentré et réglages latéraux. | SaaS et outils professionnels. |
| **Maison** | Composition éditoriale, Instrument Serif, papier crème et rouge terre. Compte présenté comme un service attentionné. | Hospitalité, lifestyle, marques de service. |
| **Signal** | Connexion centrée, grands titres, contraste noir / vert acide, compte direct et affirmé. | Culture, médias, communautés. |
| **Civique** | Bandeau de service, étapes numérotées, libellés explicites et réglages en listes. | Services publics, éducation, associations. |
| **Édition** | Grand bandeau typographique, grille de journal, filets francs et compte en deux colonnes. | Presse, culture, édition. |
| **Rituel** | Accueil centré, formulaire spacieux, surfaces arrondies et services avant les informations de profil. | Bien-être et services personnels. |
| **Terminal** | Connexion monochrome, panneau de contexte, métadonnées monospace et réglages compacts. | Développeurs et outils techniques. |
| **Comptoir** | Formulaire à gauche, accueil de membre à droite, fiche personnelle et services de compte. | Commerce, artisanat, marques locales. |
| **Mouvement** | Composition inversée, titres condensés et panneau bleu électrique. | Sport, événementiel, communautés actives. |
| **Folio** | Rail de marque, titre éditorial et formulaire décalé ; compte asymétrique. | Design et studios créatifs. |
| **Patrimoine** | Connexion centrée ivoire sur vert profond, proportions classiques et services en lignes. | Hôtellerie et marques premium. |
| **Zeste** | Agrumes éclatants sur fond bleu, grand panneau photographique et formulaire ivoire. | Food et marques joyeuses. |
| **Parade** | Danse, corail et violet, composition avec la photographie à droite. | Culture et communautés. |
| **Bloom** | Fleurs fuchsia et orange, cadre arrondi et typographie éditoriale. | Beauté et lifestyle. |
| **Rivage** | Mer turquoise et parasols orange, photographie sur toute la hauteur. | Voyage et loisirs. |

## Cohérence et vérification

Le manifeste `catalog/themes.json` porte les noms, familles, styles et références. Les documents de chaque thème sont matérialisés dans son propre répertoire. La galerie, l’exploration et l’éditeur partagent `ThemePageSurface`, `JourneyScreen` et les mêmes recettes CSS. Les variables de palette et polices sont également partagées avec les exports Keycloak et React.

Les couleurs du Studio sont explicites sur sa racine en mode clair et sombre. Chaque aperçu possède sa propre palette, son schéma de couleur et ses couleurs de champ ; changer le mode du Studio ne recolore pas les thèmes. Les cartes utilisent quatre, trois, deux ou une colonne selon la largeur.

- `npm run typecheck --prefix studio` et `npm test --prefix studio`.
- `npm run test:coherence --prefix studio` compare les rendus réels, y compris le cadrage des images, puis les 288 documents exportés aux sources.
- Les tests couvrent aussi les liens historiques, les filtres, les couleurs clair/sombre, les polices et la densité des cartes.
- `npm run test:continuity --prefix studio` contrôle les 288 pages sur ordinateur, 96 déclinaisons mobiles et les contrastes de vingt écrans photographiques.
- Les photographies et leurs prompts sont documentés dans `catalog/vibrant-prompts.json` et `catalog/enrichment-prompts.json`.
