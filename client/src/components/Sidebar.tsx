import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

const Sidebar = ({isOpen,setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {
   
   const {logout, user} = {
    logout: ()=>{
        window.location.href="/"; 
    }, 
    user:{name: "John Doe"}
   }

   const location = useLocation();
   const navItems = [
     {name:"Dashboard", icon:LayoutDashboardIcon, path:"/dashboard"}, 
     {name: "Accounts", icon: UsersIcon, path:"/accounts"}, 
     {name: "Scheduler", icon: CalendarDaysIcon, path:"/scheduler"}, 
     {name: "AI Composer",icon: Wand2Icon, path:"/ai-composer"}
   ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full transform transition-transform 
    duration-300 ease-in-out md:relative md:translate-x-0  ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}`}>
     
    {/* Logo */} 
     <div className="p-6 pb-4"> 
        <div className='text-xl tracking-tight text-slate-800 flex items-center gap-1.5'>
            <img src="../../public/logo.svg" alt="Logo" className="size-6" />
            Scheduler
        </div>
     </div>  

     {/* Navigation */} 
     <div className="px-6 py-4">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Menu</span>
     </div>
     
     {/* Nav Links */} 
    <nav className="flex-1 px-3 space-y-1 ">
        {navItems.map((item) => {  
             const isActive = location.pathname === item.path; 
       
             return (
            <NavLink key={item.path} to={item.path} 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-150 border ${isActive ? 'border-slate-400 bg-slate-100' : 'border-transparent'}`}
            onClick={() => setIsOpen(false)}
            >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
            </NavLink>

            )
 
        })}
    </nav>
    
    {/* Footer */} 
    <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
               <div className="size-8 bg-slate-200 rounded-full flex items-center justify-center">
                 {user?.name?.charAt(0).toUpperCase() || "U"}
               </div>
               <div className="flex-1 min-w-0"> 
                 <div className="text-sm font-medium text-slate-800 truncate">
                   {user?.name}
                 </div>
                 <div className="text-xs text-slate-500 truncate">
                   View Profile
                 </div>
               </div>

        </div>

        <button onClick={logout} className=" mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
          <LogOutIcon className="size-4"/> 
          Sign Out
        </button>
    </div>



    </div>
  )
}

export default Sidebar