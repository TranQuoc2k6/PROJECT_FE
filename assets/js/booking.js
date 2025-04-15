function addSchedule() {
    document.getElementById("booking-form").classList.remove("hidden"); // Hiển thị form
}

function hideForm() {
    document.getElementById("booking-form").classList.add("hidden"); // Ẩn form
}

// Lấy bảng lịch
const table = document.querySelector(".information-booking");

// Hàm hiển thị dữ liệu từ localStorage
function displaySchedules() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Người dùng hiện tại
    if (!currentUser || !currentUser.email) {
        console.error("Không tìm thấy thông tin người dùng.");
        return;
    }

    const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const scheduleTable = document.getElementById("schedule-table");

    scheduleTable.innerHTML = ""; // Xóa danh sách cũ trong bảng

    schedules.forEach((schedule, index) => {
        // Kiểm tra email hoặc id của người dùng
        if (schedule.email === currentUser.email) {
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
            scheduleTable.appendChild(row);
        }
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
