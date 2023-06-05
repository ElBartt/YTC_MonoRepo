import { Button, InputTextMultiLabel } from '@org/shared/ui-components';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontHomepageFeature() {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="md:w-1/6 flex flex-col justify-center align self-center mx-auto">
      <h1 className="text-2xl font-bold">{t('app.welcomeMsg')}</h1>
      <InputTextMultiLabel
        topLeftLabel={t('homepage.labelInputApiKey')}
        placeholder={t('app.inputPlaceholder')}
        styleInput="input-primary "
      />
      <Button buttonType="btn-primary" customStyle="w-fit" onClick={() => navigate('videos')}>
        {t('app.login')}
      </Button>
    </div>
  );
}
