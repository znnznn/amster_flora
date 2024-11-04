import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import flower from '@/assets/images/flower.jpg'

export const BlogPost = () => {
    return (
        <article className='group flex h-64 items-center justify-between gap-x-5 rounded-[22px] border p-6 transition-colors hover:border-accent'>
            <Image
                src={flower}
                alt='Півоній'
                className='h-full min-w-64 rounded-[22px] object-cover'
            />
            <div className='flex h-full flex-col justify-between gap-y-6'>
                <h1 className='text-[22px] font-medium'>
                    "Квіти: Різноманіття і Догляд за Красою Природи"
                </h1>
                <p className='text-lg'>
                    Ця стаття розповість про різноманітні види квітів, їх унікальні
                    характеристики та поради з догляду, щоб ваша садиба завжди була
                    сповнена яскравих кольорів і приємних ароматів.
                </p>
                <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                    Перейти
                    <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                </button>
            </div>
        </article>
    )
}
