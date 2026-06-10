import { cn } from "@/lib/utils";

type BentoStatTileProps = {
  value: string;
  label: string;
  className?: string;
};

export function BentoStatTile({ value, label, className }: BentoStatTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center overflow-hidden rounded-[25px] bg-[#0A3D34] p-6",
        className,
      )}
    >
      <p className="text-[51px] font-bold leading-none text-white">{value}</p>
      <p className="mt-2 text-[18px] text-white">{label}</p>
    </div>
  );
}
