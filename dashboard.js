// Dashboard JavaScript for Admin and User pages

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CHECK LOGIN STATUS ====================
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    const userSabuk = localStorage.getItem('userSabuk') || 'Merah';
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }
    
    // ==================== ADMIN DASHBOARD ====================
    if (window.location.pathname.includes('dashboard-admin.html')) {
        // Check if user is admin
        if (userRole !== 'admin') {
            window.location.href = 'dashboard-user.html';
            return;
        }
        
        // Display admin name
        const adminNameSpan = document.getElementById('adminName');
        const adminBadge = document.getElementById('adminBadge');
        if (adminNameSpan) adminNameSpan.textContent = `- ${userName}`;
        if (adminBadge) adminBadge.innerHTML = `<i class="fas fa-user-shield"></i> ${userName}`;
        
        // ==================== DATA PESERTA ====================
        let pesertaData = JSON.parse(localStorage.getItem('pesertaData') || '[]');
        
        // Sample data if empty
        if (pesertaData.length === 0) {
            pesertaData = [
                { nama: 'Arjuna Pratama', panggilan: 'Arjuna', tingkat: 'Sabuk Merah', dojang: 'SMANSA', kelas: 'XI', status: 'Aktif' },
                { nama: 'Kirana Dewi', panggilan: 'Kirana', tingkat: 'Sabuk Hijau', dojang: 'ZPENSA', kelas: 'X', status: 'Aktif' },
                { nama: 'Bayu Saputra', panggilan: 'Bayu', tingkat: 'Sabuk Kuning', dojang: 'SMANSA', kelas: 'IX', status: 'Aktif' }
            ];
            localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
        }
        
        // Function to render peserta cards
        function renderPeserta() {
            const pesertaGrid = document.getElementById('pesertaGrid');
            if (!pesertaGrid) return;
            
            if (pesertaData.length === 0) {
                pesertaGrid.innerHTML = '<div style="text-align: center; color: #ffaa77; padding: 40px;">Belum ada data peserta. Klik "Tambah Peserta" untuk menambahkan.</div>';
                return;
            }
            
            pesertaGrid.innerHTML = pesertaData.map((peserta, index) => `
                <div class="peserta-card" data-id="${index}">
                    <div class="card-header">
                        <div class="profile-icon">
                            <i class="fas fa-user-ninja"></i>
                        </div>
                        <div class="card-title">
                            <h3>${escapeHtml(peserta.nama)}</h3>
                            <span class="card-number">#${index + 1} ${peserta.status || 'Aktif'}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <span>🏷️ Panggilan</span>
                        <span>${escapeHtml(peserta.panggilan || '-')}</span>
                    </div>
                    <div class="detail-item">
                        <span>🥋 Tingkat</span>
                        <span>${escapeHtml(peserta.tingkat || '-')}</span>
                    </div>
                    <div class="detail-item">
                        <span>🏫 Asal Dojang</span>
                        <span>${escapeHtml(peserta.dojang || '-')}</span>
                    </div>
                    <div class="detail-item">
                        <span>📚 Kelas</span>
                        <span>${escapeHtml(peserta.kelas || '-')}</span>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn btn-info" onclick="viewPeserta(${index})">
                            <i class="fas fa-eye"></i> Detail
                        </button>
                        <button class="card-btn btn-edit" onclick="editPeserta(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="card-btn btn-hapus" onclick="deletePeserta(${index})">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            `).join('');
            
            // Update stats
            const totalPeserta = document.getElementById('totalPeserta');
            const aktifCount = document.getElementById('aktifCount');
            if (totalPeserta) totalPeserta.textContent = pesertaData.length;
            if (aktifCount) aktifCount.textContent = pesertaData.filter(p => p.status !== 'Tidak Aktif').length;
            
            // Update recent activities
            updateRecentActivities();
        }
        
        // Escape HTML to prevent XSS
        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }
        
        // Update recent activities
        function updateRecentActivities() {
            const recentList = document.getElementById('recentList');
            if (!recentList) return;
            
            const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
            if (activities.length === 0) {
                recentList.innerHTML = '<div class="activity-item">Belum ada aktivitas terbaru</div>';
                return;
            }
            
            recentList.innerHTML = activities.slice(0, 5).map(act => `
                <div class="activity-item">
                    <i class="fas fa-clock"></i> ${escapeHtml(act)}
                </div>
            `).join('');
        }
        
        // Add activity log
        function addActivity(message) {
            const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
            const timestamp = new Date().toLocaleString('id-ID');
            activities.unshift(`${timestamp} - ${message}`);
            if (activities.length > 10) activities.pop();
            localStorage.setItem('recentActivities', JSON.stringify(activities));
            updateRecentActivities();
        }
        
        // Global functions for peserta
        window.viewPeserta = function(id) {
            const peserta = pesertaData[id];
            if (peserta) {
                alert(`📋 DETAIL PESERTA\n\nNama: ${peserta.nama}\nPanggilan: ${peserta.panggilan || '-'}\nTingkat: ${peserta.tingkat}\nDojang: ${peserta.dojang}\nKelas: ${peserta.kelas}\nStatus: ${peserta.status || 'Aktif'}`);
            }
        };
        
        window.editPeserta = function(id) {
            const peserta = pesertaData[id];
            if (peserta) {
                document.getElementById('nama').value = peserta.nama;
                document.getElementById('panggilan').value = peserta.panggilan || '';
                document.getElementById('tingkat').value = peserta.tingkat;
                document.getElementById('dojang').value = peserta.dojang || '';
                document.getElementById('kelas').value = peserta.kelas || '';
                document.getElementById('status').value = peserta.status || 'Aktif';
                
                // Store edit ID
                window.editId = id;
                
                const modal = document.getElementById('modalTambah');
                const modalTitle = modal.querySelector('.modal-header h2');
                if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Peserta';
                modal.classList.add('active');
            }
        };
        
        window.deletePeserta = function(id) {
            if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
                const deleted = pesertaData[id];
                pesertaData.splice(id, 1);
                localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
                renderPeserta();
                addActivity(`Menghapus peserta: ${deleted.nama}`);
            }
        };
        
        // Modal functionality
        const modal = document.getElementById('modalTambah');
        const btnTambah = document.getElementById('btnTambah');
        const closeModal = document.querySelector('.close-modal');
        
        if (btnTambah) {
            btnTambah.addEventListener('click', function() {
                document.getElementById('formPeserta').reset();
                window.editId = null;
                const modalTitle = modal.querySelector('.modal-header h2');
                if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-user-plus"></i> Tambah Peserta Baru';
                modal.classList.add('active');
            });
        }
        
        if (closeModal) {
            closeModal.addEventListener('click', () => modal.classList.remove('active'));
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
        
        // Form submit handler
        const formPeserta = document.getElementById('formPeserta');
        if (formPeserta) {
            formPeserta.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newPeserta = {
                    nama: document.getElementById('nama').value,
                    panggilan: document.getElementById('panggilan').value,
                    tingkat: document.getElementById('tingkat').value,
                    dojang: document.getElementById('dojang').value,
                    kelas: document.getElementById('kelas').value,
                    status: document.getElementById('status').value
                };
                
                if (window.editId !== undefined && window.editId !== null) {
                    // Edit existing
                    const oldName = pesertaData[window.editId].nama;
                    pesertaData[window.editId] = newPeserta;
                    addActivity(`Mengedit peserta: ${oldName} -> ${newPeserta.nama}`);
                    window.editId = null;
                } else {
                    // Add new
                    pesertaData.push(newPeserta);
                    addActivity(`Menambahkan peserta baru: ${newPeserta.nama}`);
                }
                
                localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
                renderPeserta();
                formPeserta.reset();
                modal.classList.remove('active');
            });
        }
        
        // ==================== JADWAL MANAGEMENT ====================
        const saveScheduleBtn = document.getElementById('saveSchedule');
        if (saveScheduleBtn) {
            // Load saved schedule
            const savedSchedule = JSON.parse(localStorage.getItem('scheduleData') || '{}');
            if (savedSchedule.mon) document.getElementById('scheduleMon').value = savedSchedule.mon;
            if (savedSchedule.tue) document.getElementById('scheduleTue').value = savedSchedule.tue;
            if (savedSchedule.wed) document.getElementById('scheduleWed').value = savedSchedule.wed;
            if (savedSchedule.thu) document.getElementById('scheduleThu').value = savedSchedule.thu;
            if (savedSchedule.sat) document.getElementById('scheduleSat').value = savedSchedule.sat;
            
            saveScheduleBtn.addEventListener('click', function() {
                const scheduleData = {
                    mon: document.getElementById('scheduleMon').value,
                    tue: document.getElementById('scheduleTue').value,
                    wed: document.getElementById('scheduleWed').value,
                    thu: document.getElementById('scheduleThu').value,
                    sat: document.getElementById('scheduleSat').value
                };
                localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
                addActivity('Memperbarui jadwal latihan');
                alert('✅ Jadwal berhasil disimpan!');
            });
        }
        
        // ==================== PENGUMUMAN MANAGEMENT ====================
        const saveAnnouncementBtn = document.getElementById('saveAnnouncement');
        const announcementText = document.getElementById('announcementText');
        const currentAnnouncement = document.getElementById('currentAnnouncement');
        
        if (saveAnnouncementBtn) {
            // Load saved announcement
            const savedAnnouncement = localStorage.getItem('announcement') || 'Selamat datang di Phoenix Taekwondo Family! Jaga semangat latihan dan disiplin.';
            if (announcementText) announcementText.value = savedAnnouncement;
            if (currentAnnouncement) currentAnnouncement.textContent = savedAnnouncement;
            
            saveAnnouncementBtn.addEventListener('click', function() {
                const newAnnouncement = announcementText.value;
                localStorage.setItem('announcement', newAnnouncement);
                if (currentAnnouncement) currentAnnouncement.textContent = newAnnouncement;
                addActivity('Memperbarui pengumuman');
                alert('✅ Pengumuman berhasil disimpan!');
            });
        }
        
        // ==================== PAGE NAVIGATION ====================
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        const pages = {
            dashboard: document.getElementById('page-dashboard'),
            peserta: document.getElementById('page-peserta'),
            jadwal: document.getElementById('page-jadwal'),
            pengumuman: document.getElementById('page-pengumuman')
        };
        
        function showPage(pageId) {
            Object.keys(pages).forEach(key => {
                if (pages[key]) pages[key].style.display = 'none';
            });
            if (pages[pageId]) pages[pageId].style.display = 'block';
            
            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                if (pageId) showPage(pageId);
            });
        });
        
        // Show dashboard by default
        showPage('dashboard');
        
        // ==================== SIDEBAR TOGGLE ====================
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                sidebarOverlay.classList.toggle('active');
            });
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
            });
        }
        
        // Initial render
        renderPeserta();
    }
    
    // ==================== USER DASHBOARD ====================
    if (window.location.pathname.includes('dashboard-user.html')) {
        // Display user info
        const userGreeting = document.getElementById('userGreeting');
        const userEmailDisplay = document.getElementById('userEmailDisplay');
        const userSabukSpan = document.getElementById('userSabuk');
        
        if (userGreeting) userGreeting.innerHTML = `<i class="fas fa-fire"></i> Selamat Datang, ${userName}!`;
        if (userEmailDisplay) userEmailDisplay.innerHTML = `<i class="fas fa-envelope"></i> ${userEmail}`;
        if (userSabukSpan) userSabukSpan.textContent = userSabuk;
        
        // Load announcement
        const announcement = localStorage.getItem('announcement') || 'Selamat datang di Phoenix Taekwondo Family! Jaga semangat latihan dan disiplin.';
        const userAnnouncement = document.getElementById('userAnnouncement');
        if (userAnnouncement) userAnnouncement.innerHTML = `<p><i class="fas fa-bullhorn"></i> ${announcement}</p>`;
        
        // Load schedule
        const scheduleData = JSON.parse(localStorage.getItem('scheduleData') || '{}');
        const userSchedule = document.getElementById('userSchedule');
        if (userSchedule) {
            userSchedule.innerHTML = `
                <li><i class="fas fa-calendar-day"></i> Senin & Rabu: ${scheduleData.mon || '16:00 - 18:00 WIB'}</li>
                <li><i class="fas fa-calendar-day"></i> Selasa & Kamis: ${scheduleData.tue || '15:30 - 17:30 WIB'}</li>
                <li><i class="fas fa-calendar-day"></i> Sabtu: ${scheduleData.sat || '08:00 - 10:00 WIB'}</li>
                <li><i class="fas fa-map-marker-alt"></i> Lokasi: GOR Phoenix, Jl. Merpati No. 45</li>
            `;
        }
        
        // Attendance animation
        const attendancePercent = document.getElementById('attendancePercent');
        const attendanceFill = document.getElementById('attendanceFill');
        if (attendanceFill) {
            setTimeout(() => {
                attendanceFill.style.width = '85%';
            }, 100);
        }
    }
    
    // ==================== LOGOUT FUNCTION ====================
    const logoutBtn = document.getElementById('logoutBtn');
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userSabuk');
        window.location.href = 'index.html';
    }
    
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (userLogoutBtn) userLogoutBtn.addEventListener('click', logout);
});