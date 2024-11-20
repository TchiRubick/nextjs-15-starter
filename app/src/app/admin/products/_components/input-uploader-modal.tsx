'use client';

import { uploadProductImageAdminMutation } from '@/actions/product.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSize } from '@/lib/file';
import { useMutationAction } from '@packages/fetch-action/index';
import { Loader2, Plus } from 'lucide-react';
import Image from 'next/image';
import { ChangeEventHandler, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from '../static';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const ImageUploaderModal = ({ id }: { id: number }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutationAction(
    uploadProductImageAdminMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
        setDialogOpen(false);
      },
      onError: () => {
        console.log('error');
        setDialogOpen(true);
      },
    }
  );

  const handleImageSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) {
      return;
    }
    const newFiles = Array.from(e.target.files);

    setFiles(newFiles);
  };

  const totalSize = useMemo(() => {
    const sizes = files.reduce((acc, cur) => acc + cur.size, 0);

    return getSize(sizes);
  }, [files]);

  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(id, files);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          className='border-2 border-dashed border-slate-900/55'
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center justify-center'>
        <form
          className='grid w-full items-center gap-1.5'
          onSubmit={handleSubmit}
        >
          <DialogTitle>
            <Label htmlFor='picture' className='text-lg font-semibold'>
              Ajouter des images
            </Label>
          </DialogTitle>
          <Input
            id='picture'
            type='file'
            accept='image/jpeg,image/png,image/webp'
            multiple
            max={2}
            onChange={handleImageSelected}
          />
          <p>Total files size: {`${totalSize.value}${totalSize.suffix}`}</p>
          <i>Max Total file size: 5MB</i>
          <div className='grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {previews.map((preview, index) => (
              <div
                key={index}
                className='grid grid-cols-3 items-center justify-center gap-2'
              >
                <Card className='h-20 w-20 rounded-sm'>
                  <Image
                    src={preview}
                    alt={`Preview ${index}`}
                    width={400}
                    height={400}
                    objectFit='cover'
                    className='h-full w-full rounded-sm object-cover'
                  />
                </Card>
              </div>
            ))}
          </div>

          <Button
            disabled={
              (totalSize.value >= 5 && totalSize.suffix === 'mb') || isPending
            }
          >
            {isPending ? <Loader2 className='animated-spin' /> : 'Enregistrer'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
