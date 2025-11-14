import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-24 border-t border-gray-800">
            <div className="container mx-auto py-12 px-8 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">DFM</h3>
                    <p className="text-sm">A decentralized freelance marketplace built on the Ethereum blockchain, ensuring transparency and fairness for all.</p>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Find Jobs</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Post a Job</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">How it Works</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Help Center</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Documentation</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Smart Contracts</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">DAO Governance</button></li>
                        <li><button className="hover:text-purple-400 transition-colors bg-transparent border-none cursor-pointer">Community</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
                    <p className="text-sm">Follow us on social media for the latest updates.</p>
                </div>
            </div>
            <div className="border-t border-gray-800 py-6">
                <p className="text-center text-sm">&copy; {new Date().getFullYear()} DFM. All rights reserved. A Decentralized Project.</p>
            </div>
        </footer>
    );
}

export default Footer;