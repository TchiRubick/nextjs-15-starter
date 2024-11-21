'use client';

import { I18nProviderClient } from '@/locales/client';

export const LangueProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
