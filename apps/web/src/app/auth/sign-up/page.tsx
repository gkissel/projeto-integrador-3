import dynamic from 'next/dynamic'

const SignUpForm = dynamic(() => import('./sign-up-form'), {})

const FeatureCarousel = dynamic(() => import('../components/feature-carousel'))

export default function SignUpPage() {
  return (
    <div className='grid min-h-screen grid-cols-2 antialiased'>
      <div className='relative flex flex-col items-center justify-center'>
        <SignUpForm />
      </div>

      <div className='hidden h-full w-full items-center px-10 lg:flex'>
        <FeatureCarousel />
      </div>
    </div>
  )
}
