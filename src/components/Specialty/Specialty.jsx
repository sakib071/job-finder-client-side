
const Specialty = () => {
    return (
        <div className="mt-10 p-10">
            <h3 className="text-3xl font-bold text-center mb-5 underline text-blue-600">Specialties</h3>

            <div className="w-[60vw] mx-auto p-10 shadow-sm border-2 rounded-lg">
                <ol className="text-xl space-y-3 w-[50vw] mx-auto list-disc">
                    <li>User-Friendly Product Management: Create, update, and delete products effortlessly with our user-friendly product management system.</li>
                    <li>Secure Authentication Methods: Ensure your data is protected with options for both Google and Email/Password sign-in methods.</li>
                    <li>Private Routes: Implement private routes to restrict access to certain parts of your site, ensuring user privacy and security.</li>
                    <li>Product Reviews: Allow users to leave reviews and ratings for products, fostering transparency and trust in your tech community.</li>
                    <li>Social Sharing: Easily share your favorite tech products and updates with friends and followers through integrated social media sharing.</li>
                </ol>
            </div>

        </div>
    );
};

export default Specialty;