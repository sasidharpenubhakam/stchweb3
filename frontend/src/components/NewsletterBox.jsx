import React, { useState } from 'react';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setMessage(''); // Clear previous messages
        setIsSubmitting(true); // Show loading state

        // Basic email validation
        if (!email || !email.includes('@') || !email.includes('.')) {
            setMessage('Please enter a valid email address.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Replace with your actual backend API endpoint
            const response = await fetch('YOUR_BACKEND_API_ENDPOINT/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Successfully subscribed! Check your inbox for updates.');
                setEmail(''); // Clear the input field
            } else {
                // Handle specific error messages from your backend if available
                setMessage(data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during subscription:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false); // End loading state
        }
    };

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 10% off</p>
            <p className='text-gray-400 mt-3'>
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. */}
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input
                    className='w-full sm:flex-1 outline-none'
                    type="email"
                    placeholder='Enter your email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting} // Disable input while submitting
                />
                <button
                    type='submit'
                    className='bg-black text-white text-xs px-10 py-4'
                    disabled={isSubmitting} // Disable button while submitting
                >
                    {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                </button>
            </form>
            {message && <p className={`mt-2 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
    );
};

export default NewsletterBox;