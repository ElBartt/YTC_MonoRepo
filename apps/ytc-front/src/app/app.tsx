import { YtcFrontHomepageFeatureShell } from '@org/ytc-front/homepage/feature-shell';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState('night');

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'emerald' : 'night');
  };

  useEffect(() => {
    document?.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="">
      <div className="mb-5 border-b border-primary flex w-100 justify-end">
        <div className="form-control w-40 py-2">
          <label className="cursor-pointer label">
            <span className="label-text">{t('app.toggleTheme')}</span>
            <input onClick={toggleTheme} type="checkbox" className="toggle" />
          </label>
        </div>
      </div>
      <div className="px-4">
        <YtcFrontHomepageFeatureShell></YtcFrontHomepageFeatureShell>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}
