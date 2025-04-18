function initializeAdminAccount() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra nếu đã có tài khoản admin
    const adminExists = users.some(user => user.role === "admin");
    if (!adminExists) {
        // Tạo tài khoản admin mặc định
        const adminUser = {
            id: "admin-1", // ID duy nhất
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123", // Mật khẩu mặc định
            role: "admin"
        };

        // Thêm admin vào danh sách người dùng
        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Gọi hàm này khi trang web tải
initializeAdminAccount();

// Xử lý đăng ký
document.querySelector(".background-login").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form gửi mặc định

    // Lấy giá trị từ các trường nhập liệu
    const fullName = document.getElementById("user-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("password-check").value.trim();

    // Xóa lỗi cũ
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll(".input-email-password").forEach(el => el.classList.remove("error"));

    let hasError = false; // Biến kiểm tra lỗi

    // Hàm hiển thị lỗi
    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);
        const errorElement = document.createElement("p");
        errorElement.classList.add("error-message");
        errorElement.innerText = message;
        inputField.classList.add("error");
        inputField.insertAdjacentElement("afterend", errorElement);
        hasError = true;
    }

    // Kiểm tra thông tin nhập liệu

    if (fullName === "") {
        showError("user-name", "Họ và tên không được dể trống!")
    }
    
    if (email === "") {
        showError("email", "Email không được để trống!");
    } else if (!email.includes("@") || !email.includes(".")) {
        showError("email", "Email không hợp lệ!");
    }

    if (password === "") {
        showError("password", "Mật khẩu không được để trống!");
    } else if (password.length < 8) {
        showError("password", "Mật khẩu phải có ít nhất 8 ký tự!");
    }

    if (confirmPassword === "") {
        showError("password-check", "Mật khẩu xác nhận không được để trống!");
    } else if (confirmPassword !== password) {
        showError("password-check", "Mật khẩu không trùng khớp!");
    }

    // Nếu không có lỗi, lưu thông tin người dùng vào mảng users
    if (!hasError) {
        const user = {
            id: Math.random(),
            name: fullName,
            email: email,
            password: password,
            role: "user"
        };

        // Lấy mảng người dùng từ localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Kiểm tra trùng lặp email
        const emailExists = users.some(u => u.email === email);
        if (emailExists) {
            Swal.fire({
                icon: "warning",
                title: "Email đã tồn tại :((",
                text: "Vui lòng kiểm tra lại !!!",
            });
            return;
        }

        // Thêm người dùng mới vào mảng
        users.push(user);

        // Lưu mảng người dùng vào localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Lưu người dùng đăng ký thành công vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../../index1.html";
    }
});


