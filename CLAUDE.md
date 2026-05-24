# CLAUDE.md — Ronde et Jolie

> Lu automatiquement par Claude Code à chaque session. Définit le contexte projet, design system et conventions.

## 🎯 Projet

**Ronde et Jolie** — site web de communauté & connexions, esthétique **luxe inclusif** (noir profond + or chaud). Public : femmes et hommes adultes cherchant rencontres bienveillantes et expériences authentiques (dîners privés, after-works, ateliers cuisine, voyages).

**État actuel** : hero one-page statique avec les vraies photos de la communauté intégrées (3 photos en WebP+JPG, 3 tailles chacune).

**Évolutions prévues** : sections Communauté / Activités / Événements / À propos / Footer, formulaire d'inscription, à terme intégration Chameleon Dating Script (le site live `rondeetjolie.fr` tourne dessus).

## 🛠️ Stack

- HTML5 sémantique + CSS3 pur (variables, grid, flexbox)
- JavaScript vanilla, aucun framework, aucune build step
- Google Fonts : Cormorant Garamond + Inter + Caveat
- Images : WebP + JPG fallback via `<picture>` + srcset

## 🎨 Design System

**Couleurs** (variables CSS dans `:root` — toujours utiliser les variables, jamais de hex en dur) :
```css
--bg-deep: #0a0806;      /* fond principal */
--bg-soft: #14100c;
--bg-elev: #1c1712;      /* cards */

--gold-bright: #e8b87a;  /* highlights, hover */
--gold: #d4a574;         /* accent base */
--gold-deep: #b8895a;    /* gradients */
--gold-dark: #8a6438;

--cream: #f5e6d3;        /* texte principal */
--cream-soft: #e8d4bc;
--text-muted: rgba(245, 230, 211, 0.65);

--border-gold: rgba(212, 165, 116, 0.25);
--border-gold-strong: rgba(212, 165, 116, 0.45);
```

**Typographies** :
- `--font-display`: Cormorant Garamond (titres, italiques)
- `--font-body`: Inter (corps, boutons)
- `--font-script`: Caveat (manuscrit décoratif)

Tailles fluides toujours via `clamp()`, jamais de px fixes pour les titres.

**Espacement** :
- `--container: 1400px`
- `--gutter: clamp(1.5rem, 4vw, 4rem)`

**Easings** :
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (default)
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`

## 📁 Structure

```
ronde-et-jolie/
├── index.html              # Hero + sections futures
├── styles.css              # Design system complet
├── script.js               # Interactions
├── README.md
├── CLAUDE.md               # Ce fichier
└── assets/
    └── photos/             # 18 fichiers : 3 photos × 3 tailles × WebP+JPG
```

## 📐 Conventions code

**HTML** :
- HTML5 sémantique, `lang="fr"`
- Indent 4 espaces
- `aria-*` et `alt` partout
- Photos en `<picture>` avec WebP + JPG fallback + srcset 1x/2x
- `loading="eager"` dans le hero, `loading="lazy"` ailleurs

**CSS** :
- Indent 4 espaces, kebab-case
- BEM-light : `.pillar`, `.pillar-icon`, `.pillar-label`
- Pas de `!important` sauf cas extrême documenté
- `clamp()` pour le responsive fluide
- Mobile-first via `max-width` pour ce projet (desktop pivot)

**JavaScript** :
- Vanilla ES6+, IIFE, `'use strict'`
- `const`/`let` jamais `var`
- Toujours vérifier l'existence avant d'attacher listeners
- Throttle/debounce les events scroll/resize/mousemove
- Respecter `prefers-reduced-motion`

## ✅ Checklist avant commit

- [ ] Rendu OK sur 1100+/720-1100/<720px
- [ ] Pas d'overflow horizontal
- [ ] Touch targets ≥ 44×44px mobile
- [ ] Contraste ≥ 4.5:1 (WCAG AA)
- [ ] `alt` sur toutes les images informatives
- [ ] `prefers-reduced-motion` respecté
- [ ] Pas de console.log oubliés
- [ ] Variables CSS partout, jamais de couleur en dur
- [ ] Navigation clavier fonctionnelle

## 🚫 À éviter absolument

- ❌ Couleurs en dur (utiliser `var(--gold)` toujours)
- ❌ Pixel values pour les titres (clamp + rem)
- ❌ Gradients violet/rose génériques
- ❌ jQuery, Bootstrap, autre dépendance
- ❌ Stock photos génériques corporate
- ❌ Carrousel auto-play
- ❌ Bouton à angles vifs (toujours pill ou radius ≥ 14px)
- ❌ Animations > 1.5s totale au chargement
- ❌ Polices génériques (Arial, Roboto, Helvetica)

## 🎯 Patterns réutilisables

### Nouvelle section

```html
<section class="section-name" id="section-id">
    <div class="section-inner">
        <header class="section-header">
            <p class="eyebrow">Eyebrow italique</p>
            <h2 class="section-title">Titre <em>en italique</em></h2>
        </header>
        <div class="section-content"><!-- ... --></div>
    </div>
</section>
```

CSS de base :
```css
.section-name {
    position: relative;
    z-index: 1;
    padding: clamp(4rem, 8vw, 8rem) 0;
}
.section-inner {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 var(--gutter);
}
```

### Reveal au scroll (IntersectionObserver, pas de lib)

```js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
[data-reveal].is-revealed {
    opacity: 1;
    transform: translateY(0);
}
```

### Nouvelle photo

Toujours en `<picture>` avec WebP + JPG :
```html
<picture>
    <source type="image/webp"
            srcset="assets/photos/nom@1x.webp 1x, assets/photos/nom@2x.webp 2x">
    <img src="assets/photos/nom@1x.jpg"
         srcset="assets/photos/nom@1x.jpg 1x, assets/photos/nom@2x.jpg 2x"
         alt="Description précise et utile"
         loading="lazy"
         width="800" height="600">
</picture>
```

## 💼 Workflow Claude Code

1. **Lire index.html, styles.css, script.js en premier** pour le contexte
2. **Plan Mode (Shift+Tab) pour modifs > 20 lignes**
3. **Modifs petites** : str_replace ciblé
4. **Tester** : Live Server (VS Code) ou `python3 -m http.server`
5. **Commit Git après chaque feature**

## 🎨 Ton & microcopy

**Ton de voix** : chaleureux non mielleux, inclusif non moralisateur, élégant non prétentieux, direct non froid. **Tutoiement** systématique.

**Privilégier** : phrases courtes rythmées, vocabulaire émotionnel ("partage", "rencontre", "authentique"), verbes d'action engageants.

**À éviter** : corporate ("solutions", "engagement"), urgence artificielle, auto-promotion lourde.

**Exemples** :
- "Soumettre" → "Rejoindre la communauté"
- "Erreur : champ requis" → "On a besoin de ton prénom"
- "Inscription réussie" → "Bienvenue parmi nous"

---

*Mettre à jour ce fichier à mesure que le projet évolue.*
