// Auto-formatting for the phone number input (id='telephone')
document.addEventListener('DOMContentLoaded', () => {
            // Auto-formatting for the phone number input
            // === FIXED LINE ===
            // เปลี่ยนจาก 'telephone' เป็น 'phone' ให้ตรงกับ ID ของ input
            const phoneInput = document.getElementById('phone');
            phoneInput.addEventListener('input', (e) => {
                let input = e.target.value.replace(/\D/g, ''); 
                let formattedInput = '';

                if (input.length > 0) {
                    input = input.substring(0, 10);
                    
                    if (input.length > 6) {
                        formattedInput = `${input.substring(0, 3)}-${input.substring(3, 6)}-${input.substring(6)}`;
                    } else if (input.length > 3) {
                        formattedInput = `${input.substring(0, 3)}-${input.substring(3)}`;
                    } else {
                        formattedInput = input;
                    }
                }
                
                e.target.value = formattedInput;
            });
        });

        // Auto-formatting for the ID card number
            const idCardInput = document.getElementById('idcard');
            idCardInput.addEventListener('input', (e) => {
                let input = e.target.value.replace(/\D/g, '');
                let formattedInput = '';

                if (input.length > 0) {
                    input = input.substring(0, 13);

                    if (input.length > 12) {
                        formattedInput = `${input.substring(0, 1)} ${input.substring(1, 5)} ${input.substring(5, 10)} ${input.substring(10, 12)} ${input.substring(12)}`;
                    } else if (input.length > 10) {
                        formattedInput = `${input.substring(0, 1)} ${input.substring(1, 5)} ${input.substring(5, 10)} ${input.substring(10)}`;
                    } else if (input.length > 5) {
                        formattedInput = `${input.substring(0, 1)} ${input.substring(1, 5)} ${input.substring(5)}`;
                    } else if (input.length > 1) {
                        formattedInput = `${input.substring(0, 1)} ${input.substring(1)}`;
                    } else {
                        formattedInput = input;
                    }
                }
                e.target.value = formattedInput;
            });

            // แสดง/ซ่อน input รายละเอียดคดีอาญา
            document.addEventListener('DOMContentLoaded', function() {
                const yesRadio = document.getElementById('criminal-yes');
                const noRadio = document.getElementById('criminal-no');
                const detailsContainer = document.getElementById('criminal-details-container');
                const detailsInput = document.getElementById('criminal-details');
                function toggleDetails() {
                    if (yesRadio.checked) {
                        detailsContainer.classList.remove('hidden');
                        detailsInput.required = true;
                    } else {
                        detailsContainer.classList.add('hidden');
                        detailsInput.required = false;
                        detailsInput.value = '';
                    }
                }
                yesRadio.addEventListener('change', toggleDetails);
                noRadio.addEventListener('change', toggleDetails);
                toggleDetails();
            });
            // === MODIFIED: Form submission handling with reCAPTCHA v3 validation ===
            const form = document.getElementById('application-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Stop submission to get reCAPTCHA token first

                // Check if other required fields are filled, browser will handle this visually
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                
                grecaptcha.ready(function() {
                  // หมายเหตุ: คุณต้องเปลี่ยน YOUR_RECAPTCHA_V3_SITE_KEY เป็น Site Key ของคุณเอง
                  grecaptcha.execute('YOUR_RECAPTCHA_V3_SITE_KEY', {action: 'submit'}).then(function(token) {
                      // ในสถานการณ์จริง: คุณจะส่ง 'token' นี้ไปที่ Backend ของคุณเพื่อตรวจสอบ
                      // console.log(token);

                      // สำหรับตัวอย่างนี้ เราจะจำลองว่าการตรวจสอบสำเร็จและดำเนินการต่อ
                      
                      // Show a temporary success message
                      const successMessage = document.createElement('div');
                      successMessage.textContent = 'ส่งใบสมัครเรียบร้อยแล้ว!';
                      successMessage.className = 'mt-6 text-center text-lg font-semibold text-green-600 bg-green-100 p-4 rounded-lg';
                      form.appendChild(successMessage);
                      
                      // Reset form after 3 seconds
                      setTimeout(() => {
                          successMessage.remove();
                          form.reset();
                          branchSelect.clear();
                          // ไม่จำเป็นต้องรีเซ็ต reCAPTCHA v3 ด้วยตนเอง
                      }, 3000);
                  });
                });
            });

            
            // ซ่อนปุ่มส่งใบสมัครและ reCAPTCHA จนกว่าจะติ๊กยอมรับ PDPA
            document.addEventListener('DOMContentLoaded', function() {
                const pdpaCheckbox = document.getElementById('pdpa-consent');
                const submitBtn = document.getElementById('submit-btn');
                const recaptchaSection = document.getElementById('recaptcha-section');
                function togglePDPA() {
                    if (pdpaCheckbox.checked) {
                        submitBtn.style.display = '';
                        recaptchaSection.style.display = '';
                    } else {
                        submitBtn.style.display = 'none';
                        recaptchaSection.style.display = 'none';
                    }
                }
                pdpaCheckbox.addEventListener('change', togglePDPA);
                // ซ่อนตอนโหลดหน้า
                togglePDPA();
            });
        
