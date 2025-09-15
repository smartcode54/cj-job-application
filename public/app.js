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