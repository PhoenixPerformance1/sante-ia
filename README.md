# 🩺 Santé & IA · Site Officiel & Vitrine Ouvrage

Site officiel de présentation du **Manuel de bonnes pratiques pour dialoguer avec les modèles de langage (LLM)** rédigé par le **Dr Elias Chaddouk** (Applications en médecine, enseignement, recherche et pratique clinique).

- **Nom de domaine de production :** `https://sante-ia.fr` (et `https://www.sante-ia.fr`)
- **Dépôt GitHub :** `https://github.com/PhoenixPerformance1/sante-ia`
- **Hébergement :** Vercel (Edge Network)
- **Registrar DNS :** OVHcloud (Zone DNS `sante-ia.fr`)

## Structure du Projet

```
sante-ia/
├── index.html        # Landing page vitrine (Light Mode First, Responsive 375px-4K)
├── styles.css        # Design System Anti-Slop (SOP 06, CSS variables, zéro overflow)
├── script.js         # Gestion thème sombre/clair, machine d'état waitlist
├── vercel.json       # Headers de sécurité, compression, clean URLs
├── assets/
│   ├── couverture.webp                  # Couverture du livre (format web optimisé)
│   ├── couverture_manuel_llm_sante.png  # Couverture originale recadrée
│   ├── dr_elias_chaddouk.webp           # Portrait Dr Elias Chaddouk (web)
│   ├── dr_elias_chaddouk.png            # Portrait original recadré
│   ├── QR_CODE_SANTE_IA_300DPI.png      # QR Code print haute définition pour le livre
│   ├── qr_sante_ia.svg                  # QR Code vectoriel SVG
│   └── qr_sante_ia_2000px.png           # QR Code matriciel 2000px
└── README.md
```

## Configuration DNS OVHcloud pour Vercel

Dans l'espace client OVHcloud > Web Cloud > Noms de domaine > `sante-ia.fr` > **Zone DNS** :

1. Modifier l'entrée de type **A** pour `@` :
   - Cible actuelle : `213.186.33.5` (parking OVH)
   - Nouvelle cible : `76.76.21.21` (Vercel Anycast IP)
2. Modifier ou ajouter l'entrée de type **CNAME** pour `www` :
   - Nouvelle cible : `cname.vercel-dns.com.`
3. **Important :** Ne pas toucher aux enregistrements **MX** (`mx1.mail.ovh.net`, etc.) ni aux entrées SPF/DKIM pour que les e-mails OVH Zimbra continuent de fonctionner parfaitement.
