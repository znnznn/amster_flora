import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import flower from '@/assets/images/flower.jpg'

export const BlogPost = () => {
    return (
        <article className='group flex h-72 items-start justify-between gap-x-5 rounded-3xl border p-5 transition-colors hover:border-accent max-lg:h-fit max-md:p-4'>
            <div className='size-64 shrink-0 overflow-hidden rounded-3xl max-lg:hidden'>
                <Image
                    src={flower}
                    alt='Півоній'
                    className='size-full object-cover'
                />
            </div>
            <div className='flex min-h-full flex-col justify-between gap-y-5 max-lg:hidden'>
                <h1 className='text-2xl font-medium'>
                    "Квіти: Різноманіття і Догляд за Красою Природи"
                </h1>
                <p className='text-lg'>
                    Ця стаття розповість про різноманітні види квітів, їх унікальні
                    характеристики та поради з догляду, щоб ваша садиба завжди була
                    сповнена яскравих кольорів і приємних ароматів.
                </p>
                <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                    <span className='underline'>читати статтю</span>
                    <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                </button>
            </div>

            <div className='hidden min-h-full flex-col justify-between gap-y-5 max-lg:flex'>
                <div className='flex items-start gap-x-5'>
                    <div className='hidden size-40 shrink-0 overflow-hidden rounded-3xl max-lg:block max-sm:size-32'>
                        <Image
                            src={flower}
                            alt='Півоній'
                            className='size-full object-cover'
                        />
                    </div>
                    <h1 className='max-w-96 text-2xl font-medium max-md:text-lg'>
                        "Квіти: Різноманіття і Догляд за Красою Природи"
                    </h1>
                </div>

                <p className='text-lg max-md:text-sm'>
                    Ця стаття розповість про різноманітні види квітів, їх унікальні
                    характеристики та поради з догляду, щоб ваша садиба завжди була
                    сповнена яскравих кольорів і приємних ароматів.
                </p>
                <button className='ml-auto flex items-center justify-end transition-colors group-hover:text-accent'>
                    <span className='underline'>читати статтю</span>
                    <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
                </button>
            </div>
        </article>
    )
}
