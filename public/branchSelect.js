document.addEventListener('DOMContentLoaded', () => {
    // Get reference to branch code input
    const branchCodeInput = document.getElementById('branch-code');
    // Data for branches, managed in JavaScript
    const branchOptions = [
        { value: "bkk-silom", text: "กรุงเทพฯ - สีลม", code: "BKK01" },
        { value: "bkk-sukhumvit", text: "กรุงเทพฯ - สุขุมวิท", code: "BKK02" },
        { value: "bkk-ratchada", text: "กรุงเทพฯ - รัชดา", code: "BKK03" },
        { value: "chiangmai", text: "เชียงใหม่", code: "CNX01" },
        { value: "phuket", text: "ภูเก็ต", code: "PKT01" },
        { value: "chonburi", text: "ชลบุรี", code: "CHB01" },
        { value: "khonkaen", text: "ขอนแก่น", code: "KHN01" },
        { value: "songkhla", text: "สงขลา", code: "SKA01" },
        { value: "nakhonratchasima", text: "นครราชสีมา", code: "NMA01" }
    ];

    // Initialize Tom Select and populate it with data from the array
    const branchSelect = new TomSelect("#branch", {
        options: branchOptions,
        create: false, // Prevent users from creating new options
        sortField: {
            field: "text",
            direction: "asc"
        }
    });

    // Show branch code after selection
    const selectEl = document.getElementById('branch');
    selectEl.addEventListener('change', function() {
        const selectedValue = selectEl.value;
        const selectedOption = branchOptions.find(opt => opt.value === selectedValue);
        branchCodeInput.value = selectedOption ? selectedOption.code : '';
    });

    // Form submission handler
    const form = document.getElementById('application-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // ส่งค่า branch และ code ไปยังหน้าใบสมัครผ่าน query string
            const selectedValue = selectEl.value;
            const selectedOption = branchOptions.find(opt => opt.value === selectedValue);
            const code = selectedOption ? selectedOption.code : '';
            const text = selectedOption ? selectedOption.text : '';
            const params = new URLSearchParams({ branch: selectedValue || '', code, text });
            window.location.href = `applicationform.html?${params.toString()}`;
        });
    }
});
