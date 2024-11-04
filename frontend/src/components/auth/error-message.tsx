export const ErrorMessage = ({ message }: { message: string }) => {
    return message ? (
        <div className='w-full rounded-md bg-destructive/15 p-2 text-center text-sm text-destructive'>
            {message}
        </div>
    ) : null
}
