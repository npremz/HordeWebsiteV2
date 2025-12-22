# Fichiers Favicon requis

Remplacez ces fichiers placeholder par vos propres icônes :

## Fichiers à créer

| Fichier | Dimensions | Format | Description |
|---------|------------|--------|-------------|
| `favicon.ico` | 32x32 | ICO | Favicon classique pour navigateurs legacy |
| `favicon.svg` | vectoriel | SVG | Favicon moderne (déjà présent avec support dark mode) |
| `apple-touch-icon.png` | 180x180 | PNG | Icône pour iOS (ajout à l'écran d'accueil) |
| `android-chrome-192x192.png` | 192x192 | PNG | Icône PWA petite taille |
| `android-chrome-512x512.png` | 512x512 | PNG | Icône PWA grande taille |
| `safari-pinned-tab.svg` | vectoriel | SVG | Icône monochrome pour Safari pinned tabs |

## Outils recommandés

- [RealFaviconGenerator](https://realfavicongenerator.net/) - Génère tous les fichiers à partir d'une image
- [Favicon.io](https://favicon.io/) - Alternative simple

## Notes

- Le `favicon.svg` actuel supporte le dark mode automatiquement
- Le `safari-pinned-tab.svg` doit être monochrome (une seule couleur)
- Les icônes Android Chrome doivent avoir un fond opaque pour le mode maskable
