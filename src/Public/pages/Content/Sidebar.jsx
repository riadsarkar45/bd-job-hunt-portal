
const Sidebar = () => {
    return (
        <div className="flex mt-10">
            <div className="w-64 h-screen bg-gray-200 overflow-y-auto">
                {/* Sidebar content here */}
                <ul className="p-4">
                    <li><a className="block py-2">Sidebar Item 1</a></li>
                    <li><a className="block py-2">Sidebar Item 2</a></li>
                    {/* Add more items as needed */}
                </ul>
            </div>
            <div className="flex-grow p-4 ml-64">
                {/* Main content here */}
                {/* Adjust the content inside based on your requirements */}
            </div>
        </div>




    );
};

export default Sidebar;