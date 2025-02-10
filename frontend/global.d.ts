import en from './messages/en.json'
import uk from './messages/uk.json'

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type ValidateMessages<T, U> = {
    [P in keyof T]: P extends keyof U
        ? T[P] extends object
            ? U[P] extends object
                ? ValidateMessages<T[P], U[P]>
                : never
            : T[P] extends U[P]
              ? T[P]
              : never
        : never
}

type Messages = typeof uk

type ValidEnglishMessages = ValidateMessages<typeof en, Messages>

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`
type DotNestedKeys<T> = (
    T extends object
        ? {
              [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
          }[Exclude<keyof T, symbol>]
        : ''
) extends infer D
    ? Extract<D, string>
    : never

declare global {
    interface IntlMessages extends Messages {}
}

export type { DotNestedKeys, Messages }
