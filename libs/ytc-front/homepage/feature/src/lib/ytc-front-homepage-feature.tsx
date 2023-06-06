import { MOCK_API_KEY } from '@org/shared/mock-backend/utils';
import { Button, InputTextMultiLabel } from '@org/shared/ui-components';
import { getUser } from '@org/shared/users/data-access';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontHomepageFeature() {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleClick = (): void => {
    // TODO: Remove this its just for dev purpose
    getUser(inputValue || MOCK_API_KEY).subscribe(user => {
      if (user) {
        navigate('videos');
      } else {
        console.log('No user found');
      }
    });
  };

  return (
    <div className="md:w-1/6 flex flex-col justify-center align self-center mx-auto">
      <h1 className="text-2xl font-bold">{t('app.welcomeMsg')}</h1>
      <InputTextMultiLabel
        topLeftLabel={t('homepage.labelInputApiKey')}
        placeholder={t('app.inputPlaceholder')}
        styleInput="input-primary"
        onInputChange={handleInputChange}
        defaultValue={MOCK_API_KEY}
      />
      <Button buttonType="btn-primary" customStyle="w-fit" onClick={handleClick}>
        {t('app.login')}
      </Button>
    </div>
  );
}
