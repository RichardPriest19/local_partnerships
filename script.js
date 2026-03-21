// Business Technology Strategy Website - JavaScript
// Pagination and Chart Functionality

// Page Configuration
const pages = [
    { id: 'page-home', title: 'Home', index: 0 },
    { id: 'page-1', title: 'Business Needs & Roadmap', index: 1 },
    { id: 'page-2', title: 'Systems & Suppliers', index: 2 },
    { id: 'page-3', title: 'Staff Adoption', index: 3 },
    { id: 'page-4', title: 'AI and Productivity', index: 4 }
];

let currentPageIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupPagination();
    setupFloatingButton();
    drawCharts();
});

// Setup Floating Return to Top Button
function setupFloatingButton() {
    const returnToTopBtn = document.getElementById('returnToTopBtn');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            returnToTopBtn.classList.add('show');
        } else {
            returnToTopBtn.classList.remove('show');
        }
    });
    
    // Click handler
    returnToTopBtn.addEventListener('click', returnToTop);
}

// Pagination Setup
function setupPagination() {
    const homeBtn = document.getElementById('home-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    homeBtn.addEventListener('click', goToHome);
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);

    // Setup card click handlers
    setupCardNavigation();

    updatePageDisplay();
}

// Setup Card Navigation
function setupCardNavigation() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Card indices: 0 = page-1, 1 = page-2, 2 = page-3, 3 = page-4
            currentPageIndex = index + 1;
            updatePageDisplay();
            window.scrollTo(0, 0);
        });
    });
}

// Go to Home Page
function goToHome() {
    currentPageIndex = 0;
    updatePageDisplay();
}

// Go to Previous Page
function goToPreviousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updatePageDisplay();
    }
}

// Go to Next Page
function goToNextPage() {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        updatePageDisplay();
    }
}

// Update Page Display
function updatePageDisplay() {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    // Show current page
    const currentPage = document.getElementById(pages[currentPageIndex].id);
    if (currentPage) {
        currentPage.classList.add('active');
    }

    // Update page indicator
    updatePageIndicator();

    // Update button states
    updateButtonStates();

    // Scroll to top
    window.scrollTo(0, 0);
}

// Update Page Indicator
function updatePageIndicator() {
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    currentPageSpan.textContent = pages[currentPageIndex].title;
    totalPagesSpan.textContent = (pages.length - 1) + ' Pages';
}

// Update Button States
function updateButtonStates() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const homeBtn = document.getElementById('home-btn');

    // Disable previous button on first page
    prevBtn.disabled = currentPageIndex === 0;

    // Disable next button on last page
    nextBtn.disabled = currentPageIndex === pages.length - 1;

    // Disable home button if already on home page
    homeBtn.disabled = currentPageIndex === 0;
}

// Return to Top Function
function returnToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Chart Drawing Functions
function drawCharts() {
    // Only draw charts if we're on the appropriate pages
    setTimeout(() => {
        drawRoadmapChart();
        drawTimelineChart();
        drawEfficiencyChart();
        drawIntegrationChart();
        drawAdoptionChart();
        drawTrainingChart();
    }, 100);
}

// Page 1: Roadmap Phases Chart
function drawRoadmapChart() {
    const canvas = document.getElementById('roadmapChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 300;

    const phases = [
        { name: 'Understand', value: 15 },
        { name: 'Analyse', value: 20 },
        { name: 'Define', value: 30 },
        { name: 'Plan', value: 15 },
        { name: 'Execute', value: 20 }
    ];

    const barWidth = width / (phases.length + 1);
    const maxValue = Math.max(...phases.map(p => p.value));
    const padding = 60;

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Distribution of Effort/Resources', 15, 25);

    // Draw bars
    phases.forEach((phase, index) => {
        const x = (index + 1) * barWidth;
        const barHeight = (phase.value / maxValue) * (height - padding - 40);
        const y = height - padding - barHeight;

        // Gradient
        const gradient = ctx.createLinearGradient(x, y, x, height - padding);
        gradient.addColorStop(0, '#0055b3');
        gradient.addColorStop(1, '#003d7a');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - barWidth / 3, y, barWidth * 0.6, barHeight);

        // Value
        ctx.fillStyle = '#99ccff';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(phase.value + '%', x, y - 10);

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(phase.name, x, height - padding + 20);
    });

    // Axis
    ctx.strokeStyle = '#004a99';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding - 10, height - padding);
    ctx.lineTo(width - 10, height - padding);
    ctx.stroke();
}

