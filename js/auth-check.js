// ============================================================
// AUTH CHECK SCRIPT - Proteksi semua dashboard
// Dashboard tidak bisa diakses langsung tanpa login
// ============================================================

(function() {
    // Ambil data session
    const auth = sessionStorage.getItem('dashboardAuth');
    
    // Tentukan halaman dashboard yang sedang diakses
    const currentPage = window.location.pathname.split('/').pop();
    let requiredDashboard = '';
    
    if (currentPage === 'page1.html') requiredDashboard = 'dashboard1';
    else if (currentPage === 'page2.html') requiredDashboard = 'dashboard2';
    else if (currentPage === 'page3.html') requiredDashboard = 'dashboard3';
    else if (currentPage === 'page4.html') requiredDashboard = 'dashboard4';
    else {
        // Jika bukan dashboard yang dikenal, redirect ke login
        window.location.href = 'index.html';
        return;
    }
    
    // Jika tidak ada session sama sekali
    if (!auth) {
        // Simpan pesan bahwa perlu login
        sessionStorage.setItem('redirectAfterLogin', currentPage);
        window.location.href = 'index.html?redirect=' + encodeURIComponent(currentPage);
        return;
    }
    
    try {
        const userData = JSON.parse(auth);
        const currentTime = new Date().getTime();
        const loginTime = userData.loginTime || 0;
        
        // Cek apakah session expired (30 menit)
        if (currentTime - loginTime > 30 * 60 * 1000) {
            sessionStorage.clear();
            window.location.href = 'index.html?expired=1';
            return;
        }
        
        // Cek apakah user memiliki akses ke dashboard ini
        if (userData.dashboard !== requiredDashboard) {
            // Redirect ke dashboard yang sesuai
            let targetPage = '';
            if (userData.dashboard === 'dashboard1') targetPage = 'page1.html';
            else if (userData.dashboard === 'dashboard2') targetPage = 'page2.html';
            else if (userData.dashboard === 'dashboard3') targetPage = 'page3.html';
            else if (userData.dashboard === 'dashboard4') targetPage = 'page4.html';
            else targetPage = 'index.html';
            
            window.location.href = targetPage;
            return;
        }
        
        // Update last activity (perpanjang session)
        userData.lastActivity = currentTime;
        sessionStorage.setItem('dashboardAuth', JSON.stringify(userData));
        
        // Tampilkan nama user di console (opsional)
        console.log(`✅ Authenticated as: ${userData.displayName} | Dashboard: ${requiredDashboard}`);
        
    } catch (e) {
        // Session corrupt, hapus dan redirect ke login
        console.error('Auth check error:', e);
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
})();

// ============================================================
// FUNGSI LOGOUT GLOBAL
// ============================================================
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// ============================================================
// FUNGSI UTILITY: Cek Status Login (bisa dipanggil dari dashboard)
// ============================================================
function isAuthenticated() {
    const auth = sessionStorage.getItem('dashboardAuth');
    if (!auth) return false;
    try {
        const userData = JSON.parse(auth);
        const currentTime = new Date().getTime();
        const loginTime = userData.loginTime || 0;
        return (currentTime - loginTime < 30 * 60 * 1000);
    } catch(e) {
        return false;
    }
}

function getCurrentUser() {
    const auth = sessionStorage.getItem('dashboardAuth');
    if (!auth) return null;
    try {
        return JSON.parse(auth);
    } catch(e) {
        return null;
    }
}
