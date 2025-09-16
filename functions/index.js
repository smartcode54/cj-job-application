const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const { BigQuery } = require("@google-cloud/bigquery");
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: "hq-innovation-dev", // ใช้ project ID จาก environment
});

// Function สำหรับดึงข้อมูลสาขาจาก BigQuery
exports.getBranches = onRequest({ cors: true }, async (req, res) => {
  // เปิดใช้ CORS
  cors(req, res, async () => {
    try {
      // กำหนดชื่อ dataset และ table ของคุณที่เก็บข้อมูลสาขา
      const datasetId = "hq-innovation-dev.branchMasterdata"; // เปลี่ยนเป็นชื่อ dataset ของคุณ
      const tableId = "branchMasterdata"; // เปลี่ยนเป็นชื่อ table ของคุณ

      // SQL Query สำหรับดึงข้อมูลสาขา
      const query = `
        SELECT 
        branch_code,
        branchname_th,
        coordinates,
        province,
        region,
        district,
        branch_status
        FROM \`${datasetId}.${tableId}\`
        WHERE branch_status IN ('เปิดทำการ', 'รอเปิดทำการ')  
        LIMIT 10
      `;

      //      ORDER BY province, branch_name
      logger.info("Executing BigQuery query:", query);

      // Execute query
      const [rows] = await bigquery.query({
        query: query,
        location: "asia-southeast1", // เปลี่ยนตาม location ของ BigQuery dataset ของคุณ
      });

      // แปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการ
      const branches = rows.map((row) => ({
        code: row.branch_code, // ใช้ branch_id หรือ branch_code เป็น value
        text: row.branchname_th,
        coordinates: row.coordinates,
        province: row.province,
        region: row.region,
        district: row.district,
        branch_status: row.branch_status,
      }));

      console.log("branches", branches);

      logger.info(`Found ${branches.length} branches`);

      // Return ข้อมูล
      res.status(200).json({
        success: true,
        data: branches,
        count: branches.length,
      });
    } catch (error) {
      logger.error("Error fetching branches from BigQuery:", error);

      // กรณีที่ยังไม่ได้ตั้งค่า BigQuery ให้ return ข้อมูล mock
      const mockBranches = [
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

      res.status(200).json({
        success: true,
        data: mockBranches,
        count: mockBranches.length,
        note: "Using mock data - BigQuery not configured yet",
      });
    }
  });
});

// Function สำหรับ health check
exports.healthCheck = onRequest({ cors: true }, async (req, res) => {
  cors(req, res, () => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "Branch Service",
    });
  });
});
