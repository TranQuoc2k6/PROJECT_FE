    // Hiển thị form thêm dịch vụ
    function showServiceForm() {
        document.getElementById("service-form").classList.remove("hidden");
    }

    // Ẩn form thêm dịch vụ
    function hideServiceForm() {
        document.getElementById("service-form").classList.add("hidden");
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
                <td><img src="${service.image}" alt="${service.name}" style="width: 100%; height: auto; border-radius: 5px;"></td>
                <td>
                    <button onclick="editService(${index})">Sửa</button>
                    <button onclick="deleteService(${index})">Xóa</button>
                </td>
            `;
            serviceTable.appendChild(row);
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