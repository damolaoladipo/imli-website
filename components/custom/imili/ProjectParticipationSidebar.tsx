import type { ProjectData } from "@/types/project";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatDateRange = (start: string, end: string) =>
  `${formatDate(start)} – ${formatDate(end)}`;

type ProjectParticipationSidebarProps = {
  data: ProjectData;
};

export function ProjectParticipationSidebar({
  data,
}: ProjectParticipationSidebarProps) {
  if (data.status !== "call-for-participation") return null;

  const hasKeyDates =
    (data.submissionDeadlineStart && data.submissionDeadlineEnd) ||
    data.finalistsAnnouncementDate ||
    data.winnersAnnouncementDate;

  const mailtoHref = data.submissionEmail
    ? `mailto:${data.submissionEmail}`
    : undefined;

  return (
    <div className="rounded-sm border border-border bg-muted/30 p-6">
      <h2 className="text-lg font-semibold text-foreground">How to participate</h2>

      {mailtoHref && data.submissionEmail && (
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground md:text-xl">
          For inquiries, contact{" "}
          <a
            href={mailtoHref}
            className="font-medium text-primary underline hover:text-primary/80"
          >
            {data.submissionEmail}
          </a>{" "}
          or visit{" "}
          <a
            href="https://www.imilinstitute.org"
            className="font-medium text-primary underline hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.imilinstitute.org
          </a>
          .
        </p>
      )}

      {hasKeyDates && (
        <dl className="mt-6 space-y-4 text-base md:text-lg">
          {data.submissionDeadlineStart && data.submissionDeadlineEnd && (
            <div>
              <dt className="font-medium text-muted-foreground">
                Submission deadline
              </dt>
              <dd className="mt-1 text-foreground">
                {formatDateRange(
                  data.submissionDeadlineStart,
                  data.submissionDeadlineEnd,
                )}
              </dd>
            </div>
          )}
          {data.finalistsAnnouncementDate && (
            <div>
              <dt className="font-medium text-muted-foreground">
                Finalists announcement (first best 50)
              </dt>
              <dd className="mt-1 text-foreground">
                {formatDate(data.finalistsAnnouncementDate)}
              </dd>
            </div>
          )}
          {data.winnersAnnouncementDate && (
            <div>
              <dt className="font-medium text-muted-foreground">
                Winners announced (best 20)
              </dt>
              <dd className="mt-1 text-foreground">
                {formatDate(data.winnersAnnouncementDate)}
              </dd>
            </div>
          )}
        </dl>
      )}

      {data.socialHashtags && data.socialHashtags.length > 0 && (
        <div className="mt-6">
          <p className="text-base font-medium text-muted-foreground md:text-lg">
            Official hashtags
          </p>
          <p className="mt-2 text-base text-foreground md:text-lg">
            {data.socialHashtags.join(" ")}
          </p>
        </div>
      )}
    </div>
  );
}
