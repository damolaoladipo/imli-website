#!/usr/bin/env bash
# feat-0031 — Download Unsplash stock images into public/stock/
# Usage: ./scripts/fetch-unsplash-stock.sh
# Requires: curl, network access

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/stock"
mkdir -p "$OUT"

download() {
  local url="$1"
  local dest="$2"
  echo "→ $dest"
  curl -fsSL --retry 3 "$url" -o "$dest"
}

# Photo IDs and crops from _data/imili/image-attributions.ts
download "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=82" "$OUT/bg-hero.jpg"
download "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&h=1200&q=82" "$OUT/humans.jpg"
download "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&h=1200&q=82" "$OUT/mission.jpg"
download "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&h=1200&q=82" "$OUT/vision.jpg"
download "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=82" "$OUT/hero-lobby.jpg"
download "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1600&h=900&q=82" "$OUT/news-tvc-launch.jpg"
download "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&h=630&q=82" "$OUT/og-default.jpg"

echo "Done. Files written to public/stock/"
