'use client'

import 'swiper/css/bundle'

// import 'swiper/css/pagination'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Strong, Text } from '@/components/catalyst/text'

const OverviewSlider: React.FC = () => {
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

          <Strong className='text-3xl'>R$12,500,00</Strong>

          <div className='flex items-center gap-2'>
            <div className='flex items-center rounded-3xl bg-[#272D1D] p-1 font-bold text-[#97BA39]'>
              <PlusIcon className='h-4 w-4' />
              <span>10%</span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Ganhos</Text>

          <Strong className='text-3xl'>R$500,00</Strong>

          <div className='flex items-center gap-2'>
            <div className='flex items-center rounded-3xl bg-[#400000] p-1 font-bold text-[#D60909]'>
              <MinusIcon className='h-4 w-4' />
              <span>2.1%</span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>{' '}
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Receita total</Text>

          <Strong className='text-3xl'>R$12,500,00</Strong>

          <div className='flex items-center gap-2'>
            <div className='flex items-center rounded-3xl bg-[#272D1D] p-1 font-bold text-[#97BA39]'>
              <PlusIcon className='h-4 w-4' />
              <span>10%</span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='!w-72'>
        <div className='flex w-72 flex-col gap-5 rounded-3xl border-2 border-zinc-500 p-4'>
          <Text>Ganhos</Text>

          <Strong className='text-3xl'>R$500,00</Strong>

          <div className='flex items-center gap-2'>
            <div className='flex items-center rounded-3xl bg-[#400000] p-1 font-bold text-[#D60909]'>
              <MinusIcon className='h-4 w-4' />
              <span>2.1%</span>
            </div>

            <Text>from last week</Text>
          </div>
        </div>
      </SwiperSlide>{' '}
    </Swiper>
  )
}

export default OverviewSlider
