# Portfolio - Aurelie Perichon

Portfolio interactif construit avec Next.js, React, TypeScript, Tailwind CSS et Framer Motion.

Le site presente cinq projets sous forme d'experiences interactives :
- Supply Brain - Hackathon Mirakl
- Synapse
- Eugenia School
- ZigZag
- Mario Kart

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Supabase REST API pour les analytics optionnelles

## Installation locale

```bash
pnpm install
pnpm run dev
```

Le site est disponible sur :

```txt
http://localhost:3000
```

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run lint
```

`pnpm run build` genere un site statique dans `out/`, compatible avec GitHub Pages.

## Variables d'environnement

Copier `.env.example` vers `.env.local`, puis renseigner les valeurs utiles :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_ANALYTICS_TABLE=portfolio_analytics
```

Si le portfolio est publie comme site de projet GitHub Pages, par exemple :

```txt
https://username.github.io/repository-name/
```

ajouter :

```env
NEXT_PUBLIC_BASE_PATH=/repository-name
```

Pour un site utilisateur GitHub Pages, par exemple :

```txt
https://username.github.io/
```

laisser `NEXT_PUBLIC_BASE_PATH` vide.

## Analytics

Le portfolio integre une analytics maison sans Vercel et sans cookie.

Comportement :
- la page `/analytics` n'est pas comptabilisee dans les stats ;
- si Supabase est configure, les visites sont stockees dans Supabase ;
- si Supabase n'est pas configure, les visites sont stockees seulement dans le `localStorage` du navigateur.

Dashboard :

```txt
/analytics
```

Depuis cette page, il est possible de :
- consulter les pages vues ;
- voir la repartition par langue ;
- consulter les dernieres visites ;
- telecharger les donnees en JSON ;
- telecharger les donnees en CSV.

### Configuration Supabase

1. Creer un projet Supabase.
2. Ouvrir le SQL Editor.
3. Executer le contenu de `docs/supabase-analytics.sql`.
4. Renseigner les variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` et `NEXT_PUBLIC_SUPABASE_ANALYTICS_TABLE`.

La cle `anon` Supabase est publique par conception. Les droits sont controles par les policies RLS definies dans `docs/supabase-analytics.sql`.

## Deploiement GitHub Pages

Le fichier `.github/workflows/deploy.yml` publie automatiquement le site sur GitHub Pages quand du code est pousse sur `main`.

Etapes cote GitHub :

1. Aller dans `Settings > Pages`.
2. Choisir `GitHub Actions` comme source de deploiement.
3. Aller dans `Settings > Secrets and variables > Actions`.
4. Ajouter les variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANALYTICS_TABLE`
   - `NEXT_PUBLIC_BASE_PATH` si necessaire
5. Ajouter le secret :
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Puis pousser sur `main`.

## Structure utile

```txt
app/                         Pages Next.js
components/                  Composants UI et composants globaux
lib/language-context.tsx     Traductions FR/EN
lib/portfolio-analytics-store.ts
docs/supabase-analytics.sql  Schema Supabase pour les analytics
public/                      Images, videos, HTML embarque et assets
```

## Notes

- Le site est configure en export statique avec `output: "export"`.
- Les dossiers `.next/`, `out/` et `.portfolio-analytics/` sont generes localement et ignores par Git.
- Le projet ne depend pas de Vercel Analytics.
