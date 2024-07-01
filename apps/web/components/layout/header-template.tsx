"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadcrumbRoute {
  name: string;
  path: string;
  component?: React.ReactNode;
}

interface HeaderTemplateProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbRoute[];
}

export function HeaderTemplate({
  breadcrumbs,
  title,
  description,
}: HeaderTemplateProps): React.JSX.Element {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {Boolean(breadcrumbs.length) && (
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/clinic/:clinicId">Clinic</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {breadcrumbs.map((breadcrumb, index, arr) => {
                if (index === arr.length - 1) {
                  return (
                    <BreadcrumbItem key={breadcrumb.path}>
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  );
                }

                return (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={breadcrumb.path}>
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
        {title}
      </h1>
      {Boolean(description) && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
