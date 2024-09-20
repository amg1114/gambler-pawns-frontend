
export default function Sidebar({ isSidebarOpen, isMounted,  }: { isSidebarOpen: boolean, isMounted: boolean }) {
    return (
        <div className="flex">
            <aside
                id="default-sidebar"
                className={`fixed h-screen space-y-2 top-0 left-0 z-40 w-36 px sm:translate-x-0  transition-transform transform bg-dark-2 border-r-2 border-t-secondary ${isMounted ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'invisible'
                    } `}
                aria-label="Sidebar"
            >
                <div className="h-full p-2xl pb-md overflow-y-auto ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="/" className="flex items-center p-sm text-light rounded-base hover:bg-primary group-[]:">
                                <span className="ms-sm">Home</span>
                            </a>
                        </li>
                        <li>
                            Store
                        </li>
                        <li>
                            Clubs
                        </li>
                        <li>
                            Ranking
                        </li>
                        <li>
                            About
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
            
    )
}