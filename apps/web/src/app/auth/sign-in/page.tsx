import dynamic from 'next/dynamic'

const SignInForm = dynamic(
  () => import('./sign-in-form').then((mod) => mod.SignInForm),
  {},
)

const FeatureCarousel = dynamic(() => import('../components/feature-carousel'))

export default function SignInPage() {
  return (
    <div className='grid min-h-screen antialiased lg:grid-cols-2'>
      <SignInForm />

      <div className='hidden h-full w-full px-10 lg:block'>
        <FeatureCarousel />
      </div>
    </div>
  )
}
