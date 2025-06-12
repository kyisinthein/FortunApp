// import { createClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';
// import PairAnalysis from '@/components/pair-analysis';

// export default async function PairPage() {
//   const supabase = await createClient();

//   // Get current user
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) {
//     redirect('/signin');
//   }

//   // Check if user has an active subscription
//   const { data: subscription } = await supabase
//     .from('subscriptions')
//     .select('status')
//     .eq('user_id', user.id)
//     .single();

//   if (!subscription || subscription.status !== 'active') {
//     redirect('/dashboard');
//   }

//   // Get today's analysis
//   const now = new Date();
//   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const todayDateString = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }))
//     .toLocaleDateString('en-CA', { timeZone: userTimezone }); // en-CA gives YYYY-MM-DD format

//   console.log('Checking for analysis for date:', todayDateString, 'in timezone:', userTimezone);

//   const { data: analysis } = await supabase
//     .from('pair')
//     .select('*')
//     .eq('user_id', user.id)
//     .eq('date', todayDateString)
//     .single();

//   console.log('Analysis data from database:', analysis);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
//       <div className="max-w-4xl mx-auto p-3 py-6 sm:p-4 sm:py-8 pt-16 sm:pt-20">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-red-700 to-red-900 p-4 sm:p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
//             <h1 className="text-2xl sm:text-3xl font-bold ">Pair Analysis • Daily Limit</h1>
//             <a 
//               href="/dashboard" 
//               className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gray-600 text-white text-sm sm:text-base rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               Back to Dashboard
//             </a>
//           </div>
//           <div className="p-4 sm:p-8 mt-3 sm:mt-4">
//             <div className="prose prose-sm sm:prose-base lg:prose-lg prose-p:my-3 sm:prose-p:my-4 prose-headings:mt-5 prose-headings:mb-3 sm:prose-headings:mt-6 sm:prose-headings:mb-4 prose-ul:my-3 sm:prose-ul:my-4 prose-ul:pl-4 sm:prose-ul:pl-5 prose-li:my-1 sm:prose-li:my-2 max-w-none dark:prose-invert text-gray-700 overflow-hidden break-words">
//               <PairAnalysis initialAnalysis={analysis} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 