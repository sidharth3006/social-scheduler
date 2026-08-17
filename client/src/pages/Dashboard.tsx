import { ClockIcon, CheckCircleIcon, Share2Icon, TrendingUpIcon, ActivityIcon, SendIcon } from 'lucide-react'
import React, { useState,useEffect } from 'react' 
import { dummyPostsData,dummyAccountsData,dummyActivityData } from '../assets/assets'


const Dashboard = () => {  


  const [stats,setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0}) 
  const [acitvities, setActivities] = useState<any[]>([]) 

  useEffect(() => {
    const fetchDashboardData = async () => {
          try{
              const [postsRes, accountsRes, activityRes] = [{data: dummyPostsData},{data: dummyAccountsData}, {data: dummyActivityData}]
              const posts = postsRes.data;  
              const accounts = accountsRes.data;
              const activities = activityRes.data;
              setStats({
                scheduled: posts.filter((post:any) => post.status === 'scheduled').length,
                published: posts.filter((post:any) => post.status === 'published').length,
                connectedAccounts: accounts.filter((account:any) => account.status === 'connected').length
              })

              setActivities(activities)  
              
              //console.log("activities", activities)


          }catch(error: any){
            console.error("Error fetching dashboard data",error)
          }
    }; 
    fetchDashboardData();

  }, []) 
  



  const statCards = [
    {
      label: "Scheduled Posts", 
      value: stats.scheduled, 
      icon: ClockIcon, 
      trend: "+2 today", 
    }, 
    {
      label: "Published Posts", 
      value: stats.published, 
      icon: CheckCircleIcon, 
      trend: "+5 today", 
    }, 
    {
      label: "Connected Accounts", 
      value: stats.connectedAccounts, 
      icon: Share2Icon, 
      trend: "+1 today", 
    }, 
    {
      label: "Total Engagements", 
      value: 0, 
      icon: ClockIcon, 
      trend: "+10 today", 
    }
  ]

  return (
    <div className="space-y-8"> 
     {/*Welcome Bar */} 
     <div>
       <h2 className="text-2xl text-slate-900">Good Morning! 👋</h2>
       <p className="text-slate-600">Here's what's happening with your posts today.</p>
     </div>

     {/*Stats Cards*/} 
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((card)=>(
        <div key={card.label} className="bg-white hover:bg-slate-100 relative border border-slate-200 rounded-lg p-5">
          <div className='flex items-center justify-between mb-4'> 
            <div className='text-2xl font-bold'>{card.value}</div> 
            <div className="text-xs absolute right-4 top-4 text-red-500 flex items-center gap-1">
              <TrendingUpIcon className="size-3"/> 
              {card.trend}
            </div>
          </div> 
          <p className="text-slate-600 text-sm mt-1">{card.label}</p>

        </div>
      ))}
        
     </div>

     {/* Activity Feed */} 
     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden"> 
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 ">
        <h3 className="text-slate-900">Recent Activity</h3> 
        <span className="text-slate-400 text-sm">{acitvities.length} events</span> 
      </div>

      {acitvities.length === 0 ?  (
        <div className="flex flex-col items-center justify-center py-16 px-6"> 
          <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
            <ActivityIcon className="size-12 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm">No recent activity</p> 
          <p className="text-slate-500 text-sm mt-1">Connect Accounts and schedule posts to see events here.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {acitvities.map((activity) => (
            <div key={activity._id} className="flex items-start gap-4 px-6 py-6 hover:bg-slate-50/50 transition-colors"> 
             
             <div className="size-10 bg-slate-100 rounded-full flex items-center justify-center bg-zinc-100 text-zinc-600">
              <SendIcon className="size-5" />
             </div>

              <div className="flex-1 min-w-0">
                <div className='flex items-center justify-between gap-2 mb-1'>
                   <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-medium">Published</span>
                   <span className="text-slate-500 text-xs">{new Date(activity.createdAt).toLocaleString()}</span>
                </div>

                 <p className="text-slate-600 text-sm"> {activity.description}</p>

              </div>



            </div>
          ))}
        </div>
      )}
     </div>

    </div>
  )
}

export default Dashboard