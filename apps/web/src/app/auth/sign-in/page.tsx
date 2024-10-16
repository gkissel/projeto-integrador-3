import Image from 'next/image'

import Preview from '../../../../public/preview.png'
import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return (
    <div className='grid min-h-screen lg:grid-cols-2 antialiased'>   
      <SignInForm />
     
      <div className='h-full w-full py-32 hidden lg:block'>
        <div className='relative h-full w-full rounded-3xl border'>
          <Image
            src={Preview}
            alt=''
            fill
            className='rounded-3xl border object-cover'
          />
        </div>
      </div>
    </div>
  )
}
