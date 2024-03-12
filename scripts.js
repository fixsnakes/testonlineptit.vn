
function GotoRegisterPage(){
    window.location.href = "register.html";
}

function GotoLoginPage(){
    window.location.href = "index.html";
}

function ValidateFormLogin(){
    var statusParagraph = document.getElementById('status-paragraph');
    statusParagraph.textContent = '';
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
// Thiết lập nội dung cho thẻ p

    if(username === '' || password === ''){
        statusParagraph.textContent = 'Vui Lòng Nhập Đầy Đủ Thông Tin!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }
    else if(username.length < 6 || password.length < 6){
        statusParagraph.textContent = 'Tài Khoản Và Mật Khẩu Tối Thiểu 6 Ký Tự!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }
    else if(username != 'admin123' && password != 'admin123'){
        statusParagraph.textContent = 'Tài Khoản Hoặc Mật Khẩu Sai!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }

    else{
        statusParagraph.textContent = 'Đăng Nhập Thành Công!';
        statusParagraph.style.color = 'green';
        statusParagraph.style.fontWeight = 'bold';
        window.location.href = "student.html";
    }

}


function ValidateFormRegister(){
    var statusParagraph = document.getElementById('status-paragraph');
    statusParagraph.textContent = '';
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var repassword = document.getElementById('re-password').value;
// Thiết lập nội dung cho thẻ p

    if(username === '' || password === '' || repassword === '' || email === ''){
        statusParagraph.textContent = 'Vui Lòng Nhập Đầy Đủ Thông Tin!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }
    else if(username.length < 6 || password.length < 6){
        statusParagraph.textContent = 'Tài Khoản,Mật Khẩu Tối Thiểu 6 Ký Tự!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }
    else if(password != repassword){
        statusParagraph.textContent = 'Mật Khẩu Xác Nhận Không Khớp!';
        statusParagraph.style.color = 'red';
        statusParagraph.style.fontWeight = 'bold';
    }

    else{
        statusParagraph.textContent = 'Đăng Ký Thành Công!';
        statusParagraph.style.color = 'green';
        statusParagraph.style.fontWeight = 'bold';
        window.location.href = "index.html";
    }

}


function changeColor(id){
    var element = document.getElementById(id);
    element.style.backgroundColor = "#99cc99";

}



function countdownTimer() {
    // Lấy phần tử p theo id
    var countdownElement = document.getElementById("time-countdown");

    // Lấy thời gian ban đầu từ nội dung của phần tử
    var initialTime = countdownElement.textContent;
    var timeArray = initialTime.split(":");
    var hours = parseInt(timeArray[0], 10);
    var minutes = parseInt(timeArray[1], 10);
    var seconds = parseInt(timeArray[2], 10);

    // Tính tổng số giây
    var totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Thiết lập chu kỳ đếm ngược
    var countdownInterval = setInterval(function () {
        // Giảm tổng số giây
        totalSeconds--;

        // Tính lại giờ, phút, giây
        var updatedHours = Math.floor(totalSeconds / 3600);
        var updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
        var updatedSeconds = totalSeconds % 60;

        // Hiển thị giá trị mới trong phần tử
        countdownElement.textContent = formatTime(updatedHours) + ":" + formatTime(updatedMinutes) + ":" + formatTime(updatedSeconds);

        // Kiểm tra nếu thời gian đếm ngược đã đạt đến 0
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            alert("Hết giờ Làm Bài");
        }
    }, 1000);

    // Hàm để định dạng số thành chuỗi có 2 chữ số (thêm 0 phía trước nếu cần)
    function formatTime(value) {
        return value < 10 ? "0" + value : value;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Kiểm tra xem bạn đang ở trang nào
    var currentURL = window.location.href;

    // Thực hiện hành động tương ứng với trang cụ thể
    if (currentURL.includes("test.html")) {
        // Code cho trang yourPage1.html
        countdownTimer();
    }
});



function scrollToDiv(id) {
    // Lấy vị trí của div mục tiêu
    var targetDiv = document.getElementById(id);
    var targetDivPosition = targetDiv.offsetTop;

    // Di chuyển đến vị trí của div mục tiêu
    window.scrollTo({
        top: targetDivPosition,
        behavior: 'smooth' // Sử dụng 'smooth' để có hiệu ứng cuộn mượt
    });
}

function gotoresult(){
    alert("Xác Nhận Nộp Bài?");
    window.location.href = "result.html";
}