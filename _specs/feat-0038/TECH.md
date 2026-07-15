# feat-0038: TECH — Certificate & Visual Platform copy

## Files

| File | Action |
| ---- | ------ |
| `projects/content/certificates-programmes.mdx` | UPDATE title + body |
| `projects/content/imili-visual-platform.mdx` | UPDATE body (delete P2) |
| `_specs/feat-0038/*` | CREATE |

## Normative MDX

### `certificates-programmes.mdx`

```mdx
---
title: "Certificate Programmes"
description: "Professional certificate pathways that build practical MIL skills for educators, journalists, policymakers, and community leaders."
status: active
date: "2026-03-01"
sortOrder: 4
heroImage: "/stock/nav-resources-2.jpg"
heroImageAlt: "Students engaged in professional learning and certification"
---

**Certificate Programmes** at IMILI offer structured learning pathways for professionals seeking recognised credentials in media and information literacy practice.
```

### `imili-visual-platform.mdx`

Keep frontmatter. Body is only:

```mdx
The **IMILI Visual Platform** develops cartoons, animations, and visual narratives that explain complex information challenges in clear, culturally relevant ways.
```

## Verification

```bash
npm run build
```

Manual: open both project detail pages and confirm single-paragraph bodies.
