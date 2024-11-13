import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export function Profile() {
  
  return (
     
    <div className="flex justify-center sm:pt-40 pt-20 ">
      <Card className='flex sm:flex-row sm:gap-5 flex-col '>
        <CardHeader className='self-center '>
          <CardTitle className='text-2xl'>
          <Avatar className='w-40 h-40'>
          <AvatarImage src='/gallery/p.jpg' width={500} height={500} />
          </Avatar>
          
          </CardTitle>
          <CardDescription className='self-center'>
           Usernameexemple
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:pt-10'>
            <div className='flex flex-row gap-2'>
              <Label htmlFor='email' className='self-center'>UserName:</Label>
              <Input
                id='username'
                placeholder='username'
                
                required
              />
             
            </div>
            <div className='grid gap-2'>
              <div className='flex flex-row gap-2'>
                <Label htmlFor='email' className='self-center'>Email:</Label>
                <Input
                id='username'
                placeholder='email@gmail.com'
                required
                disabled
              />
              </div>
            </div>
            <Button type='submit' className='w-full'>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
     </div>
  );
}
