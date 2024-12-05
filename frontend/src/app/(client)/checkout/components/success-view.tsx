import { format } from 'date-fns'
import Image from 'next/image'

import CheckoutSuccess from '@/assets/images/checkout-success.jpg'
import { Button } from '@/components/ui/button'

export const SuccessView = () => {
    return (
        <div className='mx-auto mt-6 flex max-w-3xl flex-col items-center gap-y-14'>
            <div className='flex flex-col items-center gap-y-8'>
                <Image
                    src={CheckoutSuccess}
                    alt='flower'
                    className='h-[180px] w-full rounded-3xl object-cover'
                />
                <h1 className='text-center text-2xl font-semibold max-md:text-lg'>
                    Дякуємо за ваше замовлення!
                </h1>
                <div className='flex w-full flex-col gap-y-2'>
                    <div className='flex items-center justify-between gap-x-6 text-lg'>
                        <span>Номер замовлення</span>
                        <span>12345</span>
                    </div>
                    <div className='flex items-center justify-between gap-x-6 text-lg'>
                        <span>Дата</span>
                        <span>{format(new Date(), 'dd.MM.yyyy')}</span>
                    </div>
                    <div className='flex items-center justify-between gap-x-6 text-lg'>
                        <span>Кількість товарів</span>
                        <span>5</span>
                    </div>
                    <div className='flex items-center justify-between gap-x-6 text-2xl font-medium'>
                        <span>Загальна сумма:</span>
                        <span>5444</span>
                    </div>
                </div>
                <Button
                    variant='secondary'
                    size='lg'>
                    Деталі замовлення
                </Button>
            </div>
            <div className='flex flex-col items-center gap-y-4 text-lg'>
                <h2 className='text-center font-medium'>Статус замовлення:</h2>
                <div className='space-y-4'>
                    <p>Замовлення в обробці.</p>
                    <p>
                        Ви отримаєте електронний лист із підтвердженням замовлення та
                        детальною інформацією найближчим часом. Ми повідомимо Вас про
                        будь-які зміни статусу Вашого замовлення.
                    </p>
                    <p>
                        Якщо у Вас виникли запитання або потрібна додаткова інформація,
                        будь ласка, зв'яжіться з нашою службою підтримки клієнтів. Ми
                        завжди раді допомогти!.
                    </p>
                    <p>З нетерпінням чекаємо на можливість обслужити Вас знову.</p>
                </div>
            </div>
        </div>
    )
}
