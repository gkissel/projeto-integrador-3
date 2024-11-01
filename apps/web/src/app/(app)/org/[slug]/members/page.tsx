import { MemberList } from './member-list'

export default async function MembersPage() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Members</h1>

      <div className='space-y-4'>
        {/* <Invites /> */}
        <MemberList />
      </div>
    </div>
  )
}
