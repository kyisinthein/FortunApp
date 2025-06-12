export async function generateFreeReading(prompt: string): Promise<string> {
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sk-8e8b3cf59fb74f49be40ce28c96ccf49`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a fortune teller AI that provides readings in JSON format. Always respond with valid JSON containing a "fortunes" array.'
                    },
                    { 
                        role: 'user', 
                        content: prompt 
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('Full API Response:', JSON.stringify(result, null, 2));

        if (!result.choices?.[0]?.message?.content) {
            console.error('Invalid API response structure:', result);
            throw new Error('Invalid API response format');
        }

        return result.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API Error:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network connection failed. Please check your internet connection.');
        }
        throw error;
    }
}