// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";
// import { getSubscription } from "@/utils/supabase/queries";
// import OpenAI from "openai";
// import { BaziCalculator } from '@/lib/bazi-calculator-by-alvamind/src';

// export async function POST(request: Request) {
//   try {
//     const supabase = await createClient();
    
//     // Get current user
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     // Check subscription status
//     const subscription = await getSubscription(supabase);
//     if (subscription?.status !== 'active') {
//       return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
//     }

//     // Get partner details from request
//     const { partnerName, partnerDate, purposes } = await request.json();
//     if (!partnerName || !partnerDate || !purposes || purposes.length === 0) {
//       return NextResponse.json({ error: 'Partner details and purpose required' }, { status: 400 });
//     }

//     // Get the user's birth data and gender
//     const { data: profile } = await supabase
//       .from('userdata')
//       .select('birth, gender')
//       .eq('user_id', user.id)
//       .single();

//     if (!profile || !profile.birth) {
//       return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
//     }

//     // Initialize Bazi calculator for user
//     const userBirthDate = new Date(profile.birth);
//     const userCalculator = new BaziCalculator(
//       userBirthDate.getFullYear(),
//       userBirthDate.getMonth() + 1,
//       userBirthDate.getDate(),
//       1,
//       profile.gender as any
//     );

//     const userAnalysis = userCalculator.getCompleteAnalysis();

//     // Initialize Bazi calculator for partner
//     const partnerBirthDate = new Date(partnerDate);
//     const partnerCalculator = new BaziCalculator(
//       partnerBirthDate.getFullYear(),
//       partnerBirthDate.getMonth() + 1,
//       partnerBirthDate.getDate(),
//       1,
//       'male' // Default to male for partner, can be made configurable if needed
//     );

//     const partnerAnalysis = partnerCalculator.getCompleteAnalysis();

//     // Initialize DeepSeek API
//     const client = new OpenAI({
//       baseURL: 'https://api.deepseek.com',
//       apiKey: process.env.DEEPSEEK_API_KEY
//     });

//     const prompt = `Analyze the compatibility and relationship dynamics between these two individuals for the following purposes: ${purposes.join(', ')}. Focus on their strengths as a pair, potential challenges, and growth opportunities specific to these relationship types. Use "you" language and flowing paragraphs. No questions or disclaimers and no Chinese characters.\n\nUser Analysis: ${JSON.stringify(userAnalysis)}\n\nPartner Analysis: ${JSON.stringify(partnerAnalysis)}`;

//     const response = await client.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "deepseek-chat",
//     });

//     const summary = response.choices[0].message.content;

//     // Get today's date in user's timezone
//     const now = new Date();
//     const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const todayDateString = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }))
//       .toLocaleDateString('en-CA', { timeZone: userTimezone });

//     // Update or insert the analysis
//     const { data: analysis, error: updateError } = await supabase
//       .from('pair')
//       .upsert({
//         user_id: user.id,
//         date: todayDateString,
//         partner_name: partnerName,
//         partner_date: partnerDate,
//         purpose: purposes.join(', '),
//         summary
//       })
//       .select()
//       .single();

//     if (updateError) {
//       console.error('Update error:', updateError);
//       return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
//     }

//     return NextResponse.json({ analysis });
//   } catch (error) {
//     console.error('Error in pair analysis:', error);
//     return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
//   }
// } 