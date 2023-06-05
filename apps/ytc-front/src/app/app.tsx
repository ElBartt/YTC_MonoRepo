import { YtcFrontHomepageFeatureShell } from '@org/ytc-front/homepage/feature-shell';
import { useEffect, useState } from 'react';

export function App() {
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
            <span className="label-text">Toggle theme</span>
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

export default App;
