import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
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
import { getTransactionsByOrganization } from '@/http/transaction/get-transactions-by-organizations'
import { priceFormatter } from '@/lib/formatter'

import { getAccountAction } from '../accounts/[id]/actions'
import { TransactionInfoDropDown } from '../transfers/components/transaction-info-button'

const OverviewSlider = dynamic(() => import('./components/overview-slider'))

const TransactionType = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
} as const

export default async function Overview() {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    redirect('/')
  }

  const { transactions } = await getTransactionsByOrganization(currentOrg)

  const recentTransactions = transactions.slice(0, 10)

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Visão geral da semana </h1>
      </div>

      <div>
        <OverviewSlider transactions={transactions} />
      </div>

      <div className='space-y-4'>
        <Strong className='text-2xl'>Transações Recentes</Strong>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader className='w-24'>Data</TableHeader>
              <TableHeader className='w-96'>Descrição</TableHeader>
              <TableHeader className='w-16'>Tipo</TableHeader>
              <TableHeader className='w-24'>Valor</TableHeader>

              <TableHeader className='w-16'>Conta</TableHeader>

              <TableHeader className='w-4 text-right'>Ações</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentTransactions.map(async (transaction) => {
              const account = await getAccountAction(transaction.accountId)

              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{TransactionType[transaction.type]}</TableCell>
                  <TableCell>
                    {transaction.type === 'OUTCOME' ? (
                      <span className='text-rose-400'>
                        {priceFormatter.format(transaction.value)}
                      </span>
                    ) : (
                      <span className='text-lime-300'>
                        {priceFormatter.format(transaction.value)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <div
                        className='h-4 w-4 rounded-full'
                        style={{
                          backgroundColor: account?.mainColor,
                        }}
                      />{' '}
                      {account?.name}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <TransactionInfoDropDown transaction={transaction} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
