import { Button } from "@org/shared/ui-components";
import { useEffect, useState } from "react";

export function YtcFrontHomepageFeature() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'emerald' : 'night');
  };

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
    <Button buttonType="btn-primary">Click</Button>
    </>
  );
}

export default YtcFrontHomepageFeature;
