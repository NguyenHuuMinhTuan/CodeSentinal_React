export default function LoadingOverlay({ loading }) {

    if (!loading) return null;

    return (

        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">

            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-6 text-xl font-semibold">

                Scanning source code...

            </p>

        </div>

    );

}