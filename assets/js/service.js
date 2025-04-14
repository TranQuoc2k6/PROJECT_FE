// Hiển thị form và lớp phủ
function showServiceForm() {
    document.getElementById("service-form").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
}

// Ẩn form và lớp phủ
function hideServiceForm() {
    document.getElementById("service-form").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
}

// Lưu dịch vụ mới vào danh sách
function saveService() {
    const serviceName = document.getElementById("service-name").value.trim();
    const serviceComment = document.getElementById("comment1").value.trim();
    const serviceImage = document.getElementById("service-image").value.trim();

    if (!serviceName || !serviceComment || !serviceImage) {
        Swal.fire({
            icon: "error",
            title: "Ôi...",
            text: "Vui lòng điền đầy đủ thông tin!"
        });
        return;
    }

    const services = JSON.parse(localStorage.getItem("services")) || [];
    services.push({
        name: serviceName,
        comment: serviceComment,
        image: serviceImage
    });

    localStorage.setItem("services", JSON.stringify(services));
    displayServices();
    hideServiceForm();

    Swal.fire({
        title: "Thêm dịch vụ thành công!",
        icon: "success"
    });
}

// Hiển thị danh sách dịch vụ
function displayServices() {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const serviceTable = document.getElementById("service-table");

    serviceTable.innerHTML = "";

    services.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${service.name}</td>
                <td>${service.comment}</td>
                <td><img src="${service.image}" alt="${service.name}"</td>
                <td>
                    <button onclick="editService(${index})">Sửa</button>
                    <button onclick="deleteService(${index})">Xóa</button>
                </td>
            `;
        serviceTable.appendChild(row);
    });
}

// Chỉnh sửa dịch vụ
function editService(index) {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const service = services[index]; // Lấy thông tin dịch vụ cần chỉnh sửa

    if (!service) {
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không tìm thấy dịch vụ để chỉnh sửa!"
        });
        return;
    }

    // Hiển thị form chỉnh sửa và điền dữ liệu vào form
    document.getElementById("service-name").value = service.name;
    document.getElementById("comment1").value = service.comment;
    document.getElementById("service-image").value = service.image;

    showServiceForm(); // Hiển thị form

    // Thay đổi logic nút "Lưu" để cập nhật dịch vụ
    const saveButton = document.querySelector(".btn-service button:nth-child(2)"); // Lấy nút "Lưu"
    saveButton.onclick = function () {
        saveEditedService(index); // Gọi hàm lưu chỉnh sửa
    };
}

// Lưu chỉnh sửa dịch vụ
function saveEditedService(index) {
    const services = JSON.parse(localStorage.getItem("services")) || [];

    // Lấy giá trị từ form
    const serviceName = document.getElementById("service-name").value.trim();
    const serviceComment = document.getElementById("comment1").value.trim();
    const serviceImage = document.getElementById("service-image").value.trim();

    // Kiểm tra dữ liệu hợp lệ
    if (!serviceName || !serviceComment || !serviceImage) {
        Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Vui lòng điền đầy đủ thông tin!"
        });
        return;
    }

    // Cập nhật thông tin dịch vụ
    services[index] = {
        name: serviceName,
        comment: serviceComment,
        image: serviceImage
    };

    // Lưu vào localStorage
    localStorage.setItem("services", JSON.stringify(services));

    displayServices(); // Hiển thị lại danh sách
    hideServiceForm(); // Ẩn form

    Swal.fire({
        title: "Cập nhật thành công!",
        icon: "success"
    });
}

// Xóa dịch vụ
function deleteService(index) {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    services.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(services));
    displayServices();

    Swal.fire({
        title: "Xóa thành công!",
        icon: "success"
    });
}

// Gọi hiển thị danh sách khi tải trang
window.onload = function () {
    displayServices();
};