// Đăng xuất
document.getElementById("out-page").addEventListener('click', function () {
    localStorage.removeItem("currentUser");   
    window.location.href = "../../index.html"
});

// Chuyển trang sang trang chủ
document.getElementById("back").addEventListener('click', function () {
    window.location.href = "../../index1.html";
});

// Chuyển sang quản lí dịch vụ
document.getElementById("service").addEventListener('click', function () {
    window.location.href = "./service.html"
});

// Chuyển sang quản lí lịch
document.getElementById("calendar").addEventListener('click', function () {
    window.location.href = "./dashboard.html"
});

