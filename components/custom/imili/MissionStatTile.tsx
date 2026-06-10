import { HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

type MissionStatTileProps = {
  value: string;
  label: string;
  className?: string;
};

export function MissionStatTile({ value, label, className }: MissionStatTileProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center rounded-[25px] bg-[#F3F4F6] p-7 text-center",
        className,
      )}
    >
      <HeartHandshake className="size-10 text-[#2EBC5E]" aria-hidden />
      <p className="mt-3 text-[51px] font-bold leading-none text-[#111111]">
        {value}
      </p>
      <p className="mt-2 text-[18px] text-[#6B7280]">{label}</p>
    </div>
  );
}
