'use client';

import { greeting, testRedirect } from '@/actions/greeting';
import { uploadImage } from '@/actions/upload';
import { useMutationAction, useQueryAction } from '@/packages/fetch-action';
import { useQueryState } from 'nuqs';
import { ChangeEvent } from 'react';

export const Greeting = () => {
  const [name, setName] = useQueryState('name', { defaultValue: '' });

  const { data, isError, error } = useQueryAction(greeting, name);

  const { mutateAsync } = useMutationAction(uploadImage);

  const { mutate } = useMutationAction(testRedirect);

  const handleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      mutateAsync(e.target.files);
    }
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='flex flex-col items-center justify-center'>
      <input
        className='border-2 border-black bg-slate-600'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type='file' onChange={handleUploadChange} />
      <div className='text-center'>Hello {data?.type}</div>
      <button
        onClick={() => {
          console.log('clicked');
          mutate('key', 'ke');
        }}
      >
        Test redirect
      </button>
    </div>
  );
};
