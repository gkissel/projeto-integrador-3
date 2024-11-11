'use client'

import 'swiper/css/bundle'

// import 'swiper/css/pagination'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Strong, Text } from '@/components/catalyst/text'
import { priceFormatter } from '@/lib/formatter'

interface Transaction {
  id: string
  description: string
  value: number
  type: 'INCOME' | 'OUTCOME'
  orgId: string
  accountId: string
  createdAt: string
  updatedAt: string
}

type OverviewSliderProps = {
  transactions: Transaction[]
}

const OverviewSlider: React.FC<OverviewSliderProps> = ({ transactions }) => {
  const thisWeekTransactions = transactions.filter(
    (t) =>
      new Date(t.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  )

  const totalIncome = thisWeekTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.value, 0)

  const totalOutcome = thisWeekTransactions
    .filter((t) => t.type === 'OUTCOME')
    .reduce((acc, t) => acc + t.value, 0)

  const biggestValue = Math.max(
    ...thisWeekTransactions.map((t) =>
      t.type === 'OUTCOME' ? -t.value : t.value,
    ),
  )

  const lastWeekTransactions = transactions.filter(
    (t) =>
      new Date(t.createdAt) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  )

  const lastWeekIncome = lastWeekTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.value, 0)

  const lastWeekOutcome = lastWeekTransactions
    .filter((t) => t.type === 'OUTCOME')
    .reduce((acc, t) => acc + t.value, 0)

  const incomePercentage = lastWeekIncome
    ? ((totalIncome - lastWeekIncome) / lastWeekIncome) * 100
    : ((totalIncome - 0) / 1) * 100

  const outcomePercentage = lastWeekOutcome
    ? ((totalOutcome - lastWeekOutcome) / lastWeekOutcome) * 100
    : ((totalOutcome - 0) / 1) * 100

  const totalPercentage =
    lastWeekIncome - lastWeekOutcome
      ? ((totalIncome - totalOutcome - (lastWeekIncome - lastWeekOutcome)) /
          (lastWeekIncome - lastWeekOutcome)) *
        100
      : ((totalIncome - totalOutcome - 0) / 1) * 100

  const biggestTransactionPercentage = biggestValue
    ? ((biggestValue - Math.max(...transactions.map((t) => t.value))) /
        Math.max(...transactions.map((t) => t.value))) *
      100
    : ((biggestValue - 0) / 1) * 100

  const format = priceFormatter.format

  return (
    <Swiper
      slidesPerView='auto'
      className='w-full'
      spaceBetween={24}
      loop
      breakpoints={{
        768: {
          loop: false,
        },
      }}
      //   centeredSlides
    >
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Receita total</Text>

          <Strong className='text-3xl'>
            {format(totalIncome - totalOutcome)}
          </Strong>

          <div className='flex items-center gap-2'>
            <div
              className={`flex items-center rounded-3xl ${totalPercentage > 0 ? 'bg-lime-950' : 'bg-rose-950'} p-1 font-bold`}
            >
              {totalPercentage > 0 ? (
                <PlusIcon
                  className={`h-4 w-4 ${
                    totalPercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              ) : (
                <MinusIcon
                  className={`h-4 w-4 ${
                    totalPercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              )}
              <span
                className={`${
                  totalPercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                }`}
              >
                {totalPercentage} %
              </span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Ganhos</Text>

          <Strong className='text-3xl'>{format(totalIncome)}</Strong>

          <div className='flex items-center gap-2'>
            <div
              className={`flex items-center rounded-3xl ${incomePercentage > 0 ? 'bg-lime-950' : 'bg-rose-950'} p-1 font-bold`}
            >
              {incomePercentage > 0 ? (
                <PlusIcon
                  className={`h-4 w-4 ${
                    incomePercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              ) : (
                <MinusIcon
                  className={`h-4 w-4 ${
                    incomePercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              )}

              <span
                className={`${
                  incomePercentage > 0 ? 'text-lime-500' : 'text-rose-500'
                }`}
              >
                {incomePercentage} %
              </span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>{' '}
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Saídas</Text>

          <Strong className='text-3xl'>{format(totalOutcome)}</Strong>

          <div className='flex items-center gap-2'>
            <div
              className={`flex items-center rounded-3xl ${outcomePercentage < 0 ? 'bg-lime-950' : 'bg-rose-950'} p-1 font-bold`}
            >
              {outcomePercentage < 0 ? (
                <PlusIcon
                  className={`h-4 w-4 ${
                    outcomePercentage < 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              ) : (
                <MinusIcon
                  className={`h-4 w-4 ${
                    outcomePercentage < 0 ? 'text-lime-500' : 'text-rose-500'
                  }`}
                />
              )}

              <span
                className={`${
                  outcomePercentage < 0 ? 'text-lime-500' : 'text-rose-500'
                }`}
              >
                {outcomePercentage} %
              </span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Maior Transação</Text>

          <Strong className='text-3xl'>{format(biggestValue)}</Strong>

          <div className='flex items-center gap-2'>
            <div
              className={`flex items-center rounded-3xl ${biggestTransactionPercentage > 0 ? 'bg-lime-950' : 'bg-rose-950'} p-1 font-bold`}
            >
              {biggestTransactionPercentage > 0 ? (
                <PlusIcon
                  className={`h-4 w-4 ${
                    biggestTransactionPercentage > 0
                      ? 'text-lime-500'
                      : 'text-rose-500'
                  }`}
                />
              ) : (
                <MinusIcon
                  className={`h-4 w-4 ${
                    biggestTransactionPercentage > 0
                      ? 'text-lime-500'
                      : 'text-rose-500'
                  }`}
                />
              )}

              <span
                className={`${
                  biggestTransactionPercentage > 0
                    ? 'text-lime-500'
                    : 'text-rose-500'
                }`}
              >
                {biggestTransactionPercentage} %
              </span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>{' '}
    </Swiper>
  )
}

export default OverviewSlider
