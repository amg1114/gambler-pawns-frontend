export default function ShowMessage({
    message }: { message: string }) {
    return (
        <div className="flex bg-error bg-opacity-15 p-sm border-error border-2 justify-center items-center w-full h-full">
            <p className="text-center">{message}</p>
        </div>
    );
}