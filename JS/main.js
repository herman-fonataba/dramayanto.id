// Main JavaScript for Login and Forgot Password pages

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DEMO USER DATABASE (4 LEVELS) ====================
    const demoUsers = [
        { id: 1, email: 'admin@phoenix.com', password: 'admin123', role: 'admin', name: 'Admin Utama', dojang: '', phone: '081234567890' },
        { id: 2, email: 'supervisor@phoenix.com', password: 'super123', role: 'supervisor', name: 'Budi Santoso', dojang: 'SMANSA', phone: '081234567891' },
        { id: 3, email: 'dewi@phoenix.com', password: 'super123', role: 'supervisor', name: 'Dewi Lestari', dojang: 'ZPENSA', phone: '081234567892' },
        { id: 4, email: 'eko@phoenix.com', password: 'op123', role: 'operator', name: 'Eko Prasetyo', dojang: 'SMANSA', phone: '081234567893' },
        { id: 5, email: 'siti@phoenix.com', password: 'op123', role: 'operator', name: 'Siti Aminah', dojang: 'ZPENSA', phone: '081234567894' },
        { id: 6, email: 'user@phoenix.com', password: 'user123', role: 'user', name: 'Member User', dojang: 'SMANSA', phone: '081234567895' }
    ];
    
    // Load existing users from localStorage or use defaults
    let systemUsers = JSON.parse(localStorage.getItem('systemUsers') || '[]');
    if (systemUsers.length === 0) {
        systemUsers = demoUsers;
        localStorage.setItem('systemUsers', JSON.stringify(systemUsers));
    }
    
    // ==================== LOAD JADWAL LOGIN ====================
    function loadLoginSchedule() {
        const dojangSchedules = JSON.parse(localStorage.getItem('dojangSchedules') || '{}');
        const container = document.getElementById('loginScheduleList');
        if (!container) return;
        
        if (Object.keys(dojangSchedules).length === 0) {
            container.innerHTML = `
                <div class="schedule-school">SMP NEGERI 1 KOTA SORONG</div>
                <div class="schedule-days"><div class="schedule-item"><i class="fas fa-calendar-alt"></i><span class="day">Kamis & Sabtu</span><span class="time">15.30-17.30 <span class="wit-badge">WIT</span></span></div></div>
                <div class="schedule-school">SMA NEGERI 1 KOTA SORONG</div>
                <div class="schedule-days">
                    <div class="schedule-item"><i class="fas fa-calendar-alt"></i><span class="day">Selasa</span><span class="time">15.30-17.30 <span class="wit-badge">WIT</span></span></div>
                    <div class="schedule-item"><i class="fas fa-calendar-alt"></i><span class="day">Jumat</span><span class="time">15.00-17.00 <span class="wit-badge">WIT</span></span></div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        for (const [dojang, schedule] of Object.entries(dojangSchedules)) {
            if (schedule.hari && schedule.hari.length > 0) {
                const hariText = schedule.hari.join(' & ');
                container.innerHTML += `
                    <div class="schedule-dojang-title"><i class="fas fa-school"></i> ${escapeHtml(dojang)}</div>
                    <div class="schedule-days">
                        <div class="schedule-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span class="day">${escapeHtml(hariText)}</span>
                            <span class="time">${escapeHtml(schedule.jam)} <span class="wit-badge">${escapeHtml(schedule.zona)}</span></span>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    loadLoginSchedule();
    
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
            
            const user = systemUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Save to localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                loginSuccess.classList.add('show');
                
                // Redirect based on role
                setTimeout(() => {
                    if (user.role === 'admin') {
                        window.location.href = 'dashboard-admin.html';
                    } else if (user.role === 'supervisor') {
                        window.location.href = 'dashboard-supervisor.html';
                    } else if (user.role === 'operator') {
                        window.location.href = 'dashboard-operator.html';
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
            
            const user = systemUsers.find(u => u.email === email);
            
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
            alert('📝 DEMO MODE\n\nGunakan akun demo:\n\n🔴 Admin: admin@phoenix.com / admin123\n👔 Supervisor: supervisor@phoenix.com / super123\n⚙️ Operator: operator@phoenix.com / op123\n🥋 User: user@phoenix.com / user123\n\nFitur registrasi akan tersedia di versi selanjutnya.');
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
    
    // ==================== FIRE PARTICLE EFFECT ====================
    const canvas = document.getElementById('phoenixCanvas');
    if (canvas && window.innerWidth > 768) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        
        let particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                vy: -Math.random() * 1 - 0.5
            });
        }
        
        function animateFire() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 100, 0, ${p.alpha})`;
                ctx.fill();
                p.y += p.vy;
                if (p.y < 0) p.y = canvas.height;
            });
            
            requestAnimationFrame(animateFire);
        }
        
        animateFire();
    }
    
    // ==================== EMBER EFFECT ====================
    const emberContainer = document.getElementById('emberContainer');
    if (emberContainer && window.innerWidth > 768) {
        setInterval(() => {
            const ember = document.createElement('div');
            ember.className = 'ember';
            ember.style.left = Math.random() * 100 + '%';
            ember.style.width = Math.random() * 8 + 4 + 'px';
            ember.style.height = ember.style.width;
            ember.style.bottom = '0px';
            ember.style.opacity = Math.random() * 0.7 + 0.3;
            emberContainer.appendChild(ember);
            
            setTimeout(() => {
                ember.remove();
            }, 2000);
        }, 800);
    }
});