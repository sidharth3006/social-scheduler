import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dummyAccountsData, PLATFORMS } from '../assets/assets'
import React from 'react'
import AccountList from '../components/AccountList'
import PlatformPickerModal from '../components/PlatformPickerModal'

const Accounts = () => { 

  const [accounts,setAccounts] = useState<any[]>([]) 
  const [connecting,setConnecting] = useState<string|null>(null)  
  const [showPlatformPicker, setShowPlatformPicker] = useState<boolean>(false)

  const fetchAccounts = async ( isSync=false, platform?: string | null, successMsg?: string) => {
    // TODO: Implement fetch accounts logic
    setAccounts(dummyAccountsData); 
    console.log('Fetch accounts')
  }

  useEffect(() => {
    fetchAccounts();
  }, []) 


  const handleConnect = async (platform: string) => {
    // TODO: Implement connect logic 
    setConnecting(platform); 
    setTimeout(() => {
      setConnecting(null); 
      setAccounts(prev => [...prev, {platform}]); 
      setShowPlatformPicker(false);
    }, 2000); 

    console.log('Connect to', platform)
  }

  const handleDisconnect = async (accountId: string) => {
    // TODO: Implement disconnect logic
    setAccounts(accounts.filter(account => account._id !== accountId))
    console.log('Disconnect account:', accountId)
  }

  const connectedIds = accounts.map(account => account.platform)

  

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm'>
        <div>
          <h2 className="text-xl text-slate-900">Connected Accounts</h2> 
          <p className="text-slate-500 text-sm mt-0.5">{accounts.length} of {PLATFORMS.length} platforms connected</p>
        </div> 
        <button onClick={() => setShowPlatformPicker(true)} className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
          <PlusIcon className="size-4" />
          Connect Account
        </button>
      </div> 
      
      
      {/* Platform picker modal */}  
      {showPlatformPicker && <PlatformPickerModal connectedIds={connectedIds} connecting={connecting} onClose={() => setShowPlatformPicker(false)} onConnect={handleConnect}/>}
       





      {/*Connected Accounts list*/}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />



    </div>
  )
}

export default Accounts