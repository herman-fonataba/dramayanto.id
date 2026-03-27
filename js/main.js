// Main JavaScript for Login and Forgot Password pages

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DEMO USER DATABASE ====================
    const demoUsers = [
        { email: 'admin@phoenix.com', password: 'admin123', role: 'admin', name: 'Admin Phoenix', sabuk: 'Hitam' },
        { email: 'user@phoenix.com', password: 'user123', role: 'user', name: 'Member User', sabuk: 'Merah' }
    ];
    
    // ==================== LOGIN FORM HANDLER ====================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const loginError = document.getElementById('loginError');
        const loginSuccess = document.getElementById('loginSuccess');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        // Password toggle
        const togglePassword = document.querySelector('.password-toggle');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
        
        // Handle login submit
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            
            loginError.classList.remove('show');
            loginSuccess.classList.remove('show');
            
            const user = demoUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Save to localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('userName', user.name);
                localStorage.setItem('userSabuk', user.sabuk);
                
                loginSuccess.classList.add('show');
                
                setTimeout(() => {
                    if (user.role === 'admin') {
                        window.location.href = 'dashboard-admin.html';
                    } else {
                        window.location.href = 'dashboard-user.html';
                    }
                }, 1500);
            } else {
                loginError.classList.add('show');
                emailInput.style.borderColor = '#ff4444';
                passwordInput.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '#c06000';
                    passwordInput.style.borderColor = '#c06000';
                }, 2000);
            }
        });
        
        // Clear error on focus
        emailInput.addEventListener('focus', () => {
            emailInput.style.borderColor = '#ff9933';
            loginError.classList.remove('show');
        });
        
        passwordInput.addEventListener('focus', () => {
            passwordInput.style.borderColor = '#ff9933';
            loginError.classList.remove('show');
        });
    }
    
    // ==================== FORGOT PASSWORD HANDLER ====================
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        const resetMessage = document.getElementById('resetMessage');
        const resetSuccess = document.getElementById('resetSuccess');
        
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value.trim().toLowerCase();
            const fullName = document.getElementById('fullName').value.trim();
            
            const user = demoUsers.find(u => u.email === email);
            
            if (user && (fullName === user.name || fullName.toLowerCase() === user.name.toLowerCase())) {
                resetSuccess.style.display = 'block';
                resetSuccess.innerHTML = `<i class="fas fa-check-circle"></i> Link reset telah dikirim ke ${email}<br><small>Demo: Password Anda adalah "${user.password}"</small>`;
                resetMessage.style.display = 'none';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                resetMessage.style.display = 'block';
                resetMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Email atau nama tidak ditemukan!';
                resetSuccess.style.display = 'none';
            }
        });
    }
    
    // ==================== REGISTER LINK DEMO ====================
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📝 DEMO MODE\n\nGunakan akun demo:\n\nAdmin: admin@phoenix.com / admin123\nUser: user@phoenix.com / user123\n\nFitur registrasi akan tersedia di versi selanjutnya.');
        });
    }
    
    // ==================== ANTI SCREENSHOT ====================
    const screenshotOverlay = document.getElementById('screenshotOverlay');
    
    function showScreenshotWarning() {
        if (screenshotOverlay) {
            screenshotOverlay.style.display = 'flex';
            setTimeout(() => {
                screenshotOverlay.style.display = 'none';
            }, 3000);
        }
    }
    
    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen') {
            showScreenshotWarning();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            showScreenshotWarning();
        }
    });
    
    // ==================== DEVICE DETECTION ====================
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        const blocker = document.getElementById('iphoneBlocker');
        if (blocker) {
            blocker.classList.add('show');
            setTimeout(() => {
                if (blocker) blocker.classList.remove('show');
            }, 5000);
        }
    }
});
