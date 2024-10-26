// Enhanced blog post data with tags
const blogPosts = [
    {
        title: "The Future of Web Development",
        summary: "Exploring emerging trends and technologies shaping the web.",
        image: "../assets/blog-img/blog-learnme-1.png",
        url: "blog1.html",
        tags: ["web development", "technology", "programming"]
    },
    {
        title: "सपनाको क्यानभास",
        summary: "शंकर अयार्ल द्वारा लेखिएको 'सपनाको क्यानभास' कवितामा जीवनको पीडा र मृत्युका विषयमा छलफल गरिएको छ।",
        image: "../assets/blog-img/poem-11.png",
        url: "blog2.html",
        tags: ["poetry", "nepali", "literature"]

    },
    {
        title: "Network security threats with Quantum Shield",
        summary: "QuantumShield is designed with machine learning, quantum-inspired algorithms, and insider threats, and complex, multi-stage cyber intrusions.",
        image: "../assets/blog-img/quntaimg.png",
        url: "blog3.html",
        tags: ["security", "technology", "quantum computing", "cyber security"]
    },
    {
        title: "काग्",
        summary: "शंकर अयार्ल दर्रा लेखित विलानेल संरचनाको ढाँचामा उपस्थित 'काग्' कविताले जीवन र मृत्युबीचको सम्बन्धलाई प्रस्तुत गर्छ।",
        image: "../assets/blog-img/crow.jpg",
        url: "blog4.html",
        tags: ["poetry", "nepali", "literature"]
    },
    {
        title: "चिहानले पुकार छ?",
        summary: "शंकर अयार्ल द्वारा लेखिएको 'चिहानले पुकार छ?' कविता मध्यरातको अंधकारमा जीवन र मृत्युको विचमा स्थापित एक मौन संवादलाई उजागर गर्दछ।",
        image: "../assets/blog-img/chihan-cut.jpg",
        url: "blog5.html",
        tags: ["poetry", "nepali", "literature"]
    },
    {
        title: "Cryto Guard",
        summary: "Encryption and Decrytion AES",
        image: "../assets/blog-img/cryptoguard.png",
        url: "blog6.html",
        tags: ["security", "cryptography", "technology"]
    },
   
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get related posts based on current blog title
function getRelatedPosts(currentTitle) {
    // Find the current blog post
    const currentPost = blogPosts.find(post => post.title === currentTitle);
    
    if (!currentPost) {
        // If current post not found, return first three posts
        return blogPosts.slice(0, 3);
    }

    // Find posts that share at least one tag with the current post
    const matchingPosts = blogPosts.filter(post => {
        if (post.title === currentTitle) return false; // Exclude current post
        
        // Check if there's any tag overlap
        return post.tags.some(tag => currentPost.tags.includes(tag));
    });

    if (matchingPosts.length === 0) {
        // If no matching posts found, return first three posts excluding current
        return blogPosts
            .filter(post => post.title !== currentTitle)
            .slice(0, 3);
    }

    // Sort matching posts by number of shared tags
    const postsWithMatchCount = matchingPosts.map(post => ({
        ...post,
        matchCount: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }));

    // Group posts by number of matching tags
    const groupedByMatches = {};
    postsWithMatchCount.forEach(post => {
        if (!groupedByMatches[post.matchCount]) {
            groupedByMatches[post.matchCount] = [];
        }
        groupedByMatches[post.matchCount].push(post);
    });

    // Get all match counts and sort them in descending order
    const matchCounts = Object.keys(groupedByMatches)
        .map(Number)
        .sort((a, b) => b - a);

    // Collect posts starting from highest match count
    let selectedPosts = [];
    for (const matchCount of matchCounts) {
        // Shuffle posts within each match count group
        const shuffledGroup = shuffleArray([...groupedByMatches[matchCount]]);
        
        // Take as many posts as needed from this group
        const remainingNeeded = 3 - selectedPosts.length;
        selectedPosts = [
            ...selectedPosts,
            ...shuffledGroup.slice(0, remainingNeeded)
        ];

        if (selectedPosts.length >= 3) break;
    }

    return selectedPosts;
}

function createBlogCards() {
    const blogList = document.querySelector('.blog-list');
    const currentTitle = document.querySelector('#Blog-title').textContent;
    
    const postsToShow = getRelatedPosts(currentTitle);
    blogList.innerHTML = '';

    // Add a specific class to the blog list container
    blogList.classList.add('blog-suggestions');

    postsToShow.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-suggestion-card';
        
        const currentPost = blogPosts.find(p => p.title === currentTitle);
        const matchingTags = currentPost ? 
            post.tags.filter(tag => currentPost.tags.includes(tag)) :
            post.tags;
        const nonMatchingTags = post.tags.filter(tag => !matchingTags.includes(tag));

        card.innerHTML = `
            <div class="suggestion-image-container">
                <img src="${post.image}" alt="${post.title}" class="suggestion-image">
                <div class="suggestion-tags-overlay">
                    ${shuffleArray([...matchingTags])
                        .map(tag => `<span class="suggestion-tag matching">${tag}</span>`)
                        .join('')}
                    ${nonMatchingTags
                        .map(tag => `<span class="suggestion-tag non-matching">${tag}</span>`)
                        .join('')}
                </div>
            </div>
            <div class="suggestion-content">
                <h3>${post.title}</h3>
                <p onclick="window.location.href='${post.url}'">${post.summary}</p>
                <a href="${post.url}" class="suggestion-read-more">Read More</a>
            </div>
        `;
        blogList.appendChild(card);
    });
}

