import Image from 'next/image'

import Preview from '../../../../public/preview.png'
import { SignUpForm } from './sign-up-form'

export default function SignUpPage() {
  return (
    <div className='grid min-h-screen grid-cols-2 antialiased'>
      <div className='relative flex flex-col items-center justify-center'>
        <SignUpForm />
      </div>

      <div className='h-full w-full py-32'>
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
