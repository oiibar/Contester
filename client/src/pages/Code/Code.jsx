import React, { useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import './Code.scss';
import Problem from 'components/Code/Problem/Problem';
import Discussion from 'components/Code/Discussion/Discussion';
import OutputDetails from 'components/Code/OutputDetails/OutputDetails';
import CodeEditorSkeleton from 'components/Code/CodeEditorSkeleton';
import { useAuth } from 'auth/AuthContext';
import { fetchUser } from 'shared/api/userApi';
const CodeEditor = lazy(() => import('components/Code/CodeEditor/CodeEditor'));

const Code = () => {
  const location = useLocation();
  const problem = location.state?.problem;
  const [response, setResponse] = useState({});
  const [processing, setProcessing] = useState(false);
  const { user, setUser, token } = useAuth();

  if (!problem) return <p>No problem data available.</p>;

  const handleSolved = async (problemId) => {
    if (!setUser) return;

    // Оптимистичное локальное обновление UI
    setUser((prev) => {
      if (!prev) return prev;
      const already = prev.problems?.some((p) => p.id === problemId);
      if (already) return prev;
      return {
        ...prev,
        problems: [...(prev.problems || []), { id: problemId }],
      };
    });

    // Попытаться получить актуальные данные пользователя с сервера и заменить контекст
    try {
      if (!user?.id || !token) return;
      const freshUser = await fetchUser(user.id, token);
      if (freshUser) {
        setUser(freshUser);
      }
    } catch (err) {
      console.error('Failed to refresh user after submit', err);
      // Оставляем оптимистичное изменение в UI, но логируем ошибку
    }
  };

  return (
    <div className="contest-page">
      <div className="top-section">
        <Problem contestData={problem} />
      </div>
      <div className="code-section">
        <Suspense fallback={<CodeEditorSkeleton />}>
          <CodeEditor
            contestData={problem}
            setResponse={setResponse}
            processing={processing}
            setProcessing={setProcessing}
            onSolved={handleSolved}
          />
        </Suspense>
        <OutputDetails
          contestData={problem}
          outputDetails={response}
          processing={processing}
        />
      </div>
      <Discussion />
    </div>
  );
};

export default Code;
