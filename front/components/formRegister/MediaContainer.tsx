import React from 'react';
import MediaButton from './MediaButton';

export const MediaContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <MediaButton social="google" />
      <MediaButton social="facebook" />
    </div>
  );
};