// Page 1: Timeline Chart
function drawTimelineChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 250;

    const months = ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 18'];
    const progressData = [10, 25, 45, 65, 85, 100];

    const padding = 70;
    const chartWidth = width - padding * 2 - 30;
    const chartHeight = height - padding - 20;

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Roadmap Progress (%)', 15, 20);

    // Draw grid
    ctx.strokeStyle = '#002855';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding - 30, y);
        ctx.stroke();
    }

    // Draw line and points
    ctx.strokeStyle = '#0055b3';
    ctx.lineWidth = 3;
    ctx.beginPath();

    progressData.forEach((value, index) => {
        const x = padding + (chartWidth / (progressData.length - 1)) * index;
        const y = height - padding - (chartHeight / 100) * value;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    progressData.forEach((value, index) => {
        const x = padding + (chartWidth / (progressData.length - 1)) * index;
        const y = height - padding - (chartHeight / 100) * value;

        // Point circle
        ctx.fillStyle = '#003d7a';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#0055b3';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Value label - position below for last point to avoid going outside
        ctx.fillStyle = '#99ccff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        
        if (index === progressData.length - 1) {
            // Last point (100%) - show label below instead of above
            ctx.fillText(value + '%', x, y + 25);
        } else {
            ctx.fillText(value + '%', x, y - 18);
        }
    });

    // X-axis labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    progressData.forEach((value, index) => {
        const x = padding + (chartWidth / (progressData.length - 1)) * index;
        ctx.fillText(months[index], x, height - 8);
    });

    // Y-axis
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding - 30, height - padding);
    ctx.stroke();
}

// Page 2: Efficiency Chart
function drawEfficiencyChart() {
    const canvas = document.getElementById('efficiencyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 300;

    const categories = ['Cost', 'Complexity', 'Manual\nWork', 'System\nGaps', 'Support\nLoad'];
    const beforeData = [85, 90, 80, 85, 90];
    const afterData = [35, 25, 20, 15, 30];

    const barWidth = 30;
    const barGap = 15;
    const groupGap = 70;
    const padding = 50;

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Efficiency Improvement (%)', 15, 25);

    const maxValue = 100;
    const chartHeight = height - padding - 50;

    // Draw bars
    categories.forEach((category, index) => {
        const xStart = padding + (index * (groupGap + barGap * 2)) + barGap;

        // Before bar - Light Cyan
        const beforeHeight = (beforeData[index] / maxValue) * chartHeight;
        const beforeY = height - padding - beforeHeight;
        
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(xStart, beforeY, barWidth, beforeHeight);
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 1;
        ctx.strokeRect(xStart, beforeY, barWidth, beforeHeight);

        // After bar - Light Green
        const afterHeight = (afterData[index] / maxValue) * chartHeight;
        const afterY = height - padding - afterHeight;
        
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(xStart + barWidth + 5, afterY, barWidth, afterHeight);
        ctx.strokeStyle = '#00cc66';
        ctx.lineWidth = 1;
        ctx.strokeRect(xStart + barWidth + 5, afterY, barWidth, afterHeight);

        // Category label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        
        // Handle multi-line labels
        const lines = category.split('\n');
        lines.forEach((line, lineIndex) => {
            ctx.fillText(line, xStart + barWidth / 2 + 2.5, height - 30 + (lineIndex * 12));
        });
    });

    // Legend - positioned on the right side
    const legendX = width - 180;
    const legendY = 35;
    
    ctx.font = '12px Arial';
    
    // Before legend
    ctx.fillStyle = '#00d4ff';
    ctx.fillRect(legendX, legendY, 14, 14);
    ctx.strokeStyle = '#0099cc';
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX, legendY, 14, 14);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText('Before', legendX + 20, legendY + 12);

    // After legend
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(legendX, legendY + 20, 14, 14);
    ctx.strokeStyle = '#00cc66';
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX, legendY + 20, 14, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('After', legendX + 20, legendY + 32);

    // Axis
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - 20, height - padding);
    ctx.stroke();
}

