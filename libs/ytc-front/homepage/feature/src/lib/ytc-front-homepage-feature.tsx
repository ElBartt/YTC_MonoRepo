import { Button } from '@org/shared/ui-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontHomepageFeature() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <h1>Welcome to YtcFrontHomepageFeatureShell!</h1>
      <Button buttonType="btn-accent" onClick={() => navigate('videos')}>
        Login
      </Button>
    </>
  );
}
