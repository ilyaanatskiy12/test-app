import React, { memo } from 'react';
import { Breadcrumb } from 'react-bootstrap';

type BreadcrumbProps = {
  items: string[];
};

const CustomBreadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      {items.map((item) => (
        <Breadcrumb.Item key={item} className="h5">
          {item}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default memo(CustomBreadcrumb);