// Page 2: Integration Chart
function drawIntegrationChart() {
    const canvas = document.getElementById('integrationChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 280;

    // Data for pie chart segments with improved colors
    const segments = [
        { label: 'CRM', value: 28, color: '#00d4ff' },
        { label: 'Finance', value: 24, color: '#00ff88' },
        { label: 'Docs', value: 20, color: '#ffaa00' },
        { label: 'Marketing', value: 16, color: '#ff6b9d' },
        { label: 'Reports', value: 12, color: '#c77dff' }
    ];

    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = 70;

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('System Integration Breakdown', 15, 25);

    // Draw pie chart
    let currentAngle = -Math.PI / 2;

    segments.forEach((segment, index) => {
        const sliceAngle = (segment.value / 100) * Math.PI * 2;

        // Draw segment
        ctx.fillStyle = segment.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        // Draw border
        ctx.strokeStyle = '#003d7a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 50);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 50);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(segment.label, labelX, labelY);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(segment.value + '%', labelX, labelY + 13);

        currentAngle += sliceAngle;
    });

    // Draw center circle for donut effect
    ctx.fillStyle = '#003d7a';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100%', centerX, centerY - 8);

    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Integrated', centerX, centerY + 10);
}

// Page 3: Adoption Chart
function drawAdoptionChart() {
    const canvas = document.getElementById('adoptionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 300;

    const phases = [
        { name: 'Awareness', percentage: 95 },
        { name: 'Understanding', percentage: 78 },
        { name: 'Trial', percentage: 62 },
        { name: 'Adoption', percentage: 48 },
        { name: 'Proficiency', percentage: 85 }
    ];

    const barWidth = 40;
    const barGap = 30;
    const padding = 60;

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Staff Adoption Journey (%)', 15, 25);

    const maxValue = 100;
    const chartHeight = height - padding - 40;

    // Draw bars
    phases.forEach((phase, index) => {
        const x = padding + (index * (barWidth + barGap)) + barGap;
        const barHeight = (phase.percentage / maxValue) * chartHeight;
        const y = height - padding - barHeight;

        // Gradient
        let gradient = ctx.createLinearGradient(x, y, x, height - padding);
        
        if (phase.percentage > 75) {
            gradient.addColorStop(0, '#0055b3');
            gradient.addColorStop(1, '#003d7a');
        } else if (phase.percentage > 50) {
            gradient.addColorStop(0, '#4da6ff');
            gradient.addColorStop(1, '#0055b3');
        } else {
            gradient.addColorStop(0, '#99ccff');
            gradient.addColorStop(1, '#4da6ff');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Percentage label
        ctx.fillStyle = '#99ccff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(phase.percentage + '%', x + barWidth / 2, y - 8);

        // Phase label
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px Arial';
        ctx.fillText(phase.name, x + barWidth / 2, height - 15);
    });

    // Axis
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - 20, height - padding);
    ctx.stroke();
}

// Page 3: Training Effectiveness Chart
function drawTrainingChart() {
    const canvas = document.getElementById('trainingChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width || 800;
    const height = canvas.height || 280;

    const trainingMethods = [
        { name: 'Role-Specific', effectiveness: 92 },
        { name: 'Peer Support', effectiveness: 87 },
        { name: 'On-Demand', effectiveness: 75 },
        { name: 'Generic Training', effectiveness: 45 },
        { name: 'Self-Study', effectiveness: 58 }
    ];

    const barWidth = 25;
    const padding = 60;
    const chartWidth = width - padding - 150;  // Reduced to ensure all bars fit with values

    // Background
    ctx.fillStyle = '#003d7a';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = '#99ccff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Training Method Effectiveness Comparison (%)', 15, 25);

    // Sort by effectiveness (descending)
    const sorted = [...trainingMethods].sort((a, b) => b.effectiveness - a.effectiveness);

    sorted.forEach((method, index) => {
        const y = padding + 20 + (index * 40);
        const barLength = (method.effectiveness / 100) * chartWidth;

        // Draw bar with bright cyan to ensure visibility
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(padding + 150, y - 12, barLength, barWidth);

        // Bar border
        ctx.strokeStyle = '#0099cc';
        ctx.lineWidth = 1;
        ctx.strokeRect(padding + 150, y - 12, barLength, barWidth);

        // Label on the left
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(method.name, padding + 140, y + 5);

        // Value at the end of bar - always outside for clarity
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(method.effectiveness + '%', padding + 155 + barLength + 10, y + 5);
    });

    // Axis
    ctx.strokeStyle = '#004a99';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding + 150, padding);
    ctx.lineTo(padding + 150, height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding + 150, height - padding);
    ctx.lineTo(width - 20, height - padding);
    ctx.stroke();
}

// Redraw charts on window resize
window.addEventListener('resize', function() {
    drawCharts();
});
