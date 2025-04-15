function initializeAdminAccount() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra nếu đã có tài khoản admin
    const adminExists = users.some(user => user.role === "admin");
    if (!adminExists) {
        // Tạo tài khoản admin mặc định
        const adminUser = {
            id: "admin-1", 
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123", 
            role: "admin"
        };

        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Tài khoản admin mặc định đã được tạo!");
    }
}

// Gọi hàm này khi trang web tải
initializeAdminAccount();


// Xử lý đăng nhập
document.querySelector(".background-login").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form gửi mặc định

    // Lấy giá trị từ các trường nhập liệu
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Xóa lỗi cũ
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll(".input-email-password").forEach(el => el.classList.remove("error"));

    let hasError = false;

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

    // Kiểm tra thông tin đăng nhập nếu không có lỗi
    if (!hasError) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Tìm kiếm người dùng
        const foundUser = storedUsers.find(user => user.email === email && user.password === password);

        if (foundUser) {
            // Lưu người dùng đăng nhập thành công vào localStorage
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            // Điều hướng đến trang chính
            window.location.href = "../../index1.html";
        } else {
            Swal.fire({
                icon: "error",
                title: "Email hoặc mật khẩu của bạn không đúng :((",
                text: "Vui lòng kiểm tra lại !!!",
            });
        }
    }
});
