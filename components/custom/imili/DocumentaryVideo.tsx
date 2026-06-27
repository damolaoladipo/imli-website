"use client";

import { useEffect, useRef, useState } from "react";

type DocumentaryVideoProps = {
  youtubeId: string;
  title: string;
};

function buildEmbedSrc(youtubeId: string, origin: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    enablejsapi: "1",
    origin,
  });

  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

function sendPlayerCommand(
  iframe: HTMLIFrameElement,
  func: string,
  args: unknown[] = [],
) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );
}

export function DocumentaryVideo({ youtubeId, title }: DocumentaryVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible) {
          setEmbedSrc(
            (current) =>
              current ?? buildEmbedSrc(youtubeId, window.location.origin),
          );
          return;
        }

        const iframe = iframeRef.current;
        if (iframe) {
          sendPlayerCommand(iframe, "pauseVideo");
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [youtubeId]);

  useEffect(() => {
    if (!isInView || !embedSrc) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const playWithAudio = () => {
      sendPlayerCommand(iframe, "playVideo");
      sendPlayerCommand(iframe, "unMute");
      sendPlayerCommand(iframe, "setVolume", [100]);
    };

    const onLoad = () => {
      playWithAudio();
      window.setTimeout(playWithAudio, 400);
      window.setTimeout(playWithAudio, 1200);
    };

    iframe.addEventListener("load", onLoad);

    const unlockOnInteraction = () => {
      if (isInView) playWithAudio();
    };

    window.addEventListener("scroll", unlockOnInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("pointerdown", unlockOnInteraction, { once: true });

    playWithAudio();

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", unlockOnInteraction);
      window.removeEventListener("pointerdown", unlockOnInteraction);
    };
  }, [isInView, embedSrc]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#111111]/5 ring-1 ring-[#E5E7EB]"
    >
      {embedSrc ? (
        <iframe
          ref={iframeRef}
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : null}
    </div>
  );
}
