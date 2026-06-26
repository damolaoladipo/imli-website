import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

const statusLabels: Record<ProjectStatus, string> = {
  "call-for-papers": "Call for papers",
  active: "Active",
  completed: "Completed",
};

const statusStyles: Record<ProjectStatus, string> = {
  "call-for-papers": "bg-[#4FAF50] text-white",
  active: "bg-[#B8E4FA] text-[#0B4F7A]",
  completed: "bg-muted text-muted-foreground",
};

type ProjectStatusLabelProps = {
  status: ProjectStatus;
  className?: string;
};

export function ProjectStatusLabel({ status, className }: ProjectStatusLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
