'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from '@/locales/client'; // Import your translation hook
import Image from 'next/image';

export const LanguagePicker = () => {
  const currentLocale = useCurrentLocale();
  const tLanguagePicker = useScopedI18n('languagePicker');
  const changeLocale = useChangeLocale();

  const languages = [
    { code: 'en', label: tLanguagePicker('en'), flag: '/flags/en.svg' },
    { code: 'fr', label: tLanguagePicker('fr'), flag: '/flags/fr.svg' },
    { code: 'es', label: tLanguagePicker('es'), flag: '/flags/es.svg' },
  ];

  const handleLanguageChange = (code: 'fr' | 'en' | 'es') => {
    changeLocale(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-8 w-8 cursor-pointer'>
          <AvatarImage
            className='object-cover'
            src={
              languages.find((language) => language.code === currentLocale)
                ?.flag
            }
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() =>
              handleLanguageChange(language.code as 'fr' | 'en' | 'es')
            }
            className='cursor-pointer'
          >
            <div className='flex items-center'>
              <Image
                src={language.flag}
                alt={`${language.label} flag`}
                className='mr-2 h-4 w-4'
                width={16}
                height={16}
              />{' '}
              {/* Display the flag */}
              {tLanguagePicker(language.code as 'fr' | 'en' | 'es')}{' '}
              {/* Display language label */}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
