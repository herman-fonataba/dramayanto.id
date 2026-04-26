// Phoenix Dashboard - Complete JavaScript for All User Roles

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== CHECK LOGIN ====================
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // ==================== MASTER DATA ====================
    let dojangList = JSON.parse(localStorage.getItem('dojangList') || '["SMANSA", "ZPENSA"]');
    let agamaList = JSON.parse(localStorage.getItem('agamaList') || '["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]');
    let users = JSON.parse(localStorage.getItem('systemUsers') || '[]');
    let pesertaData = JSON.parse(localStorage.getItem('pesertaData') || '[]');
    let absensiData = JSON.parse(localStorage.getItem('absensiData') || '{}');
    let galleryData = JSON.parse(localStorage.getItem('galleryData') || '[]');
    let activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    
    // UKT Data
    let uktSettings = JSON.parse(localStorage.getItem('uktSettings') || '{}');
    let uktPendaftar = JSON.parse(localStorage.getItem('uktPendaftar') || '[]');
    
    // Dojang Schedules
    let dojangSchedules = JSON.parse(localStorage.getItem('dojangSchedules') || '{}');
    
    // Initialize default users if empty
    if (users.length === 0) {
        users = [
            { id: 1, role: 'admin', name: 'Admin Utama', username: 'admin', email: 'admin@phoenix.com', password: 'admin123', dojang: '', status: 'Aktif', phone: '081234567890', createdAt: '2024-01-01' },
            { id: 2, role: 'supervisor', name: 'Budi Santoso', username: 'supervisor1', email: 'supervisor@phoenix.com', password: 'super123', dojang: 'SMANSA', status: 'Aktif', phone: '081234567891', createdAt: '2024-01-15' },
            { id: 3, role: 'supervisor', name: 'Dewi Lestari', username: 'supervisor2', email: 'dewi@phoenix.com', password: 'super123', dojang: 'ZPENSA', status: 'Aktif', phone: '081234567892', createdAt: '2024-02-01' },
            { id: 4, role: 'operator', name: 'Eko Prasetyo', username: 'operator1', email: 'eko@phoenix.com', password: 'op123', dojang: 'SMANSA', status: 'Aktif', phone: '081234567893', createdAt: '2024-01-20' },
            { id: 5, role: 'operator', name: 'Siti Aminah', username: 'operator2', email: 'siti@phoenix.com', password: 'op123', dojang: 'ZPENSA', status: 'Aktif', phone: '081234567894', createdAt: '2024-02-10' },
            { id: 6, role: 'user', name: 'Member User', username: 'user1', email: 'user@phoenix.com', password: 'user123', dojang: 'SMANSA', status: 'Aktif', phone: '081234567895', createdAt: '2024-01-25' }
        ];
        localStorage.setItem('systemUsers', JSON.stringify(users));
    }
    
    // Initialize peserta data with complete fields
    if (pesertaData.length === 0) {
        pesertaData = [
            { id: 1, noUrut: 1, nama: 'Arjuna Pratama', panggilan: 'Arjuna', jenisKelamin: 'Laki-laki', agama: 'Islam', tempatTinggal: 'Jl. Merpati No. 10, Surabaya', dojang: 'SMANSA', kelas: 'XI', tanggalLahir: '2007-05-10', umur: '17 tahun', beratBadan: '55', tinggiBadan: '165', tingkat: 'Merah', status: 'Aktif', phone: '081234567890', fotoProfil: null },
            { id: 2, noUrut: 2, nama: 'Kirana Dewi', panggilan: 'Kirana', jenisKelamin: 'Perempuan', agama: 'Islam', tempatTinggal: 'Jl. Kenari No. 5, Surabaya', dojang: 'ZPENSA', kelas: 'X', tanggalLahir: '2008-03-15', umur: '16 tahun', beratBadan: '48', tinggiBadan: '158', tingkat: 'Hijau', status: 'Aktif', phone: '081234567891', fotoProfil: null },
            { id: 3, noUrut: 3, nama: 'Bayu Saputra', panggilan: 'Bayu', jenisKelamin: 'Laki-laki', agama: 'Kristen', tempatTinggal: 'Jl. Mawar No. 12, Surabaya', dojang: 'SMANSA', kelas: 'IX', tanggalLahir: '2009-07-22', umur: '15 tahun', beratBadan: '52', tinggiBadan: '162', tingkat: 'Kuning', status: 'Aktif', phone: '081234567892', fotoProfil: null },
            { id: 4, noUrut: 4, nama: 'Citra Lestari', panggilan: 'Citra', jenisKelamin: 'Perempuan', agama: 'Hindu', tempatTinggal: 'Jl. Melati No. 8, Surabaya', dojang: 'ZPENSA', kelas: 'XI', tanggalLahir: '2007-11-08', umur: '17 tahun', beratBadan: '50', tinggiBadan: '160', tingkat: 'Biru', status: 'Aktif', phone: '081234567893', fotoProfil: null },
            { id: 5, noUrut: 5, nama: 'Dimas Pradana', panggilan: 'Dimas', jenisKelamin: 'Laki-laki', agama: 'Budha', tempatTinggal: 'Jl. Anggrek No. 20, Surabaya', dojang: 'SMANSA', kelas: 'XII', tanggalLahir: '2006-09-18', umur: '18 tahun', beratBadan: '62', tinggiBadan: '172', tingkat: 'Hitam (Dan 1)', status: 'Aktif', phone: '081234567894', fotoProfil: null }
        ];
        localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
    }
    
    // Initialize gallery data if empty
    if (galleryData.length === 0) {
        galleryData = [
            { id: 1, category: 'latihan', caption: 'Latihan rutin bersama instruktur', date: '2024-03-10', uploadedBy: 'Admin' },
            { id: 2, category: 'kejuaraan', caption: 'Tim Phoenix di Kejuaraan Daerah', date: '2024-02-20', uploadedBy: 'Budi Santoso' }
        ];
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
    }
    
    // Initialize UKT settings if empty
    if (!uktSettings.tglBuka) {
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        uktSettings = {
            tglBuka: now.toISOString().slice(0, 16),
            tglTutup: nextWeek.toISOString().slice(0, 16),
            info: 'Pendaftaran Kenaikan Tingkat Sabuk (UKT) periode ini. Persiapkan diri sebaik mungkin!',
            isActive: true
        };
        localStorage.setItem('uktSettings', JSON.stringify(uktSettings));
    }
    
    // Initialize dojang schedules if empty
    function initDojangSchedules() {
        dojangList.forEach(dojang => {
            if (!dojangSchedules[dojang]) {
                dojangSchedules[dojang] = {
                    hari: [],
                    jam: '15:30 - 17:30',
                    zona: 'WIT'
                };
            }
        });
        localStorage.setItem('dojangSchedules', JSON.stringify(dojangSchedules));
    }
    initDojangSchedules();
    
    // ==================== BELT DATA ====================
    const beltData = [
        { name: 'Putih', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/1.png', key: 'Putih' },
        { name: 'Kuning', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/2.png', key: 'Kuning' },
        { name: 'Kuning Strip Hijau', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/3.png', key: 'Kuning Strip Hijau' },
        { name: 'Hijau', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/4.png', key: 'Hijau' },
        { name: 'Hijau Strip Biru', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/5.png', key: 'Hijau Strip Biru' },
        { name: 'Biru', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/6.png', key: 'Biru' },
        { name: 'Biru Strip Merah', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/7.png', key: 'Biru Strip Merah' },
        { name: 'Merah', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/8.png', key: 'Merah' },
        { name: 'Merah Strip Hitam', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/9.png', key: 'Merah Strip Hitam (Poom 1)' },
        { name: 'Hitam', imgUrl: 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png', key: 'Hitam (Dan 1)' }
    ];
    
    // ==================== HELPER FUNCTIONS ====================
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    function addActivity(message, type = 'info') {
        const timestamp = new Date().toLocaleString('id-ID');
        activities.unshift({ message, timestamp, type, user: currentUser.name });
        if (activities.length > 20) activities.pop();
        localStorage.setItem('recentActivities', JSON.stringify(activities));
        updateRecentActivities();
    }
    
    function updateRecentActivities() {
        const container = document.getElementById('recentActivities');
        if (!container) return;
        if (activities.length === 0) {
            container.innerHTML = '<div class="activity-item">Belum ada aktivitas</div>';
            return;
        }
        container.innerHTML = activities.slice(0, 8).map(act => `
            <div class="activity-item">
                <i class="fas ${act.type === 'warning' ? 'fa-exclamation-triangle' : act.type === 'success' ? 'fa-check-circle' : 'fa-fire'}"></i>
                <span>${escapeHtml(act.message)}</span>
                <span class="activity-time">${act.timestamp}</span>
            </div>
        `).join('');
    }
    
    function updateDateTime() {
        const now = new Date();
        const datetimeEl = document.getElementById('datetime');
        const currentDateEl = document.getElementById('currentDate');
        if (datetimeEl) datetimeEl.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (currentDateEl) currentDateEl.textContent = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    // ==================== USER ROLE HELPERS ====================
    function getUserDojang() {
        if (currentUser.role === 'admin') return null;
        const user = users.find(u => u.id === currentUser.id);
        return user ? user.dojang : null;
    }
    
    function filterPesertaByDojang(peserta) {
        const userDojang = getUserDojang();
        if (!userDojang || currentUser.role === 'admin') return peserta;
        return peserta.filter(p => p.dojang === userDojang);
    }
    
    // ==================== GET BELT IMAGE URL ====================
    function getBeltImageUrl(tingkat) {
        const beltImageMap = {
            'Putih': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/1.png',
            'Kuning': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/2.png',
            'Kuning Strip Hijau': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/3.png',
            'Hijau': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/4.png',
            'Hijau Strip Biru': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/5.png',
            'Biru': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/6.png',
            'Biru Strip Merah': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/7.png',
            'Merah': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/8.png',
            'Merah Strip Hitam (Poom 1)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/9.png',
            'Merah Strip Hitam (Poom 2)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/9.png',
            'Merah Strip Hitam (Poom 3)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/9.png',
            'Hitam (Dan 1)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 2)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 3)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 4)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 5)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 6)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 7)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 8)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png',
            'Hitam (Dan 9)': 'https://phoenix-taekwondo-family.vercel.app/Foto/Sabuk%20Taekwondo/10.png'
        };
        
        for (const [key, url] of Object.entries(beltImageMap)) {
            if (tingkat.includes(key) || tingkat === key) {
                return url;
            }
        }
        return 'https://via.placeholder.com/60?text=🥋';
    }
    
    // ==================== GET STRIP COUNT FOR BELT ====================
    function getBeltStripCount(tingkat) {
        if (tingkat.includes('Poom 1')) return 1;
        if (tingkat.includes('Poom 2')) return 2;
        if (tingkat.includes('Poom 3')) return 3;
        if (tingkat.includes('Dan 1')) return 1;
        if (tingkat.includes('Dan 2')) return 2;
        if (tingkat.includes('Dan 3')) return 3;
        if (tingkat.includes('Dan 4')) return 4;
        if (tingkat.includes('Dan 5')) return 5;
        if (tingkat.includes('Dan 6')) return 6;
        if (tingkat.includes('Dan 7')) return 7;
        if (tingkat.includes('Dan 8')) return 8;
        if (tingkat.includes('Dan 9')) return 9;
        return 0;
    }
    
    function getDanNumber(tingkat) {
        const match = tingkat.match(/Dan (\d)/);
        return match ? parseInt(match[1]) : 0;
    }
    
    function getBeltDisplay(tingkat) {
        const beltImageUrl = getBeltImageUrl(tingkat);
        const stripCount = getBeltStripCount(tingkat);
        const danNumber = getDanNumber(tingkat);
        let display = `<img src="${beltImageUrl}" class="belt-small-img" style="width:30px;height:30px;">`;
        if (stripCount > 0 && tingkat.includes('Merah Strip Hitam')) {
            display += `<span class="belt-strip-${stripCount}"></span>`;
        } else if (danNumber > 0) {
            display += `<span class="dan-${danNumber}"></span>`;
        }
        return display;
    }
    
    // ==================== STATS FUNCTIONS ====================
    function calculateAgeCategories() {
        let junior = 0, senior = 0, sabeum = 0;
        pesertaData.forEach(p => {
            const umur = parseInt(p.umur) || 0;
            if (umur < 13) junior++;
            else if (umur >= 13 && umur <= 17) senior++;
            else if (umur >= 18) sabeum++;
        });
        return { junior, senior, sabeum };
    }
    
    function calculateDojangAttendance() {
        const today = new Date().toISOString().split('T')[0];
        const absensi = absensiData[today] || {};
        const dojangAttendance = {};
        dojangList.forEach(d => { dojangAttendance[d] = { hadir: 0, total: 0 }; });
        pesertaData.forEach(p => {
            if (dojangAttendance[p.dojang]) {
                dojangAttendance[p.dojang].total++;
                if (absensi[p.id] === 'Hadir') dojangAttendance[p.dojang].hadir++;
            }
        });
        return dojangAttendance;
    }
    
    function updateStats() {
        const filteredPeserta = filterPesertaByDojang(pesertaData);
        const totalPesertaEl = document.getElementById('totalPeserta');
        if (totalPesertaEl) totalPesertaEl.textContent = filteredPeserta.length;
        
        const today = new Date().toISOString().split('T')[0];
        const todayAbsensi = absensiData[today] || {};
        let hadirToday = 0;
        pesertaData.forEach(p => { if (todayAbsensi[p.id] === 'Hadir') hadirToday++; });
        const hadirHariIniEl = document.getElementById('hadirHariIni');
        if (hadirHariIniEl) hadirHariIniEl.textContent = hadirToday;
        
        const totalDojangEl = document.getElementById('totalDojang');
        if (totalDojangEl) totalDojangEl.textContent = dojangList.length;
        
        const supervisors = users.filter(u => u.role === 'supervisor' && u.status === 'Aktif').length;
        const operators = users.filter(u => u.role === 'operator' && u.status === 'Aktif').length;
        const totalUserMgmt = supervisors + operators;
        const totalUserManagementEl = document.getElementById('totalUserManagement');
        if (totalUserManagementEl) totalUserManagementEl.textContent = totalUserMgmt;
        
        const ageCats = calculateAgeCategories();
        document.getElementById('juniorCount').textContent = ageCats.junior;
        document.getElementById('seniorCount').textContent = ageCats.senior;
        document.getElementById('sabeumCount').textContent = ageCats.sabeum;
        
        const dojangAttendance = calculateDojangAttendance();
        const dojangListEl = document.getElementById('dojangAttendanceList');
        if (dojangListEl) {
            dojangListEl.innerHTML = Object.entries(dojangAttendance).map(([dojang, data]) => 
                `<div class="detail-item-custom"><span>🏫 ${dojang}</span><span>${data.hadir} / ${data.total} hadir</span></div>`
            ).join('');
        }
        
        document.getElementById('supervisorDetailCount').textContent = supervisors;
        document.getElementById('operatorDetailCount').textContent = operators;
        document.getElementById('userManagementTotal').textContent = supervisors + operators;
        
        const dojangStatsEl = document.getElementById('dojangStats');
        if (dojangStatsEl && getUserDojang()) dojangStatsEl.textContent = getUserDojang();
        
        const dojangTitleEls = document.querySelectorAll('#dojangTitle, #dojangAbsensi');
        if (dojangTitleEls.length && getUserDojang()) {
            dojangTitleEls.forEach(el => { if (el) el.textContent = getUserDojang(); });
        }
        
        const dojangNameEls = document.querySelectorAll('#dojangName');
        if (dojangNameEls.length && getUserDojang()) {
            dojangNameEls.forEach(el => { if (el) el.textContent = getUserDojang(); });
        }
    }
    
    // ==================== CHARTS ====================
    function initCharts() {
        const attendanceCtx = document.getElementById('attendanceChart');
        if (attendanceCtx) {
            new Chart(attendanceCtx, {
                type: 'line',
                data: { labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'], datasets: [{ label: 'Kehadiran', data: [42, 38, 45, 40, 35, 28], borderColor: '#ff5500', backgroundColor: 'rgba(255, 85, 0, 0.1)', tension: 0.4, fill: true }] },
                options: { responsive: true, plugins: { legend: { labels: { color: '#ffddaa' } } }, scales: { y: { grid: { color: 'rgba(255,100,0,0.2)' }, ticks: { color: '#ffaa77' } }, x: { ticks: { color: '#ffaa77' } } } }
            });
        }
        
        const beltCtx = document.getElementById('beltChart');
        if (beltCtx) {
            const filteredPeserta = filterPesertaByDojang(pesertaData);
            const beltCount = { 'Putih': filteredPeserta.filter(p => p.tingkat === 'Putih').length, 'Kuning': filteredPeserta.filter(p => p.tingkat === 'Kuning' || p.tingkat === 'Kuning Strip Hijau').length, 'Hijau': filteredPeserta.filter(p => p.tingkat === 'Hijau' || p.tingkat === 'Hijau Strip Biru').length, 'Biru': filteredPeserta.filter(p => p.tingkat === 'Biru' || p.tingkat === 'Biru Strip Merah').length, 'Merah': filteredPeserta.filter(p => p.tingkat === 'Merah' || p.tingkat.includes('Merah Strip')).length, 'Hitam': filteredPeserta.filter(p => p.tingkat.includes('Hitam')).length };
            new Chart(beltCtx, { type: 'doughnut', data: { labels: Object.keys(beltCount), datasets: [{ data: Object.values(beltCount), backgroundColor: ['#f5f5f5', '#ffd966', '#6fbf4c', '#3399ff', '#ff4444', '#222'], borderWidth: 0 }] }, options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#ffddaa' } } } } });
        }
    }
    
    function renderBeltBarChart() {
        const container = document.getElementById('beltBarsContainer');
        if (!container) return;
        
        const counts = {};
        beltData.forEach(belt => { counts[belt.key] = 0; });
        
        pesertaData.forEach(p => {
            const beltKey = beltData.find(b => p.tingkat.includes(b.key))?.key;
            if (beltKey && counts[beltKey] !== undefined) counts[beltKey]++;
            else if (p.tingkat.includes('Merah Strip Hitam')) counts['Merah Strip Hitam (Poom 1)']++;
            else if (p.tingkat.includes('Hitam')) counts['Hitam (Dan 1)']++;
        });
        
        const maxCount = Math.max(...Object.values(counts), 1);
        
        container.innerHTML = beltData.map(belt => {
            const count = counts[belt.key] || 0;
            const percentage = (count / maxCount) * 100;
            return `
                <div class="belt-bar-item">
                    <img src="${belt.imgUrl}" class="belt-icon-img" alt="${belt.name}" onerror="this.src='https://via.placeholder.com/50?text=${belt.name}'">
                    <div class="belt-bar-label">${belt.name}</div>
                    <div class="belt-bar-wrapper">
                        <div class="belt-bar-bg">
                            <div class="belt-bar-fill" style="width: ${percentage}%">${count}</div>
                        </div>
                    </div>
                    <div class="belt-count">${count} org</div>
                </div>
            `;
        }).join('');
    }
    
    let monthlyChart = null;
    function renderMonthlyAttendanceChart() {
        const ctx = document.getElementById('monthlyAttendanceChart');
        if (!ctx) return;
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const attendanceData = [65, 70, 75, 72, 80, 85, 82, 88, 86, 90, 85, 82];
        
        if (monthlyChart) monthlyChart.destroy();
        
        monthlyChart = new Chart(ctx, {
            type: 'line',
            data: { labels: months, datasets: [{ label: 'Kehadiran Bulanan', data: attendanceData, borderColor: '#ff5500', backgroundColor: 'rgba(255, 85, 0, 0.2)', fill: true, tension: 0.4, pointBackgroundColor: '#ff9933', pointBorderColor: '#fff', pointRadius: 5, pointHoverRadius: 7 }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#ffddaa' } }, tooltip: { callbacks: { label: (ctx) => `Kehadiran: ${ctx.raw}%` } } }, scales: { y: { min: 0, max: 100, grid: { color: 'rgba(255,100,0,0.2)' }, ticks: { color: '#ffaa77', callback: (v) => v + '%' } }, x: { ticks: { color: '#ffaa77' } } } }
        });
    }
    
    // ==================== STAT CLICK EVENTS ====================
    function initStatClickEvents() {
        const modalTotalPeserta = document.getElementById('modalTotalPeserta');
        const statTotalPeserta = document.getElementById('statTotalPeserta');
        if (statTotalPeserta && modalTotalPeserta) {
            statTotalPeserta.addEventListener('click', () => { updateStats(); modalTotalPeserta.classList.add('active'); });
        }
        
        const modalKehadiranDojang = document.getElementById('modalKehadiranDojang');
        const statKehadiranHariIni = document.getElementById('statKehadiranHariIni');
        if (statKehadiranHariIni && modalKehadiranDojang) {
            statKehadiranHariIni.addEventListener('click', () => { updateStats(); modalKehadiranDojang.classList.add('active'); });
        }
        
        const modalUserManagement = document.getElementById('modalUserManagement');
        const statTotalUserManagement = document.getElementById('statTotalUserManagement');
        if (statTotalUserManagement && modalUserManagement) {
            statTotalUserManagement.addEventListener('click', () => { updateStats(); modalUserManagement.classList.add('active'); });
        }
        
        document.querySelectorAll('.close-stats-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
            });
        });
    }
    
    // ==================== PESERTA FUNCTIONS ====================
    function generateNoUrut(dojang) {
        let filtered = [...pesertaData];
        if (dojang) filtered = filtered.filter(p => p.dojang === dojang);
        const maxNo = filtered.reduce((max, p) => { const no = parseInt(p.noUrut) || 0; return no > max ? no : max; }, 0);
        return maxNo + 1;
    }
    
    window.hitungUmur = function() {
        const tglLahir = document.getElementById('tanggalLahir').value;
        if (tglLahir) {
            const birthDate = new Date(tglLahir);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
            document.getElementById('umur').value = age + ' tahun';
        } else { document.getElementById('umur').value = ''; }
    };
    
    function renderPeserta(searchTerm = '', filterDojang = '', filterSabuk = '') {
        const grid = document.getElementById('pesertaGrid');
        if (!grid) return;
        
        let filtered = [...pesertaData];
        if (currentUser.role !== 'admin') filtered = filtered.filter(p => p.dojang === getUserDojang());
        if (searchTerm) filtered = filtered.filter(p => p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || (p.panggilan && p.panggilan.toLowerCase().includes(searchTerm.toLowerCase())));
        if (filterDojang && currentUser.role === 'admin') filtered = filtered.filter(p => p.dojang === filterDojang);
        if (filterSabuk) filtered = filtered.filter(p => p.tingkat === filterSabuk);
        
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>Tidak ada data peserta</p></div>';
            return;
        }
        
        grid.innerHTML = filtered.map(p => {
            const beltDisplay = getBeltDisplay(p.tingkat);
            const fotoProfil = p.fotoProfil || (p.jenisKelamin === 'Laki-laki' ? 'https://via.placeholder.com/60?text=👨' : 'https://via.placeholder.com/60?text=👩');
            return `
                <div class="peserta-card">
                    <div class="card-header">
                        <div class="profile-icon">
                            <img src="${fotoProfil}" class="profile-img" alt="Foto" onerror="this.src='https://via.placeholder.com/60?text=👤'">
                        </div>
                        <div class="card-title">
                            <h3>${escapeHtml(p.nama)}</h3>
                            <span class="card-number">No: ${p.noUrut || '-'} | ${p.status === 'Aktif' ? '🟢 Aktif' : '⚫ Tidak Aktif'}</span>
                        </div>
                    </div>
                    <div class="detail-item"><span>🏷️ Panggilan</span><span>${escapeHtml(p.panggilan || '-')}</span></div>
                    <div class="detail-item"><span>⚧ Jenis Kelamin</span><span>${escapeHtml(p.jenisKelamin || '-')}</span></div>
                    <div class="detail-item"><span>🥋 Tingkat Sabuk</span><span>${beltDisplay}</span></div>
                    <div class="detail-item"><span>🎂 Umur</span><span>${escapeHtml(p.umur || '-')}</span></div>
                    <div class="card-actions">
                        <button class="card-btn btn-info" onclick="viewDetailPeserta(${p.id})"><i class="fas fa-eye"></i> Detail</button>
                        ${currentUser.role !== 'user' ? `<button class="card-btn btn-edit" onclick="editPeserta(${p.id})"><i class="fas fa-edit"></i> Edit</button><button class="card-btn btn-hapus" onclick="deletePeserta(${p.id})"><i class="fas fa-trash"></i> Hapus</button>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    window.viewDetailPeserta = function(id) {
        const p = pesertaData.find(p => p.id === id);
        if (!p) return;
        
        const beltDisplay = getBeltDisplay(p.tingkat);
        const fotoProfil = p.fotoProfil || (p.jenisKelamin === 'Laki-laki' ? 'https://via.placeholder.com/120?text=👨' : 'https://via.placeholder.com/120?text=👩');
        
        const modalContent = document.getElementById('detailPesertaContent');
        modalContent.innerHTML = `
            <div class="detail-peserta-header">
                <div class="detail-peserta-foto"><img src="${fotoProfil}" onerror="this.src='https://via.placeholder.com/120'"></div>
                <div class="detail-peserta-info"><h3>${escapeHtml(p.nama)}</h3><p><i class="fas fa-tag"></i> No. Urut: ${p.noUrut || '-'}</p><p><i class="fas fa-school"></i> ${escapeHtml(p.dojang)}</p></div>
            </div>
            <div class="detail-peserta-grid">
                <div class="detail-peserta-item"><label>Nama Panggilan</label><span>${escapeHtml(p.panggilan || '-')}</span></div>
                <div class="detail-peserta-item"><label>Jenis Kelamin</label><span>${escapeHtml(p.jenisKelamin || '-')}</span></div>
                <div class="detail-peserta-item"><label>Agama</label><span>${escapeHtml(p.agama || '-')}</span></div>
                <div class="detail-peserta-item"><label>Tempat Tinggal</label><span>${escapeHtml(p.tempatTinggal || '-')}</span></div>
                <div class="detail-peserta-item"><label>Kelas</label><span>${escapeHtml(p.kelas || '-')}</span></div>
                <div class="detail-peserta-item"><label>Tingkat Sabuk</label><span>${beltDisplay} ${escapeHtml(p.tingkat)}</span></div>
                <div class="detail-peserta-item"><label>Tanggal Lahir</label><span>${p.tanggalLahir || '-'}</span></div>
                <div class="detail-peserta-item"><label>Umur</label><span>${escapeHtml(p.umur || '-')}</span></div>
                <div class="detail-peserta-item"><label>Berat Badan</label><span>${p.beratBadan || '-'} kg</span></div>
                <div class="detail-peserta-item"><label>Tinggi Badan</label><span>${p.tinggiBadan || '-'} cm</span></div>
                <div class="detail-peserta-item"><label>No Telepon</label><span>${p.phone || '-'}</span></div>
                <div class="detail-peserta-item"><label>Status</label><span>${p.status === 'Aktif' ? '🟢 Aktif' : '⚫ Tidak Aktif'}</span></div>
            </div>
        `;
        
        document.getElementById('modalDetailPeserta').classList.add('active');
    };
    
    window.editPeserta = function(id) {
        if (currentUser.role === 'user') return;
        const p = pesertaData.find(p => p.id === id);
        if (p) {
            document.getElementById('noUrut').value = p.noUrut || '';
            document.getElementById('nama').value = p.nama;
            document.getElementById('panggilan').value = p.panggilan || '';
            document.getElementById('jenisKelamin').value = p.jenisKelamin || '';
            document.getElementById('agamaSelect').value = p.agama || '';
            document.getElementById('tempatTinggal').value = p.tempatTinggal || '';
            document.getElementById('dojangSelect').value = p.dojang;
            document.getElementById('kelas').value = p.kelas || '';
            document.getElementById('tanggalLahir').value = p.tanggalLahir || '';
            document.getElementById('umur').value = p.umur || '';
            document.getElementById('beratBadan').value = p.beratBadan || '';
            document.getElementById('tinggiBadan').value = p.tinggiBadan || '';
            document.getElementById('tingkat').value = p.tingkat;
            document.getElementById('status').value = p.status;
            document.getElementById('phone').value = p.phone || '';
            
            if (p.fotoProfil) {
                document.getElementById('previewImg').src = p.fotoProfil;
            } else {
                document.getElementById('previewImg').src = 'https://via.placeholder.com/100?text=No+Image';
            }
            
            window.editPesertaId = id;
            document.getElementById('modalPesertaTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Peserta';
            document.getElementById('modalPeserta').classList.add('active');
        }
    };
    
    window.deletePeserta = function(id) {
        if (currentUser.role === 'user') return;
        if (confirm('Hapus peserta ini?')) {
            const p = pesertaData.find(p => p.id === id);
            pesertaData = pesertaData.filter(p => p.id !== id);
            localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
            renderPeserta();
            updateStats();
            addActivity(`Menghapus peserta: ${p.nama}`, 'warning');
        }
    };
    
    // ==================== FOTO UPLOAD ====================
    const btnUploadFoto = document.getElementById('btnUploadFoto');
    const fotoProfil = document.getElementById('fotoProfil');
    const previewImg = document.getElementById('previewImg');
    
    if (btnUploadFoto) {
        btnUploadFoto.addEventListener('click', () => {
            if (fotoProfil) fotoProfil.click();
        });
    }
    
    if (fotoProfil) {
        fotoProfil.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    if (previewImg) previewImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ==================== FORM PESERTA SUBMIT ====================
    const formPeserta = document.getElementById('formPeserta');
    if (formPeserta) {
        formPeserta.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const dojang = document.getElementById('dojangSelect').value;
            let noUrut = document.getElementById('noUrut').value;
            if (!window.editPesertaId) noUrut = generateNoUrut(dojang);
            
            const peserta = {
                id: window.editPesertaId || Date.now(),
                noUrut: noUrut,
                nama: document.getElementById('nama').value,
                panggilan: document.getElementById('panggilan').value,
                jenisKelamin: document.getElementById('jenisKelamin').value,
                agama: document.getElementById('agamaSelect').value,
                tempatTinggal: document.getElementById('tempatTinggal').value,
                dojang: dojang,
                kelas: document.getElementById('kelas').value,
                tanggalLahir: document.getElementById('tanggalLahir').value,
                umur: document.getElementById('umur').value,
                beratBadan: document.getElementById('beratBadan').value,
                tinggiBadan: document.getElementById('tinggiBadan').value,
                tingkat: document.getElementById('tingkat').value,
                status: document.getElementById('status').value,
                phone: document.getElementById('phone').value,
                fotoProfil: previewImg ? previewImg.src : null,
                createdAt: new Date().toISOString()
            };
            
            if (window.editPesertaId) {
                const index = pesertaData.findIndex(p => p.id === window.editPesertaId);
                if (index !== -1) {
                    peserta.noUrut = pesertaData[index].noUrut;
                    pesertaData[index] = { ...pesertaData[index], ...peserta };
                    addActivity(`Mengedit peserta: ${peserta.nama}`, 'info');
                }
            } else {
                pesertaData.push(peserta);
                addActivity(`Menambahkan peserta baru: ${peserta.nama} (No: ${noUrut})`, 'success');
            }
            
            pesertaData.sort((a, b) => (parseInt(a.noUrut) || 0) - (parseInt(b.noUrut) || 0));
            localStorage.setItem('pesertaData', JSON.stringify(pesertaData));
            renderPeserta();
            updateStats();
            
            const modalPeserta = document.getElementById('modalPeserta');
            if (modalPeserta) modalPeserta.classList.remove('active');
            window.editPesertaId = null;
            formPeserta.reset();
            if (previewImg) previewImg.src = 'https://via.placeholder.com/100?text=No+Image';
        });
    }
    
    // ==================== ABSENSI FUNCTIONS ====================
    let currentDojangFilter = '';
    let currentAbsensiDate = new Date().toISOString().split('T')[0];
    
    function renderAbsensiCardGrid(date = '', dojang = '') {
        const container = document.getElementById('absensiCardGrid');
        if (!container) return;
        
        const today = date || currentAbsensiDate;
        const absensi = absensiData[today] || {};
        
        let filteredPeserta = [...pesertaData];
        if (dojang) {
            filteredPeserta = filteredPeserta.filter(p => p.dojang === dojang);
        } else if (currentUser.role !== 'admin' && getUserDojang()) {
            filteredPeserta = filteredPeserta.filter(p => p.dojang === getUserDojang());
        }
        filteredPeserta = filteredPeserta.filter(p => p.status === 'Aktif');
        
        const totalPeserta = filteredPeserta.length;
        let sudahAbsen = 0;
        filteredPeserta.forEach(p => {
            if (absensi[p.id] && absensi[p.id] !== 'Belum') sudahAbsen++;
        });
        const belumAbsen = totalPeserta - sudahAbsen;
        
        const totalPesertaDojang = document.getElementById('totalPesertaDojang');
        const sudahAbsenEl = document.getElementById('sudahAbsen');
        const belumAbsenEl = document.getElementById('belumAbsen');
        if (totalPesertaDojang) totalPesertaDojang.textContent = totalPeserta;
        if (sudahAbsenEl) sudahAbsenEl.textContent = sudahAbsen;
        if (belumAbsenEl) belumAbsenEl.textContent = belumAbsen;
        
        let hadir = 0, izin = 0, sakit = 0, alpha = 0;
        
        container.innerHTML = filteredPeserta.map(p => {
            const status = absensi[p.id] || 'Belum';
            const isNotAbsented = status === 'Belum';
            if (status === 'Hadir') hadir++;
            else if (status === 'Izin') izin++;
            else if (status === 'Sakit') sakit++;
            else if (status === 'Alpha') alpha++;
            
            const statusClass = status === 'Hadir' ? 'status-hadir' : status === 'Izin' ? 'status-izin' : status === 'Sakit' ? 'status-sakit' : status === 'Alpha' ? 'status-alpha' : '';
            const statusIcon = status === 'Hadir' ? '✅' : status === 'Izin' ? '📝' : status === 'Sakit' ? '🤒' : status === 'Alpha' ? '❌' : '⏳';
            
            const beltDisplay = getBeltDisplay(p.tingkat);
            const fotoProfil = p.fotoProfil || (p.jenisKelamin === 'Laki-laki' ? 'https://via.placeholder.com/60?text=👨' : 'https://via.placeholder.com/60?text=👩');
            
            return `
                <div class="absensi-card ${statusClass} ${isNotAbsented ? 'not-absented' : ''}" data-peserta-id="${p.id}">
                    <div class="absensi-card-header">
                        <div class="absensi-avatar">
                            <img src="${fotoProfil}" class="absensi-avatar-img" alt="${p.nama}" onerror="this.src='https://via.placeholder.com/60?text=👤'">
                        </div>
                        <div class="absensi-info">
                            <h3>${escapeHtml(p.nama)}</h3>
                            <p>${escapeHtml(p.jenisKelamin || '-')} | ${beltDisplay}</p>
                        </div>
                    </div>
                    <div class="absensi-status">
                        <span class="status-badge-large">${statusIcon} ${status}</span>
                        <div class="absensi-actions-card">
                            <button class="btn-status" onclick="updateAbsensiStatus(${p.id}, 'Hadir', '${today}')">✅ Hadir</button>
                            <button class="btn-status" onclick="updateAbsensiStatus(${p.id}, 'Izin', '${today}')">📝 Izin</button>
                            <button class="btn-status" onclick="updateAbsensiStatus(${p.id}, 'Sakit', '${today}')">🤒 Sakit</button>
                            <button class="btn-status" onclick="updateAbsensiStatus(${p.id}, 'Alpha', '${today}')">❌ Alpha</button>
                        </div>
                    </div>
                    ${status !== 'Belum' ? `<div class="absensi-time">Waktu: ${new Date().toLocaleTimeString()}</div>` : '<div class="absensi-time">⏰ Belum diabsen</div>'}
                </div>
            `;
        }).join('');
        
        const hadirCount = document.getElementById('hadirCount');
        const izinCount = document.getElementById('izinCount');
        const sakitCount = document.getElementById('sakitCount');
        const alphaCount = document.getElementById('alphaCount');
        if (hadirCount) hadirCount.textContent = hadir;
        if (izinCount) izinCount.textContent = izin;
        if (sakitCount) sakitCount.textContent = sakit;
        if (alphaCount) alphaCount.textContent = alpha;
    }
    
    window.updateAbsensiStatus = function(id, status, date) {
        if (!absensiData[date]) absensiData[date] = {};
        absensiData[date][id] = status;
        localStorage.setItem('absensiData', JSON.stringify(absensiData));
        renderAbsensiCardGrid(date, currentDojangFilter);
        const peserta = pesertaData.find(p => p.id === id);
        addActivity(`Update absensi ${peserta?.nama} - ${status} (${date})`);
    };
    
    function checkIfAbsensiSaved(date) {
        const savedStatus = JSON.parse(localStorage.getItem('absensiSavedStatus') || '{}');
        return savedStatus[date] === true;
    }
    
    function saveAbsensiData(date, dojang) {
        const savedStatus = JSON.parse(localStorage.getItem('absensiSavedStatus') || '{}');
        savedStatus[date] = true;
        localStorage.setItem('absensiSavedStatus', JSON.stringify(savedStatus));
        localStorage.setItem('absensiData', JSON.stringify(absensiData));
        addActivity(`Menyimpan semua data absensi untuk tanggal ${date}`, 'success');
        
        document.querySelectorAll('.btn-status').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        const saveBtn = document.getElementById('saveAllAbsensi');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.style.opacity = '0.5';
            saveBtn.title = 'Absensi hari ini sudah disimpan';
        }
        
        alert('✅ Data absensi berhasil disimpan!\n\nAbsensi untuk hari ini tidak dapat diubah lagi.');
    }
    
    const saveAllAbsensi = document.getElementById('saveAllAbsensi');
    if (saveAllAbsensi) {
        saveAllAbsensi.addEventListener('click', () => {
            const today = document.getElementById('absensiDate')?.value || new Date().toISOString().split('T')[0];
            const dojang = document.getElementById('dojangFilterAbsensi')?.value || '';
            
            let filteredPeserta = [...pesertaData];
            if (dojang) {
                filteredPeserta = filteredPeserta.filter(p => p.dojang === dojang);
            } else if (currentUser.role !== 'admin' && getUserDojang()) {
                filteredPeserta = filteredPeserta.filter(p => p.dojang === getUserDojang());
            }
            filteredPeserta = filteredPeserta.filter(p => p.status === 'Aktif');
            
            const absensi = absensiData[today] || {};
            const belumAbsen = filteredPeserta.filter(p => !absensi[p.id] || absensi[p.id] === 'Belum');
            
            if (belumAbsen.length > 0) {
                const firstNotAbsented = document.querySelector(`.absensi-card.not-absented`);
                if (firstNotAbsented) {
                    firstNotAbsented.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstNotAbsented.style.animation = 'pulseRed 0.5s 3';
                    setTimeout(() => {
                        firstNotAbsented.style.animation = '';
                    }, 1500);
                }
                
                const confirmMsg = `⚠️ PERHATIAN!\n\nMasih ada ${belumAbsen.length} peserta yang BELUM DIABSEN:\n${belumAbsen.map(p => `- ${p.nama}`).join('\n')}\n\nApakah Anda yakin ingin menyimpan absensi?`;
                if (confirm(confirmMsg)) {
                    saveAbsensiData(today, dojang);
                }
            } else {
                if (confirm('✅ Semua peserta sudah diabsen!\n\nApakah Anda yakin ingin menyimpan data absensi ini?')) {
                    if (confirm('⚠️ KONFIRMASI AKHIR\n\nData absensi akan disimpan dan TIDAK DAPAT DIUBAH untuk hari ini.\n\nApakah Anda yakin?')) {
                        saveAbsensiData(today, dojang);
                    }
                }
            }
        });
    }
    
    // ==================== REKAPAN FUNCTIONS ====================
    function renderRekapan() {
        const dojang = document.getElementById('rekapanDojang')?.value || '';
        const bulan = document.getElementById('rekapanBulan')?.value || '';
        const tbody = document.getElementById('rekapanTableBody');
        if (!tbody) return;
        
        if (!bulan) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Pilih bulan terlebih dahulu</td></tr>';
            return;
        }
        
        let filteredPeserta = [...pesertaData];
        if (dojang) {
            filteredPeserta = filteredPeserta.filter(p => p.dojang === dojang);
        } else if (currentUser.role !== 'admin' && getUserDojang()) {
            filteredPeserta = filteredPeserta.filter(p => p.dojang === getUserDojang());
        }
        filteredPeserta = filteredPeserta.filter(p => p.status === 'Aktif');
        
        const [year, month] = bulan.split('-');
        const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
        
        let rekapData = filteredPeserta.map((p, index) => {
            let hadir = 0, izin = 0, sakit = 0, alpha = 0;
            for (let d = 1; d <= daysInMonth; d++) {
                const date = `${year}-${month}-${String(d).padStart(2, '0')}`;
                const status = absensiData[date]?.[p.id];
                if (status === 'Hadir') hadir++;
                else if (status === 'Izin') izin++;
                else if (status === 'Sakit') sakit++;
                else if (status === 'Alpha') alpha++;
            }
            const total = hadir + izin + sakit + alpha;
            const persen = total > 0 ? Math.round((hadir / total) * 100) : 0;
            return { ...p, no: index + 1, hadir, izin, sakit, alpha, total, persen };
        });
        
        if (rekapData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Tidak ada data peserta</td></tr>';
            return;
        }
        
        tbody.innerHTML = rekapData.map(p => `
            <tr>
                <td>${p.no}</td>
                <td>${escapeHtml(p.nama)}</td>
                <td>${escapeHtml(p.dojang)}</td>
                <td class="hadir-cell">${p.hadir}</td>
                <td class="izin-cell">${p.izin}</td>
                <td class="sakit-cell">${p.sakit}</td>
                <td class="alpha-cell">${p.alpha}</td>
                <td>${p.total}</td>
                <td>
                    <div class="persen-bar">
                        <div class="persen-bar-fill" style="width: ${p.persen}%">${p.persen}%</div>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // ==================== NAVIGASI REKAPAN ====================
    const lihatRekapanBtn = document.getElementById('lihatRekapanBtn');
    const backToAbsensi = document.getElementById('backToAbsensi');
    const pageAbsensi = document.getElementById('page-absensi');
    const pageRekapan = document.getElementById('page-rekapan');
    
    if (lihatRekapanBtn) {
        lihatRekapanBtn.addEventListener('click', () => {
            const rekapanDojang = document.getElementById('rekapanDojang');
            if (rekapanDojang) {
                rekapanDojang.innerHTML = '<option value="">Semua Dojang</option>' + dojangList.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
                if (currentUser.role !== 'admin' && getUserDojang()) {
                    rekapanDojang.value = getUserDojang();
                }
            }
            
            const rekapanBulan = document.getElementById('rekapanBulan');
            if (rekapanBulan && rekapanBulan.options.length <= 1) {
                const now = new Date();
                for (let i = 0; i < 12; i++) {
                    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    const label = `${date.toLocaleString('id-ID', { month: 'long' })} ${date.getFullYear()}`;
                    rekapanBulan.innerHTML += `<option value="${value}">${label}</option>`;
                }
                rekapanBulan.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            }
            
            if (pageAbsensi && pageRekapan) {
                pageAbsensi.classList.remove('active-page');
                pageRekapan.classList.add('active-page');
                renderRekapan();
            }
        });
    }
    
    if (backToAbsensi) {
        backToAbsensi.addEventListener('click', () => {
            if (pageAbsensi && pageRekapan) {
                pageRekapan.classList.remove('active-page');
                pageAbsensi.classList.add('active-page');
                renderAbsensiCardGrid(currentAbsensiDate, currentDojangFilter);
            }
        });
    }
    
    const filterRekapan = document.getElementById('filterRekapan');
    if (filterRekapan) {
        filterRekapan.addEventListener('click', renderRekapan);
    }
    
    const exportRekapanExcel = document.getElementById('exportRekapanExcel');
    if (exportRekapanExcel) {
        exportRekapanExcel.addEventListener('click', () => {
            alert('📄 Export Excel akan tersedia di versi selanjutnya.');
        });
    }
    
    // ==================== FILTER ABSENSI ====================
    const dojangFilterAbsensi = document.getElementById('dojangFilterAbsensi');
    const filterAbsensiBtn = document.getElementById('filterAbsensi');
    const absensiDateInput = document.getElementById('absensiDate');
    
    if (dojangFilterAbsensi) {
        dojangFilterAbsensi.innerHTML = '<option value="">Semua Dojang</option>' + dojangList.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
        if (currentUser.role !== 'admin' && getUserDojang()) {
            dojangFilterAbsensi.value = getUserDojang();
        }
        dojangFilterAbsensi.addEventListener('change', () => {
            currentDojangFilter = dojangFilterAbsensi.value;
            renderAbsensiCardGrid(currentAbsensiDate, currentDojangFilter);
        });
    }
    
    if (absensiDateInput) {
        absensiDateInput.value = new Date().toISOString().split('T')[0];
        absensiDateInput.addEventListener('change', () => {
            currentAbsensiDate = absensiDateInput.value;
            renderAbsensiCardGrid(currentAbsensiDate, currentDojangFilter);
            
            if (checkIfAbsensiSaved(currentAbsensiDate)) {
                document.querySelectorAll('.btn-status').forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                });
                if (saveAllAbsensi) {
                    saveAllAbsensi.disabled = true;
                    saveAllAbsensi.style.opacity = '0.5';
                    saveAllAbsensi.title = 'Absensi hari ini sudah disimpan';
                }
            } else {
                document.querySelectorAll('.btn-status').forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                });
                if (saveAllAbsensi) {
                    saveAllAbsensi.disabled = false;
                    saveAllAbsensi.style.opacity = '1';
                    saveAllAbsensi.title = '';
                }
            }
        });
    }
    
    if (filterAbsensiBtn) {
        filterAbsensiBtn.addEventListener('click', () => {
            currentAbsensiDate = absensiDateInput?.value || new Date().toISOString().split('T')[0];
            currentDojangFilter = dojangFilterAbsensi?.value || '';
            renderAbsensiCardGrid(currentAbsensiDate, currentDojangFilter);
        });
    }
    
    // ==================== JADWAL LATIHAN PER DOJANG ====================
    function renderDojangScheduleList() {
        const container = document.getElementById('dojangScheduleList');
        if (!container) return;
        
        const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        
        container.innerHTML = dojangList.map(dojang => {
            const schedule = dojangSchedules[dojang] || { hari: [], jam: '15:30 - 17:30', zona: 'WIT' };
            return `
                <div class="dojang-schedule-card" data-dojang="${dojang}">
                    <h4><i class="fas fa-school"></i> ${escapeHtml(dojang)}</h4>
                    <div class="schedule-time-row">
                        <div class="form-field">
                            <label>Hari Latihan</label>
                            <select class="hari-select fire-select" multiple size="3">
                                ${hariOptions.map(h => `<option value="${h}" ${schedule.hari && schedule.hari.includes(h) ? 'selected' : ''}>${h}</option>`).join('')}
                            </select>
                            <small>Ctrl+Click untuk pilih lebih dari satu hari</small>
                        </div>
                        <div class="form-field">
                            <label>Jam Latihan</label>
                            <input type="text" class="jam-input fire-input" value="${schedule.jam || '15:30 - 17:30'}">
                        </div>
                        <div class="form-field">
                            <label>Zona Waktu</label>
                            <select class="zona-select fire-select">
                                <option value="WIB" ${schedule.zona === 'WIB' ? 'selected' : ''}>WIB</option>
                                <option value="WITA" ${schedule.zona === 'WITA' ? 'selected' : ''}>WITA</option>
                                <option value="WIT" ${schedule.zona === 'WIT' ? 'selected' : ''}>WIT</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Attach change events
        document.querySelectorAll('.dojang-schedule-card').forEach(card => {
            const dojang = card.dataset.dojang;
            const hariSelect = card.querySelector('.hari-select');
            const jamInput = card.querySelector('.jam-input');
            const zonaSelect = card.querySelector('.zona-select');
            
            const saveSchedule = () => {
                const selectedHari = Array.from(hariSelect.selectedOptions).map(opt => opt.value);
                dojangSchedules[dojang] = {
                    hari: selectedHari,
                    jam: jamInput.value,
                    zona: zonaSelect.value
                };
                localStorage.setItem('dojangSchedules', JSON.stringify(dojangSchedules));
            };
            
            hariSelect.addEventListener('change', saveSchedule);
            jamInput.addEventListener('change', saveSchedule);
            zonaSelect.addEventListener('change', saveSchedule);
        });
    }
    
    const saveAllSchedules = document.getElementById('saveAllSchedules');
    if (saveAllSchedules) {
        saveAllSchedules.addEventListener('click', () => {
            localStorage.setItem('dojangSchedules', JSON.stringify(dojangSchedules));
            updateLoginPageSchedule();
            addActivity('Menyimpan semua jadwal latihan', 'info');
            alert('✅ Semua jadwal berhasil disimpan!');
        });
    }
    
    function updateLoginPageSchedule() {
        // Jadwal akan ditampilkan di halaman login
        // Fungsi ini dipanggil saat menyimpan jadwal
    }
    
    // ==================== PENGUMUMAN FUNCTIONS ====================
    function updateAnnouncementWithDate() {
        const announcement = localStorage.getItem('announcement') || 'Selamat datang di Phoenix Taekwondo Family! Jaga semangat latihan dan disiplin.';
        const announcementDate = localStorage.getItem('announcementDate') || new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const announcementTime = localStorage.getItem('announcementTime') || new Date().toLocaleTimeString('id-ID');
        
        const announcementContent = document.getElementById('announcementContent');
        if (announcementContent) {
            announcementContent.innerHTML = `<i class="fas fa-fire"></i> ${announcement}<div class="announcement-time"><i class="fas fa-calendar-alt"></i> ${announcementDate} | <i class="fas fa-clock"></i> ${announcementTime}</div>`;
        }
        
        const userAnnouncement = document.getElementById('userAnnouncement');
        if (userAnnouncement) {
            userAnnouncement.innerHTML = `<div class="announcement-box"><i class="fas fa-fire"></i> ${announcement}<div class="announcement-time"><i class="fas fa-calendar-alt"></i> ${announcementDate} | <i class="fas fa-clock"></i> ${announcementTime}</div></div>`;
        }
        
        const globalAnnouncement = document.getElementById('globalAnnouncement');
        if (globalAnnouncement) globalAnnouncement.value = announcement;
        
        const announcementPreview = document.getElementById('announcementPreview');
        if (announcementPreview) {
            announcementPreview.innerHTML = `<div class="announcement-box"><i class="fas fa-fire"></i> ${announcement}<div class="announcement-time"><i class="fas fa-calendar-alt"></i> ${announcementDate} | <i class="fas fa-clock"></i> ${announcementTime}</div></div>`;
        }
    }
    
    const saveAnnouncementBtn = document.getElementById('saveAnnouncement');
    if (saveAnnouncementBtn) {
        saveAnnouncementBtn.addEventListener('click', () => {
            const ann = document.getElementById('globalAnnouncement')?.value || '';
            const now = new Date();
            const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const timeStr = now.toLocaleTimeString('id-ID');
            localStorage.setItem('announcement', ann);
            localStorage.setItem('announcementDate', dateStr);
            localStorage.setItem('announcementTime', timeStr);
            
            const preview = document.getElementById('announcementPreview');
            if (preview) {
                preview.innerHTML = `<div class="announcement-box"><i class="fas fa-fire"></i> ${ann}<div class="announcement-time"><i class="fas fa-calendar-alt"></i> ${dateStr} | <i class="fas fa-clock"></i> ${timeStr}</div></div>`;
            }
            
            const announcementContent = document.getElementById('announcementContent');
            if (announcementContent) {
                announcementContent.innerHTML = `<i class="fas fa-fire"></i> ${ann}<div class="announcement-time"><i class="fas fa-calendar-alt"></i> ${dateStr} | <i class="fas fa-clock"></i> ${timeStr}</div>`;
            }
            
            addActivity('Memperbarui pengumuman', 'info');
            alert('✅ Pengumuman berhasil disimpan!');
        });
    }
    
    // ==================== KELOLA DOJANG & AGAMA ====================
    function renderDojangList() {
        const container = document.getElementById('dojangList');
        if (!container) return;
        
        const dojangLogos = {
            'SMANSA': 'https://phoenix-taekwondo-family.vercel.app/Foto/Phoenix%20Taekwondo%20Family.jpeg',
            'ZPENSA': 'https://phoenix-taekwondo-family.vercel.app/Foto/PHOENIX%20TAEKWONDO%20FAMILY.svg'
        };
        
        container.innerHTML = dojangList.map((d, i) => `
            <div class="dojang-item">
                <img src="${dojangLogos[d] || 'https://via.placeholder.com/40?text=' + d.charAt(0)}" class="dojang-logo" onerror="this.src='https://via.placeholder.com/40?text=🏫'">
                <div class="dojang-info">
                    <strong>${escapeHtml(d)}</strong>
                    <small>Klik untuk kelola</small>
                </div>
                <button class="btn-delete-dojang" onclick="deleteDojang(${i})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        const selects = document.querySelectorAll('#dojangSelect, #userDojang, #filterDojang, #dojangFilterAbsensi, #rekapanDojang, #uktFilterDojang');
        selects.forEach(select => {
            if (select) {
                const currentVal = select.value;
                select.innerHTML = `<option value="">Pilih Dojang</option>${dojangList.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('')}`;
                if (currentVal && dojangList.includes(currentVal)) select.value = currentVal;
                else if (currentUser.role !== 'admin' && getUserDojang()) select.value = getUserDojang();
            }
        });
    }
    
    window.deleteDojang = function(index) {
        if (confirm(`Hapus dojang "${dojangList[index]}"?`)) {
            dojangList.splice(index, 1);
            localStorage.setItem('dojangList', JSON.stringify(dojangList));
            renderDojangList();
            initDojangSchedules();
            renderDojangScheduleList();
            addActivity(`Menghapus dojang`, 'warning');
        }
    };
    
    function renderAgamaList() {
        const container = document.getElementById('agamaList');
        if (container) {
            container.innerHTML = agamaList.map((a, i) => `
                <div class="master-item">
                    <span><i class="fas fa-pray"></i> ${escapeHtml(a)}</span>
                    <button class="btn-delete-master" onclick="deleteAgama(${i})"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
        }
        
        const agamaSelect = document.getElementById('agamaSelect');
        if (agamaSelect) {
            const currentVal = agamaSelect.value;
            agamaSelect.innerHTML = `<option value="">Pilih Agama</option>${agamaList.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('')}`;
            if (currentVal && agamaList.includes(currentVal)) agamaSelect.value = currentVal;
        }
    }
    
    window.deleteAgama = function(index) {
        if (confirm(`Hapus agama "${agamaList[index]}"?`)) {
            agamaList.splice(index, 1);
            localStorage.setItem('agamaList', JSON.stringify(agamaList));
            renderAgamaList();
            addActivity(`Menghapus agama`, 'warning');
        }
    };
    
    // ==================== GANTI PASSWORD ====================
    const changePasswordBtn = document.getElementById('changePassword');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            const oldPass = document.getElementById('oldPassword')?.value;
            const newPass = document.getElementById('newPassword')?.value;
            const confirmPass = document.getElementById('confirmPassword')?.value;
            
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex === -1) {
                alert('User tidak ditemukan!');
                return;
            }
            
            if (users[userIndex].password !== oldPass) {
                alert('❌ Password lama salah!');
                return;
            }
            
            if (newPass !== confirmPass) {
                alert('❌ Password baru dan konfirmasi tidak cocok!');
                return;
            }
            
            if (newPass.length < 6) {
                alert('❌ Password minimal 6 karakter!');
                return;
            }
            
            users[userIndex].password = newPass;
            localStorage.setItem('systemUsers', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            
            // Update admin email view
            document.getElementById('adminEmailView').textContent = currentUser.email;
            document.getElementById('adminUsernameView').textContent = currentUser.username;
            
            addActivity('Mengganti password', 'warning');
            alert('✅ Password berhasil diganti! Silakan login kembali.');
            
            document.getElementById('oldPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        });
    }
    
    // ==================== RESET PASSWORD RANDOM ====================
    function generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        const length = Math.floor(Math.random() * 5) + 4;
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
    
    window.resetUserPassword = function(userId, event) {
        event.stopPropagation();
        if (confirm('Reset password untuk user ini? Password baru akan dibuat otomatis.')) {
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                const newPassword = generateRandomPassword();
                users[userIndex].password = newPassword;
                localStorage.setItem('systemUsers', JSON.stringify(users));
                renderUsers();
                addActivity(`Reset password untuk ${users[userIndex].name}`, 'warning');
                alert(`✅ Password berhasil direset!\n\nPassword baru: ${newPassword}\n\nSimpan password ini untuk diberikan kepada user.`);
            }
        }
    };
    
    // ==================== USER MANAGEMENT ====================
    function renderUsers() {
        if (currentUser.role !== 'admin') return;
        
        const supervisors = users.filter(u => u.role === 'supervisor');
        const operators = users.filter(u => u.role === 'operator');
        const regularUsers = users.filter(u => u.role === 'user');
        
        const supervisorGrid = document.getElementById('supervisorGrid');
        const operatorGrid = document.getElementById('operatorGrid');
        const userGrid = document.getElementById('userGrid');
        
        if (supervisorGrid) supervisorGrid.innerHTML = renderUserCards(supervisors);
        if (operatorGrid) operatorGrid.innerHTML = renderUserCards(operators);
        if (userGrid) userGrid.innerHTML = renderUserCards(regularUsers);
    }
    
    function renderUserCards(userList) {
        if (userList.length === 0) return '<div class="empty-state"><i class="fas fa-users"></i><p>Belum ada pengguna</p></div>';
        
        return userList.map(user => {
            const fotoProfil = user.fotoProfil || (user.role === 'supervisor' ? 'https://via.placeholder.com/60?text=👔' : user.role === 'operator' ? 'https://via.placeholder.com/60?text=⚙️' : 'https://via.placeholder.com/60?text=👤');
            return `
                <div class="user-card ${user.status === 'Aktif' ? 'active' : 'inactive'}">
                    <div class="user-card-header">
                        <div class="user-avatar"><img src="${fotoProfil}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.src='https://via.placeholder.com/60'"></div>
                        <div class="user-badge ${user.role}">${user.role.toUpperCase()}</div>
                    </div>
                    <div class="user-card-body">
                        <h3>${escapeHtml(user.name)}</h3>
                        <p><i class="fas fa-envelope"></i> ${escapeHtml(user.email)}</p>
                        ${user.role !== 'user' ? `<p><i class="fas fa-lock"></i> Password: ••••••••</p>` : ''}
                        <p><i class="fas fa-school"></i> ${escapeHtml(user.dojang || '-')}</p>
                        <p><i class="fas fa-phone"></i> ${escapeHtml(user.phone || '-')}</p>
                        <div class="status-badge ${user.status === 'Aktif' ? 'status-active' : 'status-inactive'}">${user.status}</div>
                    </div>
                    <div class="user-card-footer">
                        <button class="btn-edit-user" onclick="editUser(${user.id})"><i class="fas fa-edit"></i> Edit</button>
                        ${user.role !== 'user' ? `<button class="btn-reset-password" onclick="resetUserPassword(${user.id}, event)"><i class="fas fa-key"></i> Reset PW</button>` : ''}
                        <button class="btn-delete-user" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    window.editUser = function(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            document.getElementById('userRole').value = user.role;
            document.getElementById('userStatus').value = user.status;
            document.getElementById('userFullName').value = user.name;
            document.getElementById('userUsername').value = user.username;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userPassword').value = '';
            document.getElementById('userPhone').value = user.phone || '';
            document.getElementById('userDojang').value = user.dojang || '';
            window.editUserId = id;
            document.getElementById('modalUserTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Pengguna';
            document.getElementById('modalUser').classList.add('active');
        }
    };
    
    window.deleteUser = function(id) {
        const user = users.find(u => u.id === id);
        if (user && confirm(`Hapus pengguna ${user.name}?`)) {
            users = users.filter(u => u.id !== id);
            localStorage.setItem('systemUsers', JSON.stringify(users));
            renderUsers();
            updateStats();
            addActivity(`Menghapus pengguna: ${user.name} (${user.role})`, 'warning');
        }
    };
    
    // ==================== FORM USER SUBMIT ====================
    const formUser = document.getElementById('formUser');
    if (formUser) {
        formUser.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userData = {
                id: window.editUserId || Date.now(),
                role: document.getElementById('userRole').value,
                name: document.getElementById('userFullName').value,
                username: document.getElementById('userUsername').value,
                email: document.getElementById('userEmail').value,
                password: document.getElementById('userPassword').value || 'phoenix123',
                status: document.getElementById('userStatus').value,
                phone: document.getElementById('userPhone').value,
                dojang: document.getElementById('userDojang').value,
                createdAt: window.editUserId ? users.find(u => u.id === window.editUserId)?.createdAt : new Date().toISOString().split('T')[0]
            };
            
            if (window.editUserId) {
                const index = users.findIndex(u => u.id === window.editUserId);
                if (index !== -1) {
                    users[index] = { ...users[index], ...userData };
                    addActivity(`Mengedit pengguna: ${userData.name} (${userData.role})`, 'info');
                }
            } else {
                users.push(userData);
                addActivity(`Menambahkan pengguna baru: ${userData.name} (${userData.role})`, 'success');
            }
            
            localStorage.setItem('systemUsers', JSON.stringify(users));
            renderUsers();
            updateStats();
            
            const modalUser = document.getElementById('modalUser');
            if (modalUser) modalUser.classList.remove('active');
            window.editUserId = null;
        });
    }
    
    // ==================== UKT FUNCTIONS ====================
    function isUktRegistrationOpen() {
        const now = new Date();
        const tglBuka = new Date(uktSettings.tglBuka);
        const tglTutup = new Date(uktSettings.tglTutup);
        return now >= tglBuka && now <= tglTutup;
    }
    
    function getUktStatusText() {
        const now = new Date();
        const tglBuka = new Date(uktSettings.tglBuka);
        const tglTutup = new Date(uktSettings.tglTutup);
        
        if (now < tglBuka) {
            return { text: 'Pendaftaran Belum Dibuka', color: '#f57c00', open: false };
        } else if (now > tglTutup) {
            return { text: 'Pendaftaran Ditutup', color: '#616161', open: false };
        } else {
            return { text: 'Pendaftaran Dibuka', color: '#4caf50', open: true };
        }
    }
    
    function updateUktStatusUI() {
        const uktStatusText = document.getElementById('uktStatusText');
        const uktDateRange = document.getElementById('uktDateRange');
        
        if (uktStatusText) {
            const status = getUktStatusText();
            uktStatusText.textContent = status.text;
            uktStatusText.style.color = status.color;
        }
        
        if (uktDateRange && uktSettings.tglBuka && uktSettings.tglTutup) {
            const buka = new Date(uktSettings.tglBuka).toLocaleDateString('id-ID');
            const tutup = new Date(uktSettings.tglTutup).toLocaleDateString('id-ID');
            uktDateRange.textContent = `${buka} - ${tutup}`;
        }
    }
    
    function renderUktSettingsModal() {
        document.getElementById('uktTglBuka').value = uktSettings.tglBuka || '';
        document.getElementById('uktTglTutup').value = uktSettings.tglTutup || '';
        document.getElementById('uktInfo').value = uktSettings.info || '';
        
        const status = getUktStatusText();
        document.getElementById('previewStatus').innerHTML = `<span style="color:${status.color}">${status.text}</span>`;
    }
    
    const saveUktSettings = document.getElementById('saveUktSettings');
    if (saveUktSettings) {
        saveUktSettings.addEventListener('click', () => {
            uktSettings.tglBuka = document.getElementById('uktTglBuka').value;
            uktSettings.tglTutup = document.getElementById('uktTglTutup').value;
            uktSettings.info = document.getElementById('uktInfo').value;
            localStorage.setItem('uktSettings', JSON.stringify(uktSettings));
            
            renderUktSettingsModal();
            renderUktList();
            renderUserUktPage();
            updateUktStatusUI();
            
            alert('✅ Pengaturan UKT berhasil disimpan!');
            const modal = document.getElementById('modalUktSettings');
            if (modal) modal.classList.remove('active');
        });
    }
    
    window.registerUkt = function(pesertaId) {
        const status = getUktStatusText();
        if (!status.open) {
            alert(`⚠️ ${status.text}! Tidak dapat melakukan pendaftaran.`);
            return false;
        }
        
        const existing = uktPendaftar.find(p => p.pesertaId === pesertaId);
        if (existing) {
            alert('⚠️ Anda sudah mendaftar UKT! Silakan tunggu konfirmasi.');
            return false;
        }
        
        const peserta = pesertaData.find(p => p.id === pesertaId);
        if (!peserta) return false;
        
        uktPendaftar.push({
            id: Date.now(),
            pesertaId: pesertaId,
            nama: peserta.nama,
            dojang: peserta.dojang,
            tingkatSaatIni: peserta.tingkat,
            tanggalDaftar: new Date().toISOString(),
            status: 'Menunggu'
        });
        
        localStorage.setItem('uktPendaftar', JSON.stringify(uktPendaftar));
        addActivity(`${peserta.nama} mendaftar UKT`, 'info');
        alert('✅ Pendaftaran UKT berhasil! Silakan tunggu konfirmasi dari admin.');
        renderUserUktPage();
        return true;
    };
    
    window.cancelUkt = function(pesertaId) {
        const status = getUktStatusText();
        if (!status.open) {
            alert(`⚠️ ${status.text}! Tidak dapat membatalkan pendaftaran.`);
            return false;
        }
        
        const index = uktPendaftar.findIndex(p => p.pesertaId === pesertaId);
        if (index !== -1 && uktPendaftar[index].status === 'Menunggu') {
            const peserta = pesertaData.find(p => p.id === pesertaId);
            uktPendaftar.splice(index, 1);
            localStorage.setItem('uktPendaftar', JSON.stringify(uktPendaftar));
            addActivity(`${peserta?.nama} membatalkan pendaftaran UKT`, 'warning');
            alert('✅ Pendaftaran UKT berhasil dibatalkan!');
            renderUserUktPage();
            return true;
        }
        return false;
    };
    
    function renderUktList() {
        const container = document.getElementById('uktListGrid');
        if (!container) return;
        
        const filterDojang = document.getElementById('uktFilterDojang')?.value || '';
        const filterStatus = document.getElementById('uktFilterStatus')?.value || '';
        
        let filtered = [...uktPendaftar];
        if (filterDojang) filtered = filtered.filter(p => p.dojang === filterDojang);
        if (filterStatus) filtered = filtered.filter(p => p.status === filterStatus);
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>Belum ada pendaftar UKT</p></div>';
            return;
        }
        
        container.innerHTML = filtered.map(p => {
            const peserta = pesertaData.find(ps => ps.id === p.pesertaId);
            const fotoProfil = peserta?.fotoProfil || (peserta?.jenisKelamin === 'Laki-laki' ? 'https://via.placeholder.com/50?text=👨' : 'https://via.placeholder.com/50?text=👩');
            const statusClass = p.status === 'Menunggu' ? 'ukt-status-menunggu' : p.status === 'Disetujui' ? 'ukt-status-disetujui' : 'ukt-status-ditolak';
            
            return `
                <div class="ukt-card-item" data-id="${p.id}">
                    <img src="${fotoProfil}" class="ukt-card-img" onerror="this.src='https://via.placeholder.com/50'">
                    <div class="ukt-card-info">
                        <h4>${escapeHtml(p.nama)}</h4>
                        <p>${escapeHtml(p.dojang)} | Sabuk: ${escapeHtml(p.tingkatSaatIni)}</p>
                        <p>Tanggal Daftar: ${new Date(p.tanggalDaftar).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div class="ukt-status ${statusClass}">${p.status}</div>
                    <div class="ukt-actions">
                        <button class="btn-approve" onclick="approveUkt(${p.id})">Setujui</button>
                        <button class="btn-reject" onclick="rejectUkt(${p.id})">Tolak</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    window.approveUkt = function(id) {
        if (confirm('Setujui pendaftaran UKT peserta ini?')) {
            const index = uktPendaftar.findIndex(p => p.id === id);
            if (index !== -1) {
                uktPendaftar[index].status = 'Disetujui';
                localStorage.setItem('uktPendaftar', JSON.stringify(uktPendaftar));
                addActivity(`Menyetujui pendaftaran UKT ${uktPendaftar[index].nama}`, 'success');
                renderUktList();
                alert('✅ Pendaftaran UKT disetujui!');
            }
        }
    };
    
    window.rejectUkt = function(id) {
        if (confirm('Tolak pendaftaran UKT peserta ini?')) {
            const index = uktPendaftar.findIndex(p => p.id === id);
            if (index !== -1) {
                uktPendaftar[index].status = 'Ditolak';
                localStorage.setItem('uktPendaftar', JSON.stringify(uktPendaftar));
                addActivity(`Menolak pendaftaran UKT ${uktPendaftar[index].nama}`, 'warning');
                renderUktList();
                alert('✅ Pendaftaran UKT ditolak!');
            }
        }
    };
    
    function renderUserUktPage() {
        const container = document.getElementById('userUktContainer');
        if (!container) return;
        
        const currentUserData = pesertaData.find(p => p.id === currentUser.id);
        if (!currentUserData) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-user"></i><p>Data peserta tidak ditemukan</p></div>';
            return;
        }
        
        const userUkt = uktPendaftar.find(p => p.pesertaId === currentUser.id);
        const status = getUktStatusText();
        const isOpen = status.open;
        
        let uktContent = `
            <div class="ukt-info-box">
                <i class="fas fa-info-circle"></i> ${uktSettings.info || 'Informasi UKT akan diumumkan kemudian'}
            </div>
            <div class="ukt-status-badge ${isOpen ? 'ukt-status-buka' : 'ukt-status-tutup'}">
                ${status.text}
            </div>
            <div class="ukt-date-info">
                <p><i class="fas fa-calendar-alt"></i> Pendaftaran: ${new Date(uktSettings.tglBuka).toLocaleString('id-ID')} - ${new Date(uktSettings.tglTutup).toLocaleString('id-ID')}</p>
            </div>
        `;
        
        if (userUkt) {
            const statusClass = userUkt.status === 'Menunggu' ? 'ukt-status-menunggu' : userUkt.status === 'Disetujui' ? 'ukt-status-disetujui' : 'ukt-status-ditolak';
            const statusText = userUkt.status === 'Menunggu' ? 'Menunggu Konfirmasi' : userUkt.status === 'Disetujui' ? 'Disetujui ✅' : 'Ditolak ❌';
            
            uktContent += `
                <div class="ukt-status-badge ${statusClass}" style="margin-top:15px;">
                    Status Pendaftaran: ${statusText}
                </div>
                <div class="ukt-info-box" style="margin-top:15px;">
                    <i class="fas fa-clock"></i> Anda telah mendaftar pada ${new Date(userUkt.tanggalDaftar).toLocaleDateString('id-ID')}
                </div>
                ${userUkt.status === 'Menunggu' && isOpen ? `
                    <button class="btn-ukt" onclick="cancelUkt(${currentUser.id})">
                        <i class="fas fa-times"></i> Batalkan Pendaftaran
                    </button>
                ` : ''}
            `;
        } else if (isOpen) {
            uktContent += `
                <button class="btn-ukt" onclick="registerUkt(${currentUser.id})">
                    <i class="fas fa-check-circle"></i> Daftar UKT Sekarang
                </button>
            `;
        } else {
            uktContent += `
                <div class="ukt-info-box" style="margin-top:15px; background:rgba(255,68,68,0.1); color:#ff8888;">
                    <i class="fas fa-lock"></i> Pendaftaran ${status.text.toLowerCase()}. Silakan tunggu jadwal berikutnya.
                </div>
            `;
        }
        
        container.innerHTML = uktContent;
    }
    
    function initUktFilters() {
        const filterDojang = document.getElementById('uktFilterDojang');
        if (filterDojang) {
            filterDojang.innerHTML = '<option value="">Semua Dojang</option>' + dojangList.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
        }
        
        const filterUktList = document.getElementById('filterUktList');
        if (filterUktList) {
            filterUktList.addEventListener('click', () => renderUktList());
        }
    }
    
    // ==================== GALLERY ====================
    function renderGallery(category = 'all') {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        
        let filtered = [...galleryData];
        if (category !== 'all') filtered = filtered.filter(g => g.category === category);
        
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-image"></i><p>Belum ada foto</p></div>';
            return;
        }
        
        grid.innerHTML = filtered.map(g => `
            <div class="gallery-item">
                <div class="gallery-image"><i class="fas fa-image"></i></div>
                <div class="gallery-info">
                    <span>${g.category}</span>
                    <p>${escapeHtml(g.caption)}</p>
                    <small>${g.date} | by ${g.uploadedBy}</small>
                </div>
            </div>
        `).join('');
    }
    
    // ==================== SETTINGS NAVIGATION ====================
    let currentSetting = null;
    
    function initSettingsNavigation() {
        const mainMenu = document.getElementById('settingsMainMenu');
        const backButton = document.getElementById('backToSettingsMenu');
        const menuCards = document.querySelectorAll('.settings-menu-card');
        
        if (!mainMenu) return;
        
        menuCards.forEach(card => {
            card.addEventListener('click', () => {
                const setting = card.dataset.setting;
                showSettingsSubmenu(setting);
            });
        });
        
        if (backButton) {
            backButton.addEventListener('click', () => {
                showSettingsMainMenu();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && currentSetting !== null) {
                showSettingsMainMenu();
            }
        });
    }
    
    function showSettingsSubmenu(setting) {
        const mainMenu = document.getElementById('settingsMainMenu');
        const backButton = document.getElementById('backToSettingsMenu');
        const submenus = document.querySelectorAll('.settings-submenu');
        
        if (mainMenu) mainMenu.style.display = 'none';
        if (backButton) backButton.style.display = 'flex';
        
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
        
        const targetSubmenu = document.getElementById(`settings${setting.charAt(0).toUpperCase() + setting.slice(1)}`);
        if (targetSubmenu) {
            targetSubmenu.style.display = 'block';
            currentSetting = setting;
            
            if (setting === 'profile') {
                document.getElementById('adminEmailView').textContent = currentUser.email;
                document.getElementById('adminUsernameView').textContent = currentUser.username;
            } else if (setting === 'jadwal') {
                renderDojangScheduleList();
            } else if (setting === 'pengumuman') {
                updateAnnouncementWithDate();
            } else if (setting === 'kelola') {
                renderDojangList();
                renderAgamaList();
            } else if (setting === 'ganti-password') {
                document.getElementById('oldPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
            } else if (setting === 'backup') {
                // Nothing to load
            }
        }
    }
    
    function showSettingsMainMenu() {
        const mainMenu = document.getElementById('settingsMainMenu');
        const backButton = document.getElementById('backToSettingsMenu');
        const submenus = document.querySelectorAll('.settings-submenu');
        
        if (mainMenu) mainMenu.style.display = 'block';
        if (backButton) backButton.style.display = 'none';
        
        submenus.forEach(submenu => {
            submenu.style.display = 'none';
        });
        
        currentSetting = null;
    }
    
    // ==================== ADDITIONAL EVENT HANDLERS ====================
    const addDojang = document.getElementById('addDojang');
    if (addDojang) {
        addDojang.addEventListener('click', () => {
            const newDojang = document.getElementById('newDojang')?.value.trim();
            if (newDojang && !dojangList.includes(newDojang)) {
                dojangList.push(newDojang);
                localStorage.setItem('dojangList', JSON.stringify(dojangList));
                renderDojangList();
                initDojangSchedules();
                renderDojangScheduleList();
                addActivity(`Menambahkan dojang: ${newDojang}`, 'success');
                document.getElementById('newDojang').value = '';
            } else {
                alert('Nama dojang sudah ada atau kosong!');
            }
        });
    }
    
    const addAgama = document.getElementById('addAgama');
    if (addAgama) {
        addAgama.addEventListener('click', () => {
            const newAgama = document.getElementById('newAgama')?.value.trim();
            if (newAgama && !agamaList.includes(newAgama)) {
                agamaList.push(newAgama);
                localStorage.setItem('agamaList', JSON.stringify(agamaList));
                renderAgamaList();
                addActivity(`Menambahkan agama: ${newAgama}`, 'success');
                document.getElementById('newAgama').value = '';
            } else {
                alert('Nama agama sudah ada atau kosong!');
            }
        });
    }
    
    const backupDataBtn = document.getElementById('backupData');
    if (backupDataBtn) {
        backupDataBtn.addEventListener('click', () => {
            const backup = {
                peserta: pesertaData,
                absensi: absensiData,
                users: users,
                gallery: galleryData,
                dojangList: dojangList,
                agamaList: agamaList,
                uktSettings: uktSettings,
                uktPendaftar: uktPendaftar,
                dojangSchedules: dojangSchedules,
                backupDate: new Date().toISOString()
            };
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
            a.download = `phoenix_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            addActivity('Backup data sistem', 'success');
            alert('✅ Backup data berhasil dibuat!');
        });
    }
    
    const resetDataBtn = document.getElementById('resetData');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', () => {
            if (confirm('⚠️ PERINGATAN! Ini akan menghapus SEMUA data. Apakah Anda yakin?')) {
                const confirmText = prompt('Ketik "RESET" untuk mengkonfirmasi penghapusan semua data:');
                if (confirmText === 'RESET') {
                    localStorage.clear();
                    alert('Semua data telah direset. Halaman akan dimuat ulang.');
                    location.reload();
                }
            }
        });
    }
    
    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const theme = btn.dataset.theme;
            document.body.style.background = theme === 'dark' ? 'radial-gradient(circle at 20% 30%, #0a0a0a, #000000 100%)' : theme === 'light' ? 'radial-gradient(circle at 20% 30%, #ffeedd, #ffddbb 100%)' : 'radial-gradient(circle at 20% 30%, #1a0500, #030000 100%)';
            addActivity(`Ganti tema: ${theme}`, 'info');
            alert(`✅ Tema berhasil diganti menjadi ${theme === 'fire' ? 'Api Phoenix' : theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
        });
    });
    
    // Search and filter
    const searchPeserta = document.getElementById('searchPeserta');
    const filterDojang = document.getElementById('filterDojang');
    const filterSabuk = document.getElementById('filterSabuk');
    
    if (searchPeserta) {
        searchPeserta.addEventListener('input', () => renderPeserta(searchPeserta.value, filterDojang?.value || '', filterSabuk?.value || ''));
    }
    if (filterDojang) {
        filterDojang.addEventListener('change', () => renderPeserta(searchPeserta?.value || '', filterDojang.value, filterSabuk?.value || ''));
    }
    if (filterSabuk) {
        filterSabuk.addEventListener('change', () => renderPeserta(searchPeserta?.value || '', filterDojang?.value || '', filterSabuk.value));
    }
    
    // Category buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.cat);
        });
    });
    
    // User tabs
    document.querySelectorAll('.user-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.user-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            const supervisorList = document.getElementById('supervisorList');
            const operatorList = document.getElementById('operatorList');
            const userList = document.getElementById('userList');
            if (supervisorList) supervisorList.classList.toggle('active-tab', tabName === 'supervisor');
            if (operatorList) operatorList.classList.toggle('active-tab', tabName === 'operator');
            if (userList) userList.classList.toggle('active-tab', tabName === 'user');
        });
    });
    
    // Gallery upload
    const confirmUpload = document.getElementById('confirmUpload');
    if (confirmUpload) {
        confirmUpload.addEventListener('click', () => {
            const caption = document.getElementById('photoCaption')?.value;
            if (caption) {
                galleryData.push({
                    id: Date.now(),
                    category: document.getElementById('photoCategory')?.value || 'latihan',
                    caption: caption,
                    date: new Date().toISOString().split('T')[0],
                    uploadedBy: currentUser.name
                });
                localStorage.setItem('galleryData', JSON.stringify(galleryData));
                renderGallery();
                addActivity(`Upload foto: ${caption}`, 'success');
                const modalUpload = document.getElementById('modalUpload');
                if (modalUpload) modalUpload.classList.remove('active');
                document.getElementById('photoCaption').value = '';
                alert('✅ Foto ditambahkan!');
            } else {
                alert('Isi caption foto!');
            }
        });
    }
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }
    
    // Modal UKT Settings button
    const btnUktSettings = document.getElementById('btnUktSettings');
    const modalUktSettings = document.getElementById('modalUktSettings');
    if (btnUktSettings && modalUktSettings) {
        btnUktSettings.addEventListener('click', () => {
            renderUktSettingsModal();
            modalUktSettings.classList.add('active');
        });
    }
    
    // Close modals
    document.querySelectorAll('.close-ukt-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalUktSettings) modalUktSettings.classList.remove('active');
        });
    });
    
    document.querySelectorAll('.close-detail-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalDetailPeserta').classList.remove('active');
        });
    });
    
    // Refresh activity
    const refreshActivity = document.getElementById('refreshActivity');
    if (refreshActivity) {
        refreshActivity.addEventListener('click', () => {
            updateRecentActivities();
        });
    }
    
    // Edit announcement button
    const editAnnouncement = document.getElementById('editAnnouncement');
    if (editAnnouncement) {
        editAnnouncement.addEventListener('click', () => {
            showSettingsSubmenu('pengumuman');
            showPage('settingan');
        });
    }
    
    // ==================== PAGE NAVIGATION ====================
    const pages = {
        dashboard: document.getElementById('page-dashboard'),
        absensi: document.getElementById('page-absensi'),
        peserta: document.getElementById('page-peserta'),
        dokumentasi: document.getElementById('page-dokumentasi'),
        'manajemen-user': document.getElementById('page-manajemen-user'),
        settingan: document.getElementById('page-settingan'),
        ukt: document.getElementById('page-ukt')
    };
    
    function showPage(pageId) {
        Object.keys(pages).forEach(key => {
            if (pages[key]) pages[key].classList.remove('active-page');
        });
        if (pages[pageId]) pages[pageId].classList.add('active-page');
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) link.classList.add('active');
        });
        
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = pageId === 'manajemen-user' ? 'User Management' : pageId === 'ukt' ? 'Kenaikan Tingkat' : pageId.charAt(0).toUpperCase() + pageId.slice(1);
        }
        
        if (pageId === 'dashboard') {
            updateStats();
            updateRecentActivities();
            initCharts();
            updateAnnouncementWithDate();
            renderBeltBarChart();
            renderMonthlyAttendanceChart();
            initStatClickEvents();
        } else if (pageId === 'absensi') {
            renderAbsensiCardGrid(currentAbsensiDate, currentDojangFilter);
        } else if (pageId === 'peserta') {
            renderPeserta();
            populateFilterSabuk();
        } else if (pageId === 'dokumentasi') {
            renderGallery();
        } else if (pageId === 'manajemen-user' && currentUser.role === 'admin') {
            renderUsers();
        } else if (pageId === 'ukt') {
            if (currentUser.role === 'admin') {
                renderUktList();
                updateUktStatusUI();
                initUktFilters();
                renderDojangList();
            } else {
                renderUserUktPage();
            }
        } else if (pageId === 'settingan') {
            initSettingsNavigation();
            showSettingsMainMenu();
            renderDojangList();
            renderAgamaList();
            updateAnnouncementWithDate();
        }
    }
    
    function populateFilterSabuk() {
        const filterSabuk = document.getElementById('filterSabuk');
        if (!filterSabuk) return;
        
        const sabukOptions = [
            'Putih', 'Kuning', 'Kuning Strip Hijau', 'Hijau', 'Hijau Strip Biru',
            'Biru', 'Biru Strip Merah', 'Merah', 'Merah Strip Hitam (Poom 1)',
            'Merah Strip Hitam (Poom 2)', 'Merah Strip Hitam (Poom 3)', 'Hitam (Dan 1)',
            'Hitam (Dan 2)', 'Hitam (Dan 3)', 'Hitam (Dan 4)', 'Hitam (Dan 5)',
            'Hitam (Dan 6)', 'Hitam (Dan 7)', 'Hitam (Dan 8)', 'Hitam (Dan 9)'
        ];
        filterSabuk.innerHTML = '<option value="">Semua Sabuk</option>' + sabukOptions.map(s => `<option value="${s}">🥋 ${s}</option>`).join('');
    }
    
    // ==================== NAVIGATION CLICK HANDLERS ====================
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.getAttribute('data-page'));
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                if (sidebar) sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
    
    // ==================== SIDEBAR TOGGLE ====================
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    }
    
    // ==================== MODAL HANDLERS ====================
    const btnTambahUser = document.getElementById('btnTambahUser');
    const modalUser = document.getElementById('modalUser');
    const btnTambahPeserta = document.getElementById('btnTambahPeserta');
    const modalPeserta = document.getElementById('modalPeserta');
    const btnTambahFoto = document.getElementById('btnTambahFoto');
    const modalUpload = document.getElementById('modalUpload');
    const closeModals = document.querySelectorAll('.close-modal');
    
    if (btnTambahUser && currentUser.role === 'admin') {
        btnTambahUser.addEventListener('click', () => {
            window.editUserId = null;
            document.getElementById('modalUserTitle').innerHTML = '<i class="fas fa-user-plus"></i> Tambah Pengguna';
            document.getElementById('formUser').reset();
            if (modalUser) modalUser.classList.add('active');
        });
    }
    
    if (btnTambahPeserta && currentUser.role !== 'user') {
        btnTambahPeserta.addEventListener('click', () => {
            window.editPesertaId = null;
            document.getElementById('modalPesertaTitle').innerHTML = '<i class="fas fa-user-plus"></i> Tambah Peserta';
            document.getElementById('formPeserta').reset();
            if (modalPeserta) modalPeserta.classList.add('active');
        });
    }
    
    if (btnTambahFoto && currentUser.role !== 'user') {
        btnTambahFoto.addEventListener('click', () => {
            if (modalUpload) modalUpload.classList.add('active');
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalUser) modalUser.classList.remove('active');
            if (modalPeserta) modalPeserta.classList.remove('active');
            if (modalUpload) modalUpload.classList.remove('active');
            if (modalUktSettings) modalUktSettings.classList.remove('active');
        });
    });
    
    // ==================== LOGOUT ====================
    const logoutBtn = document.getElementById('logoutBtn');
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
    
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (userLogoutBtn) userLogoutBtn.addEventListener('click', logout);
    
    // ==================== DISPLAY USER INFO ====================
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userRoleDisplay = document.getElementById('userRoleDisplay');
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarUserRole = document.getElementById('sidebarUserRole');
    
    if (userNameDisplay) userNameDisplay.textContent = currentUser.name;
    if (userRoleDisplay) userRoleDisplay.textContent = currentUser.role.toUpperCase();
    if (sidebarUserName) sidebarUserName.textContent = currentUser.name;
    if (sidebarUserRole) sidebarUserRole.textContent = currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'supervisor' ? 'Supervisor' : currentUser.role === 'operator' ? 'Operator' : 'Member';
    
    // ==================== INITIALIZE ====================
    initCharts();
    updateStats();
    updateRecentActivities();
    showPage('dashboard');
});