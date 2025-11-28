// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Video Portfolio Management
const videoGrid = document.getElementById('videoGrid');
const addVideoBtn = document.getElementById('addVideoBtn');
const videoForm = document.getElementById('videoForm');
const saveVideoBtn = document.getElementById('saveVideoBtn');
const cancelVideoBtn = document.getElementById('cancelVideoBtn');

// Load videos from localStorage
let videos = JSON.parse(localStorage.getItem('portfolioVideos')) || [];

// Render videos
function renderVideos() {
    if (videos.length === 0) {
        videoGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">아직 비디오가 없습니다.</p>
                <p>위의 "비디오 추가" 버튼을 클릭하여 첫 번째 비디오를 추가해보세요!</p>
            </div>
        `;
        return;
    }

    videoGrid.innerHTML = videos.map((video, index) => {
        const embedUrl = convertToEmbedUrl(video.url);
        return `
            <div class="video-item">
                <div class="video-wrapper">
                    <iframe 
                        src="${embedUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    ${video.description ? `<p>${video.description}</p>` : ''}
                    <button class="delete-video-btn" onclick="deleteVideo(${index})" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">삭제</button>
                </div>
            </div>
        `;
    }).join('');
}

// Convert YouTube/Vimeo URL to embed URL
function convertToEmbedUrl(url) {
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo URL patterns
    const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed') || url.includes('vimeo.com/video')) {
        return url;
    }
    
    // Return original URL if no match (user can fix it)
    return url;
}

// Add video button toggle
addVideoBtn.addEventListener('click', () => {
    videoForm.style.display = videoForm.style.display === 'none' ? 'block' : 'none';
    if (videoForm.style.display === 'block') {
        document.getElementById('videoTitle').focus();
    }
});

// Save video
saveVideoBtn.addEventListener('click', () => {
    const title = document.getElementById('videoTitle').value.trim();
    const url = document.getElementById('videoUrl').value.trim();
    const description = document.getElementById('videoDescription').value.trim();
    
    if (!title || !url) {
        alert('제목과 URL을 입력해주세요.');
        return;
    }
    
    videos.push({
        title,
        url,
        description
    });
    
    localStorage.setItem('portfolioVideos', JSON.stringify(videos));
    renderVideos();
    
    // Reset form
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoDescription').value = '';
    videoForm.style.display = 'none';
});

// Cancel video form
cancelVideoBtn.addEventListener('click', () => {
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoUrl').value = '';
    document.getElementById('videoDescription').value = '';
    videoForm.style.display = 'none';
});

// Delete video
function deleteVideo(index) {
    if (confirm('이 비디오를 삭제하시겠습니까?')) {
        videos.splice(index, 1);
        localStorage.setItem('portfolioVideos', JSON.stringify(videos));
        renderVideos();
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize
renderVideos();

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

