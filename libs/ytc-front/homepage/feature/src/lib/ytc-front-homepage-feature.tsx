import { Button } from '@org/shared/ui-components';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontHomepageFeature() {
  const [theme, setTheme] = useState('night');

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'emerald' : 'night');
  };

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    document?.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <h1>Welcome to YtcFrontHomepageFeatureShell!</h1>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">Toggle theme</span>
          <input onClick={toggleTheme} type="checkbox" className="toggle" />
        </label>
      </div>
      <Button buttonType="btn-accent" onClick={() => navigate('videos')}>
        Login
      </Button>
    </>
  );
}
