export const ErrorMessage = ({ message }: { message: string }) => {
    return message ? (
        <div className='w-full rounded-md bg-destructive-foreground p-2 text-center text-sm text-destructive'>
            {message}
        </div>
    ) : null
}
