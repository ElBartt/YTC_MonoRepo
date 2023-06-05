import { Button, InputTextMultiLabel } from '@org/shared/ui-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontHomepageFeature() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="md:w-1/6 flex flex-col justify-center align self-center mx-auto">
      <h1 className="text-2xl font-bold">Welcome to YTC</h1>
      <InputTextMultiLabel
        topLeftLabel="Enter your api key here"
        placeholder="Type here..."
        styleInput="input-primary "
      />
      <Button buttonType="btn-primary" customStyle="w-1/4" onClick={() => navigate('videos')}>
        Login
      </Button>
    </div>
  );
}
