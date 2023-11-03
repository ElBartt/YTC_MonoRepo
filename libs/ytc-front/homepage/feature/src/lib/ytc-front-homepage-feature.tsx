import { Button, InputTextMultiLabel } from '@ytc/shared/ui-components';
import { getUser } from '@ytc/shared/users/data-access';
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
    getUser(import.meta.env.DEV && inputValue === '' ? import.meta.env.VITE_APP_API_KEY_MASTU : inputValue).subscribe(
      user => {
        if (user) {
          navigate('channels', {
            state: {
              user,
              apiKey: import.meta.env.DEV && inputValue === '' ? import.meta.env.VITE_APP_API_KEY_MASTU : inputValue,
            },
          });
        } else {
          console.log('No user found');
        }
      },
    );
  };

  return (
    <div className="md:w-1/6 flex flex-col justify-center self-center mx-auto">
      <h1 className="text-2xl font-bold">{t('app.welcomeMsg')}</h1>
      <InputTextMultiLabel
        topLeftLabel={t('homepage.labelInputApiKey')}
        placeholder={t('app.inputPlaceholder')}
        styleInput="input-primary"
        onInputChange={handleInputChange}
      />
      <Button buttonType="btn-primary" customStyle="w-fit" onClick={handleClick}>
        {t('app.login')}
      </Button>
    </div>
  );
}
