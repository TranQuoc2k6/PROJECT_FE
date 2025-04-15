// Phân quyền Admin
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.role !== "admin") {
        Swal.fire({
            icon: "warning",
            title: "Lỗi",
            text: "Cần tài khoản admin để truy cập!",
            willClose: () => {
                // Chuyển hướng khi hộp thoại đóng
                window.location.href = "../../index1.html";
            }
        });
    }
});

function addSchedule() {
    const bookingForm = document.getElementById("booking-form");
    bookingForm.classList.remove("hidden"); // Hiển thị form
}

function hideForm() {
    const bookingForm = document.getElementById("booking-form");
    bookingForm.classList.add("hidden"); // Ẩn form
}

// Lấy bảng lịch
const table = document.querySelector(".information-booking");

// Hàm hiển thị dữ liệu từ localStorage
function displaySchedules() {
    const tableBody = document.getElementById("schedule-table");
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

    tableBody.innerHTML = ""; // Xóa các dòng cũ trong <tbody>

    schedules.forEach((schedule, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${schedule.class}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time}</td>
            <td>${schedule.name}</td>
            <td>${schedule.email}</td>
            <td>
                <button onclick="editSchedule(${index})">Sửa</button>
                <button onclick="deleteSchedule(${index})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}

// Hàm lưu dữ liệu khi nhấn nút "Lưu"
function addSchedule() {
    const bookingForm = document.getElementById("booking-form");
    bookingForm.classList.remove("hidden"); // Hiển thị form    

    // Đặt hành động của nút "Lưu" về chế độ tạo mới
    const actionButton = document.getElementById("action-button");
    actionButton.setAttribute("data-action", "create");
    actionButton.onclick = saveSchedule; // Gắn hàm tạo mới lịch
}

// Hàm chỉnh sửa lịch 
function editSchedule(index) {
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const schedule = schedules[index];

    if (!schedule) {
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không tìm thấy lịch để chỉnh sửa!"
        });
        return;
    }

    // Điền dữ liệu vào form
    document.getElementById("box").value = schedule.class;
    document.getElementById("date").value = schedule.date;
    document.getElementById("time").value = schedule.time;

    addSchedule(); // Hiển thị form

    // Thay đổi chế độ của nút "Lưu" sang chỉnh sửa
    const actionButton = document.getElementById("action-button");
    actionButton.setAttribute("data-action", "edit");
    actionButton.onclick = function () {
        saveEditedSchedule(index); // Gắn hàm chỉnh sửa lịch
    };
}




// Hàm xóa lịch
function deleteSchedule(index) {
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.splice(index, 1); // Xóa lịch tại vị trí index
    Swal.fire({
        title: "Đã xoá thành công!",
        icon: "success",
        draggable: true
    });
    localStorage.setItem("schedules", JSON.stringify(schedules)); // Cập nhật localStorage
    displaySchedules(); // Hiển thị lại danh sách

}

// Gọi hàm hiển thị khi tải trang
window.onload = function () {
    displaySchedules();
};




// Hàm lưu lịch khi hành động tạo mới 
function saveSchedule() {
    const selectedClass = document.getElementById("box").value;
    const selectedDate = document.getElementById("date").value;
    const selectedTime = document.getElementById("time").value;
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Người dùng hiện tại

    if (selectedClass === "select-class" || selectedDate === "" || selectedTime === "section-time") {
        Swal.fire({
            icon: "error",
            title: "Ôi...",
            text: "Vui lòng điền đầy đủ thông tin!"
        });
        return;
    }
    
    // Kiểm tra trùng lặp lịch
    const checkSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const isDuplicate = checkSchedules.some(schedule =>
        schedule.class === selectedClass &&
        schedule.date === selectedDate &&
        schedule.time === selectedTime
    );

    if (isDuplicate) {
        Swal.fire({
            icon: "error",
            title: "Lỗi :((",
            text: "Lịch đã tồn tại. Vui lòng đặt lịch khác !!!",
        });
        return;
    }

    const newSchedule = {
        class: selectedClass,
        date: selectedDate,
        time: selectedTime,
        name: currentUser.name,
        email: currentUser.email // Liên kết với email người dùng hiện tại
    };

    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.push(newSchedule);
    localStorage.setItem("schedules", JSON.stringify(schedules));

    displaySchedules(); // Hiển thị danh sách cập nhật
    hideForm(); // Ẩn form

    Swal.fire({
        title: "Thêm lịch thành công!",
        icon: "success"
    });
}

// Hàm lưu chỉnh sửa vào localStorage
function saveEditedSchedule(index) {
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

    schedules[index] = {
        class: document.getElementById("box").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        name: schedules[index].name,
        email: schedules[index].email // Giữ nguyên email
    };

    localStorage.setItem("schedules", JSON.stringify(schedules)); // Cập nhật `localStorage`
    displaySchedules(); // Hiển thị danh sách cập nhật
    hideForm(); // Ẩn form

    Swal.fire({
        title: "Cập nhật thành công!",
        icon: "success"
    });
}




function filterSchedules() {
    // Lấy dữ liệu từ localStorage
    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

    // Lấy giá trị từ các trường lọc
    const selectedClass = document.getElementById("check-class").value;
    const emailFilter = document.getElementById("check-email").value.trim().toLowerCase();
    const dateFilter = document.getElementById("check-date").value;

    // Lọc danh sách lịch
    const filteredSchedules = schedules.filter(schedule => {
        const matchClass = selectedClass === "All" || schedule.class === selectedClass;
        const matchEmail = !emailFilter || schedule.email.toLowerCase().includes(emailFilter);
        const matchDate = !dateFilter || schedule.date === dateFilter;

        return matchClass && matchEmail && matchDate; // Lọc theo tất cả điều kiện
    });

    displayFilteredSchedules(filteredSchedules); // Hiển thị kết quả lọc
}

function displayFilteredSchedules(filteredSchedules) {
    const tableBody = document.getElementById("schedule-table");
    if (!tableBody) {
        console.error("Không tìm thấy <tbody> để hiển thị dữ liệu.");
        return;
    }

    tableBody.innerHTML = ""; // Xóa nội dung cũ

    // Hiển thị danh sách lịch đã lọc
    filteredSchedules.forEach((schedule, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${schedule.class}</td>
            <td>${schedule.date}</td>
            <td>${schedule.time}</td>
            <td>${schedule.name}</td>
            <td>${schedule.email}</td>
            <td>
                <button onclick="editSchedule(${index})">Sửa</button>
                <button onclick="deleteSchedule(${index})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById("check-class").addEventListener("change", filterSchedules);
document.getElementById("check-email").addEventListener("input", filterSchedules);
document.getElementById("check-date").addEventListener("change", filterSchedules);

