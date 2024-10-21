'use client'

import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'
import Imagem1 from 'public/Imagem-1.webp'
import Imagem2 from 'public/Imagem-2.webp'
import Imagem3 from 'public/Imagem-3.webp'
import Imagem4 from 'public/Imagem-4.webp'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NeonGradientCard } from '@/components/neon-gradient-card'

export default function FeatureCarousel() {
  return (
    <div className='h-full w-full py-32'>
      <NeonGradientCard className='mx-auto h-min w-min'>
        <Swiper
          className='mx-auto w-[27rem]'
          modules={[Pagination]}
          pagination={{
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          }}
          autoplay={{ delay: 5000 }}
          loop
          slidesPerView={1}
        >
          <SwiperSlide className='rounded-3xl p-4'>
            <Image src={Imagem1} alt='' className='h-full w-full rounded-3xl' />

            <span className='absolute bottom-12 px-4 text-center font-medium'>
              Criado para você controlar e monitorar seus gastos, para que
              consiga planejar seu futuro e alcançar suas metas.
            </span>
          </SwiperSlide>

          <SwiperSlide className='rounded-3xl p-4'>
            <Image src={Imagem2} alt='' className='h-full w-full rounded-3xl' />

            <span className='absolute bottom-12 px-4 text-center font-medium'>
              Ferramenta essencial para organizações gerenciarem despesas,
              traçarem planos financeiros e garantirem o sucesso nos objetivos
              empresariais.
            </span>
          </SwiperSlide>

          <SwiperSlide className='rounded-3xl p-4'>
            <Image src={Imagem3} alt='' className='h-full w-full rounded-3xl' />

            <span className='absolute bottom-12 px-4 text-center font-medium'>
              Monitoramento contínuo das metas financeiras por todos os membros
              da equipe, garantindo que todos estejam na mesma página.
            </span>
          </SwiperSlide>

          <SwiperSlide className='rounded-3xl p-4'>
            <Image src={Imagem4} alt='' className='h-full w-full rounded-3xl' />

            <span className='absolute bottom-12 left-0 right-0 px-4 text-center font-medium'>
              Criado para ser fácil, rápido e intuitivo.
            </span>
          </SwiperSlide>
        </Swiper>
      </NeonGradientCard>
      <div className='swiper-pagination' />
    </div>
  )
}
