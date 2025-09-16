document.addEventListener("DOMContentLoaded", async () => {
  // Get reference to branch code input
  const branchCodeInput = document.getElementById("branch-code");

  // Function to fetch branches from Firebase Function
  async function fetchBranches() {
    try {
      console.log("Fetching branches from Firebase Function...");

      // Use the direct Cloud Run URL
      const response = await fetch(
        "https://getbranches-4yo6e2bxga-uc.a.run.app"
      );

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Loaded ${result.count} branches from server`);

        // Format data from BigQuery for Tom Select
        const formattedData = result.data.map((branch) => ({
          value: branch.code, // ใช้รหัสสาขาเป็น value
          text: branch.text, // ชื่อสาขา
          code: branch.code, // รหัสสาขา
          province: branch.province,
          region: branch.region,
          district: branch.district,
          coordinates: branch.coordinates,
          status: branch.branch_status,
        }));

        return formattedData;
      } else {
        throw new Error("Failed to fetch branches");
      }
    } catch (error) {
      console.error("❌ Error fetching branches:", error);
      console.log("📋 Using fallback branch data");

      return [
        { value: "bkk-silom", text: "กรุงเทพฯ - สีลม", code: "BKK01" },
        { value: "bkk-sukhumvit", text: "กรุงเทพฯ - สุขุมวิท", code: "BKK02" },
        { value: "bkk-ratchada", text: "กรุงเทพฯ - รัชดา", code: "BKK03" },
        { value: "chiangmai", text: "เชียงใหม่", code: "CNX01" },
        { value: "phuket", text: "ภูเก็ต", code: "PKT01" },
        { value: "chonburi", text: "ชลบุรี", code: "CHB01" },
        { value: "khonkaen", text: "ขอนแก่น", code: "KHN01" },
        { value: "songkhla", text: "สงขลา", code: "SKA01" },
        { value: "nakhonratchasima", text: "นครราชสีมา", code: "NMA01" },
      ];
    }
  }

  // Fetch branches from server
  const branchOptions = await fetchBranches();
  console.log("branchOptions", branchOptions);

  // Initialize Tom Select and populate it with data from the server
  const branchSelect = new TomSelect("#branch", {
    options: branchOptions,
    create: false, // Prevent users from creating new options
    sortField: {
      field: "text",
      direction: "asc",
    },
    placeholder: "-- กรุณาเลือกสาขา --",
    valueField: "value",
    labelField: "text",
    searchField: ["text", "code"],
    render: {
      option: function (data, escape) {
        // return `<div class="py-2 px-3 border-b border-gray-100 hover:bg-gray-50">
        //   <div class="font-medium text-gray-900">${escape(data.text)}</div>
        //   <div class="text-sm text-gray-500">รหัสสาขา: ${escape(
        //     data.code
        //   )} • ${escape(data.district)}, ${escape(data.province)}</div>
        //   <div class="text-xs text-green-600">${escape(
        //     data.status || "เปิดทำการ"
        //   )}</div>
        // </div>`;
        return `<div class="py-2 px-3 border-b border-gray-100 hover:bg-gray-50">
        <div class="font-medium text-gray-900">${escape(data.text)}</div>
      </div>`;
      },
      item: function (data, escape) {
        return `<div>${escape(data.text)}</div>`;
      },
    },
  });

  console.log("Tom Select initialized with", branchOptions.length, "options");

  // Show branch code after selection
  const selectEl = document.getElementById("branch");
  selectEl.addEventListener("change", function () {
    const selectedValue = selectEl.value;
    const selectedOption = branchOptions.find(
      (opt) => opt.value === selectedValue
    );
    branchCodeInput.value = selectedOption ? selectedOption.code : "";
  });

  // Form submission handler
  const form = document.getElementById("application-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // ส่งค่า branch และ code ไปยังหน้าใบสมัครผ่าน query string
      const selectedValue = selectEl.value;
      const selectedOption = branchOptions.find(
        (opt) => opt.value === selectedValue
      );
      const code = selectedOption ? selectedOption.code : "";
      const text = selectedOption ? selectedOption.text : "";
      const params = new URLSearchParams({
        branch: selectedValue || "",
        code,
        text,
      });
      window.location.href = `applicationform.html?${params.toString()}`;
    });
  }
});
