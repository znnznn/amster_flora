import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

import { Logo } from './logo'

export const Footer = () => {
    return (
        <footer className='mt-28 grid grid-cols-4 gap-8 bg-primary px-20 pb-5 pt-10 text-accent max-lg:grid-cols-3 max-md:grid-cols-2 max-md:px-10 max-sm:grid-cols-1'>
            <div>
                <Logo />
                <ul className='mt-7 flex flex-col gap-y-4 text-accent'>
                    <li>
                        <Link
                            className='underline underline-offset-4 transition-colors hover:text-background'
                            href='/'>
                            Умови використання
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='underline underline-offset-4 transition-colors hover:text-background'
                            href='/'>
                            Політика конфіденційності
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='underline underline-offset-4 transition-colors hover:text-background'
                            href='/'>
                            Договір оферти
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='underline underline-offset-4 transition-colors hover:text-background'
                            href='/'>
                            Дизайн сайту: Anastasia
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className='flex flex-col gap-y-4 text-accent'>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/story'>
                        Про нас
                    </Link>
                </li>
                <li>
                    <Link
                        scroll
                        className='transition-colors hover:text-background'
                        href='#contacts'>
                        Контакти
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/'>
                        Магазини
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/blog'>
                        Блог
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/payment-and-delivery'>
                        Доставка і оплата
                    </Link>
                </li>
            </ul>
            <ul className='flex flex-col gap-y-4 text-accent'>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/promo'>
                        Акції
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/catalogue'>
                        Букети
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/'>
                        Вазони
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='/blog'>
                        Суміжні товари
                    </Link>
                </li>
            </ul>
            <ul className='flex flex-col gap-y-4 text-accent'>
                <li className='flex items-center gap-x-8'>
                    <Link
                        className='transition-colors hover:text-background'
                        href='tel:+3800687778893'>
                        <Facebook className='size-7' />
                    </Link>
                    <Link
                        className='transition-colors hover:text-background'
                        href='tel:+3800687778893'>
                        <Instagram className='size-7' />
                    </Link>
                </li>
                <li>
                    <Link
                        className='transition-colors hover:text-background'
                        href='tel:+3800687778893'>
                        +380 068 777 88 93
                    </Link>
                </li>
                <li>з 8:00 до 21:00 без вихідних</li>
                <li>Рівне, вул. Василя Червонія 18б</li>
                <li className='flex items-center gap-x-8'>
                    <svg
                        className='text-accent'
                        fill='currentColor'
                        width='60px'
                        height='60px'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z' />
                    </svg>
                    <svg
                        className='text-accent'
                        fill='currentColor'
                        width='44'
                        height='29'
                        viewBox='0 0 44 29'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M2.04736 0.580122C0.917004 0.580122 0 1.49664 0 2.62749V26.1648C0 27.2954 0.917136 28.2121 2.04736 28.2121H41.9527C43.083 28.2121 44 27.2956 44 26.1648V2.62744C44 1.49677 43.0829 0.580078 41.9527 0.580078H2.04732L2.04736 0.580122ZM14.4279 3.90626C16.9394 3.90626 19.2461 4.78005 21.0567 6.23962C19.5334 7.6027 18.3971 9.39354 17.8365 11.4234H18.7151C19.2326 9.74884 20.1725 8.25795 21.4115 7.07562C22.6505 8.25795 23.5904 9.74884 24.1079 11.4234H25.0003C24.4319 9.40423 23.294 7.62408 21.7718 6.26989C23.5859 4.7918 25.9016 3.90621 28.424 3.90621C34.2448 3.90621 38.9634 8.6253 38.9634 14.447C38.9634 20.2687 34.2448 24.9878 28.424 24.9878C25.8597 24.9878 23.5083 24.0725 21.681 22.5499C23.3156 21.1278 24.5207 19.2214 25.0718 17.0526H24.2123C23.723 18.8729 22.7381 20.4919 21.4115 21.7579C20.0849 20.4919 19.1013 18.8729 18.612 17.0526H17.7938C18.3481 19.19 19.5375 21.0697 21.1475 22.4784C19.3235 23.9821 16.9814 24.886 14.4278 24.886C8.60706 24.886 3.8885 20.1896 3.8885 14.3961C3.8885 8.60264 8.60706 3.90626 14.4279 3.90626ZM27.6334 11.3161C26.367 11.3161 25.135 12.4233 25.135 14.502C25.135 15.8804 25.8005 16.79 27.1095 16.79C27.4796 16.7901 28.0693 16.6388 28.0693 16.6388L28.2645 15.4343C28.2645 15.4343 27.7264 15.7065 27.357 15.7065C26.5789 15.7065 26.2666 15.108 26.2666 14.4649C26.2666 13.1602 26.9361 12.4422 27.6815 12.4422C28.2404 12.4422 28.6894 12.7585 28.6894 12.7585L28.8681 11.587C28.8681 11.587 28.2036 11.3161 27.6334 11.3161ZM38.28 11.4179L37.1786 11.4206L36.9421 12.8699C36.9421 12.8699 36.5281 12.3075 35.8806 12.3075C34.8739 12.3075 34.0354 13.5034 34.0354 14.8788C34.0354 15.7665 34.4817 16.6374 35.3966 16.6374C36.0548 16.6374 36.4196 16.185 36.4196 16.185L36.3715 16.5714H37.4413L38.28 11.4179ZM6.73473 11.433L5.8575 16.5989H6.91486L7.58314 12.7035L7.68214 16.5989H8.43836L9.84914 12.7035L9.2235 16.5989H10.3469L11.2131 11.433H9.47514L8.393 14.6024L8.33664 11.433H6.73477L6.73473 11.433ZM17.7815 11.7685C17.7576 11.7925 17.1421 15.3416 17.1421 15.7739C17.1421 16.4139 17.5009 16.6997 18.0056 16.6951C18.3673 16.692 18.6474 16.6012 18.777 16.5631C18.7906 16.5595 18.8169 16.5521 18.8169 16.5521L18.953 15.6281C18.879 15.6281 18.77 15.6598 18.6739 15.6598C18.297 15.6598 18.2552 15.4593 18.2792 15.3105L18.5831 13.4254H19.1565L19.2954 12.4037H18.755L18.865 11.7685H17.7815ZM30.5621 12.2883C29.8241 12.2883 29.2586 12.5316 29.2586 12.5316L29.1019 13.4804C29.1019 13.4804 29.5689 13.2865 30.2748 13.2865C30.6755 13.2865 30.9691 13.3323 30.9691 13.666C30.9691 13.8687 30.9334 13.9438 30.9334 13.9438C30.9334 13.9438 30.6165 13.9163 30.47 13.9163C29.5393 13.9163 28.5615 14.3241 28.5615 15.5511C28.5615 16.5179 29.2034 16.7391 29.601 16.7391C30.3604 16.7391 30.6878 16.2347 30.7051 16.2331L30.6694 16.6539H31.6168L32.0403 13.6179C32.0404 12.3297 30.9432 12.2882 30.5621 12.2882V12.2883ZM12.7902 12.2938C12.0495 12.2938 11.4812 12.5371 11.4812 12.5371L11.3245 13.4859C11.3245 13.4859 11.7931 13.292 12.5015 13.292C12.9037 13.292 13.1986 13.338 13.1986 13.6715C13.1986 13.8741 13.1629 13.9493 13.1629 13.9493C13.1629 13.9493 12.8451 13.9218 12.6981 13.9218C11.7639 13.9218 10.7828 14.329 10.7828 15.5553C10.7828 16.5215 11.426 16.7433 11.825 16.7433C12.5871 16.7433 12.9158 16.2388 12.9333 16.2373L12.8975 16.658H13.849L14.2739 13.6234C14.2739 12.3359 13.1727 12.2937 12.7902 12.2937V12.2938ZM16.1507 12.2938C15.3553 12.2938 14.5475 12.6148 14.5475 13.7114C14.5475 14.9539 15.8936 14.8283 15.8936 15.3517C15.8936 15.7011 15.518 15.7299 15.2281 15.7299C14.7265 15.7299 14.2755 15.5566 14.2739 15.5649L14.1295 16.5136C14.1555 16.5217 14.4348 16.647 15.3368 16.647C15.5789 16.647 16.9634 16.7085 16.9634 15.2665C16.9634 13.9184 15.6819 14.1856 15.6819 13.644C15.6819 13.3744 15.8899 13.2893 16.2717 13.2893C16.4234 13.2893 17.0074 13.3374 17.0074 13.3374L17.1421 12.379C17.1421 12.3791 16.7652 12.2938 16.1507 12.2938ZM21.1227 12.2938C20.0174 12.294 19.1991 13.4825 19.1991 14.8251C19.1991 16.3748 20.2244 16.7433 21.098 16.7433C21.9043 16.7433 22.2599 16.5631 22.2599 16.5631L22.4524 15.5058C22.4524 15.5058 21.839 15.7753 21.285 15.7753C20.1047 15.7753 20.3115 14.8966 20.3115 14.8966H22.5459C22.5459 14.8966 22.6903 14.1866 22.6903 13.897C22.6903 13.1745 22.3296 12.2938 21.1227 12.2938ZM25.1254 12.3391C24.6275 12.3391 24.2577 13.0088 24.2577 13.0088L24.3567 12.3941H23.3227L22.6284 16.6374H23.771C24.0946 14.8254 24.1537 13.3541 24.926 13.6234C25.0612 12.922 25.1923 12.6511 25.3399 12.3543C25.3399 12.3543 25.2706 12.3391 25.1254 12.3391ZM34.3832 12.3391C33.8853 12.3391 33.5156 13.0088 33.5156 13.0088L33.6146 12.3941H32.5806L31.8862 16.6374H33.0275C33.3513 14.8254 33.4118 13.3541 34.1839 13.6234C34.3193 12.922 34.4503 12.6511 34.5978 12.3543C34.5978 12.3543 34.5284 12.3391 34.3832 12.3391ZM21.1172 13.2508C21.745 13.2508 21.6301 13.9593 21.6301 14.0166H20.394C20.394 13.9435 20.5109 13.2508 21.1172 13.2508ZM36.0539 13.3333C36.4534 13.3331 36.6589 13.603 36.6589 14.238C36.6589 14.8141 36.3683 15.5841 35.7665 15.5841C35.3671 15.5841 35.1794 15.2543 35.1794 14.7371C35.1794 13.8915 35.5663 13.3333 36.0539 13.3333ZM30.5635 14.777C30.7265 14.7772 30.7602 14.793 30.7876 14.8004C30.7837 14.7997 30.7829 14.8005 30.7986 14.8031C30.8193 14.9921 30.6845 15.8784 30.0327 15.8784C29.6967 15.8784 29.6106 15.6112 29.6106 15.4535C29.6106 15.146 29.7707 14.777 30.5635 14.777ZM12.7916 14.7811C12.9767 14.7813 12.9969 14.802 13.0281 14.8073C13.0488 14.9962 12.9135 15.8811 12.2595 15.8811C11.9222 15.8811 11.8346 15.6152 11.8346 15.4576C11.8346 15.1503 11.9957 14.7811 12.7916 14.7811Z'
                            fill='#EFBBC5'
                        />
                    </svg>
                </li>
            </ul>
        </footer>
    )
}
