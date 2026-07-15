# feat-0038: Certificate & Visual Platform copy polish

## Summary

Apply stakeholder copy edits from Macaulay Olushola (13 Jul 2026) to two project MDX pages:

1. **Certificate Programmes** — drop plural “Certificates”; keep one paragraph; remove launch placeholder.
2. **IMILI Visual Platform** — keep the programme sentence; remove expansion/placeholder paragraph.

| Route | File |
| ----- | ---- |
| `/projects/certificates-programmes` | `projects/content/certificates-programmes.mdx` |
| `/projects/imili-visual-platform` | `projects/content/imili-visual-platform.mdx` |

**Related:** [feat-0036](../feat-0036/PRODUCT.md).

---

## Assumptions

1. Display title and body use **Certificate Programmes** (no “s” after Certificate). URL slug stays `certificates-programmes` (no redirect).
2. Frontmatter `title` on Certificate page matches display name.
3. Header nav already says “Certificate Programmes” — leave href unchanged.
4. Descriptions (meta / card summary) may stay as-is unless they still say “Certificates Programmes”.
5. Normative body copy for Certificate is exactly:

   > Certificate Programmes at IMILI offer structured learning pathways for professionals seeking recognised credentials in media and information literacy practice.

6. Normative body copy for Visual Platform is exactly:

   > The IMILI Visual Platform develops cartoons, animations, and visual narratives that explain complex information challenges in clear, culturally relevant ways.

---

## Acceptance criteria

- [x] Spec feat-0038 complete
- [x] Certificate page title + body use “Certificate Programmes”
- [x] Certificate page has no modules/enrolment placeholder paragraph
- [x] Visual Platform page has no second “supports MIL education…” paragraph
- [x] `npm run build` passes

---

## Out of scope

- Renaming the URL slug or MDX filename
- Full programme curricula, enrolment forms, or asset uploads
- IMILI Test Series copy
