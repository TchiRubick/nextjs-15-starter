'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSize } from "@/lib/file";
import Image from "next/image";
import { ChangeEventHandler, useMemo, useState } from "react";

export const ImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleImageSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) {
      return;
    }
    const newFiles = Array.from(e.target.files);

    setFiles(newFiles);
  }

  const totalSize = useMemo(() => {
    const sizes = files.reduce((acc, cur) => acc + cur.size, 0);

    return getSize(sizes);
  }, [files]);

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  return (
    <form className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" accept="image/jpeg,image/png,image/webp" multiple max={2} onChange={handleImageSelected} />
      <p>Total files size: {`${totalSize.value}${totalSize.suffix}`}</p>
      <i>Max Total file size: 5MB</i>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5'>
        {previews.map((preview, index) => (
          <Card key={preview} className="rounded-sm">
            <Image src={preview} alt={`Preview ${index}`} width={400} height={400} objectFit="cover" className='h-[400px] w-[400px] object-cover rounded-sm' />
          </Card>
        ))}
      </div>
      <Button disabled={totalSize.value >= 5 && totalSize.suffix === 'mb'}>Submit</Button>
    </form>
  )
}
