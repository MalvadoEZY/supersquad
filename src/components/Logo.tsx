export default function Logo() {
    return (
        <div className="relative flex items-center gap-3">
            <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <div className="relative w-4 h-4">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
            </div>
            <span className="text-2xl font-bold font-inter">supersquad</span>
        </div>
    )
}