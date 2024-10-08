import { ability, getCurrentOrg } from '@/auth/auth'

export default async function Overview() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Overview</h1>
      </div>
    </div>
  )
}
