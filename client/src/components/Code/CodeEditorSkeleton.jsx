import React from 'react';
import './CodeEditorSkeleton.scss';

const CodeEditorSkeleton = () => {
  return (
    <div className="editor-skeleton">
      <div className="skeleton skeleton-toolbar"></div>
      <div className="skeleton skeleton-editor"></div>
    </div>
  );
};

export default CodeEditorSkeleton;
