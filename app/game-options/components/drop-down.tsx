export default function DropDown(title: string) {
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="rounded-md bg-white px-3 py-2 text-gray-900 ring-gray-300 hover:bg-gray-50 inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    {title}
                    <svg
                        className="-mr-1 text-gray-400 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div
                className="mt-2 divide-gray-100 rounded-md bg-white ring-black absolute right-0 z-10 w-56 origin-top-right divide-y shadow-lg ring-1 ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                data-tabindex="-1"
            >
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-0"
                    >
                        Edit
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-1"
                    >
                        Duplicate
                    </a>
                </div>
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-2"
                    >
                        Archive
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-3"
                    >
                        Move
                    </a>
                </div>
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-4"
                    >
                        Share
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-5"
                    >
                        Add to favorites
                    </a>
                </div>
                <div className="py-1" role="none">
                    <a
                        href="#"
                        className="px-4 py-2 text-gray-700 block text-sm"
                        role="menuitem"
                        data-tabindex="-1"
                        id="menu-item-6"
                    >
                        Delete
                    </a>
                </div>
            </div>
        </div>
    );
}
