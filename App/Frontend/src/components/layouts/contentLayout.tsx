import React, { ReactNode } from "react";

interface ContentLayoutProps {
  title?: string;
  children: ReactNode;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <div className="content-layout-wrapper px-4 py-6">
      {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
      <div className="content-layout-body">{children}</div>
    </div>
  );
};
