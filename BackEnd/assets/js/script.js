// Dashboard JavaScript
class DashboardApp {
    constructor() {
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebar = document.getElementById('sidebar');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-icon');
        
        this.init();
    }
    
    init() {
        console.log('Dashboard initialized');
        
        // Initialize theme
        this.initTheme();
        
        // Initialize sidebar
        this.initSidebar();
        
        // Initialize menu interactions
        this.initMenuInteractions();
        
        // Initialize animations
        this.initAnimations();
        
        // Initialize tooltips and popovers
        this.initBootstrapComponents();
        
        // Load dashboard data
        this.loadDashboardData();
    }
    
    // Theme Management
    initTheme() {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Theme toggle event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeIcon) {
            if (theme === 'dark') {
                this.themeIcon.className = 'bi bi-moon theme-icon';
            } else {
                this.themeIcon.className = 'bi bi-sun theme-icon';
            }
        }
        
        // Handle table dark mode
        this.updateTableTheme(theme);
        
        localStorage.setItem('dashboard-theme', theme);
    }
    
    updateTableTheme(theme) {
        const tables = document.querySelectorAll('table');
        const theadElements = document.querySelectorAll('thead');
        
        tables.forEach(table => {
            if (theme === 'dark') {
                // Add table-dark class if not present
                if (!table.classList.contains('table-dark')) {
                    table.classList.add('table-dark');
                }
            } else {
                // Remove table-dark class
                table.classList.remove('table-dark');
            }
        });
        
        theadElements.forEach(thead => {
            if (theme === 'dark') {
                // Change table-light to table-dark
                if (thead.classList.contains('table-light')) {
                    thead.classList.remove('table-light');
                    thead.classList.add('table-dark');
                }
                // Also handle case where there's no existing class
                if (!thead.classList.contains('table-dark') && !thead.classList.contains('table-light')) {
                    thead.classList.add('table-dark');
                }
            } else {
                // Change table-dark to table-light
                if (thead.classList.contains('table-dark')) {
                    thead.classList.remove('table-dark');
                    thead.classList.add('table-light');
                }
                // Also handle case where there's no existing class
                if (!thead.classList.contains('table-dark') && !thead.classList.contains('table-light')) {
                    thead.classList.add('table-light');
                }
            }
        });
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Show notification
        this.showNotification(
            `Switched to ${newTheme} mode`, 
            'info',
            2000
        );
    }
    
    // Sidebar Management
    initSidebar() {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                const isClickInsideSidebar = this.sidebar?.contains(e.target);
                const isToggleButton = this.sidebarToggle?.contains(e.target);
                
                if (!isClickInsideSidebar && !isToggleButton && this.sidebar?.classList.contains('show')) {
                    this.closeSidebar();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                this.closeSidebar();
                this.removeOverlay();
            }
        });
    }
    
    toggleSidebar() {
        if (window.innerWidth <= 992) {
            // Mobile behavior
            if (this.sidebar?.classList.contains('show')) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        } else {
            // Desktop behavior - collapse/expand sidebar
            if (this.sidebar?.classList.contains('collapsed')) {
                this.expandSidebar();
            } else {
                this.collapseSidebar();
            }
        }
    }
    
    collapseSidebar() {
        this.sidebar?.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');
    }
    
    expandSidebar() {
        this.sidebar?.classList.remove('collapsed');
        document.body.classList.remove('sidebar-collapsed');
    }
    
    openSidebar() {
        this.sidebar?.classList.add('show');
        this.createOverlay();
    }
    
    closeSidebar() {
        this.sidebar?.classList.remove('show');
        this.removeOverlay();
    }
    
    createOverlay() {
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay show';
            overlay.addEventListener('click', () => this.closeSidebar());
            document.body.appendChild(overlay);
        }
    }
    
    removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // Menu Interactions
    initMenuInteractions() {
        const menuLinks = document.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default for links with href="#"
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Remove active class from all menu items
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item's parent
                const menuItem = link.closest('.menu-item');
                if (menuItem) {
                    menuItem.classList.add('active');
                }
                
                // Close sidebar on mobile after menu selection
                if (window.innerWidth <= 992) {
                    this.closeSidebar();
                }
                
                console.log('Menu item clicked:', link.textContent.trim());
            });
        });
    }
    
    // Animations
    initAnimations() {
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Bootstrap Components
    initBootstrapComponents() {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
    
    // Dashboard Data Loading (Simulated)
    loadDashboardData() {
        // Simulate loading states
        this.showLoadingState();
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoadingState();
            this.animateCounters();
        }, 1000);
    }
    
    showLoadingState() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.classList.add('loading');
        });
    }
    
    hideLoadingState() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.classList.remove('loading');
        });
    }
    
    // Counter Animation
    animateCounters() {
        const counters = document.querySelectorAll('.stat-card .card-title');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/,/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }
    
    // Notification System
    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px; 
            right: 20px; 
            z-index: 1060; 
            min-width: 300px;
            box-shadow: var(--shadow-lg);
        `;
        
        notification.innerHTML = `
            <i class="bi bi-info-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    const bsAlert = new bootstrap.Alert(notification);
                    bsAlert.close();
                }
            }, duration);
        }
    }
    
    // Utility Methods
    formatNumber(num) {
        return num.toLocaleString();
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Search functionality
class SearchManager {
    constructor() {
        this.searchInput = document.querySelector('.search-box input');
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', 
                this.debounce(this.handleSearch.bind(this), 300)
            );
        }
    }
    
    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        console.log('Searching for:', query);
        
        if (query.length > 2) {
            this.performSearch(query);
        }
    }
    
    performSearch(query) {
        // Simulate search functionality
        console.log('Performing search for:', query);
        
        // Here you would typically make an API call
        // For now, we'll just show a notification
        if (query === 'help') {
            window.dashboard.showNotification('Search functionality coming soon!', 'info');
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Real-time Updates (Simulated)
class RealtimeUpdater {
    constructor() {
        this.updateInterval = null;
        this.init();
    }
    
    init() {
        // Start real-time updates
        this.startUpdates();
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopUpdates();
            } else {
                this.startUpdates();
            }
        });
    }
    
    startUpdates() {
        if (this.updateInterval) return;
        
        this.updateInterval = setInterval(() => {
            this.updateDashboardData();
        }, 30000); // Update every 30 seconds
    }
    
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    updateDashboardData() {
        // Simulate real-time data updates
        const statCards = document.querySelectorAll('.stat-card .card-title');
        
        statCards.forEach(card => {
            const currentValue = parseInt(card.textContent.replace(/,/g, ''));
            const variation = Math.floor(Math.random() * 100) - 50;
            const newValue = Math.max(0, currentValue + variation);
            
            if (variation !== 0) {
                card.textContent = newValue.toLocaleString();
                
                // Add highlight effect
                card.style.background = 'rgba(255, 255, 255, 0.2)';
                setTimeout(() => {
                    card.style.background = '';
                }, 1000);
            }
        });
    }
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main dashboard
    window.dashboard = new DashboardApp();
    
    // Initialize search manager
    window.searchManager = new SearchManager();
    
    // Initialize real-time updater
    window.realtimeUpdater = new RealtimeUpdater();
    
    console.log('🚀 Dashboard fully loaded and ready!');
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.realtimeUpdater) {
        window.realtimeUpdater.stopUpdates();
    }
});

// Export for global access
window.DashboardUtils = {
    showNotification: (message, type, duration) => {
        if (window.dashboard) {
            window.dashboard.showNotification(message, type, duration);
        }
    },
    
    toggleTheme: () => {
        if (window.dashboard) {
            window.dashboard.toggleTheme();
        }
    },
    
    formatNumber: (num) => num.toLocaleString(),
    
    formatCurrency: (amount) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
};