import type { ProjectData } from "@/types/project";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type ProjectSubmissionSidebarProps = {
  data: ProjectData;
};

export function ProjectSubmissionSidebar({ data }: ProjectSubmissionSidebarProps) {
  if (data.status !== "call-for-papers") return null;

  const hasSubmissionInfo =
    data.abstractDeadline ||
    data.firstDraftDeadline ||
    data.submissionEmail;

  if (!hasSubmissionInfo) return null;

  const mailtoHref = data.submissionEmail
    ? `mailto:${data.submissionEmail}${
        data.submissionEmailSubject
          ? `?subject=${encodeURIComponent(data.submissionEmailSubject)}`
          : ""
      }`
    : undefined;

  return (
    <div className="rounded-sm border border-border bg-muted/30 p-6">
      <h2 className="text-lg font-semibold text-foreground">
        Submit your abstract
      </h2>
      {mailtoHref && data.submissionEmail && (
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground md:text-xl">
          Send your abstract to{" "}
          <a
            href={mailtoHref}
            className="font-medium text-primary underline hover:text-primary/80"
          >
            {data.submissionEmail}
          </a>
          {data.submissionEmailSubject && (
            <>
              {" "}
              with subject line{" "}
              <span className="font-medium text-foreground">
                {data.submissionEmailSubject}
              </span>
            </>
          )}
          .
        </p>
      )}

      <dl className="mt-6 space-y-4 text-base md:text-lg">
        {data.abstractDeadline && (
          <div>
            <dt className="font-medium text-muted-foreground">
              Abstract deadline
            </dt>
            <dd className="mt-1 text-foreground">
              {formatDate(data.abstractDeadline)}
            </dd>
          </div>
        )}
        {data.firstDraftDeadline && (
          <div>
            <dt className="font-medium text-muted-foreground">
              First draft deadline
            </dt>
            <dd className="mt-1 text-foreground">
              {formatDate(data.firstDraftDeadline)}
            </dd>
          </div>
        )}
        {data.abstractWordLimit && (
          <div>
            <dt className="font-medium text-muted-foreground">
              Abstract length
            </dt>
            <dd className="mt-1 text-foreground">
              Not more than {data.abstractWordLimit} words
            </dd>
          </div>
        )}
        {data.submissionEmailSubject && (
          <div>
            <dt className="font-medium text-muted-foreground">Email subject</dt>
            <dd className="mt-1 font-mono text-foreground">
              {data.submissionEmailSubject}
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-6 text-base text-muted-foreground md:text-lg">
        Only authors of accepted abstracts will be contacted.
      </p>
    </div>
  );
}
