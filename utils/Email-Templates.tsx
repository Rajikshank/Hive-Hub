import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>

    
    <h1 className='text-xl'>Congrats, {firstName}!</h1>

    <p className='text-md font-semibold'>You Application for the xys Job has been success...</p>
  </div>
);
