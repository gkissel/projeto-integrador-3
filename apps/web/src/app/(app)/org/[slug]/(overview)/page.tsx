import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import Button from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/catalyst/table'
import { Strong } from '@/components/catalyst/text'

const OverviewSlider = dynamic(() => import('./components/overview-slider'))

export default async function Overview() {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    redirect('/')
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Visão geral</h1>
      </div>

      <div>
        <OverviewSlider />
      </div>

      <div className='space-y-4'>
        <Strong className='text-2xl'>Recent Orders</Strong>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader className='w-40'>Data</TableHeader>
              <TableHeader className='w-52'>Destino</TableHeader>
              <TableHeader className='w-52'>Valor</TableHeader>
              <TableHeader className='w-52'>Conta</TableHeader>
              <TableHeader className='w-52 text-right' />
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>01/01/2022</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell>R$ 1.000,00</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell className='text-right'>
                <Button className='text-2xl'>
                  <EllipsisVerticalIcon />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01/01/2022</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell>R$ 1.000,00</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell className='text-right'>
                <Button className='text-2xl'>
                  <EllipsisVerticalIcon />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01/01/2022</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell>R$ 1.000,00</TableCell>
              <TableCell>Cartão de Credito</TableCell>
              <TableCell className='text-right'>
                <Button className='text-2xl'>
                  <EllipsisVerticalIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
