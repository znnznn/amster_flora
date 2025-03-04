import { getTranslations } from 'next-intl/server'

import { SelftPickupSection } from './components/selft-pickup-section'
import { PageHeader } from '@/components/page-header'
import { Section } from '@/components/ui/section'
import { H2 } from '@/components/ui/typography'
import type { LocaleParams } from '@/types/params'

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params

    const t = await getTranslations({
        locale,
        namespace: 'Metadata.Delivery'
    })

    return {
        title: t('title')
    }
}

const DeliveryPage = () => {
    return (
        <>
            <Section className='lg:mt-16'>
                <PageHeader
                    breadcrumbKeys={[{ key: 'delivery' }]}
                    titleKey='DeliveryPage.title'
                />
                <SelftPickupSection />
            </Section>
            <Section className='lg:mt-16'>
                <H2>Кур’єр</H2>
                <ul className='mt-10 flex items-center justify-center gap-x-10 max-md:flex-col max-md:gap-y-6 lg:gap-x-20'>
                    <li className='flex w-80 flex-col items-center justify-center gap-y-6 rounded-3xl border p-6 md:w-72'>
                        <div className='font-medium'>До 20:00</div>
                        <h3>У день замовлення</h3>
                        <div className='font-medium'>150 ₴</div>
                        <p>
                            Доставка замовлень, прийнятих до 20:00, за погодженням
                            проводиться в день замовлення
                        </p>
                    </li>
                    <li className='flex w-80 flex-col items-center justify-center gap-y-6 rounded-3xl border p-6 md:w-72'>
                        <div className='font-medium'>До 20:00</div>
                        <h3>У день замовлення</h3>
                        <div className='font-medium'>150 ₴</div>
                        <p>
                            Доставка замовлень, прийнятих до 20:00, за погодженням
                            проводиться в день замовлення
                        </p>
                    </li>
                    <li className='flex w-80 flex-col items-center justify-center gap-y-6 rounded-3xl border p-6 md:w-72'>
                        <div className='font-medium'>До 20:00</div>
                        <h3>У день замовлення</h3>
                        <div className='font-medium'>150 ₴</div>
                        <p>
                            Доставка замовлень, прийнятих до 20:00, за погодженням
                            проводиться в день замовлення
                        </p>
                    </li>
                </ul>
                <div className='mt-10 space-y-4'>
                    <p>
                        Шановні клієнти, під час здійснення замовлення з кур'єрською
                        доставкою необхідно врахувати, що мінімальний час на виконання
                        замовлення складає 2 години. Доставка замовлень здійснюється
                        щоденно. У дні підвищеного завантаження (Новий рік, День
                        Закоханих, 8 березня, День матері, інші державні свята) умови
                        доставки можуть змінюватися.
                    </p>
                    <p>
                        Враховуючи наявність в асортименті Товарів, доставка яких
                        здійснюється протягом 3-7 календарних днів, з метою встановлення
                        точної дати доставки Товару, просимо уточнювати відповідну
                        інформацію у оператора контакт-центру.
                    </p>
                    <p>
                        Доставка виконується за адресою, вказаною в замовленні. У разі
                        якщо одержувача немає на місці, букет буде залишений родичам,
                        знайомим, консьєржу, колегам або іншим третім особам. В такому
                        разі кошти за невручення букета одержувачу Замовнику не
                        повертаються. Замовник несе повну відповідальність за інформацію,
                        надану Виконавцю в замовлені.
                    </p>
                </div>
            </Section>
            <Section className='lg:mt-16'>
                <H2>Нова пошта</H2>
                <div className='mt-10 max-w-3xl space-y-4'>
                    <p>Доставка по місту Київ працює щодня цілодобово!  .</p>
                    <p>
                        Доставка Новою поштою по всій Україні: У відділення «Нової пошти»
                        або кур'єром за вашою адресою
                    </p>
                    <p>
                        Умови доставки: <br />
                        Доставка сервісом Нова Пошта можлива лише при передоплаті Вартість
                        доставки сплачується згідно тарифів та умов кур'єрської службы
                        «Нова пошта». Сроки та графік доставки замовлення залежать від
                        адреси отримувача, а також умов сервісу «Нова пошта».
                    </p>
                    <p>Якщо є питання, Ви можете зв'язатися з нашим менеджером</p>
                </div>
            </Section>
        </>
    )
}

export default DeliveryPage
