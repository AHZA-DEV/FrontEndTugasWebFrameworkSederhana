// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSidebar();
    initDataTables();
    initFormValidation();
    initTooltips();
    initModals();
    initSearch();
    loadDashboardStats();
    initDashboardChart();
    initCurrentDate();
    
    // Initialize logout handlers
    const logoutLinks = document.querySelectorAll('a[data-action="logout"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            confirmLogout();
        });
    });
});

// Sidebar functionality
function initSidebar() {
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
    
    // Mobile sidebar toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar) {
            if (!sidebar.contains(e.target) && (!mobileToggle || !mobileToggle.contains(e.target))) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// DataTables initialization
function initDataTables() {
    // Check if jQuery and DataTables are available
    if (window.jQuery && window.jQuery.fn && (window.jQuery.fn.DataTable || window.jQuery.fn.dataTable)) {
        // Initialize all tables with class 'data-table'
        jQuery('.data-table').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Indonesian.json"
            },
            "responsive": true,
            "pageLength": 10,
            "order": [[0, "desc"]],
            "columnDefs": [
                { 
                    "targets": -1, 
                    "orderable": false 
                }
            ]
        });
    }
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

// Initialize tooltips
function initTooltips() {
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Initialize modals
function initModals() {
    // Add modal event listeners
    const deleteButtons = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#deleteModal"]');
    const deleteModal = document.getElementById('deleteModal');
    
    if (deleteModal) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-item-id');
                const itemName = this.getAttribute('data-item-name');
                const deleteForm = deleteModal.querySelector('#deleteForm');
                const itemNameSpan = deleteModal.querySelector('#itemName');
                
                if (deleteForm && itemId) {
                    deleteForm.setAttribute('data-item-id', itemId);
                }
                if (itemNameSpan && itemName) {
                    itemNameSpan.textContent = itemName;
                }
            });
        });
    }
}

// Dashboard statistics loading
function loadDashboardStats() {
    // Simulate loading dashboard statistics
    const statCards = document.querySelectorAll('.stat-card [data-stat]');
    
    // Mock data - in real application, this would come from an API
    const stats = {
        totalBooks: 1250,
        totalMembers: 850,
        activeLoans: 45,
        overdueBooks: 12
    };
    
    statCards.forEach(card => {
        const statType = card.getAttribute('data-stat');
        if (stats[statType]) {
            // Animate number counting
            animateNumber(card, 0, stats[statType], 1000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const totalSteps = Math.max(1, Math.abs(range));
    const increment = Math.max(1, Math.abs(Math.floor(range / (duration / 16))));
    const stepTime = Math.max(16, Math.abs(Math.floor(duration / totalSteps)));
    let current = start;
    
    const timer = setInterval(function() {
        current += (range > 0 ? increment : -increment);
        if ((range > 0 && current >= end) || (range < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, stepTime);
}

// Utility functions
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    
    // Create message span safely
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    
    alertDiv.appendChild(messageSpan);
    alertDiv.appendChild(closeButton);
    
    alertContainer.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function confirmDelete(itemName, callback) {
    if (confirm(`Apakah Anda yakin ingin menghapus "${itemName}"?`)) {
        callback();
    }
}

// Form submission handlers
function handleFormSubmit(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Submit';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
        
        // Simulate API call
        setTimeout(() => {
            showAlert(successMessage, 'success');
            form.reset();
            form.classList.remove('was-validated');
            
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
            
            // Close modal if exists
            const modal = form.closest('.modal');
            if (modal) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
            
            // Refresh data table if exists
            if (window.jQuery && window.jQuery.fn && window.jQuery.fn.DataTable) {
                const table = jQuery('.data-table').DataTable();
                if (table && typeof table.ajax !== 'undefined' && table.ajax.reload) {
                    table.ajax.reload();
                }
            }
        }, 1500);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 3) {
                // Simulate search
                performSearch(query);
            } else if (searchResults) {
                searchResults.innerHTML = '';
            }
        });
    }
}

function performSearch(query) {
    // Mock search function - replace with actual API call
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    // Show loading state
    searchResults.innerHTML = '<div class="text-center p-3"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    
    setTimeout(() => {
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Create results container safely
        const listGroup = document.createElement('div');
        listGroup.className = 'list-group';
        
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item';
        listItem.textContent = `No results found for "${query}"`;
        
        listGroup.appendChild(listItem);
        searchResults.appendChild(listGroup);
    }, 1000);
}

// Chart management
let dashboardChart = null;

function initDashboardChart() {
    const chartCanvas = document.getElementById('loansChart');
    if (!chartCanvas || typeof Chart === 'undefined') return;
    
    const ctx = chartCanvas.getContext('2d');
    dashboardChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            datasets: [{
                label: 'Peminjaman',
                data: [12, 19, 15, 25, 22, 18, 14],
                borderColor: 'rgb(13, 110, 253)',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Pengembalian',
                data: [8, 15, 12, 20, 18, 16, 11],
                borderColor: 'rgb(25, 135, 84)',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Chart period toggle handlers
    const periodRadios = document.querySelectorAll('input[name="chartPeriod"]');
    periodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateChartPeriod(this.id);
        });
    });
}

function updateChartPeriod(period) {
    if (!dashboardChart) return;
    
    switch (period) {
        case 'chartWeek':
            dashboardChart.data.labels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
            dashboardChart.data.datasets[0].data = [12, 19, 15, 25, 22, 18, 14];
            dashboardChart.data.datasets[1].data = [8, 15, 12, 20, 18, 16, 11];
            break;
        case 'chartMonth':
            dashboardChart.data.labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
            dashboardChart.data.datasets[0].data = [85, 92, 78, 88];
            dashboardChart.data.datasets[1].data = [72, 85, 70, 82];
            break;
        case 'chartYear':
            dashboardChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            dashboardChart.data.datasets[0].data = [320, 285, 310, 295, 340, 385, 390, 420, 375, 360, 330, 315];
            dashboardChart.data.datasets[1].data = [298, 275, 285, 280, 325, 368, 375, 395, 350, 345, 315, 300];
            break;
    }
    dashboardChart.update();
}

// Logout functionality
function confirmLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // In real application, this would clear sessions and redirect
        showAlert('Logout berhasil! Mengalihkan...', 'success');
        setTimeout(() => {
            window.location.href = '../login.html';
        }, 1500);
    }
}

// Initialize current date
function initCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Export functions for global access
window.AdminDashboard = {
    showAlert,
    confirmDelete,
    handleFormSubmit,
    animateNumber,
    performSearch,
    initDashboardChart,
    updateChartPeriod,
    confirmLogout
};