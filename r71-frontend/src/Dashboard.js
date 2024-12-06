import React from 'react';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <header className="mb-4">
                    <h1 className="text-primary">Dashboard - Recent Innovations in Clean Energy</h1>
                </header>
                <article>
                    <h2 className="text-secondary">
                        Catching Up or Leaping Ahead? How Energy Innovation Can Secure U.S. Industrial Stature in a Net-Zero World
                    </h2>
                    <h3 className="mt-4">Summary</h3>
                    <p>
                        The article <em>“How Energy Innovation Can Preserve America’s Industrial Dominance in a Net-Zero Carbon Era”</em> by Milo McBride highlights the importance of energy innovation in helping the U.S. maintain its global industrial competitiveness. 
                        It discusses how technologies like next-gen batteries, geothermal energy, and low-carbon steel can help the U.S. leap ahead in less commoditized sectors.
                    </p>
                    <p>
                        McBride emphasizes an “innovation-first” approach to policy, advocating for increased research and development activities, sectoral innovation labs, and clean industrial developments to reduce emissions and increase domestic energy resilience. 
                        Synchronization with global initiatives and alliances with allies are seen as key to countering China’s clean energy dominance.
                    </p>
                    <p>
                        <strong>Read the full article:</strong> 
                        <a
                            href="https://carnegieendowment.org/research/2024/09/energy-innovation-us-industrial-stature?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-primary"
                        >
                            How Energy Innovation Can Preserve America’s Industrial Dominance in a Net-Zero Carbon Era
                        </a>
                    </p>
                </article>
            </div>
        </div>
    );
};

export default Dashboard;
