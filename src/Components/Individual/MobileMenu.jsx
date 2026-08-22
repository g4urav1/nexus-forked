import { NavLink, useNavigate } from "react-router-dom";



export default function MobileMenu() {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        if(confirm("Do you want to logout?")){
            navigate("/login")
        }
    }
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-6 py-2 flex justify-around items-center z-50">
            <NavLink
                to="/"
                end // Optional: Ensures exact matching for root path "/"
                className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 transition ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`
                }
            >
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="text-[10px]">Feed</span>
            </NavLink>

            <NavLink to="/search"
                end // Optional: Ensures exact matching for root path "/"
                className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 transition ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`
                }>


                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                <span className="text-[10px]">Explore</span>

            </NavLink>
            <NavLink to="/inbox"
                end // Optional: Ensures exact matching for root path "/"
                className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 transition ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`
                }>
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.865 5.25 5.25 0 001.294-2.671A8.243 8.243 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                <span className="text-[10px]">Messages</span>

            </NavLink>

            <NavLink to="/profile"
                end // Optional: Ensures exact matching for root path "/"
                className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 transition ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`
                }>
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                <span className="text-[10px]">Profile</span>

            </NavLink>
             <NavLink
                onClick={()=>handleLogout()}
                   
                    className={
                        `flex flex-col items-center space-y-1 transition
                          text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`
                    }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                    </svg>
                    <span className="text-[10px]">Logout</span>

                </NavLink>
        </nav >
    )
}