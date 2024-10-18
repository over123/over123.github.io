interface HeaderProps {
  onLogout: () => void;
  adminName: string;
}

export default function Header({ onLogout, adminName }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">管理平台</h1>
            </div>
            <div className="flex items-center">
            <span className="mr-4 text-gray-600">欢迎, {adminName}</span>
            <button
                onClick={onLogout}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                登出
            </button>
            </div>
        </div>
    </header>


  );
}