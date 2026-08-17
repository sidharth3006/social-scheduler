import { CheckCircleIcon,AlertCircleIcon, PlusIcon, UnplugIcon } from "lucide-react"; 
import { PLATFORMS } from "../assets/assets";

interface AccountListProps{
    accounts: any[]; 
    onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({accounts, onDisconnect}: AccountListProps) => {

    const handleDisconnect =  async (accountId: string) => {
        const confirm = window.confirm('Are you sure you want to disconnect this account?');
        if (!confirm) {
            return;
        }
        await onDisconnect(accountId);
    } 

    if(accounts.length === 0) {
        return (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-20 px-6"> 
              <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
                    <PlusIcon className="size-6 text-slate-500 opacity-50"/>
              </div> 
              <p className="text-slate-500 text-sm">No accounts connected</p> 
              <p className="text-slate-400 text-xs mt-2 max-w-xs text-center">Connect your first social platform to start scheduling and automating your content</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 

        {
            accounts.map((account,index)=>{
                const meta = PLATFORMS.find((p)=> p.id === account.platform); 
                if(!meta) return null ;

                return (
                    <div key={index} className="bg-white rounded-2xl border border-slate-200 gap-4 flex items-center p-5 hover:border-slate-300 transition-all ">
                        <div className="size-12 bg-slate-50 roundewd-xl flex items-center justify-center shrink-0">
                            <meta.icon className="size-6 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-slate-900 font-medium truncate">
                                {account.handle}
                            </div> 
                            <div className="text-slate-500 text-sm mt-0.5">
                                {meta.name}
                            </div>
                        </div>

                        <div className="flex items-cente gap-1.5 shrink-0"> 
                            {account.status === 'connected' ? (
                                <>
                                  <CheckCircleIcon className="size-5 text-green-500" />  
                                  <span className="text-cs text-emerald-600">Connected</span>
                                
                                </>
                            ): (
                                <> 
                                   
                                   <AlertCircleIcon className="size-4 text-amber-500" />
                                   <span className="text-cs text-amber-600">Disconnected</span>
                                
                                </>
                            )}
                        </div>
                        <button onClick={() => handleDisconnect(account._id) } className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <UnplugIcon className="size-5 text-slate-400" />
                        </button>
                    </div>
                )
            })
        }
             
        </div>
    )
} 

export default AccountList