// Scoped CSS with specific selectors
const style = document.createElement('style');
style.textContent = `
    /* Container specific styles */
    .blog-suggestions {
        display: grid;
        gap: 2rem;
        padding: 1rem;
    }

    /* Card specific styles */
    .blog-suggestion-card {
        position: relative;
        background: hsl(231, 83%, 25%);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .blog-suggestion-card:hover {
        transform: translateY(-5px);
    }

    /* Image container specific styles */
    .suggestion-image-container {
        position: relative;
        width: 100%;
        padding-top: 65.25%; /* 16:9 aspect ratio */
        overflow: hidden;
    }

    .suggestion-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .blog-suggestion-card:hover .suggestion-image {
        transform: scale(1.05);
    }

    /* Tags overlay specific styles */
    .suggestion-tags-overlay {
   
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: calc(100% - 20px);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
    }

    .suggestion-tags-overlay::-webkit-scrollbar {
        width: 4px;
    }

    .suggestion-tags-overlay::-webkit-scrollbar-track {
        background: transparent;
    }

    .suggestion-tags-overlay::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 4px;
    }

    /* Tag specific styles */
    .suggestion-tag {
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        backdrop-filter: blur(4px);
        white-space: nowrap;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .suggestion-tag.matching {
        background-color:  hsl(7, 96%, 61%);
        color: white;
    }

    .suggestion-tag.non-matching {
        background-color: rgba(128, 0, 255, 0.85); /* Purple */ 
        
        color: white;
    }

    .suggestion-tag:hover {
        transform: translateX(-5px);
    }

    .suggestion-tag.matching:hover {
        background-color: rgba(255, 125, 0, 0.95);
    }

    .suggestion-tag.non-matching:hover {
        background-color: rgba(128, 0, 255, 0.95);
    }

    /* Content specific styles */
    .suggestion-content {
        padding: 1.5rem;
    }

    .suggestion-content h3 {
    cursor:default;
        margin: 0 0 1rem;
        color: hsl(0, 0%, 100%);
    }

    .suggestion-content p {
    cursor:default;
        margin: 0 0 1rem;
        color:  hsl(240, 10%, 70%);
        line-height: 1.6;
    }

    .suggestion-read-more {
        display: inline-block;
        color:hsl(7, 96%, 61%);
        font-weight: bold;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .suggestion-read-more:hover {
        color: #0056b3;
    }
`;

document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', createBlogCards);




document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    if (window.history.length <= 1) {
        backButton.disabled = true;
        backButton.title = "No previous page available";
    }
    backButton.addEventListener('click', function() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    });})
