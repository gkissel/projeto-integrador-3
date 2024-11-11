import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

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
import { Text } from '@/components/catalyst/text'
import { getTransactionsByAccount } from '@/http/transaction/get-transactions-by-account'
import { priceFormatter } from '@/lib/formatter'

import { CreateTransactionForm } from '../../transfers/components/create-transaction-form'
import { TransactionInfoDropDown } from '../../transfers/components/transaction-info-button'
import { getAccountsAction } from '../action'
import { getAccountAction } from './actions'

const TransactionType = {
  INCOME: 'Entrada',
  OUTCOME: 'Saída',
} as const

type AccountPageProps = {
  params: Promise<{ id: string }>
}

export default async function AccountPage({ params }: AccountPageProps) {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    redirect('/')
  }

  const { id } = await params

  const [account, accounts, { transactions }] = await Promise.all([
    getAccountAction(id),
    getAccountsAction(currentOrg),
    getTransactionsByAccount(currentOrg, id),
  ])

  if (!account) {
    notFound()
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2.5'>
        <span>Informações da Conta</span>
      </div>

      <Divider />

      <div className='flex justify-between'>
        <div className='flex items-center gap-6'>
          <div>
            <h1 className='text-2xl font-bold'>{account.name}</h1>
            <Text>
              Valor atual da conta:{' '}
              {account.value < 0 ? (
                <span className='text-rose-400'>
                  {priceFormatter.format(account.value)}
                </span>
              ) : (
                <span className='text-lime-300'>
                  {priceFormatter.format(account.value)}
                </span>
              )}{' '}
            </Text>
          </div>

          <div className='relative flex h-[90px] w-[150px] flex-col items-center justify-center rounded-3xl border border-[#303032] bg-[#18181B] transition-colors duration-200 hover:bg-[#2b2b2b]'>
            <Image
              src={account.imageUrl ?? ''}
              alt={account.name}
              fill
              className='object-cover'
            />
          </div>
        </div>

        <div className='flex flex-col justify-between'>
          <Button>Editar Informações</Button>

          <CreateTransactionForm
            accounts={accounts}
            defaultAccount={account.id}
          />
        </div>
      </div>

      <Divider />

      <div className=''>
        <h2 className='text-lg font-bold'>Transferências</h2>

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
            {transactions.map(async (transaction) => {
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
