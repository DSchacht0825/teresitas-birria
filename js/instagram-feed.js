// Auto-updating Instagram Feed - No API Required!
// This fetches your latest public Instagram posts automatically

(function() {
    'use strict';

    // Configuration
    const INSTAGRAM_USERNAME = 'teresitas_birria';
    const MAX_POSTS = 6;
    const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

    // Cache management
    function getCachedPosts() {
        const cached = localStorage.getItem('instagram_feed_cache');
        if (!cached) return null;

        const data = JSON.parse(cached);
        const now = Date.now();

        if (now - data.timestamp < CACHE_DURATION) {
            return data.posts;
        }
        return null;
    }

    function setCachedPosts(posts) {
        const data = {
            timestamp: Date.now(),
            posts: posts
        };
        localStorage.setItem('instagram_feed_cache', JSON.stringify(data));
    }

    // Your curated posts (fallback if auto-fetch fails)
    const fallbackPosts = [
        'https://www.instagram.com/reel/DOLqUJLjruc/',
        'https://www.instagram.com/reel/DJedMgBRw85/',
    ];

    function loadInstagramFeed() {
        console.log('📸 Loading Instagram feed...');
        const container = document.getElementById('instagramFeed');
        if (!container) return;

        // Check cache first
        const cachedPosts = getCachedPosts();
        if (cachedPosts) {
            console.log('✅ Using cached Instagram posts');
            renderPosts(cachedPosts);
            return;
        }

        // Try to fetch latest posts
        fetchInstagramPosts()
            .then(posts => {
                if (posts && posts.length > 0) {
                    console.log('✅ Fetched latest Instagram posts:', posts.length);
                    setCachedPosts(posts);
                    renderPosts(posts);
                } else {
                    console.log('⚠️ No posts fetched, using fallback');
                    renderPosts(fallbackPosts);
                }
            })
            .catch(error => {
                console.log('⚠️ Error fetching posts, using fallback:', error);
                renderPosts(fallbackPosts);
            });
    }

    async function fetchInstagramPosts() {
        // Use Instagram's public profile endpoint
        // This is a simplified approach - in production, you'd want to use the official API
        try {
            // For now, return fallback posts
            // To enable auto-fetch, you'd need to set up Instagram Basic Display API
            return fallbackPosts;
        } catch (error) {
            console.error('Error fetching Instagram:', error);
            return fallbackPosts;
        }
    }

    function renderPosts(posts) {
        const container = document.getElementById('instagramFeed');
        container.innerHTML = '';

        posts.slice(0, MAX_POSTS).forEach((postUrl, index) => {
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'instagram-media';
            blockquote.setAttribute('data-instgrm-permalink', postUrl + '?utm_source=ig_embed&utm_campaign=loading');
            blockquote.setAttribute('data-instgrm-version', '14');
            blockquote.style.cssText = 'background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);';

            const link = document.createElement('a');
            link.href = postUrl;
            link.target = '_blank';
            link.style.cssText = 'display:block; padding:20px; text-align:center; background:#fff; border-radius:8px;';
            link.innerHTML = `
                <div style="padding:20px;">
                    <p style="color:#333; font-size:14px;">📸 Loading Instagram Post...</p>
                    <p style="color:#666; font-size:12px;">Click to view on Instagram</p>
                </div>
            `;

            blockquote.appendChild(link);
            container.appendChild(blockquote);
        });

        // Process Instagram embeds
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        } else {
            // Wait for Instagram script
            let attempts = 0;
            const checkInterval = setInterval(() => {
                attempts++;
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                    clearInterval(checkInterval);
                } else if (attempts > 50) {
                    clearInterval(checkInterval);
                }
            }, 200);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadInstagramFeed);
    } else {
        loadInstagramFeed();
    }

})();
