import React, { useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import './Code.scss';
import Problem from 'components/Code/Problem/Problem';
import Discussion from 'components/Code/Discussion/Discussion';
import OutputDetails from 'components/Code/OutputDetails/OutputDetails';
import CodeEditorSkeleton from 'components/Code/CodeEditorSkeleton';
const CodeEditor = lazy(() => import('components/Code/CodeEditor/CodeEditor'));

const Code = () => {
  const location = useLocation();
  const contestData = location.state?.problem;
  const [response, setResponse] = useState({});
  const [processing, setProcessing] = useState(false);

  if (!contestData) return <p>No problem data available.</p>;

  return (
    <div className="contest-page">
      <div className="top-section">
        <Problem contestData={contestData} />
      </div>
      <div className="code-section">
        <Suspense fallback={<CodeEditorSkeleton />}>
          <CodeEditor
            contestData={contestData}
            setResponse={setResponse}
            processing={processing}
            setProcessing={setProcessing}
          />
        </Suspense>
        <OutputDetails
          contestData={contestData}
          outputDetails={response}
          processing={processing}
        />
      </div>
      <Discussion />
    </div>
  );
};

export default Code;
