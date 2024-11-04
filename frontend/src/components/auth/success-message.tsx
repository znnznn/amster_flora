export const SuccessMessage = ({ message }: { message: string }) => {
    return message ? (
        <div className='w-full rounded-md bg-green-500/15 p-2 text-center text-sm text-green-500'>
            {message}
        </div>
    ) : null
}
