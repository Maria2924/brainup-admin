import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-gradient-to-tl from-[#a309b8] to-[#0e7ce2] text-white dark:bg-[#0a0a0a] scroll-smooth">
                {/* Navbar */}
                <header className="flex justify-end px-6 py-6 lg:px-12">
                    <nav className="space-x-4 text-sm font-semibold">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded border border-white/30 px-5 py-2 hover:bg-white/10 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded border border-transparent px-5 py-2 hover:bg-white/10 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded border border-white/30 px-5 py-2 hover:bg-white/10 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero */}
                <section className="flex flex-1 items-center justify-center px-6 lg:px-12 py-16">
                    <div
                        className="w-full max-w-4xl rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl px-8 py-16 text-center lg:text-left"
                        data-aos="fade-up"
                    >
                        <h1 className="text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                            Welcome to <span className="text-white font-bold">Brain Up</span>
                        </h1>
                        <p className="text-white/80 text-lg mb-10">
                            Brain Up is a platform for students to learn, grow, and improve their skills through engaging content and smart tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href={route('register')}
                                className="px-6 py-3 bg-white text-[#1b1b18] font-semibold rounded-md shadow hover:bg-gray-200 transition"
                            >
                                Get Started
                            </Link>
                            <Link
                                href={'#learn-more'}
                                className="px-6 py-3 border border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white text-[#1b1b18] py-20 px-6 lg:px-12" id="features">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold mb-4" data-aos="fade-down">What Makes Brain Up Special?</h2>
                        <p className="text-gray-600 mb-12" data-aos="fade-down" data-aos-delay="100">
                            We empower learners with practical skills and innovative learning methods.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Interactive Lessons</h3>
                                <p className="text-sm text-gray-700">Hands-on modules to practice what you learn in real time.</p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Track Progress</h3>
                                <p className="text-sm text-gray-700">Get insights on your growth and learning curve with our dashboard.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-20 px-6 lg:px-12 bg-[#0e7ce2] text-white">
                    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right">
                            <h2 className="text-3xl font-bold mb-4">Why Choose Brain Up?</h2>
                            <p className="text-white/80">
                                We believe education should be accessible, engaging, and tailored to individual growth. With Brain Up, students experience a unique blend of technology and pedagogy.
                            </p>
                        </div>
                        <div data-aos="fade-left" className="bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg">
                            <ul className="space-y-4 text-white/90 text-sm">
                                <li>✅ Personalized learning paths</li>
                                <li>✅ Real-world project challenges</li>
                                <li>✅ AI-assisted feedback</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Learn More Section */}
                <section className="py-20 px-6 lg:px-12 bg-white text-[#1b1b18]" id="learn-more">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Learn More About Brain Up</h2>
                        <p className="text-gray-600 mb-12" data-aos="fade-up" data-aos-delay="100">
                            Discover how our platform works, who you'll learn from, and what you'll walk away with.
                        </p>

                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 text-left" data-aos="fade-up" data-aos-delay="200">
                            {/* Course Detail */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
                                <div className="mb-4">
                                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        Courses
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Practical & Engaging Content</h3>
                                <p className="text-sm text-gray-700">
                                    Explore hands-on lessons and quizzes crafted to reinforce learning through experience.
                                </p>
                            </div>

                            {/* Instructors Detail */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
                                <div className="mb-4">
                                    <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        Instructors
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                                <p className="text-sm text-gray-700">
                                    Learn from industry professionals and educators passionate about teaching and mentorship.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Call to Action */}
                <section className="py-20 bg-black text-white px-6 lg:px-12 text-center" data-aos="zoom-in">
                    <h2 className="text-3xl font-semibold mb-4">Ready to Level Up?</h2>
                    <p className="text-white/80 mb-8">
                        Join other students unlocking their potential with Brain Up.
                    </p>
                    <Link
                        href={route('register')}
                        className="bg-white text-black px-8 py-3 rounded-md font-semibold shadow hover:bg-gray-200 transition"
                    >
                        Create Your Free Account
                    </Link>
                </section>

                {/* Footer */}
                <footer className="text-center py-6 text-white/50 text-sm bg-black">
                    &copy; {new Date().getFullYear()} Brain Up. All rights reserved.
                </footer>
            </div>
        </>
    );
}
