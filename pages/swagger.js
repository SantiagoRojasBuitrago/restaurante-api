// pages/swagger.js
import React from 'react';
import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

const SwaggerPage = () => {
  return <SwaggerUI url="/api/swagger" />;
};

export default SwaggerPage;
